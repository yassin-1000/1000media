const dashboardData = [
  {
    id: "elie-wiesel-foundation",
    name: "Ellie Wiesel Foundation",
    clientDescription:
      "A nonprofit foundation continuing Elie Wiesel's work through ethics, remembrance, education, and human dignity.",
    category: "Non-profit / education",
    summary:
      "Mission-led storytelling focused on remembrance, moral courage, education, and human dignity. Audience responds best to human-first stories with historical weight and clear present-day relevance.",
    region: "US + global Jewish community",
    voice: "Reflective, credible, humane",
    team: ["Mira", "Daniel", "Sarah", "Levon"],
    socialLinks: [
      { label: "Instagram", url: "https://www.instagram.com/eliewieselfoundation/" },
      { label: "Facebook", url: "https://www.facebook.com/ElieWieselFoundation/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/the-elie-wiesel-foundation/" },
      { label: "X", url: "https://x.com/ElieWieselFdn" }
    ],
    theme: {
      accent: "#9e5b4f",
      accentSoft: "rgba(158, 91, 79, 0.16)",
      highlight: "#6b7d4a",
      highlightSoft: "rgba(107, 125, 74, 0.15)",
      heroStart: "#24344a",
      heroEnd: "#556b86",
      orbA: "rgba(158, 91, 79, 0.24)",
      orbB: "rgba(107, 125, 74, 0.18)"
    },
    priorityHeadline: "Lead with timely observances without sounding opportunistic.",
    prioritySummary:
      "The best-performing ideas connect current moments back to memory, human resilience, and the people carrying this mission forward today.",
    metrics: {
      ideas: 10,
      readiness: "91%",
      approved: 4,
      window: "Next 3 hours"
    },
    platforms: ["all", "instagram", "linkedin", "x"],
    humanStories: [
      {
        id: "ewf-h1",
        title: "The Family That Refused To Forget",
        personName: "Rivka Bernstein",
        personRole: "Volunteer parent and community organizer",
        storySummary:
          "Rivka turned one remembrance event into a yearly family ritual and now brings her children so history is spoken about at home, not only at ceremonies. She made memory feel like something living families do together instead of something institutions store.",
        viralReason:
          "It could go viral because it transforms a heavy historical mission into a deeply human family story people instantly understand.",
        lesson:
          "The lesson is that remembrance becomes powerful when ordinary people choose to carry it personally.",
        platform: "instagram"
      },
      {
        id: "ewf-h2",
        title: "The Smallest Object With The Biggest Memory",
        personName: "David Klein",
        personRole: "Archive educator",
        storySummary:
          "David uses one tiny handwritten letter to help students emotionally connect with history in under a minute. He proved that one physical object can make a distant tragedy feel immediate and human.",
        viralReason:
          "It could go viral because the contrast between a tiny object and a massive emotional impact is visually and intellectually striking.",
        lesson:
          "The lesson is that the most powerful stories often need one concrete detail, not a thousand facts.",
        platform: "linkedin"
      },
      {
        id: "ewf-h3",
        title: "The Quiet Teacher Who Made History Feel Alive",
        personName: "Leah Moreno",
        personRole: "Education program lead",
        storySummary:
          "Leah rebuilt a lesson plan around student questions instead of lectures and watched disengaged teenagers start leaning in. She made one of the hardest topics in the world feel personal without losing its seriousness.",
        viralReason:
          "It could go viral because it flips the assumption that young people will not engage with difficult history.",
        lesson:
          "The lesson is that empathy and curiosity can outperform authority when teaching complex truths.",
        platform: "linkedin"
      },
      {
        id: "ewf-h4",
        title: "The Man Who Turned Setup Day Into A Sacred Job",
        personName: "Samuel Hart",
        personRole: "Events coordinator",
        storySummary:
          "Samuel treats the smallest setup details like part of the message, from chairs to lighting to the first face a guest sees. He showed that the feeling of an event starts long before the event officially begins.",
        viralReason:
          "It could go viral because people love seeing invisible work suddenly revealed as deeply meaningful.",
        lesson:
          "The lesson is that care behind the scenes often shapes the story people remember most.",
        platform: "instagram"
      },
      {
        id: "ewf-h5",
        title: "The Employee Who Carries Memory In Her Backpack",
        personName: "Naomi Feld",
        personRole: "Youth outreach manager",
        storySummary:
          "Naomi keeps student letters, program photos, and one family heirloom with her on the road because they remind her why the work matters. She turned her everyday commute into a portable reminder that this mission is personal, not abstract.",
        viralReason:
          "It could go viral because it takes a huge moral mission and compresses it into one surprisingly intimate human detail.",
        lesson:
          "The lesson is that values stay real when people attach them to everyday rituals.",
        platform: "x"
      }
    ],
    evergreenIdeas: [
      {
        id: "ewf-e1",
        format: "Short video",
        title: "The volunteer who turned remembrance into a family ritual",
        hook: "A story about why one family shows up every year, and what they want their children to remember.",
        angle:
          "Profile a real volunteer or supporter and make memory feel human, current, and lived instead of institutional.",
        outline: [
          "Open with a photo or candid clip from a remembrance event.",
          "Let the volunteer explain the first moment this mission became personal.",
          "Close on the next generation and why remembrance must stay active."
        ],
        platform: "instagram",
        cta: "Invite followers to share who taught them to remember.",
        why:
          "Human stories outperform abstract mission language because they give the audience someone to emotionally follow.",
        whyNow:
          "It strengthens the evergreen side of the feed while building context for upcoming observance-based posts.",
        confidence: 0.94
      },
      {
        id: "ewf-e2",
        format: "Carousel",
        title: "What young people ask when they encounter this history for the first time",
        hook: "The most honest questions are often the most powerful starting point.",
        angle:
          "Turn education into a human conversation by answering beginner questions with empathy and clarity.",
        outline: [
          "Slide 1: the question that comes up most often.",
          "Slides 2 to 4: a direct, plain-language response.",
          "Final slide: why asking is part of honoring memory."
        ],
        platform: "linkedin",
        cta: "Ask educators to share the questions they hear most.",
        why:
          "The FAQ format lowers friction and creates high saves and shares for mission-driven educational brands.",
        whyNow:
          "Useful between major calendar moments, and it deepens audience understanding before they see event-driven content.",
        confidence: 0.88
      },
      {
        id: "ewf-e3",
        format: "Reel",
        title: "One employee, one object, one story they will never forget",
        hook: "Sometimes the most important history is carried in something small enough to hold in your hands.",
        angle:
          "Feature a staff member speaking about an artifact, book, letter, or photo that changed how they think about the work.",
        outline: [
          "Show the object first without full explanation.",
          "Have the staff member explain its emotional meaning.",
          "End by tying the object back to the foundation's work today."
        ],
        platform: "instagram",
        cta: "Prompt viewers to comment with one object that holds their family history.",
        why:
          "Employees humanize institutions and give audiences a face and voice to connect with.",
        whyNow:
          "This creates an evergreen library of people-centered stories you can repurpose later.",
        confidence: 0.9
      },
      {
        id: "ewf-e4",
        format: "Text post",
        title: "Three lessons about moral courage we keep relearning",
        hook: "The hardest lessons are the ones each generation must choose to practice again.",
        angle:
          "Translate the organization's mission into present-day human behavior rather than purely historical commentary.",
        outline: [
          "Name the first lesson in one sentence.",
          "Attach a present-day example.",
          "Close with a quiet, action-oriented call to reflection."
        ],
        platform: "x",
        cta: "Invite followers to share which lesson feels most urgent right now.",
        why:
          "Short moral framing performs well when it feels precise and grounded rather than preachy.",
        whyNow:
          "Keeps the feed active between major commemorations and gives followers language they can repost.",
        confidence: 0.83
      },
      {
        id: "ewf-e5",
        format: "Story sequence",
        title: "Behind the scenes: how a remembrance program is prepared",
        hook: "The care behind the event says as much as the event itself.",
        angle:
          "Show the people, details, and emotional labor involved in making a public program feel meaningful.",
        outline: [
          "Capture setup, notes, or rehearsal moments.",
          "Add one staff quote about responsibility.",
          "Finish with the audience impact the team hopes for."
        ],
        platform: "instagram",
        cta: "Direct viewers to the next program or resource page.",
        why:
          "Behind-the-scenes content makes institutional work feel personal and creates trust.",
        whyNow:
          "This can be produced quickly from existing team activity without waiting for a live event.",
        confidence: 0.86
      }
    ],
    realtimeIdeas: [
      {
        id: "ewf-r1",
        format: "Short video",
        title: "Rosh Hashanah: a message on memory, renewal, and responsibility",
        hook: "A new year asks not just what we hope for, but what we carry forward.",
        angle:
          "Tie the observance to remembrance and renewal through a short human-centered reflection from a program lead.",
        outline: [
          "Open with a simple holiday greeting.",
          "Connect renewal to the responsibility to remember.",
          "Close with a question about what values audiences want to carry into the year."
        ],
        platform: "instagram",
        cta: "Invite viewers to share what they are carrying into the new year.",
        why:
          "It is relevant, values-aligned, and emotionally resonant for the client audience.",
        whyNow:
          "The observance is within 48 hours and timing matters for discoverability and community relevance.",
        confidence: 0.96
      },
      {
        id: "ewf-r2",
        format: "Carousel",
        title: "If Holocaust education is in the headlines, explain what effective remembrance actually looks like",
        hook: "When public attention rises, clarity matters more than speed alone.",
        angle:
          "Respond to news interest by calmly outlining what meaningful education and remembrance require.",
        outline: [
          "Start with the current headline context.",
          "Offer three principles of responsible education.",
          "Link to a resource, program, or statement."
        ],
        platform: "linkedin",
        cta: "Drive educators and partners to a program page.",
        why:
          "Authority content works when the client helps audiences make sense of a current issue.",
        whyNow:
          "There is a live news conversation and the organization can add real value.",
        confidence: 0.89
      },
      {
        id: "ewf-r3",
        format: "Thread",
        title: "A rapid thread for a relevant remembrance day",
        hook: "Today is not just a date on the calendar. It is a chance to practice memory with intention.",
        angle:
          "Create a fast, shareable thread with one key fact, one human story, and one clear action.",
        outline: [
          "Tweet 1: name the day and why it matters.",
          "Tweet 2: introduce a person or story.",
          "Tweet 3: provide an action step or resource."
        ],
        platform: "x",
        cta: "Encourage reshares to expand educational reach.",
        why:
          "This format is fast to publish and can capture relevance during short windows.",
        whyNow:
          "Best used when an observance or breaking story is actively trending.",
        confidence: 0.84
      },
      {
        id: "ewf-r4",
        format: "Text post",
        title: "When public figures reference memory, add a grounded perspective",
        hook: "Big public statements need careful context, not louder noise.",
        angle:
          "Offer a calm, values-aligned interpretation instead of reactive commentary.",
        outline: [
          "Name the public moment.",
          "Clarify the value or historical principle involved.",
          "Invite deeper reading rather than a hot take."
        ],
        platform: "linkedin",
        cta: "Link to a trusted resource from the foundation.",
        why:
          "Thoughtful context can outperform reactive opinion for trust-driven organizations.",
        whyNow:
          "This works only while the public remark is fresh.",
        confidence: 0.78
      },
      {
        id: "ewf-r5",
        format: "Story sequence",
        title: "Conference or campus event live coverage with a human lens",
        hook: "Show the people in the room, not just the stage.",
        angle:
          "If the foundation is at a public event, document attendee reactions, questions, and moments of connection.",
        outline: [
          "Capture arrival and atmosphere.",
          "Highlight one human quote from the audience.",
          "End with the single takeaway people should carry out."
        ],
        platform: "instagram",
        cta: "Direct audiences to follow for a recap or replay.",
        why:
          "Live feeling boosts relevance and gives the audience a sense of being present.",
        whyNow:
          "This only works during or immediately after the event window.",
        confidence: 0.81
      }
    ],
    events: [
      {
        name: "Rosh Hashanah",
        summary:
          "High-relevance observance for Jewish audiences and aligned mission messaging around reflection, renewal, and memory.",
        relevance: "97 match",
        timing: "Starts in 2 days",
        tags: ["faith calendar", "community relevance", "high priority"]
      },
      {
        name: "Campus Holocaust education debate in national press",
        summary:
          "A live conversation where the foundation can provide clarity and educational leadership without becoming reactive.",
        relevance: "88 match",
        timing: "Breaking now",
        tags: ["news cycle", "education", "thought leadership"]
      },
      {
        name: "Museum remembrance partnership event",
        summary:
          "Partnership activation with strong behind-the-scenes and event coverage potential.",
        relevance: "83 match",
        timing: "This week",
        tags: ["partnership", "event coverage", "audience trust"]
      }
    ],
    storyBank: [
      {
        title: "Volunteer family tradition",
        body:
          "A supporter returns each year with their children and frames remembrance as a living family practice.",
        tags: ["volunteer", "family", "intergenerational"]
      },
      {
        title: "Staff artifact reflection",
        body:
          "A program team member explains how one artifact changed their understanding of responsibility and memory.",
        tags: ["employee", "artifact", "reflection"]
      },
      {
        title: "Educator FAQ",
        body:
          "Teachers repeatedly ask how to introduce Holocaust education to younger audiences without losing historical seriousness.",
        tags: ["faq", "educator", "curriculum"]
      },
      {
        title: "Program setup behind the scenes",
        body:
          "Preparation work for memorial events reveals care, discipline, and emotional labor that audiences rarely see.",
        tags: ["behind the scenes", "team", "event prep"]
      }
    ],
    calendar: [
      {
        day: "Thu",
        title: "Rosh Hashanah reflection video",
        note: "Publish before noon with community-forward caption.",
        badge: "Real-time"
      },
      {
        day: "Fri",
        title: "Volunteer family carousel",
        note: "Follow the holiday post with an evergreen human story.",
        badge: "Evergreen"
      },
      {
        day: "Sun",
        title: "Educator FAQ post",
        note: "LinkedIn-first for partner and school audiences.",
        badge: "Evergreen"
      }
    ]
  },
  {
    id: "zoomex",
    name: "Zoomex",
    clientDescription:
      "A crypto trading platform focused on fast-moving markets, trader behavior, and trust under pressure.",
    category: "Fintech / crypto",
    summary:
      "A fast-moving crypto trading brand that wins when it feels sharp, transparent, and human under pressure. The audience responds to people stories, trader psychology, and clear takes during market moments.",
    region: "MENA + Asia",
    voice: "Fast, confident, transparent",
    team: ["Rina", "Omar", "Felix", "Nadia"],
    socialLinks: [
      { label: "LinkedIn", url: "https://www.linkedin.com/company/zoomex-com" },
      { label: "X", url: "https://x.com/ZoomexOfficial" },
      { label: "Website", url: "https://www.zoomex.com/en/" }
    ],
    theme: {
      accent: "#ff7a59",
      accentSoft: "rgba(255, 122, 89, 0.16)",
      highlight: "#169b95",
      highlightSoft: "rgba(22, 155, 149, 0.15)",
      heroStart: "#0e5f73",
      heroEnd: "#3c9ea1",
      orbA: "rgba(255, 122, 89, 0.24)",
      orbB: "rgba(22, 155, 149, 0.19)"
    },
    priorityHeadline: "Own seasonal oral-health moments before everyone posts the same tips.",
    prioritySummary:
      "The strongest mix is staff personality plus timely reminders around school calendars, holidays, and local family routines.",
    metrics: {
      ideas: 10,
      readiness: "86%",
      approved: 3,
      window: "By 5 PM today"
    },
    platforms: ["all", "instagram", "linkedin", "x"],
    humanStories: [
      {
        id: "zoom-h1",
        title: "The Trader Who Lost Everything And Came Back Smarter",
        personName: "Mina Rahman",
        personRole: "Community trader",
        storySummary:
          "Mina blew up her account early, rebuilt from scratch, and now teaches risk discipline to newer traders inside the community. She turned a public loss into the exact kind of credibility money cannot buy.",
        viralReason:
          "It could go viral because comeback stories in finance feel emotional, painful, and aspirational all at once.",
        lesson:
          "The lesson is that survival is often a stronger flex than early success.",
        platform: "instagram"
      },
      {
        id: "zoom-h2",
        title: "The Support Agent Who Stayed Up All Night On Crash Day",
        personName: "Omar Saeed",
        personRole: "Customer support lead",
        storySummary:
          "When the market turned chaotic, Omar answered panicked users one by one instead of hiding behind generic updates. He made the brand feel human exactly when users were most likely to stop trusting it.",
        viralReason:
          "It could go viral because people rarely see the emotional labor behind trust during financial chaos.",
        lesson:
          "The lesson is that brands earn loyalty when real people show up under pressure.",
        platform: "linkedin"
      },
      {
        id: "zoom-h3",
        title: "The Invisible Security Engineer Protecting Millions",
        personName: "Felix Tan",
        personRole: "Security engineer",
        storySummary:
          "Felix spends most of his time preventing problems nobody will ever know almost happened. He represents the paradox of trust in crypto: the best work is the work nobody notices.",
        viralReason:
          "It could go viral because invisible protection is a powerful contrast in a space obsessed with visible wins.",
        lesson:
          "The lesson is that quiet reliability often matters more than loud innovation.",
        platform: "linkedin"
      },
      {
        id: "zoom-h4",
        title: "The Young Analyst Who Explained Bitcoin Better Than The News",
        personName: "Nadia Karim",
        personRole: "Market analyst",
        storySummary:
          "Nadia turned one confusing macro headline into a simple trader explainer people could actually use that same day. She proved that clarity can travel faster than noise when the stakes feel high.",
        viralReason:
          "It could go viral because audiences reward the rare person who makes complicated markets feel suddenly understandable.",
        lesson:
          "The lesson is that simplification is a competitive advantage in information-heavy markets.",
        platform: "x"
      },
      {
        id: "zoom-h5",
        title: "The Risk Manager Who Taught Traders How Not To Panic",
        personName: "Rina Chowdhury",
        personRole: "Risk and education manager",
        storySummary:
          "Rina does not sell excitement first, she teaches traders how to survive the ugly days that nobody puts in the screenshot. She turned restraint into a surprisingly compelling content angle for a trading brand.",
        viralReason:
          "It could go viral because anti-hype content stands out hard in a market full of hype.",
        lesson:
          "The lesson is that discipline becomes magnetic when everyone else is chasing adrenaline.",
        platform: "instagram"
      }
    ],
    evergreenIdeas: [
      {
        id: "hdg-e1",
        format: "Reel",
        title: "Meet the hygienist patients ask for by name",
        hook: "Why do nervous patients keep requesting the same hygienist?",
        angle:
          "Center the story on trust, bedside manner, and the little habits that make a patient feel safe.",
        outline: [
          "Open with a quick staff introduction.",
          "Share one patient fear they hear often.",
          "Reveal the comforting habit or phrase that helps."
        ],
        platform: "instagram",
        cta: "Invite viewers to book with the featured clinician.",
        why:
          "Service businesses win when the people behind the service feel familiar and trustworthy.",
        whyNow:
          "Evergreen trust content supports appointment conversion all month.",
        confidence: 0.93
      },
      {
        id: "hdg-e2",
        format: "Carousel",
        title: "What parents wish they knew before their child’s first dental visit",
        hook: "The calmer the parent, the calmer the appointment.",
        angle:
          "Turn recurring questions into a parent-friendly guide with a human tone instead of clinical language.",
        outline: [
          "Start with the biggest fear parents bring in.",
          "Offer three practical prep tips.",
          "End by normalizing anxiety and promising a gentle experience."
        ],
        platform: "facebook",
        cta: "Prompt parents to save the post for their next visit.",
        why:
          "Family audience content drives saves and referrals when it feels helpful, not salesy.",
        whyNow:
          "Works year-round and fills the evergreen half of the content mix.",
        confidence: 0.87
      },
      {
        id: "hdg-e3",
        format: "Short video",
        title: "A two-minute day in the life of the front desk team",
        hook: "Most patient anxiety starts before they even sit in the chair.",
        angle:
          "Show how the front desk team lowers stress from the first phone call to the moment a patient walks in.",
        outline: [
          "Capture greeting moments and calm check-in scenes.",
          "Share one routine the team uses to make visits easier.",
          "Close on the feeling patients should expect."
        ],
        platform: "tiktok",
        cta: "Encourage nervous first-timers to DM questions.",
        why:
          "This makes the brand feel human and approachable instead of sterile.",
        whyNow:
          "Easy to produce quickly and reuse as recruitment or trust content.",
        confidence: 0.84
      },
      {
        id: "hdg-e4",
        format: "Single image",
        title: "Patient smile spotlight",
        hook: "One treatment can change more than a smile.",
        angle:
          "Pair a before-and-after or testimonial with a short quote about confidence and daily life impact.",
        outline: [
          "Lead with the transformation visual.",
          "Use the patient’s own words.",
          "Finish with one practical next step."
        ],
        platform: "instagram",
        cta: "Drive viewers to a consultation booking page.",
        why:
          "Transformation stories turn clinical outcomes into emotional outcomes.",
        whyNow:
          "Strong evergreen proof point for conversion-focused weeks.",
        confidence: 0.9
      },
      {
        id: "hdg-e5",
        format: "Text post",
        title: "The most common myth our dentists still hear",
        hook: "If you only go when something hurts, you are already late.",
        angle:
          "Bust one common myth and explain it in plain language without scolding.",
        outline: [
          "State the myth.",
          "Replace it with the truth in one sentence.",
          "Give one action step."
        ],
        platform: "facebook",
        cta: "Invite followers to drop myths they have heard.",
        why:
          "Myth-busting is shareable and positions the practice as helpful and authoritative.",
        whyNow:
          "Reliable evergreen filler that still educates.",
        confidence: 0.81
      }
    ],
    realtimeIdeas: [
      {
        id: "zoom-r1",
        format: "Short video",
        title: "Bitcoin Just Moved. Here’s What Smart Traders Do Next",
        hook: "When the chart moves hard, the first job is not excitement, it is context.",
        angle:
          "Use a calm analyst-led reaction to turn a volatile move into a fast educational post.",
        outline: [
          "Open with the market move everyone is watching.",
          "Explain the one mistake emotional traders make next.",
          "Close with a risk-first action step."
        ],
        platform: "x",
        cta: "Invite traders to share what level they are watching.",
        why:
          "Fast, useful reaction content performs when the market is moving and attention is concentrated.",
        whyNow:
          "It is strongest in the first few hours after a major move.",
        confidence: 0.95
      },
      {
        id: "zoom-r2",
        format: "Carousel",
        title: "If The Fed Hits Crypto Tonight, Post This Immediately",
        hook: "Macro headlines move faster when traders already feel tense.",
        angle:
          "Translate a macro announcement into the plain-English market takeaway retail traders actually need.",
        outline: [
          "State the announcement clearly.",
          "Explain the likely crypto reaction.",
          "End with one positioning or risk reminder."
        ],
        platform: "linkedin",
        cta: "Ask the audience what signal matters most to them.",
        why:
          "People save and share content that makes a complex headline suddenly usable.",
        whyNow:
          "Best within minutes of the macro headline landing.",
        confidence: 0.77
      },
      {
        id: "zoom-r3",
        format: "Reel",
        title: "Crypto Panic Day? Make The Anti-Panic Video",
        hook: "The loudest market days are exactly when a calm voice wins.",
        angle:
          "Put a recognizable team face on a short risk-management message built for a volatile day.",
        outline: [
          "Open with the panic everyone can feel.",
          "Offer three discipline rules in plain language.",
          "End by reminding traders that survival beats drama."
        ],
        platform: "instagram",
        cta: "Prompt viewers to save it for their next red day.",
        why:
          "Anti-hype content stands out because most trading brands lean into adrenaline.",
        whyNow:
          "Most valuable when fear is already flooding the feed.",
        confidence: 0.92
      },
      {
        id: "zoom-r4",
        format: "Text post",
        title: "If Crypto Security Is In The News, Say This Fast",
        hook: "The smartest reaction is clarity, not panic marketing.",
        angle:
          "Use a security headline to deliver trust-building education instead of generic reassurance.",
        outline: [
          "Acknowledge the headline directly.",
          "Give one safety principle users control.",
          "End with a realistic next step."
        ],
        platform: "x",
        cta: "Invite users to share the security habit they follow.",
        why:
          "Trust content performs best when the market mood is uncertain and users want guidance.",
        whyNow:
          "Only high value while the security story is fresh.",
        confidence: 0.72
      },
      {
        id: "zoom-r5",
        format: "Short video",
        title: "The Exchange POV Right After A Wild Liquidation Day",
        hook: "Most people only show the numbers. We should show the human behavior behind them.",
        angle:
          "Turn a violent market session into an educational breakdown of what liquidation days teach traders.",
        outline: [
          "Start with the size of the move.",
          "Explain what liquidation actually means in simple language.",
          "Close with one rule smart traders remember next time."
        ],
        platform: "instagram",
        cta: "Ask viewers what they learned from the move.",
        why:
          "Educational reactions built off dramatic market days get strong attention and strong saves.",
        whyNow:
          "Best the same day the liquidation story is still on everyone’s timeline.",
        confidence: 0.8
      }
    ],
    events: [
      {
        name: "Major Bitcoin price move",
        summary:
          "Perfect for trader-education content that is fast, clear, and visibly calmer than the surrounding noise.",
        relevance: "96 match",
        timing: "Live now",
        tags: ["price action", "market reaction", "high urgency"]
      },
      {
        name: "Fed or macro announcement",
        summary:
          "High relevance because the audience wants the crypto implication, not just the macro headline.",
        relevance: "90 match",
        timing: "Today",
        tags: ["macro", "education", "saveable"]
      },
      {
        name: "Security headline in crypto",
        summary:
          "Strong trust moment for content about safety, responsibility, and user behavior.",
        relevance: "74 match",
        timing: "Breaking now",
        tags: ["security", "trust", "education"]
      }
    ],
    storyBank: [
      {
        title: "Trader comeback story",
        body:
          "A community trader recovered from a brutal early loss and now teaches discipline instead of hype.",
        tags: ["comeback", "risk", "human story"]
      },
      {
        title: "Crash-day support shift",
        body:
          "Customer support stories from the most emotional days in the market show how trust is earned in real time.",
        tags: ["support", "trust", "volatility"]
      },
      {
        title: "Invisible security work",
        body:
          "Security and risk content grounded in real people behind the scenes makes the brand feel mature.",
        tags: ["security", "ops", "credibility"]
      },
      {
        title: "Risk lesson library",
        body:
          "Short educational stories about discipline, mistakes, and how experienced traders think under pressure.",
        tags: ["education", "risk", "evergreen"]
      }
    ],
    calendar: [
      {
        day: "Wed",
        title: "Bitcoin move explainer",
        note: "Publish while the market reaction still feels urgent.",
        badge: "Real-time"
      },
      {
        day: "Thu",
        title: "Trader comeback story",
        note: "Follow the fast market post with a human story.",
        badge: "Evergreen"
      },
      {
        day: "Sat",
        title: "Security engineer spotlight",
        note: "Use the weekend slot for trust-building brand depth.",
        badge: "Evergreen"
      }
    ]
  },
  {
    id: "solana",
    name: "Solana",
    clientDescription:
      "A blockchain ecosystem for builders, payments, internet capital markets, and crypto applications.",
    category: "Blockchain / ecosystem",
    summary:
      "A global blockchain ecosystem brand that wins when it feels fast, builder-led, and unmistakably alive. The audience responds best to founder stories, developer hustle, and real people shipping in public.",
    region: "Global builders",
    voice: "Optimistic, fast, technical",
    team: ["Noah", "Priya", "Caleb", "Amal"],
    socialLinks: [
      { label: "Instagram", url: "https://www.instagram.com/solana/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/solana/" },
      { label: "X", url: "https://x.com/solana" },
      { label: "Website", url: "https://solana.com/" }
    ],
    theme: {
      accent: "#f97316",
      accentSoft: "rgba(249, 115, 22, 0.16)",
      highlight: "#2563eb",
      highlightSoft: "rgba(37, 99, 235, 0.14)",
      heroStart: "#0f172a",
      heroEnd: "#1d4ed8",
      orbA: "rgba(249, 115, 22, 0.23)",
      orbB: "rgba(37, 99, 235, 0.18)"
    },
    priorityHeadline: "React fast to industry shifts, but always through the lens of operators and real people.",
    prioritySummary:
      "The content should feel like it came from people who actually live the problem: operators, RevOps leaders, and implementation teams.",
    metrics: {
      ideas: 10,
      readiness: "89%",
      approved: 5,
      window: "Before 1 PM ET"
    },
    platforms: ["all", "instagram", "linkedin", "x"],
    humanStories: [
      {
        id: "sol-h1",
        title: "The Teenager Building On Solana From A Tiny Bedroom",
        personName: "Arjun Mehta",
        personRole: "Student developer",
        storySummary:
          "Arjun started shipping mini products from his bedroom after school and found his first real community through Solana builders online. He turned spare hours and curiosity into momentum that now looks like a career.",
        viralReason:
          "It could go viral because the contrast between a tiny room and a global ecosystem is cinematic and inspiring.",
        lesson:
          "The lesson is that access plus community can compress years of progress into months.",
        platform: "x"
      },
      {
        id: "sol-h2",
        title: "The Validator Who Keeps The Chain Alive At 3AM",
        personName: "Priya Raman",
        personRole: "Validator operator",
        storySummary:
          "Priya lives in the part of crypto most users never see, the late-night operational work that keeps networks healthy when nobody is celebrating. She makes infrastructure feel human by showing the person behind the uptime.",
        viralReason:
          "It could go viral because it reveals the unseen labor behind something most people treat like magic.",
        lesson:
          "The lesson is that every breakthrough product is standing on someone’s invisible consistency.",
        platform: "linkedin"
      },
      {
        id: "sol-h3",
        title: "The Woman Who Turned A Hackathon Into A Company",
        personName: "Maya Santos",
        personRole: "Founder and hackathon winner",
        storySummary:
          "Maya built a prototype during a weekend sprint, kept listening to users, and turned that early idea into a real startup. She is proof that ecosystems grow when experimentation feels cheap and ambition feels welcome.",
        viralReason:
          "It could go viral because people love the compressed arc from weekend project to real company.",
        lesson:
          "The lesson is that speed matters most when it is followed by relentless iteration.",
        platform: "instagram"
      },
      {
        id: "sol-h4",
        title: "The Developer Who Explained Crypto To His Mom And Half The Internet",
        personName: "Caleb Ross",
        personRole: "Developer educator",
        storySummary:
          "Caleb started making ultra-simple explainers for one family member and accidentally built a style that now helps thousands of newcomers understand complex ideas. He proved that teaching well can be as valuable as shipping fast.",
        viralReason:
          "It could go viral because humor and family framing make technical content far more shareable.",
        lesson:
          "The lesson is that clarity can be one of the highest-leverage products in any ecosystem.",
        platform: "x"
      },
      {
        id: "sol-h5",
        title: "The Community Lead Who Made Builders Feel Like Family",
        personName: "Noah Kim",
        personRole: "Community lead",
        storySummary:
          "Noah turned scattered online builders into an ecosystem that actually feels warm, fast, and welcoming when new people enter. He made belonging a strategic advantage instead of a soft afterthought.",
        viralReason:
          "It could go viral because audiences rarely hear growth described through belonging instead of numbers.",
        lesson:
          "The lesson is that communities scale faster when people feel seen before they feel sold to.",
        platform: "linkedin"
      }
    ],
    evergreenIdeas: [
      {
        id: "abc-e1",
        format: "LinkedIn post",
        title: "The ops manager who spent Fridays fixing broken handoffs",
        hook: "This is what workflow debt looks like in a real person’s week.",
        angle:
          "Tell the story of an operator drowning in manual work before process redesign changed the rhythm of their team.",
        outline: [
          "Describe the weekly frustration.",
          "Show the turning point.",
          "End with the result in human terms, not just metrics."
        ],
        platform: "linkedin",
        cta: "Ask operators where handoffs still break inside their orgs.",
        why:
          "B2B content performs better when it starts with a person, not a feature list.",
        whyNow:
          "It creates a durable narrative bank your sales team can reuse later.",
        confidence: 0.91
      },
      {
        id: "abc-e2",
        format: "Carousel",
        title: "Three signs your ops team is quietly carrying too much manual work",
        hook: "The team usually knows before leadership does.",
        angle:
          "Use familiar operator pain signals to create instant audience recognition and shares.",
        outline: [
          "Sign 1: spreadsheet patchwork.",
          "Sign 2: Slack DMs as workflow.",
          "Sign 3: reporting takes longer than action."
        ],
        platform: "linkedin",
        cta: "Prompt comments with the biggest invisible bottleneck.",
        why:
          "Pain recognition content drives high resonance in professional feeds.",
        whyNow:
          "Great evergreen asset between launch or event moments.",
        confidence: 0.88
      },
      {
        id: "abc-e3",
        format: "Thread",
        title: "What implementation teams wish sales promised less often",
        hook: "A little honesty can be stronger than a polished claim.",
        angle:
          "Humanize the go-live experience by letting internal experts explain what actually creates success.",
        outline: [
          "State one overpromised expectation.",
          "Replace it with the real success factor.",
          "Finish with an implementation lesson."
        ],
        platform: "x",
        cta: "Invite operators to reply with hard-won rollout lessons.",
        why:
          "This feels insider, credible, and highly shareable within the target audience.",
        whyNow:
          "Operator-led honesty builds trust over time.",
        confidence: 0.82
      },
      {
        id: "abc-e4",
        format: "Short video",
        title: "A day in the life of a RevOps team before and after automation",
        hook: "Same team. Very different energy.",
        angle:
          "Contrast manual chaos with calmer execution using an employee-narrated before-and-after story.",
        outline: [
          "Show the pre-automation scramble.",
          "Introduce the change.",
          "Close on the team’s new capacity."
        ],
        platform: "linkedin",
        cta: "Drive viewers to a demo or case study.",
        why:
          "Visual contrast creates a strong emotional argument for B2B buyers.",
        whyNow:
          "Useful evergreen proof content for pipeline support.",
        confidence: 0.86
      },
      {
        id: "abc-e5",
        format: "Text post",
        title: "A better way to talk about ROI",
        hook: "If your ROI story starts with software, you already lost the room.",
        angle:
          "Frame ROI around people time, decision quality, and avoided chaos.",
        outline: [
          "Call out the weak version of the pitch.",
          "Offer a better framing.",
          "Give one example from an operator’s week."
        ],
        platform: "linkedin",
        cta: "Ask which ROI framing buyers actually trust.",
        why:
          "Sharp positioning posts help a B2B brand sound smarter than competitors.",
        whyNow:
          "Always relevant and easy to repurpose.",
        confidence: 0.84
      }
    ],
    realtimeIdeas: [
      {
        id: "sol-r1",
        format: "Short video",
        title: "If Solana Breaks The Timeline Today, Post This Fast",
        hook: "When the ecosystem is moving fast, the best content explains the human signal behind the speed.",
        angle:
          "Turn a big ecosystem headline into a builder-first reaction instead of generic celebration.",
        outline: [
          "Name the headline everyone is watching.",
          "Explain why builders should actually care.",
          "Close with one action or takeaway."
        ],
        platform: "x",
        cta: "Ask builders what they think this changes.",
        why:
          "Fast ecosystem interpretation performs when it is sharper and more useful than celebration posts.",
        whyNow:
          "Best while the headline is still dominating attention.",
        confidence: 0.93
      },
      {
        id: "sol-r2",
        format: "Thread",
        title: "Hackathon Winner? Tell The Builder Story Before Everyone Else Does",
        hook: "The demo matters, but the person behind the demo is what people remember.",
        angle:
          "Use a fresh launch or hackathon win to spotlight the founder arc, not just the product screenshot.",
        outline: [
          "Lead with the winning project.",
          "Zoom in on the builder’s journey.",
          "End with why this matters for the ecosystem."
        ],
        platform: "x",
        cta: "Invite the community to share their favorite build from the event.",
        why:
          "Founder-centered ecosystem content is more shareable than product-only recaps.",
        whyNow:
          "The window is strongest while the win still feels fresh.",
        confidence: 0.87
      },
      {
        id: "sol-r3",
        format: "Carousel",
        title: "If A Network Upgrade Lands, Explain What Humans Feel First",
        hook: "Most upgrade posts sound technical. The best one makes the improvement feel human.",
        angle:
          "Translate a technical milestone into a creator, founder, or user experience win.",
        outline: [
          "Name the upgrade in plain words.",
          "Describe the user-level difference.",
          "Give one example of what gets easier now."
        ],
        platform: "linkedin",
        cta: "Drive readers to the deeper ecosystem explainer.",
        why:
          "Interpretation beats celebration when the ecosystem is crowded with fast reactions.",
        whyNow:
          "The value drops after the first day of the update cycle.",
        confidence: 0.85
      },
      {
        id: "sol-r4",
        format: "Text post",
        title: "Memecoin Chaos? Tell The Builder Lesson, Not The Joke",
        hook: "The loudest trend is not always the deepest story.",
        angle:
          "Use a noisy cultural moment to explain what serious builders can still learn from it.",
        outline: [
          "Reference the trend without overexplaining it.",
          "Extract the underlying behavior or demand signal.",
          "Close with a grounded builder lesson."
        ],
        platform: "x",
        cta: "Ask the audience which signal they think matters most.",
        why:
          "This lets the brand stay relevant without looking unserious.",
        whyNow:
          "Only useful while the trend is actively flooding the feed.",
        confidence: 0.73
      },
      {
        id: "sol-r5",
        format: "Short video",
        title: "The Human Story Behind A New Solana Launch",
        hook: "Products launch every day. People remember the builder who almost quit before shipping.",
        angle:
          "Package a new project launch around the founder’s emotional journey instead of only the product features.",
        outline: [
          "Open with the launch everyone sees.",
          "Reveal the harder personal backstory.",
          "End with why this matters for the next wave of builders."
        ],
        platform: "linkedin",
        cta: "Prompt founders to share the hardest part of building.",
        why:
          "Builder stories outperform feature lists because they make ecosystems feel alive.",
        whyNow:
          "Best within the first day or two after the launch goes live.",
        confidence: 0.79
      }
    ],
    events: [
      {
        name: "Major Solana ecosystem headline",
        summary:
          "High relevance because the audience wants interpretation, not just excitement.",
        relevance: "94 match",
        timing: "Breaking now",
        tags: ["ecosystem news", "builder lens", "high urgency"]
      },
      {
        name: "Hackathon finals or launch day",
        summary:
          "Strong opportunity for founder-focused storytelling and fast community coverage.",
        relevance: "89 match",
        timing: "This week",
        tags: ["event", "builders", "live coverage"]
      },
      {
        name: "Network upgrade",
        summary:
          "Best used for translating a technical milestone into a human-centered explanation.",
        relevance: "84 match",
        timing: "24 hour window",
        tags: ["upgrade", "education", "interpretation"]
      }
    ],
    storyBank: [
      {
        title: "Teen builder story",
        body:
          "A young developer building from a tiny room becomes a great entry point for the ecosystem.",
        tags: ["builder", "human story", "access"]
      },
      {
        title: "Validator late-night story",
        body:
          "Infrastructure work told through one person makes technical depth feel much more human.",
        tags: ["infrastructure", "operations", "credibility"]
      },
      {
        title: "Hackathon to startup arc",
        body:
          "Founder journeys that begin in a weekend build make the ecosystem feel alive and open.",
        tags: ["founder", "hackathon", "momentum"]
      },
      {
        title: "Crypto explained simply",
        body:
          "Educational creator stories make the ecosystem less intimidating and more shareable.",
        tags: ["education", "creator", "evergreen"]
      }
    ],
    calendar: [
      {
        day: "Tue",
        title: "Ecosystem headline reaction",
        note: "Publish while the headline is still dominating attention.",
        badge: "Real-time"
      },
      {
        day: "Thu",
        title: "Hackathon founder story",
        note: "Follow the fast post with a founder-centered narrative.",
        badge: "Evergreen"
      },
      {
        day: "Fri",
        title: "Validator spotlight",
        note: "End the week with infrastructure made human.",
        badge: "Evergreen"
      }
    ]
  },
  {
    id: "leverageedu",
    name: "LeverageEDU",
    clientDescription:
      "An India-rooted student mobility platform helping students with admissions, financing, housing, and career outcomes.",
    category: "EdTech / student mobility",
    summary:
      "An India-based edtech startup focused on study abroad, career mobility, and student transformation stories. The brand works best when content feels ambitious, human, and tied to real student outcomes.",
    region: "India + global education pathways",
    voice: "Ambitious, encouraging, outcome-driven",
    team: ["Ava", "Jay", "Marcus", "Tariq"],
    socialLinks: [
      { label: "Instagram", url: "https://www.instagram.com/leverageedu/" },
      { label: "Facebook", url: "https://www.facebook.com/LeverageEdu/" },
      { label: "LinkedIn", url: "https://in.linkedin.com/company/leverage-edu" },
      { label: "Website", url: "https://leverageedu.com/" }
    ],
    theme: {
      accent: "#dc2626",
      accentSoft: "rgba(220, 38, 38, 0.16)",
      highlight: "#7c3aed",
      highlightSoft: "rgba(124, 58, 237, 0.14)",
      heroStart: "#1f2937",
      heroEnd: "#7c3aed",
      orbA: "rgba(220, 38, 38, 0.24)",
      orbB: "rgba(124, 58, 237, 0.18)"
    },
    priorityHeadline: "Use big cultural moments, but keep the content human and founder-driven.",
    prioritySummary:
      "The strongest ideas mix strong personality, current relevance, and clear lessons the audience can act on fast.",
    metrics: {
      ideas: 10,
      readiness: "88%",
      approved: 2,
      window: "This afternoon"
    },
    platforms: ["all", "instagram", "linkedin", "x"],
    humanStories: [
      {
        id: "lev-h1",
        title: "The Founder Who Failed In Public And Won Bigger",
        personName: "Ava Laurent",
        personRole: "Founder",
        storySummary:
          "Ava had a public miss that could have made the brand look smaller, but she turned it into the most honest story the company ever told. She used transparency as a growth engine instead of a defensive move.",
        viralReason:
          "It could go viral because public failure followed by hard-won clarity is one of the internet’s most magnetic arcs.",
        lesson:
          "The lesson is that honesty can compound faster than image management.",
        platform: "instagram"
      },
      {
        id: "lev-h2",
        title: "The Intern Whose Tiny Idea Reached Millions",
        personName: "Jay Molina",
        personRole: "Creative intern",
        storySummary:
          "Jay suggested a tiny format change that looked almost too small to matter and it ended up driving one of the brand’s biggest reach spikes. He proved that leverage often starts as a detail everyone else ignores.",
        viralReason:
          "It could go viral because people love underdog stories where the least expected voice changes the outcome.",
        lesson:
          "The lesson is that great systems stay open to good ideas no matter where they come from.",
        platform: "linkedin"
      },
      {
        id: "lev-h3",
        title: "The Operator Who Built Leverage Without Looking Busy",
        personName: "Marcus Hale",
        personRole: "Operations lead",
        storySummary:
          "Marcus built calm, repeatable systems behind a brand that looks loud and fast from the outside. He showed that scale often comes from boring discipline disguised as momentum.",
        viralReason:
          "It could go viral because it attacks the myth that visible chaos is the same thing as ambition.",
        lesson:
          "The lesson is that real leverage comes from systems that keep working when attention moves elsewhere.",
        platform: "linkedin"
      },
      {
        id: "lev-h4",
        title: "The Creator Who Turned One Camera Into A Media Machine",
        personName: "Tariq Benson",
        personRole: "Creator partner",
        storySummary:
          "Tariq started with one small recording setup and turned it into a repeatable engine for audience trust and distribution. He made consistency look cinematic without waiting for perfect conditions.",
        viralReason:
          "It could go viral because it compresses the dream of media scale into a very tangible starting point.",
        lesson:
          "The lesson is that momentum usually begins with one tool used repeatedly, not ten tools used once.",
        platform: "instagram"
      },
      {
        id: "lev-h5",
        title: "The Small Team With The Loudest Internet",
        personName: "Leverage Editorial Team",
        personRole: "Creative and growth team",
        storySummary:
          "This team learned how to move faster than brands ten times their size by making every idea sharper before making it bigger. They turned focus into force instead of trying to win with sheer volume.",
        viralReason:
          "It could go viral because the David-versus-Goliath framing is instantly compelling for ambitious operators.",
        lesson:
          "The lesson is that a small team can feel huge when the message is unusually sharp.",
        platform: "x"
      }
    ],
    evergreenIdeas: [
      {
        id: "lev-e1",
        format: "Short video",
        title: "A founder lesson that only made sense after failing in public",
        hook: "The advice that sounds smart in theory usually changes once real people are watching.",
        angle:
          "Use a first-person founder story to make the brand feel honest, ambitious, and human.",
        outline: [
          "Open with the moment that went wrong.",
          "Explain what changed after the failure.",
          "Close with the rule the founder now follows."
        ],
        platform: "instagram",
        cta: "Ask the audience what lesson they learned the hard way.",
        why:
          "Founder stories outperform generic business advice because they feel lived and memorable.",
        whyNow:
          "Strong evergreen content that builds a recognizable voice over time.",
        confidence: 0.9
      },
      {
        id: "lev-e2",
        format: "Carousel",
        title: "The people behind the scenes who make growth actually happen",
        hook: "The face of the brand gets attention, but the operators make it real.",
        angle:
          "Spotlight the team members whose work turns momentum into results.",
        outline: [
          "Introduce one team member at a time.",
          "Show the part of the machine they own.",
          "End with what great support work looks like."
        ],
        platform: "linkedin",
        cta: "Invite the audience to tag the teammate they rely on most.",
        why:
          "Humanizing the team makes the brand feel substantial and collaborative.",
        whyNow:
          "Great always-on content between real-time pushes.",
        confidence: 0.84
      },
      {
        id: "lev-e3",
        format: "Text post",
        title: "The myth about leverage that keeps people stuck",
        hook: "Most people treat leverage like a hack instead of a system.",
        angle:
          "Turn a common misconception into a sharp, opinionated post with practical value.",
        outline: [
          "State the common myth.",
          "Replace it with the better mental model.",
          "Give one example of leverage in practice."
        ],
        platform: "x",
        cta: "Ask followers where they are still doing work manually.",
        why:
          "Short opinionated posts create strong identity when the message is clear.",
        whyNow:
          "Reliable evergreen content for engagement and reposts.",
        confidence: 0.83
      },
      {
        id: "lev-e4",
        format: "Reel",
        title: "One employee’s best idea that changed the business",
        hook: "The smartest growth idea did not start in a boardroom.",
        angle:
          "Tell a team-originated story that makes the company feel open, fast, and meritocratic.",
        outline: [
          "Name the employee and the original idea.",
          "Show how it got tested.",
          "End with the business impact."
        ],
        platform: "instagram",
        cta: "Prompt viewers to share the best idea they ever pitched.",
        why:
          "Employee spotlight stories create relatability and authority at the same time.",
        whyNow:
          "Adds a human anchor to a high-energy brand.",
        confidence: 0.87
      },
      {
        id: "lev-e5",
        format: "Story sequence",
        title: "A quick day-in-the-life of the growth desk",
        hook: "Momentum looks chaotic from the outside, but the routine tells a different story.",
        angle:
          "Capture the rhythm of a real working day and show how attention is allocated.",
        outline: [
          "Start with the morning priorities.",
          "Show one live decision in the middle of the day.",
          "End with the biggest lesson from the day."
        ],
        platform: "instagram",
        cta: "Ask viewers if they want more behind-the-scenes content.",
        why:
          "Behind-the-scenes operational content makes ambitious brands feel real.",
        whyNow:
          "Easy to produce quickly and useful as an ongoing series.",
        confidence: 0.85
      }
    ],
    realtimeIdeas: [
      {
        id: "lev-r1",
        format: "Short video",
        title: "React to a major creator economy headline with a founder POV",
        hook: "Most people will repeat the headline. We should explain what it changes.",
        angle:
          "Turn a breaking industry story into a fast, opinionated take grounded in real business judgment.",
        outline: [
          "Name the headline in one line.",
          "Explain what it means for creators or operators.",
          "Close with one immediate takeaway."
        ],
        platform: "instagram",
        cta: "Invite comments from people building in the space.",
        why:
          "Timely opinion content works when the brand sounds decisive and useful.",
        whyNow:
          "Strongest inside the first 24-hour attention window.",
        confidence: 0.91
      },
      {
        id: "lev-r2",
        format: "Carousel",
        title: "If a platform algorithm changes, explain the practical move",
        hook: "The worst reaction to a platform shift is panic without a plan.",
        angle:
          "Translate a platform update into a short action guide for the audience.",
        outline: [
          "State what changed.",
          "Explain the immediate implication.",
          "Offer three practical responses."
        ],
        platform: "linkedin",
        cta: "Prompt the audience to share what they are testing.",
        why:
          "Actionable explainers create high saves when there is real confusion in the market.",
        whyNow:
          "Only most useful while the change is fresh.",
        confidence: 0.86
      },
      {
        id: "lev-r3",
        format: "Text post",
        title: "A cultural trend, but through the lens of leverage",
        hook: "The trend itself is not the point. The distribution lesson is.",
        angle:
          "Use a trending moment to teach a fast lesson about audience building or distribution.",
        outline: [
          "Reference the trend briefly.",
          "Extract the underlying principle.",
          "Close with a lesson for operators."
        ],
        platform: "x",
        cta: "Ask the audience what signal they are paying attention to.",
        why:
          "This lets the brand stay current without becoming generic trend content.",
        whyNow:
          "Only valuable while the trend is live.",
        confidence: 0.82
      },
      {
        id: "lev-r4",
        format: "Story sequence",
        title: "Conference live coverage with takeaways for builders",
        hook: "Skip the stage selfies. Tell people what actually mattered.",
        angle:
          "Capture one event insight at a time and make each one useful to the audience.",
        outline: [
          "Share the best quote from the room.",
          "Explain why it matters.",
          "End with one tactical lesson."
        ],
        platform: "instagram",
        cta: "Ask followers if they want a full recap.",
        why:
          "Fast conference synthesis keeps the brand timely and distinct.",
        whyNow:
          "Works best during the live event window.",
        confidence: 0.84
      },
      {
        id: "lev-r5",
        format: "Reel",
        title: "Same-day reaction to a breakout business story",
        hook: "The biggest stories move fast. The useful reaction has to move faster.",
        angle:
          "Give a concise response to a major business moment and frame it around strategy, not gossip.",
        outline: [
          "Open with the story everyone is seeing.",
          "Add one sharp interpretation.",
          "Close with the business lesson."
        ],
        platform: "instagram",
        cta: "Invite viewers to weigh in with their take.",
        why:
          "Fast response plus a strong viewpoint creates high engagement.",
        whyNow:
          "Best on the same day the story breaks.",
        confidence: 0.88
      }
    ],
    events: [
      {
        name: "Major creator economy headline",
        summary:
          "High relevance because the audience expects a quick but smart interpretation of what changed.",
        relevance: "93 match",
        timing: "Breaking now",
        tags: ["industry news", "high urgency", "commentary"]
      },
      {
        name: "Platform algorithm update",
        summary:
          "Strong opportunity for tactical explainer content that saves the audience time.",
        relevance: "87 match",
        timing: "Today",
        tags: ["platform shift", "education", "saveable"]
      },
      {
        name: "Founder conference week",
        summary:
          "Good chance for live event coverage and takeaway content.",
        relevance: "81 match",
        timing: "This week",
        tags: ["event", "founders", "live coverage"]
      }
    ],
    storyBank: [
      {
        title: "Founder failure lesson",
        body:
          "A real story about a public miss that later became a defining operating principle.",
        tags: ["founder", "lesson", "credibility"]
      },
      {
        title: "Growth desk day in the life",
        body:
          "Operational behind-the-scenes content that shows how fast-moving teams actually prioritize.",
        tags: ["operations", "behind the scenes", "team"]
      },
      {
        title: "Employee idea that won",
        body:
          "A story about a team member whose idea meaningfully improved growth or distribution.",
        tags: ["employee", "idea", "human story"]
      },
      {
        title: "Leverage myth",
        body:
          "A sharp point of view on the misconception that leverage is just about tools instead of systems.",
        tags: ["opinion", "positioning", "evergreen"]
      }
    ],
    calendar: [
      {
        day: "Mon",
        title: "Creator headline reaction",
        note: "Publish while the conversation still has energy.",
        badge: "Real-time"
      },
      {
        day: "Wed",
        title: "Founder failure lesson",
        note: "Anchor the week with a strong human story.",
        badge: "Evergreen"
      },
      {
        day: "Fri",
        title: "Growth desk day-in-the-life",
        note: "Close the week with a personality-led operational post.",
        badge: "Evergreen"
      }
    ]
  },
  {
    id: "siyata-ptt",
    name: "Siyata PTT",
    clientDescription:
      "A push-to-talk communications company for first responders, field teams, security, logistics, and mission-critical operations.",
    socialLinks: [],
    theme: {
      accent: "#0f766e",
      accentSoft: "rgba(15, 118, 110, 0.16)",
      highlight: "#ea580c",
      highlightSoft: "rgba(234, 88, 12, 0.14)",
      heroStart: "#163238",
      heroEnd: "#0f766e",
      orbA: "rgba(15, 118, 110, 0.24)",
      orbB: "rgba(234, 88, 12, 0.18)"
    }
  },
  {
    id: "dentiste-toothpaste",
    name: "Dentiste Toothpaste",
    clientDescription:
      "An oral-care brand built around fresh breath, nighttime routines, confidence, relationships, and everyday wellness.",
    socialLinks: [],
    theme: {
      accent: "#0891b2",
      accentSoft: "rgba(8, 145, 178, 0.15)",
      highlight: "#22c55e",
      highlightSoft: "rgba(34, 197, 94, 0.14)",
      heroStart: "#0f3f4a",
      heroEnd: "#0891b2",
      orbA: "rgba(8, 145, 178, 0.24)",
      orbB: "rgba(34, 197, 94, 0.18)"
    }
  },
  {
    id: "africas-business-heroes",
    name: "Africa's Business Heroes (ABH)",
    clientDescription:
      "An entrepreneurship initiative spotlighting African founders, small businesses, job creation, resilience, and innovation.",
    socialLinks: [],
    theme: {
      accent: "#b45309",
      accentSoft: "rgba(180, 83, 9, 0.16)",
      highlight: "#166534",
      highlightSoft: "rgba(22, 101, 52, 0.14)",
      heroStart: "#3b2715",
      heroEnd: "#b45309",
      orbA: "rgba(180, 83, 9, 0.24)",
      orbB: "rgba(22, 101, 52, 0.18)"
    }
  },
  {
    id: "interfaith-sustain",
    name: "Interfaith",
    clientDescription:
      "A sustainability-focused interfaith organization connecting faith communities, climate action, stewardship, and practical cooperation.",
    socialLinks: [{ label: "Website", url: "https://interfaithsustain.com/" }],
    theme: {
      accent: "#4d7c0f",
      accentSoft: "rgba(77, 124, 15, 0.16)",
      highlight: "#0e7490",
      highlightSoft: "rgba(14, 116, 144, 0.14)",
      heroStart: "#22351c",
      heroEnd: "#4d7c0f",
      orbA: "rgba(77, 124, 15, 0.24)",
      orbB: "rgba(14, 116, 144, 0.18)"
    }
  }
];

