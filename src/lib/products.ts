export type ProductCategory = "aggregate" | "specialty" | "packaged";

export type Product = {
  slug:        string;
  name:        string;
  price:       number | null;
  unit:        string;
  category:    ProductCategory;
  description: string;
  goodFor:     string[];
  densityKey:  string | null;
  image:       string;
};

export const PRODUCTS: Product[] = [
  {
    slug:        "mason-sand",
    name:        "Mason Sand",
    price:       15.00,
    unit:        "per ton",
    category:    "aggregate",
    description: "Fine-grain sand. Clean, washed, and consistent. Ready to work.",
    goodFor:     ["Mortar & masonry", "Paver bedding", "Joint fill", "Sandbox"],
    densityKey:  "mason_sand",
    image:       "/images/mason-sand.jpg",
  },
  {
    slug:        "topsoil",
    name:        "Topsoil",
    price:       23.50,
    unit:        "per ton",
    category:    "aggregate",
    description: "Quality topsoil for lawns, gardens, and grading projects.",
    goodFor:     ["Lawn repair", "Garden beds", "Grading", "Raised beds"],
    densityKey:  "topsoil",
    image:       "/images/topsoil.jpg",
  },
  {
    slug:        "decomposed-granite",
    name:        "Decomposed Granite",
    price:       40.00,
    unit:        "per ton",
    category:    "specialty",
    description: "Natural granite fines. Compacts firmly, drains well, looks sharp.",
    goodFor:     ["Driveways", "Walkways", "Landscape borders", "Patios"],
    densityKey:  "decomposed_granite",
    image:       "/images/decomposed-granite.jpg",
  },
  {
    slug:        "crushed-limestone",
    name:        "Crushed Limestone",
    price:       null,
    unit:        "per ton",
    category:    "aggregate",
    description: "Versatile base material. Compacts tight. Built for Texas roads.",
    goodFor:     ["Road base", "Driveways", "Parking pads", "Drainage"],
    densityKey:  "crushed_limestone",
    image:       "/images/crushed-limestone.jpg",
  },
  {
    slug:        "screenings",
    name:        "Screenings",
    price:       null,
    unit:        "per ton",
    category:    "aggregate",
    description: "Fine limestone dust that compacts into a solid, stable surface.",
    goodFor:     ["Base layer", "Path fill", "Compacted surfaces"],
    densityKey:  "screenings",
    image:       "/images/screenings.jpg",
  },
  {
    slug:        "fill-dirt",
    name:        "Fill Dirt",
    price:       null,
    unit:        "per ton",
    category:    "aggregate",
    description: "Clean fill for grading, leveling, and raising ground elevation.",
    goodFor:     ["Grading", "Leveling", "Backfill", "Land fill"],
    densityKey:  "fill_dirt",
    image:       "/images/fill-dirt.jpg",
  },
  {
    slug:        "gravel",
    name:        "Gravel",
    price:       null,
    unit:        "per ton",
    category:    "aggregate",
    description: "Rounded or crushed gravel for drainage, drives, and decoration.",
    goodFor:     ["Driveways", "Drainage", "Around foundations", "Decorative"],
    densityKey:  "gravel",
    image:       "/images/gravel.jpg",
  },
  {
    slug:        "super-sacks",
    name:        "Super Sacks",
    price:       null,
    unit:        "call for pricing",
    category:    "packaged",
    description: "Large bulk bags (~2,000 lbs). Available in sand, gravel, and topsoil.",
    goodFor:     ["Small jobs", "Tight access areas", "Precise quantities"],
    densityKey:  null,
    image:       "/images/super-sacks.jpg",
  },
  {
    slug:        "austin-chop-white",
    name:        "Austin Chop White",
    price:       null,
    unit:        "call for pricing",
    category:    "specialty",
    description: "Cut limestone blocks in crisp white. Clean lines, lasting beauty.",
    goodFor:     ["Landscape edging", "Garden walls", "Decorative borders"],
    densityKey:  null,
    image:       "/images/austin-chop-white.jpg",
  },
  {
    slug:        "pearl-white-pebbles",
    name:        "Pearl White Pebbles",
    price:       null,
    unit:        "call for pricing",
    category:    "specialty",
    description: "Smooth, bright white pebbles. Eye-catching ground cover.",
    goodFor:     ["Decorative ground cover", "River beds", "Zen gardens"],
    densityKey:  null,
    image:       "/images/pearl-white-pebbles.jpg",
  },
  {
    slug:        "boulders",
    name:        "Boulders",
    price:       null,
    unit:        "call for pricing",
    category:    "specialty",
    description: "Large natural boulders for landscaping and retaining applications.",
    goodFor:     ["Retaining walls", "Landscape anchors", "Water features"],
    densityKey:  null,
    image:       "/images/boulders.jpg",
  },
];

export const PRODUCT_CATEGORIES: Record<ProductCategory, string> = {
  aggregate: "Aggregates & Sand",
  specialty: "Specialty Materials",
  packaged:  "Packaged",
};

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getCalculatorProducts(): Product[] {
  return PRODUCTS.filter((p) => p.densityKey !== null);
}
