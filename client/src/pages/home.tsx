import { useState, useRef, useEffect } from "react";
import { Shield, FileText, CheckCircle, Clock, Wrench, AlertTriangle, ChevronLeft, ChevronRight, Settings, Search, MapPin, Wallet, Award, Users, Lightbulb, Truck, ChevronDown, MessageCircleQuestion, ClipboardCheck, Settings2, CalendarCheck, PackageSearch, ShieldCheck, UserCog, Star, X, ExternalLink, MessageCircle, Phone, Cpu, Sun } from "lucide-react";
import { SiInstagram, SiSnapchat, SiX } from "react-icons/si";
import logoArabic from "@assets/LEZOF_Logo_Main_Arabic_1772051534304.png";
import landRoverLogo from "@assets/land-rover-seeklogo_1772051613531.png";
import heroImg from "@assets/hf_20260222_030816_4d67b732-9251-48f5-b310-edcf118f3e2e_1772051917143.jpeg";
import diagnosticImg from "@assets/hf_20260222_031401_454657d4-b185-482d-a775-7ee79eb09f91_1772051913816.jpeg";
import workshopImg2 from "@assets/PHOTO-2026-02-25-05-59-08_1772051848892.jpg";
import defenderBlack from "@assets/PHOTO-2026-02-23-01-11-28_1772051764541.jpg";
import partsClose from "@assets/PHOTO-2026-02-23-01-12-20_1772051764543.jpg";

const BOOK_URL = "https://book.lezof.com";
const WHATSAPP_URL = "https://wa.me/+966920022114?text=" + encodeURIComponent("أهلاً لزوف، أود استشارة فني بخصوص سيارتي الديفندر");
const SOCIAL_PROOF_COUNT = "XXXX";

const SASO_CERT_URL = "/saso-certificate.pdf";

const faqItems = [
  {
    q: "هل الصيانة خارج الوكالة تلغي الضمان؟",
    a: "وفق أنظمة وزارة التجارة في المملكة، لا يُشترط تنفيذ الصيانة لدى الوكيل للحفاظ على الضمان، طالما تم الالتزام بجدول المصنع واستخدام قطع مطابقة للمواصفات.\n\nمركز لزوف حاصل على تصنيف SASO رسمي، ويلتزم باللائحة الفنية المعتمدة.",
    note: "نوثق جميع البنود ويمكن تقديمها عند الحاجة.",
  },
  {
    q: "هل السعر نهائي؟",
    a: "نعم، السعر يشمل القطع والأجور والضريبة. وأي بند إضافي لا يُنفذ إلا بعد شرح واضح وموافقتك.",
  },
  {
    q: "هل القطع أصلية؟",
    a: "نستخدم قطع أصلية ١٠٠٪ حسب البرنامج المعتمد، مع توثيق واضح لكل بند.",
  },
  {
    q: "هل يحافظ ذلك على قيمة السيارة؟",
    a: "القيمة تُحفظ بالالتزام بجدول المصنع وجودة التنفيذ وتوثيق البنود، وليس بمكان الصيانة فقط.",
  },
];

type EngineKey = "2.0L" | "3.0L" | "5.0L V8";

interface ServiceRow {
  name: string;
  regular: boolean | string;
  comprehensive: boolean | string;
  timing: string;
}

function getEngineData(engine: EngineKey) {
  const base = {
    regular: { oldPrice: "", newPrice: "", note: "" },
    comprehensive: { oldPrice: "", newPrice: "", note: "" },
    services: [] as ServiceRow[],
  };

  if (engine === "2.0L") {
    base.regular = { oldPrice: "2,999", newPrice: "1,999", note: "مناسبة حتى 117,000 كم تقريباً" };
    base.comprehensive = { oldPrice: "13,990", newPrice: "8,999", note: "مناسبة عند 130,000 كم تقريباً" };
  } else if (engine === "3.0L") {
    base.regular = { oldPrice: "3,099", newPrice: "2,399", note: "مناسبة حتى 117,000 كم تقريباً" };
    base.comprehensive = { oldPrice: "14,990", newPrice: "9,999", note: "مناسبة عند 130,000 كم تقريباً" };
  } else {
    base.regular = { oldPrice: "3,499", newPrice: "2,699", note: "مناسبة حتى 104,000 كم تقريباً" };
    base.comprehensive = { oldPrice: "17,490", newPrice: "11,990", note: "مناسبة من 104,000 كم فما فوق" };
  }

  const sparkPlugCount = engine === "2.0L" ? "4" : engine === "3.0L" ? "6" : "8";
  const sparkPlugTiming = engine === "5.0L V8" ? "كل 80,000 – 100,000 كم" : "كل 90,000 – 120,000 كم";

  base.services = [
    { name: "تغيير زيت المحرك (مواصفات المصنع) + فلتر الزيت + صامولة التصريف", regular: true, comprehensive: true, timing: "كل 10,000 كم أو سنة" },
    { name: "فحص فلاتر الهواء والمكيف + إضافة منظف نظام الوقود", regular: true, comprehensive: true, timing: "كل 20,000 - 30,000 كم" },
    { name: "فحص ميكانيكي شامل، فحص إلكتروني أساسي، وإعادة ضبط النظام", regular: true, comprehensive: true, timing: "مع كل دخول للمركز" },
    { name: "فحص إلكتروني متقدم وشامل لجميع الأنظمة", regular: false, comprehensive: true, timing: "في الصيانة الشاملة" },
    { name: `تغيير البواجي (عدد ${sparkPlugCount} شمعات احتراق)`, regular: false, comprehensive: true, timing: sparkPlugTiming },
    { name: "تغيير زيت القير مع الفلتر", regular: false, comprehensive: true, timing: "حسب توصية جدول المصنع (غالباً بعد 90,000 كم)" },
    { name: "تغيير زيوت الدفرنسات (أمامي وخلفي) وزيت الدبل", regular: false, comprehensive: true, timing: "كل 90,000 – 120,000 كم" },
    { name: "تغيير زيت الفرامل وسائل التبريد", regular: false, comprehensive: true, timing: "الفرامل (سنتين) / التبريد (5 سنوات)" },
  ];

  if (engine === "5.0L V8") {
    base.services.push(
      { name: "تغيير سير السوبر تشارجر (Supercharger Belt)", regular: false, comprehensive: true, timing: "بعد 90,000 – 100,000 كم" }
    );
  }

  base.services.push(
    { name: "بنود الاستحقاق (تغيير سيور، خراطيم، فلتر وقود إن وجد)", regular: false, comprehensive: "حسب الاستحقاق", timing: "تُنفذ فقط عند استحقاقها حسب جدول المصنع وبعد موافقتك المسبقة." },
    { name: "خدمة السطحة (ريكفري داخل الرياض)", regular: "سطحة اتجاه واحد", comprehensive: "سطحة اتجاهين (استلام وتسليم)", timing: "عند الحجز" },
  );

  return base;
}

