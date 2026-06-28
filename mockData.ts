export interface VIPPlan {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  duration: string;
  badge?: string;
  badgeColor?: string;
  oddsRange: string;
  oddsRangeColor?: string;
  accuracy: string;
  features: string[];
  color: string;
  buttonGlow: string;
}

export interface PastResult {
  id: string;
  date: string;
  matches: {
    teams: string;
    prediction: string;
    odds: number;
    score: string;
  }[];
  totalOdds: number;
  status: "WON" | "REFUNDED" | "PENDING";
  category: "VIP Ticket" | "High Odds Combo" | "Daily Safe Ticket";
}

export interface LiveMatch {
  id: string;
  league: string;
  time: string; // e.g. "74'"
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  prediction: string;
  odds: number;
  oddsDirection: "up" | "down" | "stable";
  possession: [number, number]; // [home, away]
  shots: [number, number];
  redCards: [number, number];
  probability: [number, number, number]; // [Home, Draw, Away]
}

export interface PlayerStat {
  id: string;
  player: string;
  team: string;
  role: string;
  statValue: string;
  odd: number;
  category: string;
}

export interface FeedbackItem {
  id: string;
  name: string;
  plan: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatar: string;
}

export const VIP_PLANS: VIPPlan[] = [
  {
    id: "silver",
    name: "3-DAY VIP STARTER",
    price: 500,
    originalPrice: 1500,
    duration: "3 DAYS VIP access",
    badge: "BEST FOR BEGINNERS",
    oddsRange: "2.50 - 5.00+ Daily",
    accuracy: "92% Win Rate",
    features: [
      "Daily 1 Safe Football Combo",
      "Guaranteed odds up to 5.00+",
      "Direct Telegram support from Himanshu",
      "Access to safe rollover strategy",
      "Instant push notifications via Telegram VIP Group"
    ],
    color: "from-zinc-800 to-zinc-950 border-zinc-700",
    buttonGlow: "shadow-zinc-500/10 hover:shadow-zinc-500/30"
  },
  {
    id: "gold",
    name: "7-DAY VIP COMBO ELITE",
    price: 1000,
    originalPrice: 3500,
    duration: "7 DAYS Elite access",
    badge: "MOST POPULAR",
    oddsRange: "5.00 - 12.00+ Daily",
    accuracy: "95% Win Rate",
    features: [
      "Access to premium high-odd combos",
      "Special half-time/full-time VIP tips",
      "Detailed stakes recommendation (1-10 units)",
      "Daily analysis explanation",
      "Direct personal chat & priority support",
      "Loss coverage refund system (Free extension)"
    ],
    color: "from-red-950 via-zinc-950 to-black border-red-900/60",
    badgeColor: "bg-gradient-to-r from-red-600 to-red-800 text-white animate-pulse",
    oddsRangeColor: "text-red-500",
    buttonGlow: "shadow-red-600/20 hover:shadow-red-600/50"
  },
  {
    id: "platinum",
    name: "30-DAY ULTIMATE VIP LEGEND",
    price: 2500,
    originalPrice: 9999,
    duration: "30 DAYS Full VIP access",
    badge: "ULTIMATE VALUE & ROI",
    oddsRange: "15.00 - 45.00+ Weekly",
    accuracy: "98% Professional Rate",
    features: [
      "All VIP Combo & Starter tips included",
      "Ultra-exclusive Fixed Draw tickets",
      "Live betting alerts from Himanshu",
      "Personal bankroll management planning",
      "1-on-1 consultation with Himanshu Jha",
      "Guaranteed net profit or double refund"
    ],
    color: "from-red-900/40 via-zinc-900 to-black border-red-500/40",
    buttonGlow: "shadow-red-500/30 hover:shadow-red-500/60"
  }
];

export const PAST_RESULTS: PastResult[] = [
  {
    id: "r1",
    date: "TODAY (VERIFIED WON)",
    totalOdds: 14.85,
    status: "WON",
    category: "High Odds Combo",
    matches: [
      { teams: "Real Madrid vs Atletico Madrid", prediction: "Over 3.5 Goals & BTTS", odds: 2.75, score: "4 - 2" },
      { teams: "Chelsea vs Liverpool", prediction: "Away Win & Over 2.5", odds: 3.10, score: "1 - 3" },
      { teams: "Inter Milan vs Juventus", prediction: "HT Draw / FT Inter Milan", odds: 1.74, score: "0-0 / 2-1" }
    ]
  },
  {
    id: "r2",
    date: "YESTERDAY (VERIFIED WON)",
    totalOdds: 8.64,
    status: "WON",
    category: "VIP Ticket",
    matches: [
      { teams: "Manchester City vs Arsenal", prediction: "Erling Haaland to Score First", odds: 3.60, score: "Haaland 14'" },
      { teams: "PSG vs Marseille", prediction: "Marseille +1.5 Asian Handicap", odds: 2.40, score: "2 - 1" }
    ]
  },
  {
    id: "r3",
    date: "2 DAYS AGO (VERIFIED WON)",
    totalOdds: 25.40,
    status: "WON",
    category: "High Odds Combo",
    matches: [
      { teams: "Bayern Munich vs Leverkusen", prediction: "Leverkusen Draw No Bet", odds: 4.20, score: "1 - 2" },
      { teams: "Barcelona vs Sevilla", prediction: "Lamine Yamal Over 1.5 Shots on Target", odds: 2.50, score: "3 Shots" },
      { teams: "Napoli vs AC Milan", prediction: "Draw at Full Time", odds: 2.42, score: "2 - 2" }
    ]
  },
  {
    id: "r4",
    date: "3 DAYS AGO (REFUNDED)",
    totalOdds: 6.50,
    status: "REFUNDED",
    category: "Daily Safe Ticket",
    matches: [
      { teams: "Aston Villa vs Newcastle", prediction: "Draw No Bet (Aston Villa)", odds: 1.80, score: "2 - 2 (REFUND)" },
      { teams: "Dortmund vs Stuttgart", prediction: "Both Teams To Score", odds: 3.61, score: "3 - 1 (WON)" }
    ]
  }
];