const IDEA_DATE = "2026-04-23";
const LIVE_LOAD_DELAY_MS = 350;
const SNAPSHOT_INITIAL_HUMAN_LIMIT = 3;
const SNAPSHOT_INITIAL_REALTIME_LIMIT = 5;
const REALTIME_MAX_AGE_DAYS = 7;
const state = {
  selectedClientId: dashboardData[0].id,
  liveSignalsByClient: {},
  liveRequestByClient: {},
  liveLoadTimersByClient: {},
  liveErrorByClient: {},
  preferSnapshot: false,
  humanAppendRequestByClient: {},
  realtimeAppendRequestByClient: {},
  ingestQueue: Promise.resolve(),
  storyFeedback: {}
};

const elements = {
  clientTabs: document.getElementById("client-tabs"),
  clientName: document.getElementById("client-name"),
  clientSummary: document.getElementById("client-summary"),
  clientSocials: document.getElementById("client-socials"),
  evergreenList: document.getElementById("evergreen-list"),
  realtimeList: document.getElementById("realtime-list"),
  fetchMoreStories: document.getElementById("fetch-more-stories"),
  fetchMoreEvents: document.getElementById("fetch-more-events"),
  evergreenCardTemplate: document.getElementById("evergreen-card-template"),
  realtimeCardTemplate: document.getElementById("realtime-card-template")
};

