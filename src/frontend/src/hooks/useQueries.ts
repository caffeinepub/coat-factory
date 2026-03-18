import { useMutation, useQuery } from "@tanstack/react-query";
import type { Car } from "../backend.d";
import { useActor } from "./useActor";

// Fallback sample cars if backend returns empty
const FALLBACK_CARS: Car[] = [
  {
    id: BigInt(1),
    make: "Lamborghini",
    model: "Huracán EVO Spyder",
    year: BigInt(2024),
    description:
      "The Huracán EVO Spyder represents the pinnacle of Lamborghini engineering — a naturally aspirated V10 masterpiece wrapped in carbon fiber. With an open-air cabin, you experience every decibel of its intoxicating 8,000 RPM scream. Mid-engine balance and rear-wheel steering make it an extension of the driver's will.",
    category: "Supercar",
    priceUSD: BigInt(285000),
    horsepower: BigInt(631),
    engine: "5.2L V10 Naturally Aspirated",
  },
  {
    id: BigInt(2),
    make: "Ferrari",
    model: "SF90 Stradale",
    year: BigInt(2024),
    description:
      "Ferrari's most powerful road car to date fuses a twin-turbocharged V8 with three electric motors for a breathtaking hybrid powertrain. The SF90 Stradale delivers hypercar performance in a sleek grand tourer silhouette — 0 to 60 mph in just 2.5 seconds. Prancing Horse excellence redefined.",
    category: "Supercar",
    priceUSD: BigInt(507000),
    horsepower: BigInt(986),
    engine: "4.0L Twin-Turbo V8 + 3 Electric Motors",
  },
  {
    id: BigInt(3),
    make: "Rolls Royce",
    model: "Phantom Series II",
    year: BigInt(2024),
    description:
      "The Rolls-Royce Phantom remains the uncompromising measure of luxury motoring. Bespoke from first sketch to final stitch, the Phantom wraps its occupants in a near-silent sanctuary of hand-stitched leather, polished wood veneers, and starlight headliner. The pinnacle of automotive refinement.",
    category: "Ultra Luxury",
    priceUSD: BigInt(460000),
    horsepower: BigInt(563),
    engine: "6.75L Twin-Turbo V12",
  },
  {
    id: BigInt(4),
    make: "Bentley",
    model: "Continental GT Speed",
    year: BigInt(2024),
    description:
      "The Continental GT Speed is a grand tourer without compromise. A hand-assembled W12 engine catapults this two-tonne icon to 60 mph in 3.5 seconds, while the sumptuous cabin envelopes passengers in quilted leather and burr walnut. Beautiful, powerful, effortlessly capable.",
    category: "Grand Tourer",
    priceUSD: BigInt(284000),
    horsepower: BigInt(650),
    engine: "6.0L Twin-Turbo W12",
  },
  {
    id: BigInt(5),
    make: "Porsche",
    model: "911 GT3 RS",
    year: BigInt(2023),
    description:
      "The 911 GT3 RS is motorsport distilled into a road-legal weapon. Its flat-six engine screams to 9,000 RPM while an aerodynamic package generating 860kg of downforce keeps all that fury planted. This is Porsche at its most visceral — a driver's car in its purest form.",
    category: "Sports Car",
    priceUSD: BigInt(225000),
    horsepower: BigInt(518),
    engine: "4.0L Flat-Six Naturally Aspirated",
  },
  {
    id: BigInt(6),
    make: "McLaren",
    model: "720S Performance",
    year: BigInt(2024),
    description:
      "The McLaren 720S rewrote the rules of supercar dynamics with its ultra-lightweight carbon fiber MonoCell II chassis and aggressive aerodynamic stance. Twin turbos develop thrust with barely a breath of lag, while Proactive Chassis Control II delivers a ride quality that defies its track performance.",
    category: "Supercar",
    priceUSD: BigInt(318000),
    horsepower: BigInt(710),
    engine: "4.0L Twin-Turbo V8",
  },
];

export function useGetCars() {
  const { actor, isFetching } = useActor();
  return useQuery<Car[]>({
    queryKey: ["cars"],
    queryFn: async () => {
      if (!actor) return FALLBACK_CARS;
      try {
        const result = await actor.getCars();
        return result.length > 0 ? result : FALLBACK_CARS;
      } catch {
        return FALLBACK_CARS;
      }
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
      carId,
    }: {
      name: string;
      email: string;
      message: string;
      carId: bigint;
    }) => {
      const timestamp = BigInt(Date.now());
      if (!actor) throw new Error("Actor not available");
      return actor.submitInquiry(name, email, message, carId, timestamp);
    },
  });
}
