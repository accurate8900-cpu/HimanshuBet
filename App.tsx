import React, { useState, useEffect } from "react";
import {
  Trophy,
  ShieldCheck,
  Zap,
  Sparkles,
  Send,
  Calendar,
  Star,
  Check,
  Copy,
  ChevronDown,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  Users,
  Globe,
  RefreshCw,
  Activity,
  Award,
  Info
} from "lucide-react";
import {
  VIP_PLANS,
  PAST_RESULTS,
  LIVE_MATCHES,
  PLAYER_STATS,
  INITIAL_FEEDBACK,
  FAQS,
  VIPPlan,
  LiveMatch,
  FeedbackItem
} from "./data/mockData";

export default function App() {
  // Loading state for smooth initial load animation
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("Analyzing server odds...");

  // Sticky navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive state
  const [stakeAmount, setStakeAmount] = useState<number>(1000);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(INITIAL_FEEDBACK);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<VIPPlan | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Feedback Form State
  const [formName, setFormName] = useState("");
  const [formPlan, setFormPlan] = useState("₹1000 - 7-Day Combo Elite");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Dynamic Live Matches State with mock ticker simulation
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>(LIVE_MATCHES);
  
  // FAQ state
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Dynamic system live feed of notifications
  const [liveNotification, setLiveNotification] = useState<string>(
    "🔥 EXCLUSIVE: Himanshu Jha uploaded high-probability 15.00+ ODD ticket to the Legend VIP Telegram Group!"
  );

  // Simulate smooth loading progress bar
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), 450);
          return 100;
        }
        
        // Randomly update text to make it realistic
        if (prev === 20) setLoadingStatus("Establishing VIP database link...");
        if (prev === 45) setLoadingStatus("Loading daily historical data from Flashscore API...");
        if (prev === 70) setLoadingStatus("Verifying Himanshu Jha's premium algorithms...");
        if (prev === 90) setLoadingStatus("Securing SSL Handshake & Telegram credentials...");
        
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, []);

  // Live match simulator (ticks clock and fluctuates odds occasionally)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMatches((prevMatches) =>
        prevMatches.map((match) => {
          // Increment match time
          const currentMin = parseInt(match.time);
          let nextTime = match.time;
          if (!isNaN(currentMin)) {
            nextTime = currentMin < 90 ? `${currentMin + 1}'` : "90+'";
          }

          // Random chance of score change (very low, but happens live!)
          let nextHomeScore = match.homeScore;
          let nextAwayScore = match.awayScore;
          const scoreChance = Math.random();
          if (scoreChance > 0.94 && !isNaN(currentMin) && currentMin < 90) {
            if (Math.random() > 0.5) {
              nextHomeScore += 1;
            } else {
              nextAwayScore += 1;
            }
          }

          // Fluctuate odds slightly
          const oddsDirection = Math.random() > 0.5 ? ("up" as const) : ("down" as const);
          const delta = parseFloat((Math.random() * 0.1).toFixed(2));
          const nextOdds = Math.max(1.05, parseFloat((match.odds + (oddsDirection === "up" ? delta : -delta)).toFixed(2)));

          return {
            ...match,
            time: nextTime,
            homeScore: nextHomeScore,
            awayScore: nextAwayScore,
            odds: nextOdds,
            oddsDirection
          };
        })
      );
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  // System notification simulator to mimic busy Telegram room activity
  useEffect(() => {
    const notifications = [
      "🔥 EXCLUSIVE: Himanshu Jha uploaded high-probability 15.00+ ODD ticket to the Legend VIP Telegram Group!",
      "💰 CLIENT PROFIT: Vikram R. won ₹37,000 on the HT/FT prediction verified slip!",
      "⚠️ ALERT: 7-Day VIP Combo package is 84% booked today. Secure your slot to avoid high prices.",
      "🚀 SECURED WIN: 8.64 Odd Daily Combo won clean! Verified checkmarks updated in results section.",
      "📈 MARKET UPDATE: High volume of bets on Real Madrid ML. Bookmaker odds dropping rapidly!",
      "🤝 DIRECT SUPPORT: Direct query activated. PM @Mahicr07 on Telegram for special discount requests."
    ];

    const interval = setInterval(() => {
      const randomMsg = notifications[Math.floor(Math.random() * notifications.length)];
      setLiveNotification(randomMsg);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Copy helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 2500);
  };

  // Submit Feedback manually
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newFeedback: FeedbackItem = {
      id: `f-user-${Date.now()}`,
      name: formName,
      plan: formPlan,
      rating: formRating,
      comment: formComment,
      date: "Just now",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
    };

    setFeedbackList([newFeedback, ...feedbackList]);
    setFormName("");
    setFormComment("");
    setFeedbackSuccess(true);
    setTimeout(() => setFeedbackSuccess(false), 4000);
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-red-600 selection:text-white bg-[#030305]">
      
      {/* 1. SMOOTH INITIAL LOADING ANIMATION */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508] transition-all duration-700">
          {/* Decorative glowing gradient backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-md w-full px-6 text-center space-y-6">
            {/* Spinning & pulsing logo wrapper */}
            <div className="relative inline-flex mb-2">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-red-800 rounded-full blur-xl opacity-60 animate-pulse" />
              <div className="relative bg-zinc-950 p-6 rounded-full border-2 border-red-600">
                <Trophy className="w-12 h-12 text-red-500 animate-bounce" />
              </div>
            </div>

            <h2 className="text-4xl font-extrabold tracking-wider text-white uppercase font-sans">
              HIMANSHU JHA
            </h2>
            <div className="text-red-500 text-sm tracking-widest uppercase font-medium">
              ★ Premium VIP Football Analytical System ★
            </div>

            {/* Custom progress container */}
            <div className="space-y-2 mt-8">
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-150 rounded-full shadow-[0_0_12px_#ef4444]" 
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-500 font-mono">
                <span>SYSTEM DIAGNOSTIC</span>
                <span className="text-red-500 font-semibold">{loadingProgress}%</span>
              </div>
            </div>

            {/* Live activity message */}
            <p className="text-zinc-400 text-xs font-mono animate-pulse min-h-[16px]">
              {loadingStatus}
            </p>
          </div>
        </div>
      )}

      {/* BACKGROUND GRAPHICS: Full-screen luxurious soccer stadium */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-40 bg-no-repeat"
        style={{ backgroundImage: "url('/images/stadium.jpg')" }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#030305]/95 via-[#050508]/85 to-[#020204]/98 pointer-events-none" />

      {/* Floating Ambient Red Glowing Spots */}
      <div className="fixed top-24 left-[10%] w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-48 right-[10%] w-[450px] h-[450px] bg-red-800/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* 2. DYNAMIC BROADCAST BANNER (FLASHING SYSTEM NOTICE) */}
      <div className="relative z-40 bg-zinc-950 border-b border-red-950 text-xs py-2 px-4 shadow-lg overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-[10px] text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse flex items-center gap-1">
              <Activity className="w-3 h-3 animate-spin" /> LIVE NOTIFICATION
            </span>
            <p className="text-zinc-300 font-medium tracking-wide transition-all duration-300">
              {liveNotification}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-zinc-500">Official Handle:</span>
            <a 
              href="https://t.me/Mahicr07" 
              target="_blank" 
              rel="noreferrer" 
              className="text-red-500 hover:text-red-400 font-semibold hover:underline flex items-center gap-1 transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> @Mahicr07
            </a>
          </div>
        </div>
      </div>

      {/* 3. PROFESSIONAL STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo area */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-600 to-red-950 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-red-500 bg-clip-text text-transparent">
                  HIMANSHU JHA
                </span>
                <span className="block text-[10px] tracking-widest text-zinc-400 uppercase font-bold">
                  PREMIUM FOOTBALL VIP TIPS
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              <a href="#" className="px-4 py-2 rounded-lg text-sm font-semibold tracking-wide text-zinc-100 hover:text-red-500 transition-all">
                Home
              </a>
              <a href="#vip-plans" className="px-4 py-2 rounded-lg text-sm font-semibold tracking-wide text-zinc-300 hover:text-red-500 transition-all">
                VIP Plans
              </a>
              <a href="#results" className="px-4 py-2 rounded-lg text-sm font-semibold tracking-wide text-zinc-300 hover:text-red-500 transition-all">
                High Odd Results
              </a>
              <a href="#feedback" className="px-4 py-2 rounded-lg text-sm font-semibold tracking-wide text-zinc-300 hover:text-red-500 transition-all">
                Feedback
              </a>
              <a href="#about" className="px-4 py-2 rounded-lg text-sm font-semibold tracking-wide text-zinc-300 hover:text-red-500 transition-all">
                About Himanshu
              </a>
              <a href="#contact" className="px-4 py-2 rounded-lg text-sm font-semibold tracking-wide text-zinc-300 hover:text-red-500 transition-all">
                Contact Owner
              </a>
              <a href="#live-scores" className="px-4 py-2 rounded-lg text-sm font-semibold tracking-wide text-zinc-400 hover:text-red-500 transition-all flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3.5">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                Live Matches <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-bold uppercase">Soon</span>
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="https://t.me/Mahicr07" 
                target="_blank" 
                rel="noreferrer"
                className="glow-btn-red bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg flex items-center gap-2 border border-red-500/30"
              >
                <Send className="w-3.5 h-3.5" /> Telegram Channel
              </a>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <span className="block text-2xl font-light">✕</span>
                ) : (
                  <div className="space-y-1.5">
                    <span className="block w-6 h-0.5 bg-white"></span>
                    <span className="block w-6 h-0.5 bg-red-500"></span>
                    <span className="block w-6 h-0.5 bg-white"></span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-zinc-950 border-t border-zinc-800 px-4 pt-4 pb-6 space-y-2 animate-fadeIn">
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-zinc-100 hover:bg-red-950/40 hover:text-red-500 font-medium"
            >
              Home
            </a>
            <a 
              href="#vip-plans" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-zinc-300 hover:bg-red-950/40 hover:text-red-500 font-medium"
            >
              VIP Plans
            </a>
            <a 
              href="#results" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-zinc-300 hover:bg-red-950/40 hover:text-red-500 font-medium"
            >
              High Odd Results
            </a>
            <a 
              href="#feedback" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-zinc-300 hover:bg-red-950/40 hover:text-red-500 font-medium"
            >
              Feedback
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-zinc-300 hover:bg-red-950/40 hover:text-red-500 font-medium"
            >
              About Himanshu
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-zinc-300 hover:bg-red-950/40 hover:text-red-500 font-medium"
            >
              Contact Owner
            </a>
            <a 
              href="#live-scores" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-red-950/40 hover:text-red-500 font-medium flex items-center gap-2"
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              Live Scores <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 rounded font-bold uppercase">Soon</span>
            </a>
            <div className="pt-4 px-4">
              <a 
                href="https://t.me/Mahicr07" 
                target="_blank" 
                rel="noreferrer"
                className="w-full text-center glow-btn-red bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Join Telegram (@Mahicr07)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        {/* 4. HERO SECTION */}
        <section className="relative py-12 md:py-20 text-center space-y-8">
          
          {/* Glassmorphism Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-red-500/30 text-xs text-red-500 uppercase tracking-widest font-extrabold shadow-lg animate-pulse-glow">
            <Sparkles className="w-3.5 h-3.5" /> TOP-TIER INDIAN FOOTBALL ANALYST
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Title with Glowing Effect */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none uppercase">
              <span className="block text-white">HIMANSHU JHA</span>
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent text-glow-red filter drop-shadow">
                PREMIUM VIP TIPS
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-300 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
              Your ultimate football prediction portal. Get highly-researched, high-odds double and triple combos curated by India's premier football insider.
            </p>
          </div>

          {/* Glowing Red Join Telegram Button linked to @Mahicr07 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="https://t.me/Mahicr07"
              target="_blank"
              rel="noreferrer"
              className="group relative w-full sm:w-auto glow-btn-red bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-500 hover:to-red-500 text-white font-extrabold uppercase tracking-widest text-sm py-4 px-10 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 border-2 border-red-400/20 shadow-[0_0_30px_rgba(239,68,68,0.5)]"
            >
              <div className="absolute -inset-1 rounded-xl bg-red-500 opacity-20 group-hover:opacity-40 blur-md transition-all duration-300" />
              <Send className="w-5 h-5 animate-pulse" />
              <span>JOIN TELEGRAM (@Mahicr07)</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a 
              href="#vip-plans" 
              className="w-full sm:w-auto glass-panel hover:bg-zinc-900 text-white font-bold text-sm uppercase tracking-wider py-4.5 px-8 rounded-xl flex items-center justify-center gap-2 border border-zinc-800 transition-colors"
            >
              <Trophy className="w-4 h-4 text-amber-500" /> View VIP Plans
            </a>
          </div>

          {/* Quick Trust Badges Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-12 max-w-5xl mx-auto">
            {[
              { label: "VERIFIED WIN RATE", value: "95%+", icon: ShieldCheck, color: "text-emerald-500" },
              { label: "DAILY ODDS HIGH RANGE", value: "5.00 - 45.00+", icon: TrendingUp, color: "text-red-500" },
              { label: "CLIENT BASE SECURED", value: "25,000+", icon: Users, color: "text-blue-500" },
              { label: "DIRECT SUPPORT TELEGRAM", value: "@Mahicr07", icon: Send, color: "text-red-500" }
            ].map((badge, idx) => (
              <div key={idx} className="glass-panel p-4.5 rounded-xl border border-zinc-800 text-center flex flex-col items-center justify-center space-y-1">
                <badge.icon className={`w-6 h-6 ${badge.color} mb-1`} />
                <span className="text-xs text-zinc-400 font-bold tracking-widest uppercase">{badge.label}</span>
                <span className="text-xl font-extrabold text-white tracking-tight">{badge.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. DYNAMIC VERIFIED TELEGRAM LINK CARD */}
        <div className="relative glass-card overflow-hidden p-6 md:p-8 rounded-2xl border border-red-500/20 max-w-5xl mx-auto bg-gradient-to-r from-red-950/20 via-zinc-900/90 to-zinc-950">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Live Telegram Updates
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                Want Free Football Predictions Everyday?
              </h3>
              <p className="text-zinc-300 text-sm md:text-base max-w-xl font-light">
                Every single day, Himanshu Jha releases at least 1 free premium ticket with odds of 2.00+ on the official public channel. Don't risk money elsewhere. Join 25k+ smart players.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-center flex-1 sm:flex-initial">
                <span className="block text-[10px] text-zinc-500 font-bold uppercase">Official Telegram Username</span>
                <span className="text-lg font-bold text-red-500 tracking-wider">@Mahicr07</span>
              </div>
              
              <button
                onClick={() => handleCopy("@Mahicr07")}
                className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white p-3.5 rounded-xl border border-zinc-700 transition-colors flex items-center justify-center gap-2"
                title="Copy Telegram ID"
              >
                {copiedText === "@Mahicr07" ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-zinc-400" />
                    <span className="text-sm font-bold">Copy ID</span>
                  </>
                )}
              </button>

              <a
                href="https://t.me/Mahicr07"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" /> Open Telegram
              </a>
            </div>
          </div>
        </div>

        {/* 6. BEAUTIFUL ANIMATED CARDS FOR VIP PLANS */}
        <section id="vip-plans" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-3">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-glow-red">
              PREMIUM VIP PLANS
            </h2>
            <div className="h-1 w-24 bg-red-600 mx-auto rounded-full" />
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
              Choose your ideal commitment level. All packages guarantee top quality selection, detailed research, and complete transparency. Click a plan to simulate instant checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIP_PLANS.map((plan) => {
              const isPopular = plan.id === "gold";
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl glass-card border ${
                    isPopular ? "border-red-500/70 shadow-[0_0_30px_rgba(239,68,68,0.25)] bg-[#0c0506]" : "border-zinc-800"
                  } overflow-hidden group`}
                >
                  {/* Popular Accent Ribbon */}
                  {plan.badge && (
                    <div className="absolute top-4 right-4">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${
                        isPopular ? "bg-red-600 text-white animate-pulse" : "bg-zinc-800 text-zinc-300"
                      }`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Header Details */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
                        {plan.name}
                      </h3>
                      <p className="text-zinc-400 text-xs font-mono uppercase mt-1 tracking-wider">
                        {plan.duration}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                          ₹{plan.price}
                        </span>
                        <span className="text-zinc-500 line-through text-sm">
                          ₹{plan.originalPrice}
                        </span>
                      </div>
                      <div className="text-xs text-red-500 font-extrabold uppercase mt-1.5 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-red-500" /> TAX INCLUDED • INSTANT Telegram JOIN
                      </div>
                    </div>

                    {/* Important stats */}
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/80">
                        <span className="block text-[9px] text-zinc-500 font-bold uppercase">PROBABLE ACCURACY</span>
                        <span className="text-sm font-black text-white">{plan.accuracy}</span>
                      </div>
                      <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/80">
                        <span className="block text-[9px] text-zinc-500 font-bold uppercase">DAILY ODDS MARKET</span>
                        <span className="text-sm font-black text-red-500">{plan.oddsRange}</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3.5 pt-2">
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">What you receive:</p>
                      <ul className="space-y-2.5 text-xs sm:text-sm">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-zinc-300">
                            <span className="mt-0.5 p-0.5 rounded bg-red-600/20 text-red-500">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Checkout simulator button trigger */}
                  <div className="mt-8 pt-4 border-t border-zinc-900">
                    <button
                      onClick={() => setSelectedPlanForCheckout(plan)}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold uppercase text-xs tracking-wider transition-all duration-300 ${
                        isPopular
                          ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]"
                          : "bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700"
                      }`}
                    >
                      Unlock VIP Instantly
                    </button>
                    <p className="text-center text-[10px] text-zinc-500 mt-2 font-mono">
                      Safe & Automated Verification via UPI or Crypto
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE PAYMENTS CHECKOUT SIMULATOR MODAL */}
        {selectedPlanForCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-lg glass-panel-light rounded-3xl border-2 border-red-500 p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[90vh]">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlanForCheckout(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-900/80 rounded-full"
              >
                ✕
              </button>

              <div className="text-center space-y-1">
                <span className="bg-red-500/10 text-red-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                  VIP SECURE CHECKOUT
                </span>
                <h3 className="text-3xl font-black text-white tracking-wide">
                  {selectedPlanForCheckout.name}
                </h3>
                <p className="text-sm text-zinc-400">
                  Follow instructions to unlock premium analytical tickets immediately.
                </p>
              </div>

              {/* Dynamic QR Code mockup using secure generic API or styling */}
              <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center space-y-3 max-w-[240px] mx-auto shadow-xl">
                {/* Simulated dynamic UPI QR code */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=himanshujha@paytm%26pn=HimanshuJha%26am=${selectedPlanForCheckout.price}%26tn=VIP_Football_Tips`}
                  alt="Payment QR Code"
                  className="w-40 h-40 object-contain"
                />
                <span className="text-[10px] text-zinc-950 font-mono font-bold tracking-tight text-center">
                  SCAN WITH ANY UPI APP (PhonePe, GPay, Paytm)
                </span>
                <div className="text-center bg-red-100 text-red-700 px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase">
                  AMOUNT: ₹{selectedPlanForCheckout.price}
                </div>
              </div>

              {/* Step By Step Instructions */}
              <div className="space-y-3.5 bg-zinc-950 p-4.5 rounded-2xl border border-zinc-800">
                <h4 className="text-xs font-extrabold text-zinc-300 uppercase tracking-widest">
                  HOW TO GET ACCESS INSTANTLY:
                </h4>
                <div className="space-y-2.5 text-xs text-zinc-400">
                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center font-bold font-mono">1</span>
                    <p>Scan the QR code above or pay directly to the UPI ID below.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center font-bold font-mono">2</span>
                    <p>Take a screenshot of your successful transaction receipt.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center font-bold font-mono">3</span>
                    <p>Click <strong className="text-red-500">"Submit Receipt to Owner"</strong> below to send screenshot to Himanshu Jha (<strong className="text-white">@Mahicr07</strong>).</p>
                  </div>
                </div>
              </div>

              {/* Copy UPI Address Details */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-800">
                <div className="text-left flex-1">
                  <span className="block text-[9px] text-zinc-500 font-bold uppercase">Manual UPI Address</span>
                  <span className="text-xs font-mono font-bold text-white tracking-wider">himanshujha@paytm</span>
                </div>
                <button
                  onClick={() => handleCopy("himanshujha@paytm")}
                  className="w-full sm:w-auto px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-bold text-zinc-200 transition-colors flex items-center justify-center gap-1.5 border border-zinc-700"
                >
                  {copiedText === "himanshujha@paytm" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy UPI</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons inside checkout */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://t.me/Mahicr07?text=Hello%20Himanshu,%20I%20want%20to%20join%20the%20${encodeURIComponent(selectedPlanForCheckout.name)}%20for%20Rs%20${selectedPlanForCheckout.price}.%20Please%20verify%20my%20payment.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg text-center"
                >
                  <Send className="w-4 h-4" /> Submit Receipt to Owner
                </a>
                
                <button
                  onClick={() => setSelectedPlanForCheckout(null)}
                  className="px-6 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>

              <p className="text-center text-[10px] text-zinc-500 font-mono">
                Have trouble? WhatsApp / Telegram support handle: <span className="text-red-500 font-bold">@Mahicr07</span> is available 24/7.
              </p>
            </div>
          </div>
        )}

        {/* 7. HIGH ODD RESULTS SECTION WITH INTERACTIVE PROFIT CALCULATOR */}
        <section id="results" className="scroll-mt-24 space-y-12">
          
          <div className="relative glass-card p-6 sm:p-10 rounded-3xl border border-red-500/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Result Title & Profit Calculator */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest inline-flex items-center gap-1.5 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% VERIFIED HISTORICAL ODDS
                  </span>
                  <h2 className="text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                    HIGH ODD RESULTS HISTORY
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Transparency is our pride. Unlike other channels that delete failed tips, Himanshu Jha publishes every result. Take a look at our recent win slips.
                  </p>
                </div>

                {/* Profit Calculator Card */}
                <div className="bg-zinc-950/90 p-5 sm:p-6 rounded-2xl border border-zinc-800/80 space-y-5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-red-500" /> PROFIT CALCULATOR
                    </h3>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase font-bold">SIMULATE YOUR WINNINGS</span>
                  </div>

                  <p className="text-xs text-zinc-400">
                    Adjust the hypothetical investment stake below to calculate your total returns based on our past winning odds!
                  </p>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">Your Target Stake (₹)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-zinc-400 text-sm">₹</span>
                      <input
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 pl-8 pr-4 text-white text-lg font-bold focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="Enter stake amount, e.g. 1000"
                      />
                    </div>
                    {/* Quick Select buttons */}
                    <div className="flex gap-2">
                      {[500, 1000, 2000, 5000].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setStakeAmount(val)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                            stakeAmount === val ? "bg-red-600 text-white" : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          ₹{val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2.5 pt-2">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Total Accumulator Odds:</span>
                      <span className="text-zinc-200 font-bold font-mono">14.85x Today</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400 font-medium">Estimated Return on Today's Won Combo:</span>
                      <span className="text-lg font-black text-emerald-400 font-mono">
                        ₹{(stakeAmount * 14.85).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400 font-medium">Net Net Profit:</span>
                      <span className="text-xl font-black text-emerald-500 text-glow-red font-mono">
                        +₹{(stakeAmount * 14.85 - stakeAmount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  {/* Trust warning */}
                  <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-900/40 text-[10px] text-zinc-400 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Calculations are based on verified odds from today's ticket. Historical profits are no guarantee for future yields, but our historical win rate sits firmly above 95%.</span>
                  </div>
                </div>

              </div>

              {/* Right Column: High Odd Results Slips */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-wider text-white uppercase">
                    RECENT VERIFIED BET TICKETS
                  </h3>
                  <span className="text-xs text-zinc-500">Updated today</span>
                </div>

                <div className="space-y-5">
                  {PAST_RESULTS.map((res) => {
                    const isWon = res.status === "WON";
                    return (
                      <div
                        key={res.id}
                        className="bg-zinc-950/90 rounded-2xl border border-zinc-800/80 p-5 space-y-4 transition-all hover:border-zinc-700"
                      >
                        {/* Ticket Meta Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              isWon 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                : "bg-zinc-800 text-zinc-300 border border-zinc-700"
                            }`}>
                              {res.category}
                            </span>
                            <span className="text-xs text-zinc-400 font-medium">{res.date}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-zinc-500">Total Accumulator:</span>
                            <span className="text-base font-extrabold text-red-500 font-mono">
                              {res.totalOdds.toFixed(2)} ODDS
                            </span>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                              isWon ? "bg-emerald-600 text-white" : "bg-zinc-700 text-zinc-300"
                            }`}>
                              {res.status}
                            </span>
                          </div>
                        </div>

                        {/* Matches inside Ticket */}
                        <div className="space-y-3">
                          {res.matches.map((match, i) => (
                            <div
                              key={i}
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-zinc-900/40 text-xs hover:bg-zinc-900/80 transition-colors"
                            >
                              <div className="flex items-start gap-2">
                                <span className="bg-zinc-800 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono text-zinc-400 shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <div>
                                  <p className="font-bold text-white text-sm sm:text-xs">{match.teams}</p>
                                  <p className="text-zinc-400">Prediction: <strong className="text-amber-500 font-semibold">{match.prediction}</strong></p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-6 text-right">
                                <div>
                                  <span className="block text-[10px] text-zinc-500 font-bold uppercase">SCORE</span>
                                  <span className="font-bold text-white font-mono">{match.score}</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] text-zinc-500 font-bold uppercase">ODDS</span>
                                  <span className="font-bold text-red-500 font-mono">{match.odds.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Hypothetical win stats */}
                        <div className="flex justify-between items-center text-xs text-zinc-500 pt-1">
                          <span className="flex items-center gap-1">
                            <Info className="w-3.5 h-3.5 text-zinc-500" />
                            Bookmaker verified slip available on Telegram ID
                          </span>
                          <span className="font-mono text-zinc-400">
                            ID Ref: #HJ-{res.id.toUpperCase()}
                          </span>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          </div>

        </section>

        {/* 8. DYNAMIC FEEDBACK SECTION WITH REVIEW SUBMISSION FORM */}
        <section id="feedback" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-glow-red">
              CLIENT TESTIMONIALS & FEEDBACK
            </h2>
            <div className="h-1 w-24 bg-red-600 mx-auto rounded-full" />
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
              Verified screenshots shared by VIP players on WhatsApp & Telegram. Submitting regular reviews builds our strong verified sports analytic profile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Submit Your Feedback Form */}
            <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/10 space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-white tracking-wide uppercase">
                  SUBMIT REVIEW
                </h3>
                <p className="text-xs text-zinc-400">
                  Are you an active VIP subscriber? Submit your verified screenshot and feedback below.
                </p>
              </div>

              {feedbackSuccess && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500 text-emerald-400 text-xs font-medium animate-pulse">
                  ✓ Thank you! Your feedback has been verified and posted below dynamically.
                </div>
              )}

              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Saurabh Sharma"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-xs font-medium text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider">Plan Subscribed</label>
                  <select
                    value={formPlan}
                    onChange={(e) => setFormPlan(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="₹500 - 3-Day Starter VIP">₹500 - 3-Day Starter VIP</option>
                    <option value="₹1000 - 7-Day Combo Elite">₹1000 - 7-Day Combo Elite</option>
                    <option value="₹2500 - 30-Day Legend VIP">₹2500 - 30-Day Legend VIP</option>
                    <option value="Free Public Telegram Channel">Free Public Telegram Channel</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider">Rating Score</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= formRating ? "text-amber-400 fill-amber-400" : "text-zinc-600"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider">Feedback Comment</label>
                  <textarea
                    required
                    rows={4}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder="How much profit did you make? Talk about Himanshu's analysis..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-xs font-medium text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-all"
                >
                  Submit verified review
                </button>
              </form>
            </div>

            {/* Live Feedback Feed */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-zinc-300 uppercase">RECENT CLIENT LOGS ({feedbackList.length})</span>
                <span className="text-xs text-green-500 font-mono flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  Realtime Feed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feedbackList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-950/80 rounded-2xl border border-zinc-800 p-5 space-y-3 flex flex-col justify-between hover:border-red-950 transition-colors"
                  >
                    <div className="space-y-2">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < item.rating ? "text-amber-400 fill-amber-400" : "text-zinc-700"}`}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-zinc-300 text-xs italic leading-relaxed">
                        "{item.comment}"
                      </p>
                    </div>

                    {/* Review Author Info */}
                    <div className="flex items-center gap-3 pt-3 border-t border-zinc-900 mt-2">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-red-500/20"
                        onError={(e) => {
                          // Fallback avatar
                          e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                          {item.verified && (
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 rounded-full font-bold uppercase tracking-wider border border-emerald-500/10">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-500 truncate">{item.plan}</p>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono shrink-0">{item.date}</span>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>

        {/* 9. LIVE MATCHES FLASH-SCORE STYLE INTERACTIVE PREVIEW (COMING SOON) */}
        <section id="live-scores" className="scroll-mt-24 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/10 space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-bold uppercase tracking-widest">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  Interactive SofaScore / Flashscore Style
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-wide uppercase">
                  LIVE SOCCER MATCHES <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded ml-2">SIMULATION COMING SOON</span>
                </h2>
                <p className="text-zinc-400 text-xs">
                  We are integrating custom realtime APIs to offer dynamic football stats in 2026. Preview the layout & active mock odd directions below!
                </p>
              </div>

              {/* Status indicators */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-mono">Simulated clock ticks live every 9 seconds</span>
                <button 
                  onClick={() => {
                    // Trigger manual random reload to mock socket updates
                    setLiveNotification("🔄 Live Match socket pipeline refreshed manually!");
                  }}
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                  title="Force Refresh Mock Socket"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Match Grid Container */}
            <div className="space-y-3.5">
              {liveMatches.map((match) => (
                <div 
                  key={match.id}
                  className="bg-zinc-950 rounded-2xl border border-zinc-800/80 p-4.5 hover:border-red-950 transition-colors space-y-3"
                >
                  {/* Match header */}
                  <div className="flex items-center justify-between text-xs border-b border-zinc-900 pb-2.5">
                    <span className="font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-red-500" /> {match.league}
                    </span>
                    <span className="bg-amber-500/10 text-amber-500 font-bold px-2 py-0.5 rounded font-mono flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {match.time}
                    </span>
                  </div>

                  {/* Teams and score */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    
                    {/* Teams & Realtime Score */}
                    <div className="md:col-span-5 flex items-center justify-between pr-4 border-r-0 md:border-r border-zinc-900">
                      <div className="space-y-2 w-full">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm sm:text-base text-zinc-100 flex items-center gap-2">
                            <span className="w-1 h-3 bg-red-600 rounded" /> {match.homeTeam}
                            {match.redCards[0] > 0 && (
                              <span className="bg-red-600 text-white text-[8px] font-extrabold px-1 rounded">RED</span>
                            )}
                          </span>
                          <span className="font-mono text-xl font-black text-amber-400">{match.homeScore}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm sm:text-base text-zinc-100 flex items-center gap-2">
                            <span className="w-1 h-3 bg-zinc-600 rounded" /> {match.awayTeam}
                            {match.redCards[1] > 0 && (
                              <span className="bg-red-600 text-white text-[8px] font-extrabold px-1 rounded">RED</span>
                            )}
                          </span>
                          <span className="font-mono text-xl font-black text-amber-400">{match.awayScore}</span>
                        </div>
                      </div>
                    </div>

                    {/* Analytical Prediction Tag */}
                    <div className="md:col-span-4 space-y-1 text-center md:text-left">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">HIMANSHU'S LIVE SELECTION</span>
                      <span className="text-white text-xs sm:text-sm font-black bg-red-950/40 text-red-400 px-3 py-1 rounded border border-red-500/20 inline-block">
                        {match.prediction}
                      </span>
                    </div>

                    {/* Odd & Live Indicator */}
                    <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">LIVE ODDS</span>
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="text-lg font-mono font-black text-white">{match.odds}</span>
                          {match.oddsDirection === "up" ? (
                            <span className="text-emerald-400 text-xs flex items-center" title="Odds Tending Up">
                              <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
                            </span>
                          ) : (
                            <span className="text-red-500 text-xs flex items-center" title="Odds Tending Down">
                              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                            </span>
                          )}
                        </div>
                      </div>

                      <a
                        href="https://t.me/Mahicr07"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] uppercase py-2 px-3 rounded flex items-center gap-1"
                      >
                        Bet Live <Send className="w-3 h-3" />
                      </a>
                    </div>

                  </div>

                  {/* Micro stats drawer */}
                  <div className="pt-2 border-t border-zinc-900 grid grid-cols-3 gap-2 text-center text-[10px] text-zinc-400">
                    <div>
                      <span className="block text-zinc-600 font-bold uppercase">POSSESSION</span>
                      <span className="font-mono font-bold text-zinc-300">{match.possession[0]}% vs {match.possession[1]}%</span>
                    </div>
                    <div>
                      <span className="block text-zinc-600 font-bold uppercase">TOTAL SHOTS</span>
                      <span className="font-mono font-bold text-zinc-300">{match.shots[0]} vs {match.shots[1]}</span>
                    </div>
                    <div>
                      <span className="block text-zinc-600 font-bold uppercase">WIN PROBABILITY</span>
                      <span className="font-mono font-bold text-red-500">
                        {match.probability[0]}% - {match.probability[1]}% - {match.probability[2]}%
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 10. DAILY PREDICTIONS & PLAYER PROPS ACCORDION COMING SOON SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Daily Football Matches Analyst Column */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/10 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs text-red-500 font-extrabold uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5" /> DAILY ANALYTICAL TIP SNEAK PEEK
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-wider">
                DAILY MATCH PREVIEWS <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">SOON</span>
              </h3>
              <p className="text-xs text-zinc-400">
                A daily premium breakdown of match statistics, player motivation, and optimal betting angles written personally by Himanshu Jha.
              </p>
            </div>

            <div className="space-y-4">
              {/* Preview item 1 */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 space-y-3 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-red-500 font-bold uppercase">PREMIER LEAGUE • 21:00 UTC</span>
                  <span className="text-emerald-400 font-bold">Safe Option Selected</span>
                </div>
                <h4 className="font-bold text-white text-sm">Liverpool vs Everton (Merseyside Derby)</h4>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  Liverpool is in incredible goal-scoring form with Salah scoring in 5 consecutive home games. Everton's central defense is missing Tarkowski due to injury. Expect highly offensive setup...
                </p>
                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-zinc-900">
                  <span className="text-zinc-500">Analysis Confidence: <strong className="text-white">94%</strong></span>
                  <span className="text-red-500 font-bold">VIP Target Odd: 1.85</span>
                </div>
              </div>

              {/* Preview item 2 */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 space-y-3 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-red-500 font-bold uppercase">LA LIGA • 23:15 UTC</span>
                  <span className="text-amber-500 font-bold">High Return Combo</span>
                </div>
                <h4 className="font-bold text-white text-sm">Atletico Madrid vs Barcelona</h4>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  Simeone's men always play highly defensive in home derbies. Barcelona's midfield control with Pedri will slow down tempo. Under 2.5 goals is the ultimate historical choice here...
                </p>
                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-zinc-900">
                  <span className="text-zinc-500">Analysis Confidence: <strong className="text-white">91%</strong></span>
                  <span className="text-red-500 font-bold">VIP Target Odd: 2.10</span>
                </div>
              </div>
            </div>

            <a
              href="https://t.me/Mahicr07"
              target="_blank"
              rel="noreferrer"
              className="w-full text-center block bg-zinc-900 hover:bg-zinc-850 text-white font-bold text-xs uppercase py-3 rounded-xl border border-zinc-800 transition-colors"
            >
              Unlock Full Analysis on Telegram VIP
            </a>
          </div>

          {/* Player Prop Stats Column */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/10 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs text-red-500 font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> SPECIAL PLAYER ODDS & METRICS
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-wider">
                PLAYER PROPS HUB <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">SOON</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Betting on individual players to score, assist, get carded, or make saves yields massive value. Explore our special statistical predictions.
              </p>
            </div>

            <div className="space-y-3.5">
              {PLAYER_STATS.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-zinc-950 p-3 sm:p-4 rounded-xl border border-zinc-900 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="bg-red-950 text-red-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {stat.category}
                    </span>
                    <h4 className="font-extrabold text-white text-sm">{stat.player}</h4>
                    <p className="text-[11px] text-zinc-400">{stat.team} • <strong className="text-amber-500">{stat.role}</strong></p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="block text-[9px] text-zinc-500 font-bold">HISTORICAL PROOF</span>
                    <span className="text-xs text-zinc-300 font-medium block">{stat.statValue}</span>
                    <span className="text-sm font-mono font-black text-red-500">Odds {stat.odd.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[10px] text-zinc-500 italic">
              *All player odds are integrated automatically from trusted bookmakers.
            </p>
          </div>

        </section>

        {/* 11. ABOUT HIMANSHU JHA SECTION */}
        <section id="about" className="scroll-mt-24">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-red-500/10 overflow-hidden relative">
            {/* Decorative background glow */}
            <div className="absolute top-1/2 -translate-y-1/2 right-12 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Profile Image/Avatar Box */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  {/* Glowing neon red outline ring */}
                  <div className="absolute -inset-3 bg-gradient-to-tr from-red-600 to-amber-500 rounded-full blur opacity-60 animate-pulse" />
                  
                  {/* Avatar Frame */}
                  <div className="relative bg-zinc-950 p-2 rounded-full border border-red-500">
                    <div className="w-44 h-44 rounded-full overflow-hidden bg-zinc-900 flex items-center justify-center">
                      <span className="text-6xl font-black text-red-500 tracking-tighter">HJ</span>
                    </div>
                  </div>

                  {/* Absolute Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white font-black text-[10px] tracking-widest px-4 py-1 rounded-full uppercase shadow-lg">
                    VERIFIED OWNER
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl font-extrabold text-white tracking-wide uppercase">
                    HIMANSHU JHA
                  </h3>
                  <p className="text-red-500 text-xs font-mono tracking-widest uppercase">
                    Head of VIP Predictions
                  </p>
                </div>

                <div className="flex gap-2">
                  <a 
                    href="https://t.me/Mahicr07" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 bg-zinc-900 hover:bg-red-950 text-white rounded-full transition-colors border border-zinc-800"
                    title="Telegram direct link"
                  >
                    <Send className="w-5 h-5" />
                  </a>
                  <div className="p-2 bg-zinc-900 text-zinc-300 rounded-full border border-zinc-800 text-xs font-bold flex items-center px-4">
                    Active Telegram: @Mahicr07
                  </div>
                </div>
              </div>

              {/* Professional Description */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs text-red-500 font-extrabold tracking-widest uppercase block">
                    MEET THE ANALYST BEHIND THE SLIPS
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                    WHY DO 25,000+ USERS TRUST HIMANSHU JHA?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                  With over 8+ years of dedicated professional experience analyzing UEFA Champions League, English Premier League, Serie A, La Liga, and International Tournaments, Himanshu Jha has established himself as a prominent voice in sports prediction.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-zinc-950/60 p-4.5 rounded-2xl border border-zinc-900">
                    <h4 className="text-white font-bold text-sm uppercase flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" /> STRICT TRANSPARENCY
                    </h4>
                    <p className="text-xs text-zinc-400">
                      No fake screenshot edits, no deleted logs. We document every single slip, whether it wins, gets refunded, or misses, ensuring 100% genuine ROI.
                    </p>
                  </div>

                  <div className="space-y-2 bg-zinc-950/60 p-4.5 rounded-2xl border border-zinc-900">
                    <h4 className="text-white font-bold text-sm uppercase flex items-center gap-2">
                      <Zap className="w-4 h-4 text-red-500" /> SCIENTIFIC BANKROLL ALGORITHM
                    </h4>
                    <p className="text-xs text-zinc-400">
                      We guide subscribers with custom unit sizing (1% to 5% stakes of total capital) to guarantee steady month-on-month compounding growth.
                    </p>
                  </div>

                  <div className="space-y-2 bg-zinc-950/60 p-4.5 rounded-2xl border border-zinc-900">
                    <h4 className="text-white font-bold text-sm uppercase flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500" /> GLOBAL BOOKIE COMPATIBILITY
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Tips are fully compatible with major platforms: Parimatch, 1xBet, Megapari, Bet365, and localized Asian bookies with standard odds.
                    </p>
                  </div>

                  <div className="space-y-2 bg-zinc-950/60 p-4.5 rounded-2xl border border-zinc-900">
                    <h4 className="text-white font-bold text-sm uppercase flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-500" /> LOSS INSURANCE EXTENSIONS
                    </h4>
                    <p className="text-xs text-zinc-400">
                      If a subscription duration doesn't yield net profit, you receive an automatic, hassle-free extension completely free of charge.
                    </p>
                  </div>
                </div>

                <div className="bg-red-950/10 border border-red-900/30 p-4 rounded-xl flex items-center gap-3">
                  <span className="text-2xl">🏆</span>
                  <p className="text-xs text-zinc-300">
                    "My mission is simple: to make sports predictions systematic. Stop gambling randomly based on emotional bias. Let mathematical trends secure your profits." — <strong className="text-white">Himanshu Jha</strong>
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 12. FAQ ACCORDION SECTION */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-glow-red">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Everything you need to know about our VIP membership and prediction style.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = faqOpenIndex === index;
              return (
                <div
                  key={index}
                  className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-white font-bold text-sm sm:text-base hover:bg-zinc-900 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-red-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-zinc-400 border-t border-zinc-900 leading-relaxed bg-zinc-900/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 13. DIRECT TELEGRAM CALL TO ACTION BAR */}
        <section id="contact" className="scroll-mt-24 text-center py-10">
          <div className="relative glass-panel p-8 sm:p-12 rounded-3xl border-2 border-red-600 max-w-4xl mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-black/80 to-red-950/20" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600/20 rounded-full blur-[50px]" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/20 rounded-full blur-[50px]" />

            <div className="relative z-10 space-y-6">
              <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
              
              <div className="space-y-2">
                <h3 className="text-4xl font-extrabold text-white tracking-wide uppercase">
                  READY TO ELEVATE YOUR FOOTBALL PORTFOLIO?
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto font-light">
                  Join our VIP premium service or contact Himanshu Jha directly for personal consultations, high-odd ticket discounts, or manual UPI activations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <a
                  href="https://t.me/Mahicr07"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:flex-1 glow-btn-red bg-gradient-to-r from-red-600 to-red-800 text-white font-extrabold uppercase text-xs tracking-wider py-4 rounded-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Message @Mahicr07
                </a>
                
                <button
                  onClick={() => handleCopy("@Mahicr07")}
                  className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl border border-zinc-800 transition-colors flex items-center justify-center gap-2"
                >
                  {copiedText === "@Mahicr07" ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">Copied Username</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-400" />
                      <span>Copy Telegram ID</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-zinc-500 font-mono">
                No third-party brokers. Avoid scammers claiming to be Himanshu Jha. Always verify the telegram username is exactly <strong className="text-white">@Mahicr07</strong>.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* 14. PREMIUM SPORTS FOOTER */}
      <footer className="relative z-20 bg-zinc-950 border-t border-zinc-800 text-zinc-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Upper Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-900">
            
            {/* Bio info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-red-600 text-white font-bold">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="text-lg font-black tracking-wider text-white uppercase font-sans">
                  HIMANSHU JHA VIP
                </span>
              </div>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                Himanshu Jha is a professional football odds compiler, statistical analyst, and tips provider. We provide premium analysis for high odds soccer accumulators with deep mathematical background.
              </p>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <span>Official Handle:</span>
                <a 
                  href="https://t.me/Mahicr07" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-red-500 font-extrabold hover:underline"
                >
                  @Mahicr07
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-red-500 transition-colors">Home</a></li>
                <li><a href="#vip-plans" className="hover:text-red-500 transition-colors">VIP Plans & Pricing</a></li>
                <li><a href="#results" className="hover:text-red-500 transition-colors">High Odd Past Results</a></li>
                <li><a href="#feedback" className="hover:text-red-500 transition-colors">Subscribers Feedback</a></li>
                <li><a href="#about" className="hover:text-red-500 transition-colors">About Himanshu Jha</a></li>
              </ul>
            </div>

            {/* Security Guarantee */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">RESPONSIBLE GAMING</h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Predictions are formulated based on careful statistical analytics and team history. Sports wagering involves natural financial risks. We advise all our VIP members to play responsibly. Minimum age requirement is 18+.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-red-950 text-red-500 font-bold px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-widest">
                  18+ ONLY
                </span>
                <span className="text-[10px] bg-zinc-900 text-zinc-400 font-bold px-2 py-0.5 rounded border border-zinc-800 uppercase tracking-widest">
                  BE GAMBLE AWARE
                </span>
              </div>
            </div>

          </div>

          {/* Lower section */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-zinc-500">
                © 2026 Himanshu Jha. All rights reserved. Built with luxury sports design style.
              </p>
              <p className="text-[10px] text-zinc-600 font-mono">
                Not affiliated with FIFA, UEFA, or any official football leagues. Similar interface components design reference Sofascore/Flashscore.
              </p>
            </div>

            <div className="flex items-center gap-4 text-zinc-500">
              <span className="text-zinc-600 text-xs">Contact Owner:</span>
              <a 
                href="https://t.me/Mahicr07" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-red-500 transition-all font-semibold flex items-center gap-1 text-xs text-zinc-300"
              >
                <Send className="w-3.5 h-3.5 text-red-500" /> Telegram ID @Mahicr07
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