function currentClient() {
  return dashboardData.find((client) => client.id === state.selectedClientId) || dashboardData[0];
}

function currentLiveRecord(client) {
  return state.liveSignalsByClient[client.id] || null;
}

function isLiveRequestPending(clientId) {
  return ["queued", "loading"].includes(state.liveRequestByClient[clientId]);
}

function isAnyUserRequestBusy() {
  const hasLiveLoad = Object.values(state.liveRequestByClient).some((status) =>
    ["queued", "loading"].includes(status)
  );
  const hasHumanAppend = Object.values(state.humanAppendRequestByClient).includes("loading");
  const hasRealtimeAppend = Object.values(state.realtimeAppendRequestByClient).includes("loading");

  return hasLiveLoad || hasHumanAppend || hasRealtimeAppend;
}

function formatDateOnly(value) {
  if (!value) return "No live date yet";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function formatDateTime(value) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function cleanStoryTitle(title) {
  return (title || "").replace(/\*\*/g, "").trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function humanSubjectLabel(descriptor) {
  const text = (descriptor || "").toLowerCase();
  if (text.includes("woman")) return "This woman";
  if (text.includes("girl")) return "This girl";
  if (text.includes("boy")) return "This boy";
  if (text.includes("student")) return "This student";
  if (text.includes("founder")) return "This founder";
  if (text.includes("teacher")) return "This teacher";
  if (text.includes("developer")) return "This developer";
  if (text.includes("trader")) return "This trader";
  if (text.includes("survivor")) return "This survivor";
  if (text.includes("family")) return "This family";
  if (text.includes("team")) return "This team";
  return "This guy";
}

function shortenWords(text, maxWords = 9) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  return words.slice(0, maxWords).join(" ");
}

function meaningfulTitleTokens(text) {
  return [...new Set(
    String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(
        (token) =>
          token &&
          (token.length >= 4 || /\d/.test(token)) &&
          ![
            "this",
            "that",
            "with",
            "from",
            "into",
            "will",
            "could",
            "should",
            "would",
            "story",
            "news",
            "update",
            "change",
            "changes",
            "warning",
            "deadline",
            "quiet",
            "smallest",
            "biggest",
            "everyone",
            "nobody",
            "about",
            "after",
            "before",
            "scholarship",
            "event",
            "policy",
            "report",
            "week",
            "award"
          ].includes(token)
      )
  )];
}

function titleMatchesSubject(title, subject) {
  const titleTokens = meaningfulTitleTokens(title);
  const subjectTokens = meaningfulTitleTokens(subject);

  if (!titleTokens.length || !subjectTokens.length) {
    return false;
  }

  return subjectTokens.some((token) => titleTokens.includes(token));
}

function isGenericRealtimeTitle(title) {
  const normalized = cleanStoryTitle(title).toLowerCase();
  if (!normalized) {
    return true;
  }

  return [
    /^the good news that comes with a warning$/,
    /^the smallest deadline with the biggest consequences$/,
    /^the quiet crisis everyone will notice too late$/,
    /^the boring update that could affect millions$/,
    /^the quiet change that could affect everyone$/,
    /^the weird news everyone will understand too late$/,
    /^the most urgent story nobody is talking about$/,
    /^the smallest update with the biggest consequences$/,
    /^the tiny deadline that could become a huge story$/,
    /^the global moment hidden inside\b/,
    /^this .+ could become the next big story$/,
    /^the .+ story nobody is talking about$/
  ].some((pattern) => pattern.test(normalized));
}

function hasNasDailyShape(title) {
  const normalized = cleanStoryTitle(title);
  if (!normalized) {
    return false;
  }

  return (
    /^(How|Why|What)\b/.test(normalized) ||
    /\b(biggest|smallest|first|last|only|fastest|most|least|highest|lowest)\b/i.test(normalized) ||
    /\b(but|despite|still|yet)\b/i.test(normalized) ||
    /\b(could|changed|opened|launched|warns|warning|crisis|deadline|problem|risk)\b/i.test(normalized)
  );
}

function tightenRealtimeTitle(text, maxWords = 14) {
  const cleaned = cleanStoryTitle(text).replace(/[.,;:!?]+$/, "").trim();
  if (!cleaned) {
    return "";
  }

  const shortened = shortenWords(cleaned, maxWords) || cleaned;
  return shortened
    .replace(/[.,;:!?]+$/, "")
    .replace(/\b(and|or|with|for|from|into|recognizing|highlighting|including|about)$/i, "")
    .trim();
}

function preferredSubjectAnchor(subject) {
  const rawTokens = cleanStoryTitle(subject)
    .split(/\s+/)
    .map((token) => token.replace(/[^A-Za-z0-9]/g, ""))
    .filter(Boolean);

  const uppercaseOrNumeric = rawTokens.find(
    (token) => /\d/.test(token) || /^[A-Z0-9]{2,}$/.test(token) || /^[A-Z][a-zA-Z0-9]+$/.test(token)
  );

  if (uppercaseOrNumeric) {
    return uppercaseOrNumeric.toLowerCase();
  }

  const tokens = meaningfulTitleTokens(subject);
  return tokens[0] || "";
}

function capitalizeFirst(text) {
  const value = String(text || "").trim();
  return value ? value[0].toUpperCase() + value.slice(1) : "";
}

function stripSourceArtifacts(text) {
  return String(text || "")
    .replace(/\(\[[^\]]+\]\([^)]+\)\)/g, "")
    .replace(/\[[^\]]+\]\([^)]+\)/g, "")
    .replace(/\([^)]*utm_source=openai[^)]*\)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function removeLeadingSubject(text, subject) {
  const cleanedText = String(text || "").trim();
  const cleanedSubject = cleanStoryTitle(subject);

  if (!cleanedText || !cleanedSubject) {
    return cleanedText;
  }

  const escapedSubject = cleanedSubject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const subjectPattern = new RegExp(`^${escapedSubject}(?:,\\s*[^,]+,?)?\\s*`, "i");
  return cleanedText.replace(subjectPattern, "").trim();
}