const trustCards = [
  { icon: <ClipboardCheck className="w-7 h-7" />, title: "شفافية الفحص الرقمي", desc: "قبل أي إجراء، يصلك تقرير فحص إلكتروني موثق يوضح الحالة الفعلية لسيارتك." },
  { icon: <Settings2 className="w-7 h-7" />, title: "التزام هندسي مطابق للمصنع", desc: "نطبق جدول الصيانة الرسمي المعتمد لطراز Defender L663 بدقة كاملة." },
  { icon: <CalendarCheck className="w-7 h-7" />, title: "تسليم منظم في نفس اليوم", desc: "آلية تشغيل مصممة لضمان استلام وتسليم سيارتك في الوقت المحدد." },
  { icon: <PackageSearch className="w-7 h-7" />, title: "جاهزية فعلية للقطع", desc: "توفر مستمر للقطع الأصلية ١٠٠٪ داخل مركزنا." },
  { icon: <ShieldCheck className="w-7 h-7" />, title: "ضمان واضح وموثق", desc: "كل بند يتم تنفيذه موثق ومغطى بضمان صريح ومحدد." },
  { icon: <UserCog className="w-7 h-7" />, title: "خبرة متخصصة في Defender", desc: "فريق فني يعمل على سيارات لاند روفر يومياً ويفهم تفاصيلها الدقيقة." },
];

