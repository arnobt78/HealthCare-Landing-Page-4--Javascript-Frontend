/**
 * Central place for copy and image URLs.
 * Hero collage + full-bleed slides use files under /public/hero/ (see scripts/download-hero-assets.mjs).
 * IMAGE_REMOTE_FALLBACK is used when a local file 404s (e.g. forgot to run download script).
 */

export const SITE = {
  name: "Pawfect Care Clinic",
  tagline: "Happy pets, caring hands",
};

/** Remote URLs keyed like IMAGES (for <img> error recovery). */
export const IMAGE_REMOTE_FALLBACK = {
  heroGallery1:
    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=85",
  heroGallery2:
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=85",
  heroGallery3:
    "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=85",
  heroGallery4:
    "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=85",
  heroGallery5:
    "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=85",
  hero: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=85",
  heroBgDogChewy:
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1600&q=85",
  heroBgDogRun:
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=85",
  heroBgDogPortrait:
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1600&q=85",
  heroBgCatAlt:
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=85",
  heroBgRabbitAlt:
    "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1600&q=85",
  heroBgFishAlt:
    "https://images.pexels.com/photos/8837893/pexels-photo-8837893.jpeg?auto=compress&cs=tinysrgb&w=1600",
  heroBgTurtleOcean:
    "https://images.unsplash.com/photo-1501706362039-c06b2d715385?auto=format&fit=crop&w=1600&q=85",
  heroBgBird:
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1600&q=85",
  heroBgDuck:
    "https://images.pexels.com/photos/28904052/pexels-photo-28904052.jpeg?auto=compress&cs=tinysrgb&w=1600",
  guineaPig:
    "https://images.pexels.com/photos/50572/guinea-pig-guinea-pig-house-cavia-porcellus-form-domestica-50572.jpeg?auto=compress&cs=tinysrgb&w=1600",
  hamster:
    "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80",
  fish: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=900&q=80",
  turtle:
    "https://images.unsplash.com/photo-1501706362039-c06b2d715385?auto=format&fit=crop&w=900&q=80",
  team1:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  team2:
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
  team3:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  team4:
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
  team5:
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80",
  team6:
    "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=600&q=80",
  team7:
    "https://images.unsplash.com/photo-1579684385127-1ef15d508318?auto=format&fit=crop&w=600&q=80",
  team8:
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
};

/** @type {Record<string, string>} */
export const IMAGES = {
  heroGallery1: "/public/hero/collage-puppy.jpg",
  heroGallery2: "/public/hero/collage-cat.jpg",
  heroGallery3: "/public/hero/collage-rabbit.jpg",
  heroGallery4: "/public/hero/collage-hamster.jpg",
  heroGallery5: "/public/hero/bg-dog-run.jpg",
  hero: "/public/hero/bg-dog-run.jpg",
  about:
    "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=900&q=80",
  catHero:
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
  dogSmile:
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
  rabbit:
    "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80",
  fish: IMAGE_REMOTE_FALLBACK.fish,
  turtle: IMAGE_REMOTE_FALLBACK.turtle,
  guineaPig: "/public/hero/bg-guinea.jpg",
  hamster: "/public/hero/collage-hamster.jpg",
  heroBgDogChewy: "/public/hero/bg-dog-chewy.jpg",
  heroBgDogRun: "/public/hero/bg-dog-run.jpg",
  heroBgDogPortrait: "/public/hero/bg-dog-portrait.jpg",
  heroBgCatAlt: "/public/hero/bg-cat-alt.jpg",
  heroBgRabbitAlt: "/public/hero/bg-rabbit-alt.jpg",
  heroBgFishAlt: "/public/hero/bg-fish-alt.jpg",
  heroBgTurtleOcean: "/public/hero/bg-turtle-ocean.jpg",
  heroBgBird: "/public/hero/bg-bird.jpg",
  heroBgDuck: "/public/hero/bg-duck.jpg",
  team1: "/public/images/team1.jpg",
  team2: "/public/images/team2.jpg",
  team3: "/public/images/team3.jpg",
  team4: "/public/images/team4.jpg",
  team5: "/public/images/team5.jpg",
  team6: "/public/images/team6.jpg",
  team7: "/public/images/team7.jpg",
  team8: "/public/images/team8.jpg",
  vetTeam1: "/public/images/team1.jpg",
  vetTeam2: "/public/images/team2.jpg",
  vetTeam3: "/public/images/team3.jpg",
  vetTeam4: "/public/images/team4.jpg",
  review1:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  review2:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  review3:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  parallaxBg:
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1920&q=70",
};