function extractLeadFact(signal) {
  return stripSourceArtifacts(clipToSentences(signal.summary || "", 1))
    .split(/,\s+(?=[a-z])/)[0]
    .replace(/[.]+$/, "")
    .trim();
}

function extractActionClause(signal) {
  const leadFact = extractLeadFact(signal);
  let clause = removeLeadingSubject(leadFact, signal.event_or_subject || "")
    .replace(/^(an?|the)\s+/i, "")
    .replace(/^(this|that)\s+/i, "")
    .replace(/^(is|are|was|were|has|have|had)\s+/i, "")
    .replace(/,\s*(raising|highlighting|showing|creating|making|leading to|turning)\b.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!clause) {
    clause = leadFact;
  }

  return shortenWords(
    clause
      .replace(/[.]+$/, "")
      .replace(/\b(users|people|students|traders)\s+that\b/gi, "$1 who")
      .trim(),
    12
  );
}

function inferRealtimeMode(signal) {
  const context = `${signal.event_or_subject || ""} ${signal.summary || ""}`.toLowerCase();

  if (/\bvisa|policy|rule|regulation|ban|law\b/.test(context)) return "policy";
  if (/\boutage|offline|bug|exploit|hack|breach|security|risk|warning|warns\b/.test(context)) return "risk";
  if (/\bscholarship|funding|grant|admission|research spot|application|opens|launches\b/.test(context)) return "opportunity";
  if (/\bwho|report|survey|study|research|data\b/.test(context)) return "report";
  if (/\bbitcoin|solana|crypto|market|token|defi|wallet|trader|liquidation\b/.test(context)) return "market";
  if (/\bpublic safety|police|rescue|first responder|dispatch|emergency\b/.test(context)) return "safety";
  if (/\bstartup|founder|funding|accelerator|investment\b/.test(context)) return "business";
  return "general";
}