export const LIVE_MATCHES: LiveMatch[] = [
  {
    id: "l1",
    league: "UEFA Champions League - Group Stage",
    time: "79'",
    homeTeam: "Arsenal",
    awayTeam: "Barcelona",
    homeScore: 2,
    awayScore: 1,
    prediction: "Arsenal to Win or Draw",
    odds: 1.18,
    oddsDirection: "stable",
    possession: [54, 46],
    shots: [14, 9],
    redCards: [0, 0],
    probability: [68, 22, 10]
  },
  {
    id: "l2",
    league: "English Premier League",
    time: "48'",
    homeTeam: "Manchester United",
    awayTeam: "Tottenham Hotspur",
    homeScore: 1,
    awayScore: 2,
    prediction: "Over 3.5 Goals Total",
    odds: 1.55,
    oddsDirection: "up",
    possession: [42, 58],
    shots: [8, 12],
    redCards: [1, 0],
    probability: [15, 25, 60]
  },
  {
    id: "l3",
    league: "La Liga Santander",
    time: "15'",
    homeTeam: "Real Sociedad",
    awayTeam: "Athletic Bilbao",
    homeScore: 0,
    awayScore: 0,
    prediction: "Under 1.5 Goals Half Time",
    odds: 1.42,
    oddsDirection: "down",
    possession: [49, 51],
    shots: [1, 2],
    redCards: [0, 0],
    probability: [35, 40, 25]
  }
];

export const PLAYER_STATS: PlayerStat[] = [
  {
    id: "ps1",
    player: "Erling Haaland",
    team: "Manchester City",
    role: "Anytime Goalscorer",
    statValue: "15 Goals in 12 Matches",
    odd: 1.65,
    category: "Top Scorer Prop"
  },
  {
    id: "ps2",
    player: "Robert Lewandowski",
    team: "Barcelona",
    role: "First Goalscorer of Match",
    statValue: "10 Goals, 4 Match Openers",
    odd: 3.80,
    category: "High Odd Prop"
  },
  {
    id: "ps3",
    player: "Kevin De Bruyne",
    team: "Manchester City",
    role: "Over 1.5 Assists Combo",
    statValue: "7 Assists in 8 Starts",
    odd: 4.50,
    category: "Elite Playmaker Prop"
  },
  {
    id: "ps4",
    player: "Emiliano Martínez",
    team: "Aston Villa",
    role: "To Save a Penalty",
    statValue: "42% Career Penalty Save Ratio",
    odd: 8.50,
    category: "Mega Special Prop"
  }
];

export const INITIAL_FEEDBACK: FeedbackItem[] = [
  {
    id: "f1",
    name: "Vikram Rathore",
    plan: "₹2500 - 30-Day Legend VIP",
    rating: 5,
    comment: "Absolutely mind-blowing tips by Himanshu Jha! Recovered all my past losses on the very first day with the high odd HT/FT combo. The 98% Win Rate promise is real. Highly recommended!",
    date: "Today",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "f2",
    name: "Rahul Deshmukh",
    plan: "₹1000 - 7-Day Combo Elite",
    rating: 5,
    comment: "Honest and verified! What I love is Himanshu is super transparent. Even if there is a push/refund, he extends the VIP for free. The 12.00 odd combo clicked yesterday!",
    date: "Yesterday",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "f3",
    name: "Amit Patel",
    plan: "₹500 - 3-Day Starter",
    rating: 4,
    comment: "Very budget friendly starter ticket. Secured 3.50 odd clean win on my first day. Ready to upgrade to the ₹2500 plan directly now. Chat support response is ultra fast on @Mahicr07.",
    date: "3 days ago",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "f4",
    name: "Saurav Sen",
    plan: "₹2500 - 30-Day Legend VIP",
    rating: 5,
    comment: "This is premium stuff. Similar UI style to Flashscore but the quality of football prediction insights is far superior. Himanshu Jha is a genius analyst.",
    date: "5 days ago",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
  }
];

export const FAQS = [
  {
    question: "How do I receive the VIP Football Tips?",
    answer: "Once you purchase any plan (₹500, ₹1000, or ₹2500), you will get an instant invite link to the private premium Telegram VIP Channel. Tips are posted daily at least 4-5 hours before kickoff with exact stake instructions."
  },
  {
    question: "Is there any refund or insurance policy?",
    answer: "Yes! If our high-odds combo ticket doesn't secure a net profit over your plan duration, your VIP membership is extended completely FREE of charge for the same period, or you can request direct cash back."
  },
  {
    question: "Can I pay using UPI, Paytm, PhonePe, or GPay?",
    answer: "Yes, we accept all Indian payment methods including GPay, PhonePe, Paytm, UPI, and Credit/Debit cards. For international users, we accept Binance USDT or Bitcoin. Contact @Mahicr07 on Telegram for manual activation."
  },
  {
    question: "How are the odds calculated?",
    answer: "The odds are collected from trusted global platforms like Bet365, 1xBet, and PariMatch. We focus on high probability markets: HT/FT, Asian Handicaps, Team Over/Under, and Goal Player Props."
  }
];
