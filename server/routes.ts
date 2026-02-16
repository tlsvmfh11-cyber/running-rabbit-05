import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(`User-agent: *
Allow: /

Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /temp/

Sitemap: https://www.perfectpany.com/sitemap.xml

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Yeti
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0
`);
  });

  app.get("/sitemap.xml", (_req, res) => {
    const lastmod = new Date().toISOString().split("T")[0];
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.perfectpany.com/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="https://www.perfectpany.com/" />
    <image:image>
      <image:loc>https://www.perfectpany.com/0.webp</image:loc>
      <image:caption>강남 퍼펙트 대형 룸 업장 전경 - 70개 룸 규모 프리미엄 인테리어</image:caption>
      <image:title>강남 퍼펙트 프리미엄 업장 전경</image:title>
      <image:geo_location>서울특별시 강남구</image:geo_location>
    </image:image>
    <image:image>
      <image:loc>https://www.perfectpany.com/1.webp</image:loc>
      <image:caption>강남 퍼펙트 프리미엄 룸 내부 인테리어 - 고급 블랙 골드 톤</image:caption>
      <image:title>강남 퍼펙트 고급 룸 인테리어</image:title>
      <image:geo_location>서울특별시 강남구</image:geo_location>
    </image:image>
    <image:image>
      <image:loc>https://www.perfectpany.com/2.webp</image:loc>
      <image:caption>강남 퍼펙트 이용 시스템 안내 - 초이스 진행 방식</image:caption>
      <image:title>강남 퍼펙트 룸초이스 시스템 안내</image:title>
      <image:geo_location>서울특별시 강남구</image:geo_location>
    </image:image>
    <image:image>
      <image:loc>https://www.perfectpany.com/3.webp</image:loc>
      <image:caption>강남 퍼펙트 가격 안내 - 주대 룸티 티시 상세 정보</image:caption>
      <image:title>강남 퍼펙트 가격 구조 안내</image:title>
      <image:geo_location>서울특별시 강남구</image:geo_location>
    </image:image>
    <image:image>
      <image:loc>https://www.perfectpany.com/4.webp</image:loc>
      <image:caption>강남 퍼펙트 서비스 안내 - 주류 킵술 픽업 서비스</image:caption>
      <image:title>강남 퍼펙트 주류 서비스 안내</image:title>
      <image:geo_location>서울특별시 강남구</image:geo_location>
    </image:image>
    <image:image>
      <image:loc>https://www.perfectpany.com/5.webp</image:loc>
      <image:caption>강남 퍼펙트 자주 묻는 질문 FAQ - 처음 방문 가격 시스템</image:caption>
      <image:title>강남 퍼펙트 FAQ 질문 답변</image:title>
      <image:geo_location>서울특별시 강남구</image:geo_location>
    </image:image>
    <image:image>
      <image:loc>https://www.perfectpany.com/6.webp</image:loc>
      <image:caption>강남 퍼펙트 예약 문의 안내 - 전화 텔레그램 카카오톡</image:caption>
      <image:title>강남 퍼펙트 예약 문의 안내</image:title>
      <image:geo_location>서울특별시 강남구</image:geo_location>
    </image:image>
  </url>
</urlset>`);
  });

  return httpServer;
}