function extractRegion(text) {
  const value = `${text || ""}`;
  const knownRegions = [
    "Africa",
    "India",
    "Japan",
    "Europe",
    "Asia",
    "America",
    "China",
    "Canada",
    "Australia",
    "Israel"
  ];

  for (const region of knownRegions) {
    if (new RegExp(`\\b${region}\\b`, "i").test(value)) {
      return region;
    }
  }

  return "";
}

function inferHumanGroup(signal) {
  const context = `${signal.event_or_subject || ""} ${signal.summary || ""}`;

  if (/\bindian scholars?\b/i.test(context)) return "Indian Scholars";
  if (/\bindian students?\b/i.test(context)) return "Indian Students";
  if (/\bstudents?\b/i.test(context)) return "Students";
  if (/\btraders?\b/i.test(context)) return "Traders";
  if (/\bfounders?\b/i.test(context)) return "Founders";
  if (/\bbuilders?\b/i.test(context)) return "Builders";
  if (/\bpatients?\b/i.test(context)) return "Patients";
  if (/\bfamil(?:y|ies)\b/i.test(context)) return "Families";
  if (/\bresponders?\b/i.test(context)) return "First Responders";
  return "People";
}

function universalNeedPhrase(signal) {
  const context = `${signal.event_or_subject || ""} ${signal.summary || ""}`.toLowerCase();
  const region = extractRegion(context) || "the world";

  if (/\boral|tooth|toothpaste|dental\b/.test(context)) {
    return `Why ${region} needs more toothpaste`;
  }

  if (/\bvisa|student|scholarship|admission|university\b/.test(context)) {
    return `Why ${region} needs more student options`;
  }

  if (/\bpublic safety|dispatch|emergency|rescue\b/.test(context)) {
    return `Why every emergency needs better communication`;
  }

  return "";
}

