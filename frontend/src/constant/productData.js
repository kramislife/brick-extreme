import droid from "@/assets/bestSellingAssets/droid.png";
import droid2 from "@/assets/bestSellingAssets/droid2.jpg";

export const FILTER_CATEGORIES = {
  price: {
    name: "Price Range",
    options: [
      { value: "0-100", label: "$0 - $100" },
      { value: "101-500", label: "$101 - $500" },
      { value: "501-1000", label: "$501 - $1000" },
      { value: "1000+", label: "Over $1000" },
    ],
  },
  category: {
    name: "Theme",
    options: [
      { value: "sci-fi", label: "Sci-Fi" },
      { value: "space", label: "Space" },
      { value: "futuristic", label: "Futuristic" },
      { value: "steampunk", label: "Steampunk" },
    ],
  },
  collection: {
    name: "Collection",
    options: [
      { value: "winter-special", label: "Winter Special" },
      { value: "galactic-series", label: "Galactic Series" },
      { value: "tech-series", label: "Tech Series" },
      { value: "vintage", label: "Vintage" },
    ],
  },
  skillLevel: {
    name: "Skill Level",
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" },
      { value: "expert", label: "Expert" },
    ],
  },
  designer: {
    name: "Designer",
    options: [
      { value: "emily-wilson", label: "Emily Wilson" },
      { value: "oliver-lee", label: "Oliver Lee" },
      { value: "ava-martin", label: "Ava Martin" },
      { value: "jackson-hall", label: "Jackson Hall" },
    ],
  },
};
