import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, Send, MapPin, Clock, Users, Star, ChevronDown, Menu, X, HelpCircle, Calendar, CheckCircle, Wine, Shield } from "lucide-react";

function SectionWrapper({ children, id, imgSrc, imgAlt, reverse = false }: {
  children: React.ReactNode;
  id?: string;
  imgSrc: string;
  imgAlt: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className="relative overflow-hidden section-line scroll-mt-16 opacity-0 transition-all duration-1000 [&.visible]:opacity-100"
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <img
        className="absolute -z-10 inset-0 w-full h-full object-cover brightness-[0.15] blur-lg"
        src={imgSrc}
        alt=""
        loading="lazy"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col items-center py-16 md:py-24 gap-10 lg:gap-16 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
          <div className="w-full lg:w-5/12">
            <img
              className="mx-auto aspect-square rounded-md shadow-lg shadow-amber-900/30 max-w-md w-full"
              src={imgSrc}
              alt={imgAlt}
              width="800"
              height="800"
              loading="lazy"
            />
          </div>
          <div className="w-full lg:w-7/12">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { href: "#intro", label: "소개" },
    { href: "#system", label: "시스템" },
    { href: "#price", label: "가격" },
    { href: "#service", label: "서비스" },
    { href: "#faq", label: "질문" },
    { href: "#contact", label: "예약" },
  ];

  return (
    <>
      <header className="fixed z-50 top-0 w-full border-b border-amber-700/40 bg-black/85 backdrop-blur-md" role="banner">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2" aria-label="주 메뉴">
          <a href="#" className="gold-text text-2xl sm:text-3xl font-black py-3" data-testid="link-home" aria-label="강남 퍼펙트 홈으로 이동">
            강남 퍼펙트
          </a>
          <button
            className="lg:hidden p-2 text-amber-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            data-testid="button-menu-toggle"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div
            id="main-nav"
            className={`${menuOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row w-full lg:w-auto pb-3 lg:pb-0 gap-1`}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                  activeSection === item.href.slice(1)
                    ? "text-amber-300 border-amber-400"
                    : "text-stone-300 border-transparent hover:text-amber-200"
                }`}
                data-testid={`link-nav-${item.href.slice(1)}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="pt-0">
        <section className="relative overflow-hidden min-h-screen flex items-center" aria-label="강남 퍼펙트 메인 소개">
          <img
            className="absolute -z-10 inset-0 w-full h-full object-cover brightness-[0.15] blur-lg"
            src="/0.webp"
            alt=""
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col items-center py-24 gap-10 lg:gap-16 lg:flex-row mt-14">
              <div className="w-full lg:w-5/12">
                <img
                  className="mx-auto aspect-square rounded-md shadow-lg shadow-amber-900/50 max-w-md w-full"
                  src="/0.webp"
                  alt="강남 퍼펙트 대형 룸 업장 전경 - 70개 룸 규모 프리미엄 인테리어"
                  width="800"
                  height="800"
                  loading="eager"
                />
              </div>
              <div className="w-full lg:w-7/12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                  <span className="gold-text">강남 퍼펙트</span> 가격 주대 시스템{" "}
                  <span className="block mt-1 text-stone-200">완벽 가이드</span>
                </h1>
                <p className="text-lg text-stone-300 mb-4 leading-relaxed">
                  <strong className="text-amber-200">강남 퍼펙트</strong>를 처음 알아보는 분들이 가장 궁금해하는 건{" "}
                  <strong className="text-amber-200">강남 퍼펙트 가격</strong>은 어떻게 되는지,{" "}
                  <strong className="text-amber-200">강남 퍼펙트 주대</strong>는 어느 정도인지, 그리고{" "}
                  <strong className="text-amber-200">강남 퍼펙트 초이스</strong> 시스템은 어떻게 진행되는지입니다.{" "}
                  <a href="#price" className="text-amber-400 underline underline-offset-4">강남 퍼펙트 가격 정보</a>를 먼저 확인하세요.
                </p>
                <p className="text-lg text-stone-300 mb-4 leading-relaxed">
                  <strong className="text-amber-200">강남 퍼펙트</strong>는 과장된 홍보나 애매한 표현 없이 실제로 문의가 가장 많은 내용 위주로{" "}
                  <a href="#system" className="text-amber-400 underline underline-offset-4">이용 방법과 기준</a>을 정리했습니다.
                  현장에서 8년 넘게 일하면서 수천 명의 손님을 응대한 경험을 바탕으로 작성했습니다.
                </p>
                <p className="text-lg text-stone-300 mb-6 leading-relaxed">
                  처음 방문하시는 분들도 이 페이지 하나만 보시면 전체 흐름을 이해하실 수 있도록 최대한 현실적인 기준으로 안내드리겠습니다.{" "}
                  <a href="#faq" className="text-amber-400 underline underline-offset-4">자주 묻는 질문</a>도 함께 확인하시면 더 도움이 됩니다.
                </p>

                <nav className="bg-amber-950/30 border border-amber-700/50 rounded-md p-5 mt-4" aria-label="페이지 목차">
                  <div className="text-xl font-bold mb-3 text-amber-300 flex items-center gap-2">
                    <ChevronDown className="w-5 h-5" />
                    목차 (빠른 이동)
                  </div>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" /> <a href="#intro" className="text-amber-200 hover:text-amber-100 underline underline-offset-4">1. 강남 퍼펙트 소개</a></li>
                    <li className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-500 flex-shrink-0" /> <a href="#system" className="text-amber-200 hover:text-amber-100 underline underline-offset-4">2. 이용 시스템 안내</a></li>
                    <li className="flex items-center gap-2"><Wine className="w-4 h-4 text-amber-500 flex-shrink-0" /> <a href="#price" className="text-amber-200 hover:text-amber-100 underline underline-offset-4">3. 가격 안내 (주대 / 룸티 / 티시)</a></li>
                    <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-amber-500 flex-shrink-0" /> <a href="#service" className="text-amber-200 hover:text-amber-100 underline underline-offset-4">4. 주류 / 서비스 / 픽업</a></li>
                    <li className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0" /> <a href="#faq" className="text-amber-200 hover:text-amber-100 underline underline-offset-4">5. 자주 묻는 질문 (FAQ)</a></li>
                    <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500 flex-shrink-0" /> <a href="#contact" className="text-amber-200 hover:text-amber-100 underline underline-offset-4">6. 예약 및 문의</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <SectionWrapper id="intro" imgSrc="/1.webp" imgAlt="강남 퍼펙트 프리미엄 룸 내부 - 텐프로 쩜오급 퀄리티 인테리어" reverse>
          <h2 id="intro-heading" className="text-3xl sm:text-4xl font-bold mb-5 text-stone-100">강남 퍼펙트 소개</h2>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트</strong>는 강남권에서 술자리, 모임, 비즈니스 자리를 목적으로 가성비 기준으로 적당한 선의{" "}
            <strong className="text-amber-200">강남 퍼펙트 가격</strong>에 텐프로/쩜오급 퀄리티를 찾는 분들이 꾸준히 방문하는 대형 룸 업장입니다.{" "}
            <strong className="text-amber-200">강남 퍼펙트</strong> 위치는 강남역에서 도보 5분 거리에 있으며, 지하철 2호선 강남역 10번 출구에서 바로 접근 가능합니다.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3 text-stone-200">강남 퍼펙트 규모와 시설</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            약 <strong className="text-amber-200">70여 개의 룸</strong>을 갖춘 대규모 시설로 운영되고 있으며, 룸마다 인테리어 컨디션과 분위기가 잘 정리되어 있어
            조용한 자리부터 여러 명이 함께하는 자리까지 상황에 맞게 선택이 가능합니다.{" "}
            <strong className="text-amber-200">강남 퍼펙트</strong> 룸 크기는 2인실부터 20인 대형 룸까지 다양하게 구성되어 있으며,
            각 룸마다 최신 음향 시설과 조명이 설치되어 있습니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트</strong> 인테리어는 고급스러운 블랙 톤과 골드 포인트로 구성되어 있으며,
            영화나 드라마 촬영지로도 여러 차례 사용된 곳입니다. 실제로 2023년과 2024년에 유명 드라마 2편의 촬영이 이루어졌으며,
            방송 이후 방문 문의가 크게 증가했습니다.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3 text-stone-200">강남 퍼펙트 출근 인원과 선택 폭</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            또한 하루 평균 <strong className="text-amber-200">150명~200명 수준</strong>의 출근 인원이 유지되는 초대형 업장이다 보니
            스타일, 사이즈, 마인드 등 각 손님 취향에 맞춘 선택 폭이 넓은 편입니다. 평일에는 평균 150명, 주말에는 평균 200명 이상이 출근하며,
            특히 금요일과 토요일에는 220명까지 출근하는 경우도 있습니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            현장 매니저로서 8년 넘게 일하면서 확인한 바로는, <strong className="text-amber-200">강남 퍼펙트</strong> 재방문율이 약{" "}
            <strong className="text-amber-200">73%</strong> 수준입니다. 이는 <strong className="text-amber-200">강남 퍼펙트 시스템</strong>의
            투명성과 서비스 품질이 높다는 것을 의미합니다. 실제로 한 달에 2회 이상 방문하시는 단골 고객 비율이 약 35%에 달합니다.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3 text-stone-200">강남 퍼펙트 매니저 시스템</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            담당 실장이 처음 상담부터 이용 종료까지 취향을 정리해드리고 추천을 진행하기 때문에 처음 방문하시는 분들도
            내상이나 선택에 대한 걱정을 크게 하지 않으셔도 됩니다.{" "}
            <a href="#system" className="text-amber-400 underline underline-offset-4">강남 퍼펙트 시스템 안내</a>를 보시면 더 자세히 확인하실 수 있습니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트</strong> 매니저는 평균 5년 이상의 경력자들로 구성되어 있으며,
            손님의 취향과 예산에 맞춰 최적의 추천을 제공합니다. 매니저 1명당 평균 3~4개 룸을 담당하며, 빠른 응대와 서비스를 보장합니다.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3 text-stone-200">강남 퍼펙트 신규 고객 비율</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            그래서 <strong className="text-amber-200">강남 퍼펙트</strong>는 첫 방문 고객 비중도 꾸준히 유지되고 있는 곳입니다.
            지난 1년간 약 <strong className="text-amber-200">5,400팀</strong> 이상이 방문했으며, 이 중 신규 고객은 약 27% 수준입니다.
            월 평균 450팀이 방문하며, 주말에는 하루 평균 20~25팀이 이용합니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 예약</strong>은 전화, 카카오톡, 텔레그램으로 가능하며, 당일 예약도 가능합니다.
            다만 주말과 공휴일 전날은 예약이 빠르게 마감되므로 미리{" "}
            <a href="#contact" className="text-amber-400 underline underline-offset-4">예약 문의</a>를 권장드립니다.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 bg-amber-950/30 rounded-md px-4 py-2">
              <Users className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-stone-300"><strong className="text-amber-200">70+</strong> 룸</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-950/30 rounded-md px-4 py-2">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-stone-300"><strong className="text-amber-200">73%</strong> 재방문</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-950/30 rounded-md px-4 py-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-stone-300"><strong className="text-amber-200">8년</strong> 경력</span>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="system" imgSrc="/2.webp" imgAlt="강남 퍼펙트 이용 시스템 안내 - 룸초이스 진행 방식 상세 설명">
          <h2 id="system-heading" className="text-3xl sm:text-4xl font-bold mb-5 text-stone-100">강남 퍼펙트 이용 시스템 안내</h2>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 시스템</strong>은 복잡하지 않습니다. 처음 방문하시는 분들도 안내에 따라 자연스럽게 진행하실 수 있습니다.
            솔직히 말씀드리면, 이 업계에서 10년 가까이 일하면서 느낀 건, <strong className="text-amber-200">강남 퍼펙트 시스템</strong>이
            투명하고 간단해야 손님들이 편하게 이용하신다는 점입니다.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3 text-stone-200">강남 퍼펙트 초이스 시스템</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 초이스</strong>는 담당 사장이 손님께서 원하시는 스타일, 마인드, 사이즈 등을 먼저 정리한 뒤
            한 분씩 추천해드리는 방식으로 진행됩니다. 평균 5~8분 정도 상담 시간을 가진 후{" "}
            <strong className="text-amber-200">강남 퍼펙트 초이스</strong>를 시작합니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 초이스</strong> 방식은 크게 3가지로 구분됩니다.
            첫째, 1:1 개별 추천 방식으로 매니저가 손님 취향에 맞는 분을 한 명씩 소개합니다.
            둘째, 라인업 방식으로 3~5명이 동시에 입장하여 선택하는 방식입니다.
            셋째, 사진 선택 방식으로 태블릿을 통해 프로필을 확인 후 선택하는 방식입니다.
            대부분의 손님은 1:1 개별 추천 방식을 선호하며, 이 방식의 만족도가 가장 높습니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            현장에서 급하게 결정을 요구하거나 즉흥적으로 선택하게 만드는 구조가 아닙니다. 만약 마음에 들지 않으시면 재선택도 가능합니다.
            재선택은 최대 2회까지 가능하며, 추가 비용은 발생하지 않습니다.
            8년간 일하면서 경험한 바로는, 재선택을 요청하시는 분은 전체의 약 15% 수준이며, 재선택 후 만족도는 95% 이상입니다.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3 text-stone-200">강남 퍼펙트 TC 시스템</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 TC</strong>(Table Chief) 시스템은 각 룸마다 전담 매니저가 배정되어
            이용 시작부터 종료까지 전 과정을 케어하는 시스템입니다. TC는 주류 서빙, 안주 제공, 추가 요청 사항 처리, 시간 연장 안내 등
            모든 서비스를 담당합니다. <strong className="text-amber-200">강남 퍼펙트 TC</strong>는 평균 3년 이상의 경력자로 구성되어 있으며,
            서비스 교육을 정기적으로 받습니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            처음 오신 분들도 부담 없이 설명을 듣고 본인에게 맞는 선택을 하실 수 있도록 진행됩니다.{" "}
            <a href="#price" className="text-amber-400 underline underline-offset-4">강남 퍼펙트 가격 정보</a>와{" "}
            <a href="#contact" className="text-amber-400 underline underline-offset-4">강남 퍼펙트 예약 방법</a>도 함께 확인하시면 좋습니다.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-stone-200">강남 퍼펙트 이용 흐름 (입실부터 퇴실까지)</h3>
          <ol className="space-y-3 text-lg text-stone-300">
            {[
              { step: "1단계: 사전 예약", desc: "전화/카톡/텔레그램으로 예약 (약 2~3분). 인원, 시간대, 특별 요청 사항을 말씀해 주세요." },
              { step: "2단계: 도착 및 체크인", desc: "방문 후 인원에 맞는 룸 안내 (약 3~5분). 신분증 확인 후 룸으로 이동합니다." },
              { step: "3단계: 주류 선택", desc: "가격 안내 및 주류 메뉴 설명 (약 5분). 양주, 맥주, 와인 중 선택 가능합니다." },
              { step: "4단계: 초이스 상담", desc: "원하시는 스타일, 연령대, 분위기를 말씀해 주세요. (약 5~8분)" },
              { step: "5단계: 초이스 진행", desc: "평균 2~3회 추천. 마음에 드시는 분을 선택하시면 됩니다." },
              { step: "6단계: 서비스 진행", desc: "TC가 주류, 안주 서빙 및 전반적인 케어. 2시간 기본 이용 시간입니다." },
              { step: "7단계: 연장 또는 추가", desc: "필요 시 시간 연장 또는 추가 선택 가능. 연장료는 1시간당 별도 부과됩니다." },
              { step: "8단계: 정산 및 퇴실", desc: "카드/현금 모두 가능. 영수증 발급 가능합니다." },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full gold-gradient text-black text-sm font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <strong className="text-amber-200">{item.step}</strong>
                  <span className="text-stone-400"> - {item.desc}</span>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-lg text-stone-300 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 시스템</strong>의 가장 큰 장점은 투명성입니다.
            모든 비용이 사전에 안내되며, 숨은 비용이 없습니다. 8년간 운영하면서 가격 관련 분쟁은 단 한 건도 없었습니다.
          </p>
        </SectionWrapper>

        <SectionWrapper id="price" imgSrc="/3.webp" imgAlt="강남 퍼펙트 가격 구조 - 주대 룸티 티시 연장비 상세 정보" reverse>
          <h2 id="price-heading" className="text-3xl sm:text-4xl font-bold mb-5 text-stone-100">강남 퍼펙트 가격 안내</h2>

          <div className="bg-amber-950/40 border border-amber-600/50 rounded-md p-5 mb-6">
            <h3 className="text-2xl font-bold mb-3 text-amber-300 flex items-center gap-2">
              <Phone className="w-5 h-5" /> 최저가 유선상담
            </h3>
            <p className="text-stone-300 mb-3">정확한 가격은 유선 상담을 통해 안내드립니다. 인원, 요일, 시간대를 말씀해 주시면 최저가로 상담해 드립니다.</p>
            <a
              href="tel:01023033778"
              className="inline-flex items-center gap-2 gold-gradient text-black font-bold py-3 px-6 rounded-md transition-transform hover:scale-[1.02]"
              data-testid="button-call-price"
            >
              <Phone className="w-4 h-4" /> 전화 상담하기
            </a>
          </div>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">기본 가격 구조</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 가격</strong>은 이용 시간 + 주대를 기준으로 구성됩니다. 기본 2시간 코스 기준이며, 다음이 포함됩니다.
          </p>
          <ul className="bg-stone-900/60 rounded-md p-4 mb-4 space-y-2 text-lg text-stone-300">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" /> <strong className="text-amber-200">주대:</strong> 180,000원 (양주 1병 또는 맥주 무제한)</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" /> <strong className="text-amber-200">룸티:</strong> 50,000원 (룸 사용료)</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" /> <strong className="text-amber-200">티시:</strong> 130,000원 (서비스 차지)</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" /> <strong className="text-amber-200">연장 티시:</strong> 150,000원 (1시간 연장 시)</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">추가 비용 항목</h3>
          <ul className="space-y-2 text-lg text-stone-300 mb-4">
            <li><strong className="text-amber-200">시간 연장:</strong> 1시간 단위로 가능 (연장 티시 적용)</li>
            <li><strong className="text-amber-200">주류 추가:</strong> 브랜드별 차이 있음 (양주 기준 15만원~)</li>
            <li><strong className="text-amber-200">안주 추가:</strong> 메뉴판 별도 (5천원~3만원)</li>
            <li><strong className="text-amber-200">지명료:</strong> 재방문 시에만 적용</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">강남 퍼펙트 요일별 가격</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 가격</strong>은 요일에 따라 약간의 차이가 있습니다.
            평일(월~목)은 기본 가격이 적용되며, 금요일은 평일 대비 10% 할증, 토요일과 공휴일 전날은 20% 할증이 적용됩니다.
            일요일은 평일과 동일한 가격입니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 평일 가격</strong>이 가장 저렴하며, 특히 월요일과 화요일은 프로모션이 적용되어 추가 할인을 받으실 수 있습니다.
            자세한 <strong className="text-amber-200">강남 퍼펙트 할인</strong> 정보는{" "}
            <a href="#contact" className="text-amber-400 underline underline-offset-4">전화 상담</a>을 통해 확인하세요.
          </p>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">강남 퍼펙트 인원별 가격</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트</strong>는 인원수에 따라 룸 크기와 가격이 달라집니다.
          </p>
          <ul className="bg-stone-900/60 rounded-md p-4 mb-4 space-y-2 text-lg text-stone-300">
            <li><strong className="text-amber-200">2인 이용:</strong> 기본 요금 적용 (소형 룸)</li>
            <li><strong className="text-amber-200">3~5인 이용:</strong> 중형 룸, 주대 1병 추가 권장</li>
            <li><strong className="text-amber-200">6~10인 이용:</strong> 대형 룸, 주대 2병 권장</li>
            <li><strong className="text-amber-200">10인 이상:</strong> VIP 룸, 별도 상담</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">강남 퍼펙트 결제 방법</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 결제</strong>는 카드와 현금 모두 가능합니다. 신용카드는 모든 카드사 사용 가능하며,
            체크카드도 가능합니다. 현금 결제 시 영수증 발급이 가능하며, 사업자 손님의 경우 세금계산서 발행도 가능합니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            계좌이체도 가능하며, 사전 송금 후 방문하시면 10% 추가 할인이 적용됩니다. 다만 계좌이체는 예약 확정 후에만 가능하며,
            취소 시 환불 규정이 적용됩니다.
          </p>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">강남 퍼펙트 환불 규정</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 환불</strong>은 방문 3시간 전까지 취소 시 100% 환불,
            1~3시간 전 취소 시 50% 환불, 1시간 이내 또는 노쇼 시 환불 불가입니다. 예약 변경은 언제든지 가능하며,
            날짜와 시간을 변경하실 수 있습니다.
          </p>

          <p className="mt-4 text-lg text-stone-300 leading-relaxed">
            요일, 시간대, 인원 수에 따라 세부 금액은 일부 달라질 수 있습니다.
            그래서 정확한 <strong className="text-amber-200">강남 퍼펙트 가격</strong>은{" "}
            <a href="#contact" className="text-amber-400 underline underline-offset-4">방문 전 문의</a>를 통해 확인하시는 것이 가장 확실합니다.
            중요한 점은 현장에서 갑작스럽게 추가 비용이 발생하는 방식이 아니라 사전에 안내된 기준으로 진행된다는 점입니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            8년 넘게 이 일 하면서 확실히 느낀 건, <strong className="text-amber-200">강남 퍼펙트 가격</strong>을 투명하게 안내하는 게
            손님들께도 저희에게도 훨씬 좋다는 점입니다.{" "}
            <a href="#system" className="text-amber-400 underline underline-offset-4">강남 퍼펙트 시스템 안내</a>도 함께 확인해 보세요.
          </p>
          <p className="mt-4 text-sm text-stone-500">
            ※ 본 가격 정보는 2026년 2월 기준이며, 시즌 및 업장 사정에 따라 변동될 수 있습니다.
            정확한 <strong>강남 퍼펙트 최신 가격</strong>은 전화 상담을 통해 확인하세요.
          </p>
        </SectionWrapper>

        <SectionWrapper id="service" imgSrc="/4.webp" imgAlt="강남 퍼펙트 주류 서비스 픽업 안내 - 킵술 서비스 및 픽업 시스템">
          <h2 id="service-heading" className="text-3xl sm:text-4xl font-bold mb-5 text-stone-100">주류 / 서비스 / 픽업 안내</h2>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">강남 퍼펙트 주류 및 서비스</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트</strong> 이용 중 맥주, 물, 음료, 양주 등이 부족한 경우 담당 사장이 상황에 맞게
            서비스 개념으로 킵술을 준비해 채워드리는 경우도 있습니다. 기본 주대에는 양주 1병 또는 맥주 무제한이 포함되며,
            안주는 기본 3종이 제공됩니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 주류</strong> 종류는 다양합니다. 양주는 조니워커 블랙, 임페리얼, 윈저, 발렌타인 등이 있으며,
            브랜드에 따라 가격이 다릅니다. 와인은 레드와인, 화이트와인 모두 준비되어 있으며, 샴페인도 가능합니다.
            맥주는 카스, 하이네켄, 기린 등이 무제한으로 제공됩니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 안주</strong>는 기본 3종(과일, 육포, 견과류)이 제공되며, 추가 안주는 별도 주문 가능합니다.
            인기 메뉴는 치킨, 피자, 회, 초밥 등이 있으며, 가격은 5천원~3만원 사이입니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            실무 경험상, 2명 기준으로 2시간 이용하시면 기본 구성만으로도 충분한 경우가 많습니다. 추가가 필요하시면 TC에게 말씀하시면 즉시 제공됩니다.{" "}
            <strong className="text-amber-200">강남 퍼펙트</strong>는 서비스 속도가 빠른 것으로 유명하며, 평균 호출 후 2~3분 내에 응대합니다.
          </p>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">강남 퍼펙트 픽업 서비스</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            또한 <strong className="text-amber-200">강남 퍼펙트</strong>는 픽업 서비스도 지원하고 있어 처음 방문하시는 분들이나 이동이 불편하신 경우에도
            편하게 요청 후 방문하실 수 있습니다. 강남역 주변 지역은 대부분 픽업 가능하며,{" "}
            <a href="#contact" className="text-amber-400 underline underline-offset-4">강남 퍼펙트 예약 시 말씀</a>해 주시면 됩니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 픽업</strong> 가능 지역은 강남역, 역삼역, 삼성역, 선릉역 반경 2km 이내입니다.
            픽업 차량은 그랜저, 제네시스 등 준중형 이상 차량으로 운영되며, 최대 4명까지 픽업 가능합니다.
            픽업 소요 시간은 평균 5~10분이며, 예약 시 출발 위치를 정확히 알려주시면 됩니다.
          </p>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 픽업</strong>은 무료이며, 별도 비용은 발생하지 않습니다.
            다만 2km 이상 지역은 택시비 실비만 부담하시면 됩니다. 픽업 서비스는 오후 7시부터 새벽 2시까지 운영됩니다.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-stone-200">강남 퍼펙트 이런 분들께 많이 선택됩니다</h3>
          <ul className="space-y-3 text-lg text-stone-300">
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" /> 강남에서 <a href="#price" className="text-amber-400 underline underline-offset-4">가성비 기준</a>으로 마인드/사이즈/수질 좋은 룸 술자리를 찾는 분</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" /> <a href="#price" className="text-amber-400 underline underline-offset-4">가격과 주대</a>를 미리 알고 이용하고 싶은 분</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" /> 처음 방문이라 <a href="#system" className="text-amber-400 underline underline-offset-4">시스템이 궁금한 분</a></li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" /> 소규모 또는 지인 모임 장소를 찾는 분</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" /> 혼자서도 부담 없이 이용할 수 있는 곳을 찾는 분</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" /> 특정 분위기를 강요하기보다는 편하게 이용할 수 있는 환경을 선호하는 분</li>
          </ul>
          <p className="mt-4 text-lg text-stone-300 leading-relaxed">
            지난 6개월간 신규 고객 만족도 조사 결과 <strong className="text-amber-200">87%</strong>가 &quot;재방문 의사 있음&quot;으로 응답했습니다.
            이는 시스템의 투명성과 서비스 품질에 대한 신뢰도를 나타냅니다.
          </p>
        </SectionWrapper>

        <SectionWrapper id="faq" imgSrc="/5.webp" imgAlt="강남 퍼펙트 FAQ - 처음 방문 가격 주대 혼자방문 분위기 질문 답변" reverse>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold mb-5 text-stone-100">자주 묻는 질문 (Q&A)</h2>

          <div className="space-y-6">
            {[
              {
                q: "Q. 강남 퍼펙트 처음 가도 괜찮은가요?",
                a: <>네. <strong className="text-amber-200">강남 퍼펙트</strong>는 처음 방문하시는 분들의 비중도 높습니다. <strong className="text-amber-200">강남 퍼펙트 시스템</strong>은 이용 흐름이 단순하고, 처음부터 담당 사장이 안내를 진행하기 때문에 시스템 때문에 불편함을 느끼는 경우는 많지 않습니다. 실제로 신규 고객의 97%가 &quot;처음이어도 편했다&quot;고 응답했습니다.</>
              },
              {
                q: "Q. 강남 퍼펙트 가격은 어느 정도 생각하면 되나요?",
                a: <><strong className="text-amber-200">강남 퍼펙트 가격</strong>은 이용 시간과 주대 구성에 따라 달라집니다. 기본 2인 기준 2시간 이용 시 주대 18만원 + 룸티 5만원 + 티시 13만원으로 총 36만원 정도입니다. 정확한 <strong className="text-amber-200">강남 퍼펙트 최신 가격</strong>은 <a href="#contact" className="text-amber-400 underline underline-offset-4">방문 전 문의</a>를 통해 상황에 맞게 안내받으시는 것이 가장 정확합니다.</>
              },
              {
                q: "Q. 강남 퍼펙트 주대는 이용 전에 알 수 있나요?",
                a: <>네, 가능합니다. <strong className="text-amber-200">강남 퍼펙트 주대</strong>는 주류 선택 전에 기준을 먼저 안내드리며 동의 후 이용이 진행됩니다. 이용 중 갑작스럽게 변경되는 방식은 아닙니다. 양주는 18만원, 맥주 무제한은 동일 가격이며, 와인은 브랜드별로 20~30만원입니다.</>
              },
              {
                q: "Q. 강남 퍼펙트 혼자 방문해도 괜찮나요?",
                a: <>네. <strong className="text-amber-200">강남 퍼펙트</strong>는 1인 단독 방문도 충분히 가능한 곳입니다. 전체 손님 중 약 12%가 1인 방문 고객입니다. 혼자 오신다고 해서 분위기가 어색하거나 이용이 불편한 구조가 아니며, 담당 사장이 처음부터 끝까지 케어해드리기 때문에 부담 없이 이용하실 수 있습니다. 1인 전용 소형 룸도 별도로 운영하고 있습니다.</>
              },
              {
                q: "Q. 강남 퍼펙트 분위기는 어떤 편인가요?",
                a: <><strong className="text-amber-200">강남 퍼펙트</strong>는 약 70여 개 룸 규모의 대형 업장으로 전체적으로 정리된 인테리어와 안정적인 분위기입니다. <strong className="text-amber-200">강남 퍼펙트 인테리어</strong>는 고급스러운 블랙 &amp; 골드 톤으로 통일되어 있습니다. 영화나 드라마 촬영지로도 알려진 곳이며, 접대 자리나 중요한 자리에도 무난하게 이용할 수 있습니다. <strong className="text-amber-200">강남 퍼펙트 후기</strong>에서 가장 많이 언급되는 것이 &quot;분위기가 좋다&quot;입니다.</>
              },
              {
                q: "Q. 강남 퍼펙트 예약 없이 방문 가능한가요?",
                a: <><strong className="text-amber-200">강남 퍼펙트 예약</strong> 없이 방문도 가능하지만, 주말에는 대기 시간이 발생할 수 있습니다. 평일은 당일 방문도 무난하지만, 금요일~일요일은 사전 예약을 강력히 권장드립니다. <strong className="text-amber-200">강남 퍼펙트 예약</strong>은 전화로 2~3분이면 완료됩니다.</>
              },
              {
                q: "Q. 강남 퍼펙트 영업 시간은 어떻게 되나요?",
                a: <><strong className="text-amber-200">강남 퍼펙트 영업시간</strong>은 매일 오후 6시부터 새벽 6시까지입니다. 주말과 공휴일에도 동일하게 운영되며, 명절(설날, 추석)에도 정상 영업합니다. 입장 마감은 새벽 4시이며, 그 이후는 연장 손님만 이용 가능합니다.</>
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-stone-800 pb-4" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="text-xl font-bold text-stone-200 mb-2" itemProp="name">{item.q}</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-lg text-stone-300 leading-relaxed" itemProp="text">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="contact" imgSrc="/6.webp" imgAlt="강남 퍼펙트 예약 및 문의 안내 - 전화 텔레그램 카카오톡 상담">
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold mb-5 text-stone-100">예약 및 문의 안내</h2>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트</strong>는 방문 전 예약 또는 문의를 권장드립니다.
            특히 주말(금요일~일요일)은 예약이 빠르게 마감되는 편이니 미리 연락 주시면 좋습니다.
          </p>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">강남 퍼펙트 위치 확인</h3>
          <address className="not-italic">
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            <strong className="text-amber-200">강남 퍼펙트 위치</strong>는 강남역 10번 출구에서 도보 5분 거리입니다.{" "}
            <a href="https://map.naver.com/p/search/%EA%B0%95%EB%82%A8%EC%97%AD" target="_blank" rel="noopener nofollow" className="text-amber-400 underline underline-offset-4">네이버 지도에서 강남역 확인하기</a>{" "}
            또는{" "}
            <a href="https://www.google.com/maps/search/%EA%B0%95%EB%82%A8%EC%97%AD" target="_blank" rel="noopener nofollow" className="text-amber-400 underline underline-offset-4">구글 지도에서 강남역 확인하기</a>를
            통해 정확한 위치를 확인하실 수 있습니다. 주차는 건물 지하 주차장 이용 가능하며, 2시간 무료 주차권을 제공합니다.
          </p>
          </address>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">예약 시 알려주실 내용</h3>
          <ul className="bg-stone-900/60 rounded-md p-4 mb-4 space-y-2 text-lg text-stone-300">
            <li className="flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" /> <strong className="text-amber-200">이용 인원:</strong> 몇 명이서 방문하시는지</li>
            <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-400 flex-shrink-0" /> <strong className="text-amber-200">방문 시간대:</strong> 대략적인 도착 시간 (평일/주말 구분)</li>
            <li className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0" /> <strong className="text-amber-200">궁금한 부분:</strong> <a href="#price" className="text-amber-400 underline underline-offset-4">가격</a>, 주대, <a href="#system" className="text-amber-400 underline underline-offset-4">시스템</a>, 분위기 등</li>
          </ul>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            위 내용을 미리 말씀 주시면 상황에 맞게 정확히 안내해드립니다. 불필요한 설명이나 과장 없이 필요한 정보만 안내드리는 것을 기준으로 운영하고 있습니다.
          </p>

          <h3 className="text-2xl font-bold mt-6 mb-4 text-stone-200">예약 방법</h3>
          <p className="text-lg text-stone-300 mb-4 leading-relaxed">
            전화, 텔레그램, 카카오톡 중 편하신 방법으로 연락 주시면 됩니다. 전화가 가장 빠르게 상담 가능하며, 문자나 메시지로도 예약 가능합니다.
          </p>
          <p className="text-lg text-stone-300 mb-6 leading-relaxed">
            현장 매니저로서 8년 넘게 일하면서 느낀 건, 예약 없이 방문하시면 대기 시간이 발생할 수 있다는 점입니다.
            특히 금요일 저녁이나 주말에는 예약이 필수입니다.{" "}
            <a href="#faq" className="text-amber-400 underline underline-offset-4">자주 묻는 질문</a>도 참고하세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-20">
            <a
              href="tel:01023033778"
              className="flex-1 flex items-center justify-center gap-2 gold-gradient text-black font-bold py-4 px-6 rounded-md transition-transform hover:scale-[1.02]"
              data-testid="button-call-main"
              aria-label="강남 퍼펙트 전화 상담하기"
            >
              <Phone className="w-5 h-5" />
              <span>전화 상담하기<span className="hidden sm:inline"> (바로 연결)</span></span>
            </a>
            <a
              href="https://t.me/hscompanyshs"
              target="_blank"
              rel="noopener"
              className="flex-1 flex items-center justify-center gap-2 bg-amber-800/80 text-amber-100 font-bold py-4 px-6 rounded-md transition-transform hover:scale-[1.02]"
              data-testid="button-telegram"
              aria-label="강남 퍼펙트 텔레그램 문의"
            >
              <Send className="w-5 h-5" />
              <span>텔레그램 문의</span>
            </a>
            <a
              href="http://qr.kakao.com/talk/tlsgustlra"
              target="_blank"
              rel="noopener"
              className="flex-1 flex items-center justify-center gap-2 bg-amber-800/80 text-amber-100 font-bold py-4 px-6 rounded-md transition-transform hover:scale-[1.02]"
              data-testid="button-kakao"
              aria-label="강남 퍼펙트 카카오톡 문의"
            >
              <MessageCircle className="w-5 h-5" />
              <span>카카오톡 문의</span>
            </a>
          </div>
        </SectionWrapper>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 0.75rem)" }}>
        <a
          href="tel:01023033778"
          className="flex items-center justify-center gap-2 gold-gradient text-black font-bold py-4 text-lg"
          data-testid="button-mobile-cta"
          aria-label="강남 퍼펙트 전화 예약"
        >
          <Phone className="w-5 h-5" />
          전화 상담하기 (바로 연결)
        </a>
      </div>

      <footer className="hidden md:block fixed bottom-0 w-full py-6 text-center z-40 bg-black/50 backdrop-blur-sm" role="contentinfo">
        <a
          href="tel:01023033778"
          className="inline-flex items-center gap-3 gold-gradient text-black font-bold py-3 px-8 rounded-full text-xl shadow-lg shadow-amber-950/50 transition-transform hover:scale-[1.02]"
          data-testid="button-footer-cta"
          aria-label="강남 퍼펙트 전화 예약하기"
        >
          <Phone className="w-5 h-5" />
          <span>지금 바로</span>
          <span className="bg-black text-amber-400 px-4 py-1 rounded-full font-bold">전화 예약하기</span>
        </a>
      </footer>
    </>
  );
}