function universalWhyTitle(signal) {
  const context = `${signal.event_or_subject || ""} ${signal.summary || ""}`;
  const mode = inferRealtimeMode(signal);
  const region = extractRegion(context);
  const group = inferHumanGroup(signal);
  const subject = cleanStoryTitle(tightenRealtimeTitle(signal.event_or_subject || "", 12));

  if (mode === "opportunity" && region && /\bscholar|student|research\b/i.test(context)) {
    return `Why ${region} loves ${group}`;
  }

  if (mode === "report") {
    const need = universalNeedPhrase(signal);
    if (need) {
      return need;
    }
  }

  if (mode === "policy" && /\bvisa|student\b/i.test(context)) {
    return `Why student visas keep changing lives`;
  }

  if (mode === "market" && /\bborrow|limit|defi|liquidation|token\b/i.test(context)) {
    return `Why traders always want bigger bets`;
  }

  if (mode === "risk" && /\bsolana\b/i.test(context)) {
    return "Why Solana keeps testing its believers";
  }

  if (mode === "risk" && subject) {
    return `Why ${subject} matters more than it looks`;
  }

  if (mode === "business" && /\bstartup|founder|funding\b/i.test(context)) {
    return "Why the next big winners need bigger doors";
  }

  return "";
}

function candidateFromLeadFact(signal) {
  const subject = tightenRealtimeTitle(signal.event_or_subject || "", 12);
  const normalizedSubject = cleanStoryTitle(subject);
  const leadFact = extractLeadFact(signal);

  if (!leadFact) {
    return "";
  }

  if (!normalizedSubject) {
    return capitalizeFirst(leadFact);
  }

  const withoutSubject = removeLeadingSubject(leadFact, normalizedSubject);
  if (withoutSubject && withoutSubject !== leadFact) {
    return `${normalizedSubject} ${withoutSubject}`.replace(/\s+/g, " ").trim();
  }

  return capitalizeFirst(leadFact);
}

function isShortActionClause(actionClause) {
  const words = String(actionClause || "").split(/\s+/).filter(Boolean);
  return words.length > 0 && words.length <= 8;
}

