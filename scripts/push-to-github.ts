import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

async function getAccessToken(): Promise<string> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  const data = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json());

  const item = data.items?.[0];
  const accessToken = item?.settings?.access_token || item?.settings?.oauth?.credentials?.access_token;

  if (!accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function main() {
  const owner = 'tlsvmfh11-cyber';
  const repo = 'running-rabbit-05';

  console.log('Getting GitHub client...');
  const token = await getAccessToken();
  const octokit = new Octokit({ auth: token });

  const user = await octokit.users.getAuthenticated();
  console.log('Authenticated as:', user.data.login);

  const trackedOutput = require('child_process').execSync('git ls-files', { cwd: '/home/runner/workspace', encoding: 'utf-8' });
  const trackedFiles = trackedOutput.trim().split('\n');
  console.log(`Found ${trackedFiles.length} files to upload`);

  const blobs: { path: string; sha: string; mode: string; type: string }[] = [];

  for (const filePath of trackedFiles) {
    const fullPath = path.join('/home/runner/workspace', filePath);
    if (!fs.existsSync(fullPath)) continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) continue;

    const content = fs.readFileSync(fullPath);

    const res = await octokit.git.createBlob({
      owner, repo,
      content: content.toString('base64'),
      encoding: 'base64'
    });

    blobs.push({
      path: filePath,
      sha: res.data.sha,
      mode: '100644',
      type: 'blob'
    });

    process.stdout.write('.');
  }

  console.log(`\nCreated ${blobs.length} blobs`);

  let parentSha: string | undefined;
  try {
    const { data: ref } = await octokit.git.getRef({ owner, repo, ref: 'heads/main' });
    parentSha = ref.object.sha;
  } catch (e) {
    console.log('No existing main branch, creating initial commit');
  }

  const { data: tree } = await octokit.git.createTree({
    owner, repo,
    tree: blobs as any,
  });

  console.log('Tree created:', tree.sha);

  const commitParams: any = {
    owner, repo,
    message: '강남 퍼펙트 SEO 최적화 랜딩 페이지 배포',
    tree: tree.sha,
  };
  if (parentSha) {
    commitParams.parents = [parentSha];
  }

  const { data: commit } = await octokit.git.createCommit(commitParams);
  console.log('Commit created:', commit.sha);

  try {
    await octokit.git.updateRef({
      owner, repo,
      ref: 'heads/main',
      sha: commit.sha,
      force: true
    });
    console.log('Updated main branch');
  } catch (e) {
    await octokit.git.createRef({
      owner, repo,
      ref: 'refs/heads/main',
      sha: commit.sha
    });
    console.log('Created main branch');
  }

  console.log('Push complete! https://github.com/tlsvmfh11-cyber/running-rabbit-05');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
