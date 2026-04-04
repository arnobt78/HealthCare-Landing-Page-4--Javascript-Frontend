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
  vetTeam1:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  vetTeam2:
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
  vetTeam3:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  vetTeam4:
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
  review1:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  review2:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  review3:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  parallaxBg:
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1920&q=70",
};