function startsWithProperNounPhrase(text) {
  const firstWord = String(text || "").trim().split(/\s+/)[0] || "";
  return /^[A-Z][a-zA-Z0-9'-]+$/.test(firstWord);
}

function buildRealtimeTitleCandidates(signal) {
  const subject = tightenRealtimeTitle(signal.event_or_subject || "", 12);
  const normalizedSubject = cleanStoryTitle(subject);
  const actionClause = extractActionClause(signal);
  const leadFact = extractLeadFact(signal);
  const mode = inferRealtimeMode(signal);
  const candidates = new Set();
  const universalTitle = universalWhyTitle(signal);

  if (universalTitle) {
    candidates.add(universalTitle);
  }

  if (leadFact) {
    candidates.add(candidateFromLeadFact(signal));
    candidates.add(shortenWords(candidateFromLeadFact(signal), 12));
  }

  if (normalizedSubject) {
    candidates.add(normalizedSubject);
  }

  if (normalizedSubject && actionClause && isShortActionClause(actionClause)) {
    candidates.add(`${normalizedSubject} ${actionClause}`);
  }

  if (normalizedSubject && actionClause && isShortActionClause(actionClause) && !startsWithProperNounPhrase(actionClause)) {
    candidates.add(`Why ${normalizedSubject} ${actionClause}`);
    candidates.add(`How ${normalizedSubject} ${actionClause}`);
  }

  if (normalizedSubject) {
    if (mode === "policy") {
      candidates.add(`How ${normalizedSubject} could change student plans`);
      candidates.add(`${normalizedSubject} could change where students apply`);
    } else if (mode === "risk") {
      candidates.add(`Why ${normalizedSubject} could become a bigger problem`);
      candidates.add(`${normalizedSubject} just raised a bigger question`);
    } else if (mode === "opportunity") {
      candidates.add(`How ${normalizedSubject} could open a new door`);
      candidates.add(`${normalizedSubject} just opened a new door`);
    } else if (mode === "report") {
      candidates.add(`What ${normalizedSubject} says about real life`);
      candidates.add(`${normalizedSubject} just made this problem feel real`);
    } else if (mode === "market") {
      candidates.add(`Why ${normalizedSubject} could move traders now`);
      candidates.add(`${normalizedSubject} could hit traders faster than expected`);
    } else if (mode === "safety") {
      candidates.add(`Why ${normalizedSubject} could save critical seconds`);
      candidates.add(`${normalizedSubject} could matter when every second counts`);
    } else if (mode === "business") {
      candidates.add(`Why ${normalizedSubject} could shape who wins next`);
      candidates.add(`${normalizedSubject} could change the next startup wave`);
    } else {
      candidates.add(`Why ${normalizedSubject} matters right now`);
    }
  }

  return [...candidates]
    .map((candidate) => cleanStoryTitle(candidate).replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function scoreRealtimeTitleCandidate(title, signal) {
  const normalized = cleanStoryTitle(title);
  const mode = inferRealtimeMode(signal);
  const tokenCount = normalized.split(/\s+/).filter(Boolean).length;
  let score = 0;

  if (!normalized) {
    return -Infinity;
  }

  score += Math.min(meaningfulTitleTokens(normalized).length, 8);
  if (/^(How|Why|What)\b/.test(normalized)) score += 2;
  if (/\d/.test(normalized)) score += 2;
  if (titleMatchesSubject(normalized, signal.event_or_subject || "")) score += 3;
  if (hasNasDailyShape(normalized)) score += 2;
  if (tokenCount <= 13) score += 1;
  if (/\b(opened|opens|raised|raises|warned|warns|says|launches|cuts|cut|wins|funded)\b/i.test(normalized)) score += 2;

  if (/\bmatters right now\b/i.test(normalized)) score -= 3;
  if (/\bcould\b/i.test(normalized) && !/\d/.test(normalized)) score -= 1;
  if (/\bthing|stuff|story|update\b/i.test(normalized)) score -= 3;
  if (tokenCount > 14) score -= 4;

  if (mode === "risk" && /\bproblem|warning|offline|risk|question\b/i.test(normalized)) score += 2;
  if (mode === "opportunity" && /\bopened|door|funded|grant|scholarship\b/i.test(normalized)) score += 2;
  if (mode === "report" && /\bwhat|says|report|study|who\b/i.test(normalized)) score += 2;
  if (mode === "market" && /\btraders|market|solana|bitcoin|defi\b/i.test(normalized)) score += 2;

  return score;
}

function looksConcreteHeadline(text) {
  const normalized = cleanStoryTitle(text);
  if (!normalized) {
    return false;
  }

  const tokenCount = normalized.split(/\s+/).filter(Boolean).length;
  const hasConcreteVerb = /\b(opens?|opened|raises?|raised|warns?|warned|says?|said|cuts?|cut|launches?|launched|wins?|won|funded|changes?|changed|offline)\b/i.test(normalized);
  const hasNumber = /\d/.test(normalized);
  const hasNamedEntity = /[A-Z][a-zA-Z0-9'-]+(?:\s+[A-Z][a-zA-Z0-9'-]+)+/.test(normalized) || /^[A-Z0-9][A-Za-z0-9' -]+$/.test(normalized);

  return tokenCount >= 4 && hasNamedEntity && (hasConcreteVerb || hasNumber);
}

function pickBestRealtimeTitleCandidate(signal) {
  const universalTitle = cleanStoryTitle(universalWhyTitle(signal));
  if (universalTitle) {
    return universalTitle;
  }

  const candidates = buildRealtimeTitleCandidates(signal);
  if (!candidates.length) {
    const subjectHeadline = cleanStoryTitle(tightenRealtimeTitle(signal.event_or_subject || "", 12));
    if (looksConcreteHeadline(subjectHeadline)) {
      return subjectHeadline;
    }

    const leadHeadline = cleanStoryTitle(shortenWords(extractLeadFact(signal), 12));
    if (looksConcreteHeadline(leadHeadline)) {
      return leadHeadline;
    }

    return "";
  }

  return candidates
    .map((candidate) => ({
      candidate,
      score: scoreRealtimeTitleCandidate(candidate, signal)
    }))
    .sort((left, right) => right.score - left.score || left.candidate.length - right.candidate.length)[0]
    .candidate;
}

function pickSpecificRealtimeTitle(signal) {
  const subject = tightenRealtimeTitle(signal.event_or_subject || "", 14);
  const rawSummaryLead = clipToSentences(signal.summary || "", 1);
  const summaryLead = tightenRealtimeTitle(rawSummaryLead, 14);

  if (summaryLead && subject && !rawSummaryLead.includes(",")) {
    const subjectTokens = meaningfulTitleTokens(subject);
    const summaryTokens = meaningfulTitleTokens(summaryLead);
    const addsSpecifics = summaryTokens.some((token) => !subjectTokens.includes(token));
    const startsWithSubjectWord = summaryLead
      .toLowerCase()
      .startsWith((subject.split(/\s+/)[0] || "").toLowerCase());

    if (addsSpecifics && startsWithSubjectWord) {
      return summaryLead;
    }
  }

  return subject || summaryLead || "";
}

function summarizeConsequence(signal) {
  const summary = clipToSentences(signal.summary || "", 1);
  const lowered = summary.toLowerCase();

  if (/\bvisa|policy|rule|regulation|ban|law\b/.test(lowered)) {
    return "could change student plans";
  }

  if (/\bhack|breach|security|exploit|attack|outage|offline|bug\b/.test(lowered)) {
    return "could hit trust fast";
  }

  if (/\bscholarship|funding|grant|admission|research spot\b/.test(lowered)) {
    return "could open a bigger door";
  }

  if (/\bhealth|oral|dental|microbiome|sleep|who\b/.test(lowered)) {
    return "is bigger than people think";
  }

  if (/\bsolana|bitcoin|crypto|market|trader|liquidation|defi\b/.test(lowered)) {
    return "could hit traders next";
  }

  if (/\bpublic safety|police|rescue|first responder|dispatch|emergency\b/.test(lowered)) {
    return "could cost real seconds";
  }

  if (/\bclimate|interfaith|faith|garden|community\b/.test(lowered)) {
    return "shows how local action scales";
  }

  if (/\beducation|student|university|school\b/.test(lowered)) {
    return "could change where students go";
  }

  if (/\bfunding|founder|startup|accelerator\b/.test(lowered)) {
    return "could change who wins next";
  }

  return "could matter more than it looks";
}

function deriveRealtimeTitleFrame(signal) {
  return pickBestRealtimeTitleCandidate(signal);
}

function nasDailyTitleFromSpecifics(signal) {
  return deriveRealtimeTitleFrame(signal);
}

function formatHumanStoryTitle(story) {
  const rawTitle = cleanStoryTitle(story.title);
  if (/^this\s/i.test(rawTitle)) {
    return rawTitle;
  }

  const subject = humanSubjectLabel(story.person_descriptor);
  const person = (story.person_or_subject || "").trim();
  let firstSentence = ((story.summary || "").match(/[^.!?]+/) || [""])[0].trim();

  if (person) {
    const personPattern = new RegExp(`^${escapeRegExp(person)}(?:,\\s*[^,]+,)?\\s*`, "i");
    firstSentence = firstSentence.replace(personPattern, "");
  }

  firstSentence = firstSentence
    .replace(/^(who|that)\s+/i, "")
    .replace(/^(is|was|has|had)\s+/i, "")
    .replace(/^(a|an|the)\s+[^,]+,\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!firstSentence) {
    return rawTitle;
  }

  const action = shortenWords(firstSentence, 10).replace(/^[A-Z]/, (char) => char.toLowerCase());
  return `${subject} ${action}`;
}

function sourceDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (_error) {
    return "source";
  }
}

function sourceLabel(url) {
  const domain = sourceDomain(url);
  return domain.charAt(0).toUpperCase() + domain.slice(1);
}

function clipToSentences(text, maxSentences = 5) {
  const normalized = (text || "").trim().replace(/\s+/g, " ");
  if (!normalized) return "";
  const matches = normalized.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [normalized];
  return matches
    .slice(0, maxSentences)
    .map((sentence) => sentence.trim())
    .join(" ");
}

function currentClientRecord(clientId) {
  return state.liveSignalsByClient[clientId] || null;
}

function formatPostBefore(signal) {
  if (!signal?.published_at) {
    return "Post before: while the event is still fresh.";
  }

  const urgency = (signal.urgency || "").toLowerCase();
  let hoursToAdd = 48;
  if (urgency.includes("today") || urgency.includes("high")) hoursToAdd = 24;
  if (urgency.includes("week")) hoursToAdd = 96;
  if (urgency.includes("month")) hoursToAdd = 120;

  const postBefore = new Date(new Date(signal.published_at).getTime() + hoursToAdd * 60 * 60 * 1000);
  return `Post before ${formatDateOnly(postBefore.toISOString())}`;
}

function isRecentRealtimeSignal(signal) {
  const publishedAt = signal?.published_at;
  if (!publishedAt) {
    return false;
  }

  const publishedDate = new Date(publishedAt);
  if (Number.isNaN(publishedDate.getTime())) {
    return false;
  }

  return Date.now() - publishedDate.getTime() <= REALTIME_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
}

function cleanLessonText(text) {
  return String(text || "")
    .replace(/^lesson:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function inferRealtimeLesson(signal) {
  const context = [
    signal.event_or_subject || "",
    signal.summary || "",
    signal.why_it_fits || ""
  ]
    .join(" ")
    .toLowerCase();

  if (/\bvisa|policy|government|rule|regulation|law|ban\b/.test(context)) {
    return "A boring policy change can quietly change someone's whole future.";
  }

  if (/\bstudent|scholarship|admission|university|study abroad|education\b/.test(context)) {
    return "The biggest education stories are really about access.";
  }

  if (/\bhealth|medical|oral|tooth|teeth|dent|sleep|microbiome|doctor|clinic\b/.test(context)) {
    return "Health stories spread when people can feel the change in daily life.";
  }

  if (/\bcrypto|bitcoin|solana|wallet|trader|token|defi|market|hack|security\b/.test(context)) {
    return "Money stories go viral when the risk suddenly feels human.";
  }

  if (/\bstartup|founder|funding|investor|business|entrepreneur\b/.test(context)) {
    return "The strongest business stories show one new door opening for real people.";
  }

  if (/\bfirst responder|dispatch|public safety|emergency|ambulance|fire|responder|communication\b/.test(context)) {
    return "The best safety stories reveal the invisible system people rely on.";
  }

  if (/\bholocaust|survivor|memory|remembrance|wiesel|genocide|dialogue\b/.test(context)) {
    return "History matters most when one human voice makes it impossible to ignore.";
  }

  if (/\bclimate|faith|interfaith|sustain|garden|environment\b/.test(context)) {
    return "Big global problems feel real when one small action becomes visible.";
  }

  return "The best viral news stories are the ones that quickly show what changes for people.";
}

function formatRealtimeLesson(signal) {
  return cleanLessonText(signal?.lesson) || inferRealtimeLesson(signal);
}

function formatNasDailyEventTitle(signal) {
  const rawTitle = cleanStoryTitle(signal.title);
  const subject = cleanStoryTitle(signal.event_or_subject || "");
  const specificFallback = pickSpecificRealtimeTitle(signal);
  const subjectAnchor = preferredSubjectAnchor(subject);
  const rawIncludesAnchor = subjectAnchor
    ? meaningfulTitleTokens(rawTitle).includes(subjectAnchor)
    : false;

  if (
    rawTitle &&
    !isGenericRealtimeTitle(rawTitle) &&
    (!subject || (titleMatchesSubject(rawTitle, subject) && (!subjectAnchor || rawIncludesAnchor))) &&
    hasNasDailyShape(rawTitle)
  ) {
    return rawTitle;
  }

  return nasDailyTitleFromSpecifics(signal) || specificFallback || rawTitle || "Live story";
}

function renderEmptyState(container, message) {
  container.innerHTML = `<div class="empty-state">${message}</div>`;
}

function clearPendingLiveLoads() {
  Object.values(state.liveLoadTimersByClient).forEach((timer) => clearTimeout(timer));
  state.liveLoadTimersByClient = {};

  Object.entries(state.liveRequestByClient).forEach(([clientId, status]) => {
    if (status === "queued") {
      state.liveRequestByClient[clientId] = "idle";
    }
  });
}

function renderClientTabs() {
  elements.clientTabs.innerHTML = "";
  const isBusy = isAnyUserRequestBusy();
  dashboardData.forEach((client) => {
    const button = document.createElement("button");
    const isActive = client.id === state.selectedClientId;
    button.type = "button";
    button.className = `client-tab ${isActive ? "is-active" : ""}`;
    button.disabled = isBusy && !isActive;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", isActive ? "true" : "false");
    button.innerHTML = `<span class="client-tab-title">${client.name}</span>`;
    button.addEventListener("click", () => {
      if (state.selectedClientId === client.id || isAnyUserRequestBusy()) {
        return;
      }

      clearPendingLiveLoads();
      state.selectedClientId = client.id;
      render();
    });
    elements.clientTabs.appendChild(button);
  });
}

function applyClientTheme(client) {
  const root = document.documentElement;
  root.style.setProperty("--client-accent", client.theme.accent);
  root.style.setProperty("--client-accent-soft", client.theme.accentSoft);
  root.style.setProperty("--client-highlight", client.theme.highlight);
  root.style.setProperty("--client-highlight-soft", client.theme.highlightSoft);
  root.style.setProperty("--client-hero-start", client.theme.heroStart);
  root.style.setProperty("--client-hero-end", client.theme.heroEnd);
  root.style.setProperty("--client-orb-a", client.theme.orbA);
  root.style.setProperty("--client-orb-b", client.theme.orbB);
}

async function loadSnapshotSignals(clientId, upstreamError) {
  const response = await fetch("/data/real-ingestion-snapshot.json");
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || "Snapshot fallback failed");
  }

  const result = payload.results?.find((entry) => entry.client_id === clientId);

  if (!result) {
    throw new Error(`No sourced snapshot found for ${clientId}`);
  }

  return {
    ranAt: payload.ran_at,
    warning: null,
    humanStorySignals: (result.human_story_signals || []).slice(0, SNAPSHOT_INITIAL_HUMAN_LIMIT),
    realtimeEventSignals: (result.realtime_event_signals || [])
      .filter(isRecentRealtimeSignal)
      .slice(0, SNAPSHOT_INITIAL_REALTIME_LIMIT),
    sourceMode: payload.mode || "snapshot",
    sourceNote: payload.source_note || upstreamError || "Showing sourced snapshot data."
  };
}

async function loadSnapshotSectionSignals(clientId, section) {
  const response = await fetch("/data/real-ingestion-snapshot.json");
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    return [];
  }

  const result = payload.results?.find((entry) => entry.client_id === clientId);
  if (!result) {
    return [];
  }

  return section === "human"
    ? result.human_story_signals || []
    : (result.realtime_event_signals || []).filter(isRecentRealtimeSignal);
}

async function getUnusedSnapshotSignals(clientId, section) {
  const existing = collectSectionFingerprints(clientId, section);
  const snapshotSignals = await loadSnapshotSectionSignals(clientId, section);
  return snapshotSignals.filter((signal) => !existing.has(storyFingerprint(signal)));
}

async function topUpSignalsFromSnapshot(clientId, section, existingSignals, targetCount) {
  if ((existingSignals || []).length >= targetCount) {
    return existingSignals || [];
  }

  const seen = new Set((existingSignals || []).map(storyFingerprint));
  const snapshotSignals = await loadSnapshotSectionSignals(clientId, section);
  const extras = snapshotSignals.filter((signal) => !seen.has(storyFingerprint(signal)));
  return [...(existingSignals || []), ...extras].slice(0, targetCount);
}

function buildIngestUrl(clientId, options = {}) {
  const params = new URLSearchParams({ client: clientId });

  if (options.section) {
    params.set("section", options.section);
  }

  if (options.limit) {
    params.set("limit", String(options.limit));
  }

  if (options.humanLimit) {
    params.set("human_limit", String(options.humanLimit));
  }

  if (options.realtimeLimit) {
    params.set("realtime_limit", String(options.realtimeLimit));
  }

  if (options.exclude?.length) {
    params.set("exclude", JSON.stringify(options.exclude));
  }

  return `/api/stories?${params.toString()}`;
}

function fetchIngestPayload(clientId, options = {}) {
  const { section = null, limit = null, humanLimit = 5, realtimeLimit = 5, exclude = [] } = options;

  state.ingestQueue = state.ingestQueue
    .catch(() => null)
    .then(async () => {
      const response = await fetch(
        buildIngestUrl(clientId, { section, limit, humanLimit, realtimeLimit, exclude }),
        {
        cache: "no-store"
        }
      );
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Story database request failed");
      }

      return payload;
    });

  return state.ingestQueue;
}

async function loadLiveSignals(clientId, options = {}) {
  const { forceRefresh = false } = options;

  if (state.liveRequestByClient[clientId] === "loading") {
    return;
  }

  state.liveRequestByClient[clientId] = "loading";
  if (state.selectedClientId === clientId) {
    render();
  }

  try {
    if (state.preferSnapshot && !forceRefresh) {
      state.liveSignalsByClient[clientId] = await loadSnapshotSignals(clientId);
      delete state.liveErrorByClient[clientId];
      return;
    }

    const payload = await fetchIngestPayload(clientId, {
      humanLimit: 5,
      realtimeLimit: 5
    });

    const result = payload.results?.[0];
    if (
      result?.warning &&
      !((result?.human_story_signals || []).length || (result?.realtime_event_signals || []).length)
    ) {
      throw new Error(result.warning);
    }

    const humanStorySignals = await topUpSignalsFromSnapshot(
      clientId,
      "human",
      result?.human_story_signals || [],
      5
    );
    const realtimeEventSignals = await topUpSignalsFromSnapshot(
      clientId,
      "realtime",
      result?.realtime_event_signals || [],
      5
    );

    state.liveSignalsByClient[clientId] = {
      ranAt: payload.ran_at,
      warning: result?.warning || null,
      humanStorySignals,
      realtimeEventSignals,
      sourceMode: result?.source_mode || "database",
      sourceNote: result?.source_note || "Curated stories loaded from /api/stories."
    };
    delete state.liveErrorByClient[clientId];
  } catch (error) {
    if (String(error.message || "").includes("insufficient_quota")) {
      state.preferSnapshot = true;
    }

    try {
      state.liveSignalsByClient[clientId] = await loadSnapshotSignals(clientId, error.message);
      delete state.liveErrorByClient[clientId];
    } catch (snapshotError) {
      state.liveErrorByClient[clientId] = snapshotError.message;
    }
  } finally {
    state.liveRequestByClient[clientId] = "idle";
    if (state.selectedClientId === clientId) {
      render();
    }
  }
}

function storyFingerprint(story) {
  return [
    cleanStoryTitle(story.title || ""),
    story.person_or_subject || story.event_or_subject || "",
    (story.source_urls || []).join("|")
  ]
    .join("::")
    .toLowerCase();
}

function setFeedbackState(story, action) {
  state.storyFeedback[storyFingerprint(story)] = action;
}

function getFeedbackState(story) {
  return state.storyFeedback[storyFingerprint(story)] || null;
}

async function saveStoryFeedback(clientId, section, story, action) {
  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      section,
      action,
      story
    })
  });

  const payload = await response.json();
  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || "Could not save feedback");
  }

  setFeedbackState(story, action);
  return payload;
}

