const dashboardData = [
  {
    id: "elie-wiesel-foundation",
    name: "Elie Wiesel Foundation",
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
  }
];

const IDEA_DATE = "2026-04-23";
const state = {
  selectedClientId: dashboardData[0].id,
  liveSignalsByClient: {},
  liveRequestByClient: {},
  liveErrorByClient: {},
  preferSnapshot: false,
  humanAppendRequestByClient: {},
  realtimeAppendRequestByClient: {},
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

function formatWhyNow(signal) {
  const published = signal?.published_at ? formatDateTime(signal.published_at) : "recently";
  const urgency = signal?.urgency ? signal.urgency.toLowerCase() : "still active";
  return `It was published ${published} and the attention window is ${urgency}, so this is still timely if the team moves now.`;
}

function renderEmptyState(container, message) {
  container.innerHTML = `<div class="empty-state">${message}</div>`;
}

function renderClientTabs() {
  elements.clientTabs.innerHTML = "";
  dashboardData.forEach((client) => {
    const button = document.createElement("button");
    const isActive = client.id === state.selectedClientId;
    button.type = "button";
    button.className = `client-tab ${isActive ? "is-active" : ""}`;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", isActive ? "true" : "false");
    button.innerHTML = `<span class="client-tab-title">${client.name}</span>`;
    button.addEventListener("click", () => {
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
    humanStorySignals: result.human_story_signals || [],
    realtimeEventSignals: result.realtime_event_signals || [],
    sourceMode: payload.mode || "snapshot",
    sourceNote: payload.source_note || upstreamError || "Showing sourced snapshot data."
  };
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

    const refreshParam = forceRefresh ? `&refresh=${Date.now()}` : "";
    const response = await fetch(
      `/api/ingest?client=${encodeURIComponent(clientId)}${refreshParam}`,
      { cache: "no-store" }
    );
    const payload = await response.json();

    if (!response.ok || !payload.ok) {
      throw new Error(payload.error || "Live ingestion failed");
    }

    const result = payload.results?.[0];
    if (
      result?.warning &&
      !((result?.human_story_signals || []).length || (result?.realtime_event_signals || []).length)
    ) {
      throw new Error(result.warning);
    }

    state.liveSignalsByClient[clientId] = {
      ranAt: payload.ran_at,
      warning: result?.warning || null,
      humanStorySignals: result?.human_story_signals || [],
      realtimeEventSignals: result?.realtime_event_signals || [],
      sourceMode: "live",
      sourceNote: "Live web ingestion from /api/ingest."
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
    story.person_or_subject || "",
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
  const response = await fetch(`/api/ingest?client=${encodeURIComponent(clientId)}&refresh=${Date.now()}`, {
    cache: "no-store"
  });
  const payload = await response.json();
  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || "Could not fetch replacement");
  }

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
  if (state.selectedClientId === clientId) {
    render();
  }

  try {
    const response = await fetch(
      `/api/ingest?client=${encodeURIComponent(clientId)}&refresh=${Date.now()}`,
      { cache: "no-store" }
    );
    const payload = await response.json();

    if (!response.ok || !payload.ok) {
      throw new Error(payload.error || "Could not fetch more human stories");
    }

    const result = payload.results?.[0];
    const existingRecord = state.liveSignalsByClient[clientId] || {
      ranAt: payload.ran_at,
      warning: null,
      humanStorySignals: [],
      realtimeEventSignals: [],
      sourceMode: "live",
      sourceNote: "Live web ingestion from /api/ingest."
    };

    state.liveSignalsByClient[clientId] = {
      ...existingRecord,
      ranAt: payload.ran_at,
      warning: result?.warning || existingRecord.warning || null,
      humanStorySignals: mergeHumanStories(
        existingRecord.humanStorySignals || [],
        result?.human_story_signals || []
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
  if (state.selectedClientId === clientId) {
    render();
  }

  try {
    const response = await fetch(
      `/api/ingest?client=${encodeURIComponent(clientId)}&refresh=${Date.now()}`,
      { cache: "no-store" }
    );
    const payload = await response.json();

    if (!response.ok || !payload.ok) {
      throw new Error(payload.error || "Could not fetch more events");
    }

    const result = payload.results?.[0];
    const existingRecord = state.liveSignalsByClient[clientId] || {
      ranAt: payload.ran_at,
      warning: null,
      humanStorySignals: [],
      realtimeEventSignals: [],
      sourceMode: "live",
      sourceNote: "Live web ingestion from /api/ingest."
    };

    state.liveSignalsByClient[clientId] = {
      ...existingRecord,
      ranAt: payload.ran_at,
      warning: result?.warning || existingRecord.warning || null,
      realtimeEventSignals: mergeRealtimeSignals(
        existingRecord.realtimeEventSignals || [],
        result?.realtime_event_signals || []
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
  if (!state.liveSignalsByClient[client.id] && state.liveRequestByClient[client.id] !== "loading") {
    loadLiveSignals(client.id);
  }
}

function renderEvergreenList(client) {
  elements.evergreenList.innerHTML = "";
  const liveRecord = currentLiveRecord(client);

  if (state.liveRequestByClient[client.id] === "loading" && !liveRecord) {
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

  if (state.liveRequestByClient[client.id] === "loading" && !liveRecord) {
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
    node.querySelector(".result-number").textContent = String(index + 1);
    node.querySelector(".idea-title").textContent = cleanStoryTitle(signal.title);
    node.querySelector(".idea-hook").textContent = signal.summary;
    node.querySelector(".idea-angle").textContent = `Why it fits ${client.name}: ${signal.why_it_fits}`;
    node.querySelector(".idea-why-now-pill").textContent = signal.urgency;
    node.querySelector(".idea-deadline").textContent = formatPostBefore(signal);
    const realtimeLink = node.querySelector(".realtime-link");
    if (sourceUrl) {
      realtimeLink.href = sourceUrl;
      realtimeLink.textContent = "Learn more";
    } else {
      realtimeLink.remove();
    }
    node.querySelector(".idea-why").textContent = signal.why_it_fits;
    node.querySelector(".idea-why-now").textContent = formatWhyNow(signal);

    const outline = node.querySelector(".idea-outline");
    [
      `Subject: ${signal.event_or_subject}`,
      `Published: ${formatDateTime(signal.published_at)}`,
      sourceUrl ? `Research start: ${sourceUrl}` : "Research start: not available"
    ].forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      outline.appendChild(item);
    });

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

function render() {
  const client = currentClient();
  applyClientTheme(client);
  renderClientTabs();
  ensureLiveSignals(client);
  renderHeader(client);
  renderEvergreenList(client);
  renderRealtimeList(client);
}

elements.fetchMoreStories.addEventListener("click", async () => {
  const client = currentClient();
  elements.fetchMoreStories.disabled = true;
  elements.fetchMoreStories.textContent = "Fetching...";
  await fetchMoreHumanStories(client.id);
  elements.fetchMoreStories.disabled = false;
  elements.fetchMoreStories.textContent = "Fetch more stories";
});

elements.fetchMoreEvents.addEventListener("click", async () => {
  const client = currentClient();
  elements.fetchMoreEvents.disabled = true;
  elements.fetchMoreEvents.textContent = "Fetching...";
  await fetchMoreRealtimeEvents(client.id);
  elements.fetchMoreEvents.disabled = false;
  elements.fetchMoreEvents.textContent = "Fetch more events";
});

render();