/**
 * Team carousel + modal (js/doctorReel.js). category matches the team filter control values.
 * @typedef {{ id: string, name: string, role: string, category: string, imageKey: string, shortBio: string, bio: string, tags: string[], alt: string }} TeamMember
 */

/** @type {TeamMember[]} */
export const TEAM_MEMBERS = [
  {
    id: "amara",
    name: "Dr. Amara Lin",
    role: "Lead veterinarian",
    category: "veterinarians",
    imageKey: "team1",
    shortBio: "Soft voice, steady hands, specializes in anxious pups.",
    bio: "Amara leads our medical team with a calm, treat-first approach. She is certified in fear-free handling and loves turning nervous first visits into tail wags. Outside the clinic she volunteers with rescue transport.",
    tags: ["Dogs & cats", "Fear-free certified", "15+ years"],
    alt: "Dr. Amara smiling in a white coat",
  },
  {
    id: "jordan",
    name: "Jordan M.",
    role: "Vet nurse",
    category: "nursing",
    imageKey: "team2",
    shortBio: "Expert at treat-to-weight ratios and silly nicknames.",
    bio: "Jordan keeps exams moving smoothly — from nail trims to blood draws — and remembers every pet’s favorite snack. Techs and pet parents rely on their clear, upbeat explanations.",
    tags: ["Lab draws", "Anesthesia assist", "Nutrition tips"],
    alt: "Vet nurse in scrubs with arms crossed",
  },
  {
    id: "priya",
    name: "Dr. Priya N.",
    role: "Surgeon",
    category: "surgery",
    imageKey: "team3",
    shortBio: "Explains procedures with diagrams you will actually understand.",
    bio: "Priya focuses on soft-tissue surgery and dental procedures. She draws quick sketches on paper so families know exactly what to expect before and after the big day.",
    tags: ["Soft-tissue surgery", "Dental", "Second opinions"],
    alt: "Veterinarian with stethoscope",
  },
  {
    id: "riley-sam",
    name: "Riley & Sam",
    role: "Client joy",
    category: "client",
    imageKey: "team4",
    shortBio: "Front desk duo — scheduling wizards and professional baby-talkers.",
    bio: "Riley and Sam run the welcome desk: reminders, insurance questions, and the occasional emergency cuddle for pets waiting their turn. If you need a same-day slot, they are the ones who make it happen.",
    tags: ["Scheduling", "Insurance help", "First impressions"],
    alt: "Clinic staff at reception",
  },
  {
    id: "marcus",
    name: "Dr. Marcus Chen",
    role: "Associate veterinarian",
    category: "veterinarians",
    imageKey: "team5",
    shortBio: "Exotics curious — from rabbits to bearded dragons.",
    bio: "Marcus splits time between wellness appointments and pocket-pet checkups. He keeps up with the latest vaccine schedules for small mammals so multi-species homes get one clear plan.",
    tags: ["Exotics", "Wellness", "Vaccines"],
    alt: "Veterinarian examining a patient",
  },
  {
    id: "alex",
    name: "Alex R.",
    role: "Vet technician",
    category: "nursing",
    imageKey: "team6",
    shortBio: "Imaging buff — crisp X-rays, gentle restraint.",
    bio: "Alex runs our radiology prep and keeps patients steady for clean images the doctors can trust. They are also the go-to for bandage changes that stay on through zoomies.",
    tags: ["Radiology", "Bandaging", "Fear-free"],
    alt: "Vet technician in clinic",
  },
  {
    id: "elena",
    name: "Dr. Elena Voss",
    role: "Orthopedic surgeon",
    category: "surgery",
    imageKey: "team7",
    shortBio: "Cruciate repairs and limp investigations.",
    bio: "Elena consults on lameness and performs orthopedic procedures when joints need more than rest. She coordinates closely with rehab recommendations you can follow at home.",
    tags: ["Orthopedics", "Lameness", "Rehab planning"],
    alt: "Surgeon in operating attire",
  },
  {
    id: "morgan",
    name: "Morgan Lee",
    role: "Care coordinator",
    category: "client",
    imageKey: "team8",
    shortBio: "Follow-ups, referrals, and “what happens next?” answers.",
    bio: "Morgan connects families with specialists, tracks lab follow-ups, and makes sure no question slips through the cracks. If you left the visit with homework, Morgan’s email is the one that reminds you gently.",
    tags: ["Referrals", "Follow-up care", "Care plans"],
    alt: "Care coordinator with tablet",
  },
];

/**
 * Pet parent stories — vertical reel columns + modal (js/reviewsReel.js).
 * @typedef {{ id: string, petName: string, headline: string, quote: string, modalQuote: string, stars: number, ownerName: string, profession: string, petImageKey: string, avatarKey: string, petAlt: string }} ParentReview
 */