function collectSectionFingerprints(clientId, section) {
  const record = currentClientRecord(clientId);
  const list =
    section === "human" ? record?.humanStorySignals || [] : record?.realtimeEventSignals || [];
  return new Set(list.map(storyFingerprint));
}

function pickReplacement(section, clientId, candidates) {
  const existing = collectSectionFingerprints(clientId, section);
  return (candidates || []).find((candidate) => !existing.has(storyFingerprint(candidate))) || null;
}

async function fetchReplacementStory(clientId, section) {
  const payload = await fetchIngestPayload(clientId, {
    section,
    limit: 1,
    exclude: [...collectSectionFingerprints(clientId, section)]
  });

  const result = payload.results?.[0] || {};
  const candidates =
    section === "human" ? result.human_story_signals || [] : result.realtime_event_signals || [];

  return pickReplacement(section, clientId, candidates);
}

async function handleStoryReaction(clientId, section, story, action, buttons) {
  buttons.forEach((button) => {
    button.disabled = true;
  });

  try {
    await saveStoryFeedback(clientId, section, story, action);

    if (action === "like") {
      render();
      return;
    }

    const replacement = await fetchReplacementStory(clientId, section);
    const record = currentClientRecord(clientId);
    if (!record) {
      render();
      return;
    }

    if (section === "human") {
      const updated = (record.humanStorySignals || []).map((entry) =>
        storyFingerprint(entry) === storyFingerprint(story) ? replacement || null : entry
      );
      record.humanStorySignals = updated.filter(Boolean);
    } else {
      const updated = (record.realtimeEventSignals || []).map((entry) =>
        storyFingerprint(entry) === storyFingerprint(story) ? replacement || null : entry
      );
      record.realtimeEventSignals = updated.filter(Boolean);
    }

    render();
  } catch (error) {
    state.liveErrorByClient[clientId] = error.message;
    render();
  } finally {
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }
}

function bindFeedbackButtons(node, clientId, section, story) {
  const likeButton = node.querySelector(".like-button");
  const dislikeButton = node.querySelector(".dislike-button");
  const currentFeedback = getFeedbackState(story);

  if (currentFeedback === "like") {
    likeButton.classList.add("is-active");
  }

  if (currentFeedback === "dislike") {
    dislikeButton.classList.add("is-active");
  }

  likeButton.addEventListener("click", () =>
    handleStoryReaction(clientId, section, story, "like", [likeButton, dislikeButton])
  );
  dislikeButton.addEventListener("click", () =>
    handleStoryReaction(clientId, section, story, "dislike", [likeButton, dislikeButton])
  );
}

function mergeHumanStories(existingStories, incomingStories) {
  const merged = [...existingStories];
  const seen = new Set(existingStories.map(storyFingerprint));

  incomingStories.forEach((story) => {
    const fingerprint = storyFingerprint(story);
    if (!seen.has(fingerprint)) {
      seen.add(fingerprint);
      merged.push(story);
    }
  });

  return merged;
}

function mergeRealtimeSignals(existingSignals, incomingSignals) {
  const merged = [...existingSignals];
  const seen = new Set(existingSignals.map(storyFingerprint));

  incomingSignals.forEach((signal) => {
    const fingerprint = storyFingerprint(signal);
    if (!seen.has(fingerprint)) {
      seen.add(fingerprint);
      merged.push(signal);
    }
  });

  return merged;
}

async function fetchMoreHumanStories(clientId) {
  if (state.humanAppendRequestByClient[clientId] === "loading") {
    return;
  }

  state.humanAppendRequestByClient[clientId] = "loading";
  delete state.liveErrorByClient[clientId];
  if (state.selectedClientId === clientId) {
    render();
  }

  try {
    const payload = await fetchIngestPayload(clientId, {
      section: "human",
      limit: 5,
      exclude: [...collectSectionFingerprints(clientId, "human")]
    });

    const result = payload.results?.[0];
    const existingRecord = state.liveSignalsByClient[clientId] || {
      ranAt: payload.ran_at,
      warning: null,
      humanStorySignals: [],
      realtimeEventSignals: [],
      sourceMode: "live",
      sourceNote: "Live web ingestion from /api/ingest."
    };

    let incomingStories = result?.human_story_signals || [];
    if (!incomingStories.length && result?.warning) {
      incomingStories = await getUnusedSnapshotSignals(clientId, "human");
    }

    state.liveSignalsByClient[clientId] = {
      ...existingRecord,
      ranAt: payload.ran_at,
      warning: result?.warning || existingRecord.warning || null,
      humanStorySignals: mergeHumanStories(
        existingRecord.humanStorySignals || [],
        incomingStories
      )
    };
    delete state.liveErrorByClient[clientId];
  } catch (error) {
    state.liveErrorByClient[clientId] = error.message;
  } finally {
    state.humanAppendRequestByClient[clientId] = "idle";
    if (state.selectedClientId === clientId) {
      render();
    }
  }
}

async function fetchMoreRealtimeEvents(clientId) {
  if (state.realtimeAppendRequestByClient[clientId] === "loading") {
    return;
  }

  state.realtimeAppendRequestByClient[clientId] = "loading";
  delete state.liveErrorByClient[clientId];
  if (state.selectedClientId === clientId) {
    render();
  }

  try {
    const payload = await fetchIngestPayload(clientId, {
      section: "realtime",
      limit: 5,
      exclude: [...collectSectionFingerprints(clientId, "realtime")]
    });

    const result = payload.results?.[0];
    const existingRecord = state.liveSignalsByClient[clientId] || {
      ranAt: payload.ran_at,
      warning: null,
      humanStorySignals: [],
      realtimeEventSignals: [],
      sourceMode: "live",
      sourceNote: "Live web ingestion from /api/ingest."
    };

    let incomingSignals = result?.realtime_event_signals || [];
    if (!incomingSignals.length && result?.warning) {
      incomingSignals = await getUnusedSnapshotSignals(clientId, "realtime");
    }

    state.liveSignalsByClient[clientId] = {
      ...existingRecord,
      ranAt: payload.ran_at,
      warning: result?.warning || existingRecord.warning || null,
      realtimeEventSignals: mergeRealtimeSignals(
        existingRecord.realtimeEventSignals || [],
        incomingSignals
      )
    };
    delete state.liveErrorByClient[clientId];
  } catch (error) {
    state.liveErrorByClient[clientId] = error.message;
  } finally {
    state.realtimeAppendRequestByClient[clientId] = "idle";
    if (state.selectedClientId === clientId) {
      render();
    }
  }
}

function ensureLiveSignals(client) {
  if (
    state.liveSignalsByClient[client.id] ||
    state.liveErrorByClient[client.id] ||
    isLiveRequestPending(client.id)
  ) {
    return;
  }

  state.liveRequestByClient[client.id] = "queued";
  state.liveLoadTimersByClient[client.id] = setTimeout(() => {
    delete state.liveLoadTimersByClient[client.id];
    loadLiveSignals(client.id);
  }, LIVE_LOAD_DELAY_MS);
}

function renderEvergreenList(client) {
  elements.evergreenList.innerHTML = "";
  const liveRecord = currentLiveRecord(client);

  if (isLiveRequestPending(client.id) && !liveRecord) {
    renderEmptyState(elements.evergreenList, "Loading live human-story signals from the web...");
    return;
  }

  if (state.liveErrorByClient[client.id]) {
    renderEmptyState(elements.evergreenList, state.liveErrorByClient[client.id]);
    return;
  }

  if (!liveRecord) {
    renderEmptyState(elements.evergreenList, "Waiting for live ingestion...");
    return;
  }

  const stories = liveRecord.humanStorySignals;

  if (!stories.length) {
    renderEmptyState(
      elements.evergreenList,
      liveRecord.warning ||
        "No live human stories are available yet for this client and platform filter."
    );
    return;
  }

  stories.forEach((story, index) => {
    const sourceUrl = story.source_urls?.[0] || "#";
    const node = elements.evergreenCardTemplate.content.cloneNode(true);
    node.querySelector(".result-number").textContent = String(index + 1);
    node.querySelector(".person-name").textContent = story.person_or_subject;
    node.querySelector(".person-role").textContent = story.person_descriptor;
    node.querySelector(".idea-title").textContent = formatHumanStoryTitle(story);
    const summaryNode = node.querySelector(".story-summary");
    summaryNode.textContent = "";
    summaryNode.append(document.createTextNode(clipToSentences(story.summary, 5)));
    if (sourceUrl && sourceUrl !== "#") {
      summaryNode.append(document.createTextNode(" "));
      const inlineLink = document.createElement("a");
      inlineLink.className = "story-summary-link";
      inlineLink.href = sourceUrl;
      inlineLink.target = "_blank";
      inlineLink.rel = "noreferrer";
      inlineLink.textContent = "Learn more";
      summaryNode.append(inlineLink);
      summaryNode.append(document.createTextNode("."));
    }
    node.querySelector(".viral-reason").textContent = story.why_could_go_viral;
    node.querySelector(".story-lesson").textContent = story.lesson;
    bindFeedbackButtons(node, client.id, "human", story);
    elements.evergreenList.appendChild(node);
  });
}

function renderRealtimeList(client) {
  elements.realtimeList.innerHTML = "";
  const liveRecord = currentLiveRecord(client);

  if (isLiveRequestPending(client.id) && !liveRecord) {
    renderEmptyState(elements.realtimeList, "Loading live event signals from the web...");
    return;
  }

  if (state.liveErrorByClient[client.id]) {
    renderEmptyState(elements.realtimeList, state.liveErrorByClient[client.id]);
    return;
  }

  if (!liveRecord) {
    renderEmptyState(elements.realtimeList, "Waiting for live ingestion...");
    return;
  }

  const signals = liveRecord.realtimeEventSignals;

  if (!signals.length) {
    renderEmptyState(
      elements.realtimeList,
      liveRecord.warning ||
        "No live real-time signals are available yet for this client and platform filter."
    );
    return;
  }

  signals.forEach((signal, index) => {
    const node = elements.realtimeCardTemplate.content.cloneNode(true);
    const sourceUrl = signal.source_urls?.[0];
    const nasDailyTitle = formatNasDailyEventTitle(signal);
    node.querySelector(".result-number").textContent = String(index + 1);
    node.querySelector(".idea-title").textContent = nasDailyTitle;
    node.querySelector(".idea-hook").textContent = signal.summary;
    node.querySelector(".idea-angle").textContent = `Why it fits ${client.name}: ${signal.why_it_fits}`;
    node.querySelector(".idea-deadline").textContent = formatPostBefore(signal);
    const realtimeLink = node.querySelector(".realtime-link");
    if (sourceUrl) {
      realtimeLink.href = sourceUrl;
      realtimeLink.textContent = "Learn more";
    } else {
      realtimeLink.remove();
    }
    node.querySelector(".idea-nas-title").textContent = nasDailyTitle;
    node.querySelector(".idea-lesson").textContent = formatRealtimeLesson(signal);

    bindFeedbackButtons(node, client.id, "realtime", signal);
    elements.realtimeList.appendChild(node);
  });
}

function renderHeader(client) {
  elements.clientName.textContent = client.name;
  elements.clientSummary.textContent = client.clientDescription || client.summary;
  elements.clientSocials.innerHTML = "";
  (client.socialLinks || []).forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = link.label;
    elements.clientSocials.appendChild(anchor);
  });
}

function renderActionButtons(client) {
  const isHumanBusy =
    isLiveRequestPending(client.id) || state.humanAppendRequestByClient[client.id] === "loading";
  const isRealtimeBusy =
    isLiveRequestPending(client.id) ||
    state.realtimeAppendRequestByClient[client.id] === "loading";

  elements.fetchMoreStories.disabled = isHumanBusy;
  elements.fetchMoreStories.textContent =
    state.humanAppendRequestByClient[client.id] === "loading"
      ? "Fetching more stories..."
      : isLiveRequestPending(client.id)
        ? "Loading stories..."
        : "Fetch more stories";

  elements.fetchMoreEvents.disabled = isRealtimeBusy;
  elements.fetchMoreEvents.textContent =
    state.realtimeAppendRequestByClient[client.id] === "loading"
      ? "Fetching more events..."
      : isLiveRequestPending(client.id)
        ? "Loading events..."
        : "Fetch more events";
}

function render() {
  const client = currentClient();
  applyClientTheme(client);
  renderClientTabs();
  ensureLiveSignals(client);
  renderHeader(client);
  renderEvergreenList(client);
  renderRealtimeList(client);
  renderActionButtons(client);
}

elements.fetchMoreStories.addEventListener("click", async () => {
  const client = currentClient();
  if (isLiveRequestPending(client.id) || state.humanAppendRequestByClient[client.id] === "loading") {
    return;
  }
  await fetchMoreHumanStories(client.id);
});

elements.fetchMoreEvents.addEventListener("click", async () => {
  const client = currentClient();
  if (
    isLiveRequestPending(client.id) ||
    state.realtimeAppendRequestByClient[client.id] === "loading"
  ) {
    return;
  }
  await fetchMoreRealtimeEvents(client.id);
});

render();