const blogCards = [
  { image: diagnosticImg, title: "أخطاء مكلفة في نظام التعليق الهوائي… وكيف تتجنبها.", readTime: "3 دقائق قراءة" },
  { image: workshopImg2, title: "لماذا تختلف صيانة ديفندر في أجواء الرياض؟", readTime: "4 دقائق قراءة" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function FAQItem({ question, answer, note, index }: { question: string; answer: string; note?: string; index: number }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const paragraphs = answer.split("\n\n");
  return (
    <div className={`border rounded-md overflow-hidden transition-colors duration-300 ${open ? "border-[#005A2B] bg-[#0D1F14]" : "border-[#2A2D2A]"}`} data-testid={`faq-item-${index}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-5 text-right transition-colors duration-300 ${open ? "bg-[#0D1F14]" : "bg-[#141514] hover:bg-[#1E201E]"}`}
        data-testid={`button-faq-${index}`}
      >
        <span className="font-bold text-base text-[#E5E5E5]">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#A1A5A1] shrink-0 transition-transform duration-400 ease-in-out ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? `${(contentRef.current?.scrollHeight || 500) + 20}px` : "0", opacity: open ? 1 : 0 }}
      >
        <div ref={contentRef} className="px-5 pb-5">
          {paragraphs.map((p, i) => (
            <p key={i} className={`text-sm text-[#9A9E9A] leading-[1.7] ${i > 0 ? "mt-3" : ""}`}>{p}</p>
          ))}
          {note && <p className="text-xs text-[#6B6F6B] mt-4">{note}</p>}
        </div>
      </div>
    </div>
  );
}

function ServiceCell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle className="w-5 h-5 text-[#00A64F] mx-auto" />;
  if (value === false) return <span className="text-[#A1A5A1]">—</span>;
  if (typeof value === "string" && value.includes("اتجاه واحد")) return <span className="text-xs text-[#E5E5E5] flex items-center justify-center gap-1"><Truck className="w-4 h-4 text-[#A1A5A1]" />{value}</span>;
  if (typeof value === "string" && value.includes("اتجاهين")) return <span className="text-xs text-[#E5E5E5] flex items-center justify-center gap-1"><Truck className="w-4 h-4 text-[#00A64F]" /><Truck className="w-4 h-4 text-[#00A64F]" />{value}</span>;
  return <span className="text-xs text-[#00A64F] font-medium">{value}</span>;
}

export default function Home() {
  const [selectedEngine, setSelectedEngine] = useState<EngineKey>("2.0L");
  const mileageSteps = [13000, 26000, 39000, 52000, 65000, 78000, 91000, 104000, 117000, 130000];
  const comprehensiveMileages = [78000, 117000, 130000];
  const [mileageIndex, setMileageIndex] = useState(3);
  const mileage = mileageSteps[mileageIndex];
  const isComprehensiveMileage = comprehensiveMileages.includes(mileage);
  const [hasSelectedOptions, setHasSelectedOptions] = useState(false);
  const [pricingKey, setPricingKey] = useState(0);
  const [sasoModalOpen, setSasoModalOpen] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingPackage, setBookingPackage] = useState<"regular" | "comprehensive">("comprehensive");
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success">("idle");
  const carouselRef = useRef<HTMLDivElement>(null);
  const engineInfo = getEngineData(selectedEngine);

  const bookingPrice = bookingPackage === "comprehensive" ? engineInfo.comprehensive.newPrice : engineInfo.regular.newPrice;
  const bookingPackageLabel = bookingPackage === "comprehensive" ? "الصيانة الشاملة" : "الصيانة الدورية";

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim()) return;
    setBookingStatus("submitting");
    setTimeout(() => {
      const message = encodeURIComponent(`أهلاً لزوف، أود حجز موعد صيانة.\nالاسم: ${bookingName}\nالجوال: +966${bookingPhone}\nالباقة: ${bookingPackageLabel}\nالمحرك: ${selectedEngine}\nالممشى: ${mileage.toLocaleString()} كم`);
      window.open(`https://wa.me/+966920022114?text=${message}`, "_blank");
      setBookingStatus("success");
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToPricing = () => scrollToSection("pricing");
  const scrollToBooking = () => scrollToSection("booking");

  const selectPackageAndScroll = (pkg: "regular" | "comprehensive") => {
    setBookingPackage(pkg);
    scrollToBooking();
  };

  const handleEngineChange = (engine: EngineKey) => {
    setSelectedEngine(engine);
    setHasSelectedOptions(true);
    setPricingKey((k) => k + 1);
  };

  const smartScroll = () => {
    if (hasSelectedOptions) {
      scrollToSection("booking");
    } else {
      scrollToSection("pricing");
    }
  };

  const scrollCarousel = (direction: "prev" | "next") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: direction === "next" ? -320 : 320, behavior: "smooth" });
    }
  };

  const engines: EngineKey[] = ["2.0L", "3.0L", "5.0L V8"];

  return (
    <div className="min-h-screen bg-[#0A0B0A] text-white overflow-x-hidden">
      <header className="fixed top-0 right-0 left-0 z-40 bg-[#0A0B0A]/80 backdrop-blur-md border-b border-[#2A2D2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24 sm:h-28">
          <img src={logoArabic} alt="لزوف - Lezof" className="h-20 sm:h-24 brightness-0 invert" data-testid="img-logo" />
          <button onClick={smartScroll} className="hidden sm:inline-flex btn-primary text-sm px-5 py-2.5" data-testid="link-header-book">
            احجز موعدك الآن
          </button>
        </div>
      </header>
      <section className="relative min-h-screen flex items-center pt-28" data-testid="section-hero">
        <div className="absolute inset-0">
          <img src={heroImg} alt="ديفندر في مركز لزوف" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0A0B0A] via-[#0A0B0A]/85 to-[#0A0B0A]/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-2xl">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <img src={landRoverLogo} alt="Land Rover" className="h-10 sm:h-12" />
                <span className="text-[#A1A5A1] text-sm font-medium">مركز <span className="font-bold text-[#00A64F]">لزوف</span> | برنامج صيانة ديفندر المعتمد</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5" data-testid="text-hero-title">
                صيانة ديفندر كما صُمِّمت لتكون.
                <br />
                <span className="text-[#A1A5A1]">لا مفاجآت.. ولا تنازلات.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-[#A1A5A1] text-base sm:text-lg leading-relaxed mb-3" data-testid="text-hero-subtitle">
                في <span className="text-[#00A64F] font-bold">لزوف</span>، صممنا لك برنامج صيانة مطابق لجدول المصنع، بسعر واضح ومحدد مسبقاً.
              </p>
              <p className="text-white/85 text-base sm:text-lg mb-6" data-testid="text-hero-value-line">
                استلام وتسليم في نفس اليوم — مع موافقة مسبقة قبل أي بند إضافي.
              </p>
            </FadeUp>
            <FadeUp delay={0.45}>
              <p className="text-xl sm:text-2xl font-bold mb-8" data-testid="text-anchor-price">
                صيانة دورية تبدأ من{" "}
                <span className="line-through text-[#A1A5A1]">2,999</span>{" "}
                <span className="text-[#00A64F]">1,999 ريال</span>
              </p>
            </FadeUp>
            <FadeUp delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button onClick={smartScroll} className="btn-primary-large" data-testid="link-hero-cta">
                  📅 احجز موعدك الآن – استلم سيارتك اليوم
                </button>
              </div>
            </FadeUp>
            <FadeUp delay={0.75}>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#A1A5A1]" data-testid="text-trust-bar">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#00A64F]" />مطابق لجدول المصنع</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#00A64F]" />تسليم في نفس اليوم</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#00A64F]" />توثيق رقمي كامل</span>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#FFD700]" /><span className="font-bold text-[#00A64F]">لزوف</span>: مركز معتمد بتصنيف 4 نجوم من SASO</span>
                <button onClick={() => setSasoModalOpen(true)} className="inline-block border border-[#2A2D2A] rounded p-1 hover:border-[#00A64F] transition-colors" data-testid="button-saso-badge-hero">
                  <div className="flex items-center gap-1.5 text-xs text-[#A1A5A1]">
                    <ShieldCheck className="w-4 h-4 text-[#00A64F]" />
                    <span>شهادة SASO</span>
                  </div>
                </button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#141514]" data-testid="section-why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-4">
              حيث تُطبَّق المعايير… كما وضعتها لاند روفر.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[#A1A5A1] text-center text-base sm:text-lg max-w-3xl mx-auto mb-14">
              برنامج صيانة منضبط، مطابق لجدول المصنع، مع وضوح كامل في البنود والتكلفة.
            </p>
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {trustCards.map((card, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="trust-card bg-[#0A0B0A] border border-[#2A2D2A] rounded-md p-5 sm:p-6 h-full group hover:border-[#005A2B] overflow-hidden flex flex-col" data-testid={`card-trust-${i}`}>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-md bg-[#005A2B]/15 flex items-center justify-center mb-4 text-[#00A64F] group-hover:bg-[#005A2B]/25 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base mb-2 text-white">{card.title}</h3>
                  <p className="text-[#A1A5A1] text-xs sm:text-sm leading-relaxed line-clamp-2">{card.desc}</p>
                  {i === 5 && (
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-4 pt-3 inline-flex items-center justify-center gap-2 border border-[#00A64F] text-[#00A64F] rounded-md px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-[#00A64F] hover:text-white" data-testid="link-whatsapp-advisor">
                      <MessageCircle className="w-4 h-4" />
                      تحدث مع مستشار الصيانة
                    </a>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="py-20 sm:py-28 bg-[#0A0B0A] scroll-mt-28" data-testid="section-pricing">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-4">
              اختر باقتك بناءً على ممشى سيارتك
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex items-center justify-center gap-3 mt-8 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#00A64F] text-white flex items-center justify-center text-xs font-extrabold shrink-0">1</span>
              <span className="text-sm font-bold text-white">اختر المحرك</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-[#141514] border border-[#2A2D2A] rounded-md p-1 gap-1">
                {engines.map((engine) => (
                  <button
                    key={engine}
                    onClick={() => handleEngineChange(engine)}
                    className={`px-5 sm:px-8 py-3 rounded-md font-bold text-sm sm:text-base transition-all duration-300 ${
                      selectedEngine === engine
                        ? "bg-[#00A64F] text-white shadow-[0_4px_14px_rgba(0,166,79,0.3)]"
                        : "text-[#A1A5A1] hover:bg-[#1E201E] hover:text-white"
                    }`}
                    data-testid={`button-engine-${engine}`}
                  >
                    {engine}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.18}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#00A64F] text-white flex items-center justify-center text-xs font-extrabold shrink-0">2</span>
              <span className="text-sm font-bold text-white">حدد ممشى سيارتك</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="max-w-sm sm:max-w-md mx-auto mb-10 bg-[#141514] border border-[#2A2D2A] rounded-md p-4 sm:p-5" data-testid="mileage-selector">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[#A1A5A1]">ممشى سيارتك (كم)</span>
                <span className="text-lg font-extrabold text-[#00A64F]" data-testid="text-mileage-value" dir="ltr">{mileage.toLocaleString()} كم</span>
              </div>
              <div className="relative pt-2 pb-1" dir="ltr">
                <div className="relative h-10">
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 left-0 h-1.5 bg-[#2A2D2A] rounded-full" />
                  {mileageSteps.map((step, i) => (
                    <button
                      key={step}
                      onClick={() => { setMileageIndex(i); setHasSelectedOptions(true); setBookingPackage(comprehensiveMileages.includes(mileageSteps[i]) ? "comprehensive" : "regular"); }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 group"
                      style={{ left: `${(i / (mileageSteps.length - 1)) * 100}%` }}
                      data-testid={`button-mileage-${step}`}
                    >
                      <span className={`block rounded-full transition-all duration-300 ${i === mileageIndex ? (comprehensiveMileages.includes(step) ? "w-5 h-5 bg-[#D32F2F] shadow-[0_0_10px_rgba(211,47,47,0.5)]" : "w-5 h-5 bg-[#00A64F] shadow-[0_0_10px_rgba(0,166,79,0.5)]") : comprehensiveMileages.includes(step) ? "w-2.5 h-2.5 bg-[#D32F2F]/40 group-hover:bg-[#D32F2F]" : "w-2.5 h-2.5 bg-[#2A2D2A] group-hover:bg-[#6B6F6B]"}`} />
                    </button>
                  ))}
                </div>
                <div className="relative h-5 mt-1">
                  {mileageSteps.map((step, i) => (
                    <span
                      key={step}
                      onClick={() => { setMileageIndex(i); setHasSelectedOptions(true); setBookingPackage(comprehensiveMileages.includes(mileageSteps[i]) ? "comprehensive" : "regular"); }}
                      className={`absolute -translate-x-1/2 text-[10px] sm:text-xs cursor-pointer transition-colors duration-200 whitespace-nowrap ${i === mileageIndex ? (comprehensiveMileages.includes(step) ? "text-[#D32F2F] font-bold" : "text-[#00A64F] font-bold") : comprehensiveMileages.includes(step) ? "text-[#D32F2F]/60 hover:text-[#D32F2F]" : "text-[#6B6F6B] hover:text-[#A1A5A1]"}`}
                      style={{ left: `${(i / (mileageSteps.length - 1)) * 100}%` }}
                    >
                      {(step / 1000).toFixed(0)}k
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center gap-2 mt-4">
                <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-md transition-all duration-300 ${isComprehensiveMileage ? "bg-[#D32F2F]/15 text-[#D32F2F]" : "bg-[#00A64F]/15 text-[#00A64F]"}`} data-testid="text-mileage-recommendation">
                  <span className={`w-2 h-2 rounded-full ${isComprehensiveMileage ? "bg-[#D32F2F]" : "bg-[#00A64F]"}`} />
                  {isComprehensiveMileage ? "الباقة المناسبة: الصيانة الشاملة" : "الباقة المناسبة: الصيانة الدورية"}
                </span>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#00A64F] text-white flex items-center justify-center text-xs font-extrabold shrink-0">3</span>
              <span className="text-sm font-bold text-white">سيظهر لك السعر والباقة المناسبة</span>
            </div>
          </FadeUp>

          <div key={pricingKey} className="pricing-animate">
            <div className="hidden md:block overflow-x-auto rounded-md border border-[#2A2D2A]" style={{ scrollbarWidth: "none" }}>
              <table className="w-full min-w-[750px] border-collapse" data-testid="table-pricing">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#141514] border-b border-[#2A2D2A]">
                    <th className="text-right p-4 text-[#A1A5A1] font-medium text-sm w-[32%]">البند الهندسي</th>
                    <th className={`text-center p-4 text-sm font-bold w-[22%] transition-colors duration-500 ${!isComprehensiveMileage ? "bg-[#00A64F]/10 border-x-2 border-t-2 border-[#00A64F]/40" : ""}`}>
                      <div className="flex flex-col items-center gap-1">
                        {!isComprehensiveMileage && <span className="inline-block bg-[#00A64F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse" data-testid="badge-recommended-regular">مناسبة لممشاك</span>}
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00A64F]" />
                          الصيانة الدورية
                        </span>
                      </div>
                    </th>
                    <th className={`text-center p-4 text-sm font-bold w-[22%] transition-colors duration-500 ${isComprehensiveMileage ? "bg-[#D32F2F]/10 border-x-2 border-t-2 border-[#D32F2F]/40" : ""}`}>
                      <div className="flex flex-col items-center gap-1">
                        {isComprehensiveMileage ? <span className="inline-block bg-[#D32F2F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse" data-testid="badge-recommended-comprehensive">مناسبة لممشاك</span> : <span className="inline-block bg-[#D32F2F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full" data-testid="badge-most-popular">الأكثر طلباً</span>}
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F]" />
                          الصيانة الشاملة
                        </span>
                      </div>
                    </th>
                    <th className="text-center p-4 text-[#A1A5A1] font-medium text-sm w-[24%]">
                      <span className="flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" />
                        متى يُنصح به؟
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#141514]">
                  <tr className="border-b border-[#2A2D2A] bg-[#0A0B0A]">
                    <td className="p-4 text-sm font-bold text-[#E5E5E5]">قيمة الاستثمار</td>
                    <td className={`p-4 text-center transition-colors duration-500 ${!isComprehensiveMileage ? "bg-[#00A64F]/5 border-x-2 border-[#00A64F]/40" : ""}`}>
                      <span className="block text-[#A1A5A1] line-through text-sm">{engineInfo.regular.oldPrice} ريال</span>
                      <span className="block text-2xl font-extrabold text-[#00A64F]">{engineInfo.regular.newPrice} ريال</span>
                      <span className="block text-xs text-[#A1A5A1] mt-1">{engineInfo.regular.note}</span>
                      <span className="block text-xs text-[#A1A5A1] mt-2 leading-snug">السعر يشمل القطع والأجور وضريبة القيمة المضافة.</span>
                    </td>
                    <td className={`p-4 text-center transition-colors duration-500 ${isComprehensiveMileage ? "bg-[#D32F2F]/5 border-x-2 border-[#D32F2F]/40" : ""}`}>
                      <span className="block text-[#A1A5A1] line-through text-sm">{engineInfo.comprehensive.oldPrice} ريال</span>
                      <span className="block text-2xl font-extrabold text-[#00A64F]">{engineInfo.comprehensive.newPrice} ريال</span>
                      <span className="block text-xs text-[#A1A5A1] mt-1">{engineInfo.comprehensive.note}</span>
                      <span className="block text-xs text-[#A1A5A1] mt-2 leading-snug">السعر يشمل القطع والأجور وضريبة القيمة المضافة.</span>
                    </td>
                    <td className="p-4 text-center text-xs text-[#A1A5A1]">حسب جدول المصنع</td>
                  </tr>
                  {engineInfo.services.map((service, i) => (
                    <tr key={i} className="border-b border-[#2A2D2A] hover:bg-[#1E201E] transition-colors">
                      <td className="p-4 text-sm text-[#E5E5E5]">{service.name}</td>
                      <td className={`p-4 text-center transition-colors duration-500 ${!isComprehensiveMileage ? "bg-[#00A64F]/5 border-x-2 border-[#00A64F]/40" : ""}`}><ServiceCell value={service.regular} /></td>
                      <td className={`p-4 text-center transition-colors duration-500 ${isComprehensiveMileage ? "bg-[#D32F2F]/5 border-x-2 border-[#D32F2F]/40" : ""}`}><ServiceCell value={service.comprehensive} /></td>
                      <td className="p-4 text-center text-xs text-[#A1A5A1]">{service.timing}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#0A0B0A]">
                    <td className="p-4"></td>
                    <td className={`p-5 text-center transition-colors duration-500 ${!isComprehensiveMileage ? "bg-[#00A64F]/5 border-x-2 border-b-2 border-[#00A64F]/40 rounded-b-md" : ""}`}>
                      <button onClick={() => selectPackageAndScroll("regular")} className={`text-sm ${!isComprehensiveMileage ? "btn-primary" : "bg-[#1E201E] text-[#6B6F6B] font-bold px-6 py-2.5 rounded-md cursor-pointer hover:text-[#A1A5A1] transition-all duration-300"}`} data-testid="link-book-regular">احجز الدورية</button>
                    </td>
                    <td className={`p-5 text-center transition-colors duration-500 ${isComprehensiveMileage ? "bg-[#D32F2F]/5 border-x-2 border-b-2 border-[#D32F2F]/40 rounded-b-md" : ""}`}>
                      <button onClick={() => selectPackageAndScroll("comprehensive")} className={`text-sm ${isComprehensiveMileage ? "btn-primary" : "bg-[#1E201E] text-[#6B6F6B] font-bold px-6 py-2.5 rounded-md cursor-pointer hover:text-[#A1A5A1] transition-all duration-300"}`} data-testid="link-book-comprehensive">احجز الشاملة</button>
                    </td>
                    <td className="p-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="md:hidden" data-testid="pricing-mobile-cards">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {([
                  { type: "regular" as const, label: "الدورية", color: "#00A64F", dotColor: "bg-[#00A64F]", btnText: "احجز الدورية", testId: "link-book-regular-mobile" },
                  { type: "comprehensive" as const, label: "الشاملة", color: "#D32F2F", dotColor: "bg-[#D32F2F]", btnText: "احجز الشاملة", testId: "link-book-comprehensive-mobile" },
                ] as const).map((pkg) => {
                  const isRecommended = (pkg.type === "comprehensive" && isComprehensiveMileage) || (pkg.type === "regular" && !isComprehensiveMileage);
                  return (
                    <div key={pkg.type} className={`bg-[#141514] rounded-lg overflow-hidden transition-all duration-500 flex flex-col ${isRecommended ? (pkg.type === "comprehensive" ? "border-2 border-[#D32F2F]/60 shadow-[0_0_20px_rgba(211,47,47,0.15)]" : "border-2 border-[#00A64F]/60 shadow-[0_0_20px_rgba(0,166,79,0.15)]") : "border border-[#2A2D2A]"}`} data-testid={`card-pricing-${pkg.type}`}>
                      <div className="p-3 bg-[#0A0B0A] border-b border-[#2A2D2A]">
                        <div className="flex items-center justify-center gap-1.5 mb-2">
                          <span className={`w-2 h-2 rounded-full ${pkg.dotColor}`} />
                          <span className="font-bold text-sm">{pkg.label}</span>
                        </div>
                        {isRecommended && <div className="text-center mb-2"><span className={`text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse ${pkg.type === "comprehensive" ? "bg-[#D32F2F]" : "bg-[#00A64F]"}`}>مناسبة لممشاك</span></div>}
                        <div className="text-center">
                          <span className="text-[#A1A5A1] line-through text-xs">{engineInfo[pkg.type].oldPrice} ريال</span>
                          <span className="block text-xl font-extrabold text-[#00A64F] my-0.5">{engineInfo[pkg.type].newPrice}</span>
                          <span className="block text-[10px] text-[#A1A5A1]">ريال شامل الضريبة</span>
                        </div>
                      </div>
                      <div className="p-3 flex-1 space-y-2">
                        {engineInfo.services.map((service, i) => {
                          const val = service[pkg.type];
                          return (
                            <div key={i} className="flex items-start gap-1.5" data-testid={`mobile-service-${pkg.type}-${i}`}>
                              {val === false ? (
                                <X className="w-3.5 h-3.5 text-[#6B6F6B]/40 shrink-0 mt-0.5" />
                              ) : (
                                <CheckCircle className="w-3.5 h-3.5 text-[#00A64F] shrink-0 mt-0.5" />
                              )}
                              <span className={`text-[11px] leading-snug ${val === false ? "text-[#6B6F6B]/40 line-through" : "text-[#E5E5E5]"}`}>{service.name}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="p-3 pt-0">
                        <button onClick={() => selectPackageAndScroll(pkg.type)} className={`text-xs w-full py-2.5 rounded-md font-bold transition-all duration-300 ${isRecommended ? "btn-primary" : "bg-[#1E201E] text-[#6B6F6B] hover:text-[#A1A5A1]"}`} data-testid={pkg.testId}>{pkg.btnText}</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-[10px] text-[#6B6F6B]">السعر يشمل القطع والأجور وضريبة القيمة المضافة</p>
            </div>

            <div className="mt-6 flex items-start gap-2 bg-[#2A2210] border border-[#4A3D20] rounded-md p-4 max-w-5xl mx-auto">
              <Lightbulb className="w-5 h-5 text-[#E5A617] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#C8B888] leading-relaxed">
                <span className="font-bold text-[#E5D5A0]">ملاحظة هندسية:</span> جميع البنود تُنفذ حرفياً حسب جدول المصنع المعتمد بناءً على رقم الهيكل (VIN). <strong className="text-[#E5D5A0]">لا يتم تغيير أي جزء غير مستحق، ونلتزم بالشفافية التامة في كل إجراء.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#141514]" data-testid="section-blog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-4">
              المعرفة التقنية التي تحمي قرارك.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[#A1A5A1] text-center text-base sm:text-lg max-w-3xl mx-auto mb-14">
              بدل أن تبحث لساعات… جمعنا لك أهم الأدلة التقنية الخاصة بسيارات Defender في مكان واحد.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="relative">
              <button onClick={() => scrollCarousel("prev")} className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-[#0A0B0A]/80 backdrop-blur-sm border border-[#2A2D2A] rounded-full p-2 hover:bg-[#1E201E] transition-colors hidden md:flex" data-testid="button-carousel-prev">
                <ChevronRight className="w-5 h-5" />
              </button>
              <button onClick={() => scrollCarousel("next")} className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-[#0A0B0A]/80 backdrop-blur-sm border border-[#2A2D2A] rounded-full p-2 hover:bg-[#1E201E] transition-colors hidden md:flex" data-testid="button-carousel-next">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div ref={carouselRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory touch-pan-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
                {blogCards.map((card, i) => (
                  <div key={i} className="min-w-[85vw] sm:min-w-[350px] flex-shrink-0 snap-center bg-[#0A0B0A] border border-[#2A2D2A] rounded-md overflow-hidden group cursor-pointer" data-testid={`card-blog-${i}`}>
                    <div className="relative h-52 overflow-hidden">
                      <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <span className="absolute top-3 right-3 bg-[#0A0B0A]/80 backdrop-blur-sm text-[#A1A5A1] text-xs px-2.5 py-1 rounded-full flex items-center gap-1" data-testid={`text-read-time-${i}`}>
                        <Clock className="w-3 h-3" />
                        {card.readTime}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-base leading-relaxed mb-4 text-[#E5E5E5]">{card.title}</h3>
                      <span className="text-[#00A64F] text-sm font-medium flex items-center gap-1 group-hover:underline group-hover:underline-offset-4 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(0,166,79,0.5)]">
                        اقرأ الدليل التقني <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-4 md:hidden">
                {blogCards.map((_, i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-[#2A2D2A]" />
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-center text-sm text-[#A1A5A1] mt-8">اقرأ الدليل… ثم احجز وأنت مطمئن.</p>
          </FadeUp>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#0A0B0A]" data-testid="section-guarantee">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-[#005A2B]/20 flex items-center justify-center">
                <Shield className="w-10 h-10 text-[#00A64F]" />
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">أنت صاحب القرار.. دائماً.</h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-[#A1A5A1] text-base sm:text-lg mb-14">نلتزم بالوضوح الكامل قبل أي إجراء — من البداية حتى التسليم.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: <Shield className="w-8 h-8 text-[#00A64F]" />, title: "تسعيرة واضحة", desc: "السعر الذي تراه الآن هو السعر النهائي للباقة (يشمل القطع والأجور والضريبة).", pulse: false },
              { icon: <CheckCircle className="w-8 h-8 text-[#00A64F]" />, title: "لا تنفيذ بدون موافقتك", desc: "لا يتم تنفيذ أي بند إضافي إلا بعد شرح واضح وموافقتك الصريحة.", pulse: false },
              { icon: <FileText className="w-8 h-8 text-[#00A64F]" />, title: "تقرير رقمي موثق", desc: "يصلك تقرير فحص رقمي بالصور قبل البدء، لتعرف الحالة بدقة.", pulse: true },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="guarantee-card bg-[#141514] border border-[#2A2D2A] rounded-md p-8 h-full text-center cursor-default" data-testid={`card-guarantee-${i}`}>
                  <div className={`flex justify-center mb-5 ${item.pulse ? "icon-pulse" : ""}`}>{item.icon}</div>
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-[#A1A5A1] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.5}>
            <p className="text-center text-xs text-[#6B6F6B] mt-10">كل البنود تُنفذ حسب جدول المصنع ورقم الهيكل (VIN).</p>
          </FadeUp>
          <FadeUp delay={0.6}>
            <div className="text-center mt-10">
              <button onClick={smartScroll} className="btn-primary-large" data-testid="link-guarantee-cta">ابدأ صيانة سيارتك الآن</button>
            </div>
          </FadeUp>
          <FadeUp delay={0.7}>
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-[#6B6F6B]">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#00A64F]" />اتصال آمن ومشفر</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#00A64F]" />مركز معتمد من SASO</span>
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[#00A64F]" />توثيق رقمي لكل إجراء</span>
            </div>
          </FadeUp>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#0A0B0A]" data-testid="section-saso">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="flex justify-center mb-6">
              <div className="saso-glow w-20 h-20 rounded-full bg-[#005A2B]/20 flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-[#00A64F]" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-8">جهة رقابية تعترف باحترافيتنا.</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[#E5E5E5] text-base sm:text-lg leading-relaxed mb-4">مركز لزوف حاصل على شهادة تصنيف رسمية من الهيئة السعودية للمواصفات والمقاييس والجودة (SASO)، وفق اللائحة الفنية لتصنيف مراكز صيانة وإصلاح المركبات.</p>
            <p className="text-[#E5E5E5] text-base sm:text-lg leading-relaxed mb-10">تصنيف 4 نجوم يؤكد التزامنا بالمعايير التشغيلية والهندسية المعتمدة داخل المملكة.</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <button onClick={() => setSasoModalOpen(true)} className="inline-flex items-center gap-2 border border-[#2A2D2A] bg-transparent text-[#E5E5E5] px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 hover:bg-[#0D1F14] hover:border-[#005A2B] hover:text-[#00A64F]" data-testid="button-saso-certificate">
              <FileText className="w-4 h-4" />
              عرض الشهادة الرسمية
            </button>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-xs text-[#A1A5A1] mt-6">صادرة عن الهيئة السعودية للمواصفات والمقاييس والجودة — صالحة حتى 2029</p>
          </FadeUp>
        </div>
      </section>
      {sasoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0B0A]/90 backdrop-blur-sm p-4" onClick={() => setSasoModalOpen(false)} data-testid="modal-saso-overlay">
          <div className="relative max-w-3xl w-full max-h-[90vh] bg-[#141514] border border-[#2A2D2A] rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-[#2A2D2A]">
              <h3 className="text-sm font-bold text-white">شهادة تصنيف SASO</h3>
              <button onClick={() => setSasoModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2A2D2A] transition-colors" data-testid="button-close-saso-modal">
                <X className="w-5 h-5 text-[#A1A5A1]" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-60px)] flex items-center justify-center">
              <iframe src={SASO_CERT_URL} className="w-full h-[70vh] rounded" title="شهادة SASO" />
            </div>
          </div>
        </div>
      )}
      <section className="py-8 sm:py-10 bg-[#141514]" data-testid="section-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-xl sm:text-2xl font-extrabold text-center mb-3">لماذا يثق ملاك السيارات الأوروبية في الرياض بمركز <span className="text-[#00A64F]">لزوف</span>؟</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[#A1A5A1] text-center text-sm sm:text-base leading-[1.6] max-w-[800px] mx-auto mb-6">في مركز لزوف، ندرك أن قيادة سيارة أوروبية فاخرة تتطلب عناية هندسية فائقة، وليس مجرد صيانة تقليدية. لقد أسسنا مركزنا ليكون البديل الأكثر موثوقية للوكالات، عبر دمج الخبرة العميقة مع أحدث التقنيات.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Cpu className="w-5 h-5" />, title: "استثمار تقني ضخم", desc: "لا نعتمد على التخمين. نستخدم أجهزة تشخيص وبرمجيات مطابقة تماماً لما تستخدمه المصانع الأم (OEM) لضمان دقة الفحص بنسبة 100%." },
              { icon: <UserCog className="w-5 h-5" />, title: "كوادر هندسية متخصصة", desc: "فريقنا لا يضم مجرد ميكانيكيين، بل خبراء تقنيين متمرسين في تعقيدات المحركات الأوروبية وأنظمة التعليق الهوائي." },
              { icon: <Sun className="w-5 h-5" />, title: "فهم عميق لبيئتنا", desc: "خبرتنا الطويلة في الرياض جعلتنا نطور برامج صيانة تتناسب مع تأثير الأجواء الحارة والقاسية على أداء السيارات الفاخرة." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="guarantee-card bg-[#0A0B0A] border border-[#2A2D2A] rounded-md p-4 sm:p-5 text-center h-full" data-testid={`card-about-${i}`}>
                  <div className="w-9 h-9 rounded-md bg-[#005A2B]/15 flex items-center justify-center mx-auto mb-3 text-[#00A64F]">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-sm mb-2 text-[#00A64F]">{item.title}</h3>
                  <p className="text-[#A1A5A1] text-xs leading-[1.5]">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#0A0B0A]" data-testid="section-faq">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a.replace(/\n\n/g, " ") + ("note" in item && item.note ? ` ${item.note}` : "")
            }
          }))
        }) }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircleQuestion className="w-8 h-8 text-[#00A64F]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center">أسئلة شائعة</h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[#A1A5A1] text-center text-base sm:text-lg mb-10">إجابات سريعة على أكثر ما يُسأل عنه:</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-3">
              {faqItems.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} note={"note" in item ? item.note : undefined} index={i} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="booking" className="py-20 sm:py-28 bg-[#0A0B0A] scroll-mt-28" data-testid="section-booking">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-4">احجز موعدك في أقل من دقيقة</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[#A1A5A1] text-center text-base sm:text-lg max-w-2xl mx-auto mb-12">لا يلزم الدفع الآن. سيقوم مستشار الصيانة بالتواصل معك لتأكيد الموعد.</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            {bookingStatus === "success" ? (
              <div className="bg-[#111111] border border-[#2A2D2A] rounded-xl p-10 sm:p-16 text-center max-w-lg mx-auto">
                <div className="w-20 h-20 rounded-full bg-[#005A2B]/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-[#00A64F]" />
                </div>
                <h3 className="text-2xl font-extrabold mb-3" data-testid="text-booking-success">تم استلام طلبك بنجاح!</h3>
                <p className="text-[#A1A5A1] text-sm sm:text-base leading-relaxed">أهلاً بك في لزوف. سيتواصل معك مستشار خدمة ديفندر خلال دقائق لتأكيد الموعد النهائي.</p>
              </div>
            ) : (
              <>
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <div className="bg-[#111111] border border-[#2A2D2A] rounded-xl p-3 sm:p-6 md:p-8">
                  <h3 className="font-bold text-sm sm:text-lg mb-3 sm:mb-6 text-white" data-testid="text-order-summary">ملخص طلبك</h3>
                  <div className="space-y-2.5 sm:space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#A1A5A1] text-[11px] sm:text-sm">المحرك</span>
                      <span className="font-bold text-white text-[11px] sm:text-sm">{selectedEngine}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#A1A5A1] text-[11px] sm:text-sm">الممشى</span>
                      <span className="font-bold text-white text-[11px] sm:text-sm">{mileage.toLocaleString()} كم</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 sm:gap-0">
                      <span className="text-[#A1A5A1] text-[11px] sm:text-sm">الباقة</span>
                      <div className="flex gap-1.5 sm:gap-2">
                        <button onClick={() => setBookingPackage("regular")} className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-bold transition-all duration-300 ${bookingPackage === "regular" ? "bg-[#00A64F] text-white" : "bg-[#1E201E] text-[#A1A5A1] hover:text-white"}`} data-testid="button-booking-regular">الدورية</button>
                        <button onClick={() => setBookingPackage("comprehensive")} className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-bold transition-all duration-300 ${bookingPackage === "comprehensive" ? "bg-[#D32F2F] text-white" : "bg-[#1E201E] text-[#A1A5A1] hover:text-white"}`} data-testid="button-booking-comprehensive">الشاملة</button>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-[#2A2D2A] my-3 sm:my-6" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-1">
                    <span className="text-[#A1A5A1] text-[11px] sm:text-sm">الإجمالي</span>
                    <div className="sm:text-left">
                      <span className="block text-xl sm:text-3xl font-extrabold text-[#D32F2F]" data-testid="text-booking-price">{bookingPrice} ريال</span>
                      <span className="block text-[9px] sm:text-xs text-[#6B6F6B] mt-0.5 sm:mt-1">شامل الضريبة والقطع والأجور</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#111111] border border-[#2A2D2A] rounded-xl p-3 sm:p-6 md:p-8">
                  <h3 className="font-bold text-sm sm:text-lg mb-3 sm:mb-6 text-white">تأكيد الحجز</h3>
                  <form onSubmit={handleBookingSubmit} className="space-y-2.5 sm:space-y-5">
                    <div>
                      <input type="text" value={bookingName} onChange={(e) => setBookingName(e.target.value)} placeholder="الاسم" required className="w-full bg-[#0A0B0A] border border-[#2A2D2A] rounded-md px-3 sm:px-4 py-2.5 sm:py-3.5 text-white text-xs sm:text-sm placeholder:text-[#6B6F6B] focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F]/30 transition-colors" data-testid="input-booking-name" />
                    </div>
                    <div className="relative">
                      <input type="tel" value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value.replace(/\D/g, "").slice(0, 9))} placeholder="5xxxxxxxx" required dir="ltr" className="w-full bg-[#0A0B0A] border border-[#2A2D2A] rounded-md pl-3 sm:pl-4 pr-12 sm:pr-16 py-2.5 sm:py-3.5 text-white text-xs sm:text-sm placeholder:text-[#6B6F6B] focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F]/30 transition-colors text-left" data-testid="input-booking-phone" />
                      <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#6B6F6B] text-xs sm:text-sm font-medium pointer-events-none">966+</span>
                    </div>
                    <p className="text-[#6B6F6B] text-[9px] sm:text-xs leading-relaxed hidden sm:block">لا يلزم الدفع الآن. سيقوم مستشار الصيانة بالتواصل معك لتأكيد الموعد ورقم الشاصي (VIN).</p>
                    <button type="submit" disabled={bookingStatus === "submitting"} className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-2.5 sm:py-4 rounded-md text-xs sm:text-base transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed" data-testid="button-confirm-booking">
                      {bookingStatus === "submitting" ? "جاري التأكيد..." : "تأكيد الحجز — رسالة واتساب"}
                    </button>
                  </form>
                </div>
              </div>
              <p className="text-center text-[9px] sm:text-xs text-[#6B6F6B] mt-3 sm:hidden">لا يلزم الدفع الآن. سيتواصل معك مستشار الصيانة لتأكيد الموعد.</p>
              </>
            )}
          </FadeUp>
        </div>
      </section>
      <section className="relative py-24 sm:py-32" data-testid="section-final-cta">
        <div className="absolute inset-0">
          <img src={defenderBlack} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0A0B0A]/90" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6">قرارك اليوم… يحمي سيارتك لسنوات.</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[#A1A5A1] text-base sm:text-lg mb-10">برنامج صيانة منظم، مطابق لجدول المصنع، بتسعير واضح وتنفيذ موثق.</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <button onClick={smartScroll} className="btn-primary-large" data-testid="link-final-cta">احجز الآن — واستلم اليوم</button>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 text-sm text-[#A1A5A1]">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#00A64F]" />تنفيذ مطابق للمواصفات</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#00A64F]" />توثيق رقمي كامل</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#00A64F]" />تسليم في نفس اليوم</span>
            </div>
          </FadeUp>
        </div>
      </section>
      <footer className="bg-[#141514] border-t border-[#2A2D2A] py-14" data-testid="section-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
            <div className="text-center md:text-right">
              <img src={logoArabic} alt="لزوف" className="h-12 brightness-0 invert mx-auto md:mx-0 mb-4" />
              <p className="text-[#A1A5A1] text-sm leading-relaxed">مركز متخصص في صيانة السيارات الاوروبية وفق معايير المصنع.</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-5">
                <a href="https://instagram.com/lezof_sa" target="_blank" rel="noopener noreferrer" className="text-[#A1A5A1] hover:text-[#00A64F] transition-colors" data-testid="link-instagram"><SiInstagram className="w-5 h-5" /></a>
                <a href="https://snapchat.com/add/lezof_sa" target="_blank" rel="noopener noreferrer" className="text-[#A1A5A1] hover:text-[#00A64F] transition-colors" data-testid="link-snapchat"><SiSnapchat className="w-5 h-5" /></a>
                <a href="https://x.com/lezof_sa" target="_blank" rel="noopener noreferrer" className="text-[#A1A5A1] hover:text-[#00A64F] transition-colors" data-testid="link-twitter"><SiX className="w-5 h-5" /></a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h4 className="font-bold text-white mb-4">تواصل معنا</h4>
              <div className="flex flex-col gap-3">
                <a href="tel:920022114" className="flex items-center justify-center md:justify-start gap-2 text-[#A1A5A1] hover:text-[#00A64F] transition-colors text-sm" data-testid="link-phone">
                  <Phone className="w-4 h-4" />
                  920022114
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-2 text-[#A1A5A1] hover:text-[#00A64F] transition-colors text-sm" data-testid="link-whatsapp-footer">
                  <MessageCircle className="w-4 h-4" />
                  واتساب — استشارة فنية
                </a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h4 className="font-bold text-white mb-4">الموقع وساعات العمل</h4>
              <div className="flex flex-col gap-3">
                <a href="https://www.google.com/maps/place/%D9%84%D8%B2%D9%88%D9%81+-+%D8%A7%D9%84%D9%86%D9%81%D9%84/@24.7756139,46.6611696,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2f053c3ac97ea7:0x69037f3c0ba8d76a!8m2!3d24.775614!4d46.6660352!16s%2Fg%2F11y0jmx629" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-2 text-[#A1A5A1] hover:text-[#00A64F] transition-colors text-sm" data-testid="link-directions">
                  <MapPin className="w-4 h-4" />
                  مركز لزوف، الرياض
                </a>
                <span className="flex items-center justify-center md:justify-start gap-2 text-[#A1A5A1] text-sm">
                  <Clock className="w-4 h-4" />
                  ساعات العمل: 9 ص — 11 م
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-[#2A2D2A] pt-6">
            <p className="text-[#6B6F6B] text-xs text-center">© {new Date().getFullYear()} لزوف لخدمات السيارات. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}