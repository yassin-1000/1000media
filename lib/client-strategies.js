const CLIENTS = [
  {
    id: "elie-wiesel-foundation",
    name: "Ellie Wiesel Foundation",
    profile:
      "Mission-led organization focused on memory, ethics, human dignity, education, resilience, and moral courage.",
    humanStoryTargets: [
      "Holocaust survivors, descendants, educators, archivists, and students carrying memory forward",
      "People showing moral courage, resisting hate, protecting vulnerable communities, or choosing forgiveness",
      "Families preserving intergenerational memory through rituals, objects, letters, and testimony",
      "Teachers, museum workers, authors, clergy, and youth leaders making difficult history accessible",
      "Ordinary people who choose dignity, empathy, or responsibility in moments of public pressure"
    ],
    timelyNewsTargets: [
      "Holocaust education updates, antisemitism coverage, hate-crime reporting, and remembrance-day news",
      "Global human-rights stories where moral courage, witness, memory, or dignity are central",
      "Education policy debates around history, civics, ethics, book bans, and how young people learn the past",
      "Interfaith solidarity, religious observances, memorial anniversaries, museum openings, and public commemorations",
      "Major world conflicts or humanitarian crises where the foundation can add a careful values-first reflection"
    ],
    angleGuidance: [
      "Prioritize courage, remembrance, education, intergenerational memory, and human dignity.",
      "Be especially careful with sensitive, political, or religious material.",
      "Reject celebrity gossip, shallow trend-jacking, and irrelevant finance or entertainment stories."
    ],
    searchSeeds: [
      "human courage story last 24 hours",
      "education resilience story last 24 hours",
      "survivor memory history education last 24 hours",
      "intergenerational remembrance story last 24 hours"
    ]
  },
  {
    id: "zoomex",
    name: "Zoomex",
    profile:
      "Crypto trading brand that should react to money, risk, trader psychology, sudden wins or losses, security, and fast-changing market behavior.",
    humanStoryTargets: [
      "Traders who won, lost, recovered, or learned a painful lesson under pressure",
      "Lottery winners, sudden-wealth recipients, scam victims, and people forced to manage life-changing money",
      "Crypto builders, analysts, cybersecurity researchers, and everyday users affected by market volatility",
      "People with extreme discipline around risk, patience, savings, emotional control, or financial comeback stories",
      "Creators explaining money psychology, trading mistakes, market fear, greed, and decision-making"
    ],
    timelyNewsTargets: [
      "Bitcoin, Ethereum, altcoin, ETF, exchange, regulation, stablecoin, and macro-market headlines",
      "Major hacks, scams, exchange outages, liquidation cascades, and cybersecurity warnings",
      "Central bank decisions, inflation data, jobs reports, stock-market shocks, and risk-on or risk-off moments",
      "Competitor updates from crypto exchanges, trading apps, brokerages, fintechs, and market-data platforms",
      "Cultural money moments such as lottery wins, gambling stories, sports betting, meme coins, and sudden wealth"
    ],
    angleGuidance: [
      "Prioritize sudden wealth, trading lessons, financial psychology, crypto security, and risk.",
      "Human stories can include lottery winners, people dealing with sudden money, or emotional stories around speculation.",
      "Avoid stories with weak financial relevance."
    ],
    searchSeeds: [
      "lottery winner story last 24 hours",
      "crypto trader story last 24 hours",
      "sudden wealth story last 24 hours",
      "market psychology story last 24 hours"
    ]
  },
  {
    id: "solana",
    name: "Solana",
    profile:
      "Blockchain ecosystem brand centered on builders, founders, hackathons, creator tools, developers, traders, and people shipping products in public.",
    humanStoryTargets: [
      "Developers, founders, hackathon winners, open-source maintainers, creators, and builders launching onchain products",
      "Traders, collectors, NFT artists, DePIN operators, validators, gamers, and community members using Solana in real life",
      "Young builders, student founders, solo hackers, and small teams shipping ambitious products quickly",
      "People rebuilding after failed startups, rug pulls, market crashes, outages, or public skepticism",
      "Creators turning crypto tools into culture, commerce, art, payments, games, or community ownership"
    ],
    timelyNewsTargets: [
      "Solana ecosystem launches, token trends, DeFi, DePIN, payments, mobile, gaming, NFT, validator, and infrastructure news",
      "Competitor moves from Ethereum, Base, Bitcoin L2s, Polygon, Avalanche, Sui, Aptos, and other chains",
      "Crypto regulation, ETFs, stablecoins, exchange news, major hacks, market rallies, and developer platform shifts",
      "AI, gaming, creator economy, fintech, sports, music, and internet-culture moments where onchain ownership is relevant",
      "Hackathons, conferences, protocol upgrades, app-store policy changes, and global moments builders can react to"
    ],
    angleGuidance: [
      "Prioritize builders, founders, launch stories, developer wins, hackathons, traders, and creator technology stories.",
      "Prefer people-centered technology stories over generic finance news.",
      "Avoid low-signal speculation unless there is a strong builder, trader, or community angle."
    ],
    searchSeeds: [
      "startup founder story last 24 hours",
      "developer launch story last 24 hours",
      "hackathon winner story last 24 hours",
      "young builder story last 24 hours"
    ]
  },
  {
    id: "leverageedu",
    name: "LeverageEDU",
    profile:
      "India-based edtech startup focused on study abroad, student transformation, admissions journeys, scholarships, and career mobility.",
    humanStoryTargets: [
      "Indian students, first-generation learners, scholarship winners, study-abroad admits, and families making education sacrifices",
      "Students who overcame visa, money, language, exam, rejection, or confidence barriers to study globally",
      "Counselors, mentors, alumni, university staff, recruiters, and parents helping students change their futures",
      "Young professionals using global education to transform careers, income, family status, or social mobility",
      "Creators, teachers, or founders making higher education, admissions, and global careers easier to understand"
    ],
    timelyNewsTargets: [
      "Student visa policy changes, university admissions updates, scholarship announcements, rankings, and international education news",
      "Competitor and adjacent updates from IDP, ApplyBoard, LeapScholar, CollegeDekho, upGrad, Emeritus, Coursera, and study-abroad platforms",
      "India education policy, exams, employment data, migration trends, housing, cost-of-living, and currency changes affecting students",
      "Global cultural moments, sports, elections, AI, jobs, and economy headlines that can become student ambition or career-mobility angles",
      "Destination-country updates from the UK, US, Canada, Australia, Europe, UAE, and Singapore that students need to understand quickly"
    ],
    angleGuidance: [
      "Prioritize student success, scholarships, admissions wins, career transformation, global mobility, and first-generation achievement stories.",
      "Prefer India-relevant and student-relevant stories when possible.",
      "Include competitor moves, university policy changes, visa shifts, scholarship launches, and big global events that the brand can intelligently piggyback on.",
      "Avoid generic edtech funding stories unless there is a strong human outcome angle."
    ],
    searchSeeds: [
      "student success story last 24 hours India",
      "scholarship winner story last 24 hours",
      "study abroad success story last 24 hours",
      "first generation student achievement last 24 hours",
      "study abroad competitor update last 24 hours",
      "student visa policy change last 24 hours",
      "global cultural event brand angle last 24 hours"
    ]
  },
  {
    id: "siyata-ptt",
    name: "Siyata PTT",
    profile:
      "Push-to-talk communications company serving mission-critical teams that need fast, reliable coordination in the field.",
    humanStoryTargets: [
      "First responders, firefighters, EMTs, police, dispatchers, disaster-relief workers, and rescue volunteers",
      "Security teams, utility crews, construction crews, logistics operators, and transportation teams coordinating in stressful environments",
      "People whose fast communication helped save a life, prevent harm, restore service, or keep a team safe",
      "Command-center leaders, operations managers, and field workers who solve high-pressure problems in real time",
      "Communities affected by disasters where communication failures or quick coordination changed the outcome"
    ],
    timelyNewsTargets: [
      "Natural disasters, wildfires, storms, earthquakes, emergency response, public-safety technology, and rescue operations",
      "Telecom outages, network resilience, 5G/private networks, satellite connectivity, and mission-critical communications news",
      "Government procurement, public-safety grants, emergency-management policy, and infrastructure-security updates",
      "Competitor or adjacent moves from Motorola Solutions, Verizon Frontline, FirstNet, Hytera, Sonim, Zello, and rugged-device providers",
      "Major events requiring crowd control, security, logistics, transport, construction, or fast team coordination"
    ],
    angleGuidance: [
      "Prioritize first responders, field teams, emergency readiness, communication under pressure, and operational reliability.",
      "Make the human stakes clear: seconds, safety, coordination, and trust.",
      "Avoid generic telecom stories unless there is a mission-critical field-use angle."
    ],
    searchSeeds: [
      "first responder rescue story last 24 hours",
      "emergency communication outage last 24 hours",
      "firefighter coordination story last 24 hours",
      "public safety technology update last 24 hours"
    ]
  },
  {
    id: "dentiste-toothpaste",
    name: "Dentiste Toothpaste",
    profile:
      "Oral-care brand connected to confidence, fresh breath, sleep, relationships, health routines, and everyday self-care.",
    humanStoryTargets: [
      "Dentists, hygienists, patients, parents, couples, creators, and professionals with relatable oral-health or confidence stories",
      "People overcoming bad breath anxiety, dental fear, dating confidence, workplace insecurity, or sleep-related routines",
      "Health experts explaining mouth-body connections, night-time routines, microbiome care, and small daily habits",
      "People with dramatic before-and-after habit changes around health, beauty, confidence, hygiene, or self-respect",
      "Cultural stories about kissing, dating, close conversations, morning routines, and social confidence"
    ],
    timelyNewsTargets: [
      "Oral-health research, dental-care trends, wellness science, sleep studies, microbiome news, and hygiene public-health updates",
      "Beauty, dating, Valentine’s Day, wedding, travel, workplace, back-to-school, and social-confidence moments",
      "Competitor and category moves from Colgate, Sensodyne, Crest, Oral-B, Listerine, TheraBreath, and wellness brands",
      "Food, coffee, smoking, alcohol, sugar, stress, and lifestyle news that connects to breath or oral health",
      "Viral hygiene debates, celebrity routine conversations, social etiquette trends, and consumer health warnings"
    ],
    angleGuidance: [
      "Prioritize confidence, fresh breath, nighttime routines, relationships, and expert-backed oral health.",
      "Keep stories practical, intimate, and highly relatable.",
      "Avoid medical claims unless they are clearly sourced and framed carefully."
    ],
    searchSeeds: [
      "oral health research last 24 hours",
      "bad breath confidence story last 24 hours",
      "dentist advice viral last 24 hours",
      "sleep routine wellness trend last 24 hours"
    ]
  },
  {
    id: "africas-business-heroes",
    name: "Africa's Business Heroes (ABH)",
    profile:
      "Entrepreneurship initiative spotlighting African founders, operators, small businesses, job creation, resilience, and innovation.",
    humanStoryTargets: [
      "African founders, entrepreneurs, small-business owners, operators, investors, mentors, and community builders",
      "People building companies despite funding gaps, infrastructure challenges, gender barriers, conflict, climate pressure, or market constraints",
      "Founders creating jobs, solving local problems, exporting African innovation, or building from informal markets into formal scale",
      "Young entrepreneurs, women founders, rural innovators, diaspora returnees, and social-impact operators",
      "Former ABH participants, business competition winners, and overlooked builders with cinematic underdog journeys"
    ],
    timelyNewsTargets: [
      "African startup funding, policy, trade, fintech, agriculture, climate, logistics, creator economy, and SME news",
      "Competitor and adjacent ecosystem updates from Anzisha, Tony Elumelu Foundation, VC funds, accelerators, and entrepreneurship programs",
      "Global business, AI, supply-chain, climate, elections, currency, and trade stories that affect African entrepreneurs",
      "Major African business awards, founder milestones, startup exits, layoffs, market expansions, and investor announcements",
      "Sports, entertainment, culture, diaspora, and youth moments that can become entrepreneurship or opportunity angles"
    ],
    angleGuidance: [
      "Prioritize African founder stories with clear stakes, resilience, job creation, and local-to-global ambition.",
      "Make business feel human, not just financial.",
      "Avoid generic startup hype unless there is a founder, community, or impact story."
    ],
    searchSeeds: [
      "African entrepreneur story last 24 hours",
      "Africa startup founder news last 24 hours",
      "small business success Africa last 24 hours",
      "African women founder story last 24 hours"
    ]
  },
  {
    id: "interfaith-sustain",
    name: "Interfaith",
    profile:
      "Sustainability-focused interfaith organization connecting faith communities, climate action, stewardship, and practical environmental cooperation.",
    humanStoryTargets: [
      "Faith leaders, youth activists, volunteers, congregants, educators, and community organizers working on sustainability",
      "People from different religions cooperating on climate, food, waste, water, energy, nature, and local resilience",
      "Communities turning worship spaces, schools, gardens, kitchens, and neighborhoods into environmental action hubs",
      "People affected by climate events who respond through service, solidarity, and faith-based stewardship",
      "Scientists, activists, and spiritual leaders translating climate anxiety into practical community action"
    ],
    timelyNewsTargets: [
      "Climate disasters, heat, floods, fires, COP updates, biodiversity, clean energy, water, food security, and sustainability news",
      "Religious holidays, interfaith events, community-service days, environmental observances, and global faith statements",
      "Policy, corporate sustainability, greenwashing, climate justice, ESG, and conservation stories with a human community angle",
      "Competitor and adjacent updates from faith-based climate groups, NGOs, sustainability networks, and community resilience programs",
      "Sports, culture, education, and local civic moments where stewardship, cooperation, or climate action can be made human"
    ],
    angleGuidance: [
      "Prioritize interfaith cooperation, practical sustainability, community service, and human stories of stewardship.",
      "Make climate content hopeful and useful without minimizing urgency.",
      "Avoid partisan framing when a constructive community angle is stronger."
    ],
    searchSeeds: [
      "faith climate action story last 24 hours",
      "interfaith sustainability story last 24 hours",
      "community climate resilience story last 24 hours",
      "religious leaders environment news last 24 hours"
    ]
  }
];

module.exports = { CLIENTS };