/** @type {ParentReview[]} */
export const PARENT_REVIEWS = [
  {
    id: "mia-beans",
    petName: "Beans",
    headline: "Mia & Beans",
    quote:
      "Beans hid under the chair — until treats appeared. Now he drags me to the door.",
    modalQuote:
      "Beans hid under the chair — until treats appeared. Now he drags me to the door. The team never rushed us on the first visit, and they remembered his name before mine.",
    stars: 4,
    ownerName: "Mia Chen",
    profession: "Graphic designer",
    petImageKey: "dogSmile",
    avatarKey: "review1",
    petAlt: "Happy golden retriever",
  },
  {
    id: "theo-noodle",
    petName: "Noodle",
    headline: "Theo & Noodle",
    quote:
      "Noodle is a dramatic cat. The separate cat entrance changed everything.",
    modalQuote:
      "Noodle is a dramatic cat. The separate cat entrance changed everything. Less yowling in the lobby, more purring on the scale. We are never switching clinics.",
    stars: 5,
    ownerName: "Theo Park",
    profession: "Software engineer",
    petImageKey: "catHero",
    avatarKey: "review2",
    petAlt: "Orange tabby cat",
  },
  {
    id: "priya-mochi",
    petName: "Mochi",
    headline: "Priya & Mochi",
    quote:
      "They texted photos after Mochi’s dental. I cried (happy tears).",
    modalQuote:
      "They texted photos after Mochi’s dental. I cried (happy tears). Clear aftercare, honest pricing, and a vet who actually listens when I ramble.",
    stars: 5,
    ownerName: "Priya Shah",
    profession: "Nurse practitioner",
    petImageKey: "rabbit",
    avatarKey: "review3",
    petAlt: "Small rabbit",
  },
  {
    id: "sam-biscuit",
    petName: "Biscuit",
    headline: "Sam & Biscuit",
    quote:
      "Guinea pig sneezes at 9 p.m.? They still picked up the phone.",
    modalQuote:
      "Guinea pig sneezes at 9 p.m.? They still picked up the phone. Biscuit is tiny but treated like royalty every visit.",
    stars: 5,
    ownerName: "Sam Rivera",
    profession: "Teacher",
    petImageKey: "guineaPig",
    avatarKey: "review1",
    petAlt: "Guinea pig",
  },
  {
    id: "jordan-fig",
    petName: "Fig",
    headline: "Jordan & Fig",
    quote:
      "Fig’s allergies were a mystery until they mapped a simple food plan.",
    modalQuote:
      "Fig’s allergies were a mystery until they mapped a simple food plan. No jargon, just a fridge list and follow-up texts that made sense.",
    stars: 4,
    ownerName: "Jordan Ellis",
    profession: "Barista & dog dad",
    petImageKey: "heroGallery4",
    avatarKey: "review2",
    petAlt: "Hamster in hands",
  },
  {
    id: "alex-tofu",
    petName: "Tofu",
    headline: "Alex & Tofu",
    quote:
      "Tofu’s first vaccine day was chaos — they made it feel like a playdate.",
    modalQuote:
      "Tofu’s first vaccine day was chaos — they made it feel like a playdate. Treats, low tables, and zero side-eye when he barked at the scale.",
    stars: 5,
    ownerName: "Alex Kim",
    profession: "Photographer",
    petImageKey: "heroGallery1",
    avatarKey: "review3",
    petAlt: "Puppy portrait",
  },
  {
    id: "riley-pip",
    petName: "Pip",
    headline: "Riley & Pip",
    quote:
      "Pip is 16. They celebrate small wins instead of scaring us with stats.",
    modalQuote:
      "Pip is 16. They celebrate small wins instead of scaring us with stats. Honest about limits, generous with comfort care options.",
    stars: 5,
    ownerName: "Riley O’Neill",
    profession: "Architect",
    petImageKey: "heroGallery2",
    avatarKey: "review1",
    petAlt: "Senior cat resting",
  },
  {
    id: "casey-waffle",
    petName: "Waffle",
    headline: "Casey & Waffle",
    quote:
      "Waffle ate something weird (again). X-rays explained in plain English.",
    modalQuote:
      "Waffle ate something weird (again). X-rays explained in plain English. Left with a plan, not a panic attack — and a very guilty beagle.",
    stars: 4,
    ownerName: "Casey Brooks",
    profession: "Paramedic",
    petImageKey: "heroGallery5",
    avatarKey: "review2",
    petAlt: "Dog outdoors",
  },
];
