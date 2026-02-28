import { useMutation, useQuery } from "@tanstack/react-query";
import type { Product } from "../backend.d";
import { useActor } from "./useActor";

// Fallback sample products if backend returns empty
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: BigInt(1),
    name: "Merino Wool Overcoat",
    description:
      "An impeccably tailored overcoat crafted from 100% Italian merino wool. The single-breasted silhouette features notch lapels and a hand-stitched chest pocket. Perfect for the discerning professional who demands elegance without compromise.",
    imageUrl: "",
    category: "Classic",
    price: 485,
  },
  {
    id: BigInt(2),
    name: "Heritage Trench Coat",
    description:
      "Inspired by the iconic British military design, this double-breasted trench coat features storm flaps, epaulettes, and a classic belted waist. Crafted from water-resistant gabardine for lasting protection and timeless style.",
    imageUrl: "",
    category: "Classic",
    price: 395,
  },
  {
    id: BigInt(3),
    name: "Camel Hair Wrap Coat",
    description:
      "Luxuriously soft camel hair blend in a relaxed, wrap-front silhouette. The fluid drape and oversized fit create an effortlessly chic aesthetic. An investment piece that transcends seasonal trends.",
    imageUrl: "",
    category: "Classic",
    price: 560,
  },
  {
    id: BigInt(4),
    name: "Arctic Puffer Jacket",
    description:
      "Engineered for extreme cold, this premium down puffer jacket features 800-fill power goose down and a water-resistant ripstop shell. Internal storm guard and cinchable hem seal out winter's harshest conditions.",
    imageUrl: "",
    category: "Winter",
    price: 320,
  },
  {
    id: BigInt(5),
    name: "Naval Peacoat",
    description:
      "A refined interpretation of the classic naval peacoat. Double-breasted with broad lapels and anchor-embossed buttons, this heavy wool blend piece exudes authoritative maritime style. Fully lined with a plaid wool interior.",
    imageUrl: "",
    category: "Classic",
    price: 340,
  },
  {
    id: BigInt(6),
    name: "Alpine Expedition Parka",
    description:
      "Built for serious adventurers, this insulated parka features a detachable faux fur-trimmed hood, multiple security pockets, and sealed seams. Combines expedition-grade performance with contemporary urban aesthetics.",
    imageUrl: "",
    category: "Winter",
    price: 410,
  },
  {
    id: BigInt(7),
    name: "Satin Bomber Jacket",
    description:
      "A sleek take on the classic MA-1 bomber. The premium satin shell catches light beautifully while ribbed cuffs and hem provide a clean, structured silhouette. Effortlessly bridges streetwear and refined casual.",
    imageUrl: "",
    category: "Casual",
    price: 245,
  },
  {
    id: BigInt(8),
    name: "Urban Raincoat",
    description:
      "Designed for the city dweller who refuses to sacrifice style for function. This packable raincoat features fully taped seams, a concealed hood, and a matte finish. Folds into its own pocket for easy transport.",
    imageUrl: "",
    category: "Casual",
    price: 275,
  },
];

export function useListCoats() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["coats"],
    queryFn: async () => {
      if (!actor) return FALLBACK_PRODUCTS;
      try {
        const result = await actor.listCoats();
        return result.length > 0 ? result : FALLBACK_PRODUCTS;
      } catch {
        return FALLBACK_PRODUCTS;
      }
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCoatsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["coats", "category", category],
    queryFn: async () => {
      if (!actor)
        return FALLBACK_PRODUCTS.filter((p) => p.category === category);
      try {
        const result = await actor.getCoatByCategory(category);
        return result;
      } catch {
        return FALLBACK_PRODUCTS.filter((p) => p.category === category);
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const timestamp = BigInt(Date.now());
      return actor.submitContactForm(name, email, message, timestamp);
    },
  });
}
