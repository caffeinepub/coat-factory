import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ChevronRight,
  Gauge,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Car } from "./backend.d";
import { useGetCars, useSubmitInquiry } from "./hooks/useQueries";

// ─── Car image mapping ────────────────────────────────────────────────────────

function getCarImage(make: string): string {
  const m = make.toLowerCase();
  if (m.includes("lamborghini"))
    return "/assets/generated/car-lamborghini.dim_800x500.jpg";
  if (m.includes("ferrari"))
    return "/assets/generated/car-ferrari.dim_800x500.jpg";
  if (m.includes("rolls"))
    return "/assets/generated/car-rollsroyce.dim_800x500.jpg";
  if (m.includes("bentley"))
    return "/assets/generated/car-bentley.dim_800x500.jpg";
  if (m.includes("porsche"))
    return "/assets/generated/car-porsche.dim_800x500.jpg";
  if (m.includes("mclaren"))
    return "/assets/generated/car-mclaren.dim_800x500.jpg";
  return "/assets/generated/hero-luxury-car.dim_1920x1080.jpg";
}

const BRANDS = [
  "All",
  "Lamborghini",
  "Ferrari",
  "Rolls Royce",
  "Bentley",
  "Porsche",
  "McLaren",
];

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Showroom", href: "#showroom" },
    { label: "Featured", href: "#featured" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-500 ${
        scrolled
          ? "bg-background/95 border-b border-border/60 shadow-card"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-[72px] flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-3 group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="champagne-text">LUXURY</span>
            <span className="text-foreground/80">CARS</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-[0.15em] uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            size="sm"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-primary text-primary-foreground hover:bg-champagne-light text-xs tracking-[0.12em] uppercase px-6 font-semibold"
          >
            Inquire Now
          </Button>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/98 nav-blur overflow-hidden"
          >
            <nav className="flex flex-col gap-1 p-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors uppercase tracking-widest"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-border/50">
                <Button
                  className="w-full bg-primary text-primary-foreground uppercase text-xs tracking-widest"
                  onClick={() => {
                    setMobileOpen(false);
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Inquire Now
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-luxury-car.dim_1920x1080.jpg"
          alt="Luxury supercar"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Content anchored to bottom */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl pb-24 pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-px w-16 bg-primary" />
            <span className="text-xs tracking-[0.3em] text-primary font-semibold uppercase">
              Est. 2009 · Curated Excellence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.95] text-balance mb-8"
          >
            Drive the <span className="shimmer-gold italic">Extraordinary</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-12"
          >
            We curate only the most exceptional automobiles from the world's
            most prestigious marques. Each vehicle is handpicked, inspected to
            the highest standard, and presented as it deserves to be.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("showroom")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-primary text-primary-foreground hover:bg-champagne-light font-bold tracking-widest uppercase px-8 text-xs h-14 group"
            >
              Explore Showroom
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-foreground/25 text-foreground hover:bg-foreground/8 hover:border-foreground/50 font-medium tracking-widest uppercase text-xs h-14"
            >
              Our Story
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex items-center gap-0"
          >
            {[
              { value: "150+", label: "Vehicles Sold" },
              { value: "12+", label: "Prestige Brands" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`text-left ${i > 0 ? "pl-10 ml-10 border-l border-border/60" : ""}`}
              >
                <div className="font-display text-3xl font-bold champagne-text leading-none">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-[0.15em] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-3"
      >
        <span
          className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll to discover
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.6,
            ease: "easeInOut",
          }}
          className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── Car Card ─────────────────────────────────────────────────────────────────

interface CarCardProps {
  car: Car;
  onView: () => void;
  featured?: boolean;
}

function CarCard({ car, onView, featured = false }: CarCardProps) {
  const img = getCarImage(car.make);
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(car.priceUSD));
  const hp = Number(car.horsepower);
  const year = Number(car.year);

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -6 }}
      className={`group relative bg-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer flex flex-col ${featured ? "ring-1 ring-primary/30" : ""}`}
      onClick={onView}
    >
      {/* Image */}
      <div
        className={`overflow-hidden bg-secondary ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}
      >
        <img
          src={img}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover car-img-zoom"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-bold border-0 px-3 py-1">
              Featured Pick
            </Badge>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="secondary"
            className="text-[10px] tracking-[0.15em] uppercase border-0 bg-accent text-accent-foreground"
          >
            {car.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{year}</span>
        </div>

        {/* Make / Model */}
        <h3 className="font-display text-lg font-bold leading-tight mb-1 group-hover:text-primary transition-colors duration-300">
          {car.make}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{car.model}</p>

        {/* Specs */}
        <div className="flex items-center gap-5 mb-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary/70" />
            {hp} HP
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-primary/70" />
            {car.engine}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <span className="font-display text-2xl font-bold champagne-text">
            {price}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-[10px] tracking-widest uppercase transition-all duration-200 h-8 px-4"
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Car Skeleton ─────────────────────────────────────────────────────────────

function CarSkeleton() {
  return (
    <div className="bg-card overflow-hidden shadow-card">
      <Skeleton className="aspect-[16/10] w-full bg-secondary" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16 bg-secondary" />
          <Skeleton className="h-4 w-10 bg-secondary" />
        </div>
        <Skeleton className="h-6 w-32 bg-secondary" />
        <Skeleton className="h-4 w-24 bg-secondary" />
        <div className="flex gap-4">
          <Skeleton className="h-3 w-16 bg-secondary" />
          <Skeleton className="h-3 w-24 bg-secondary" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-8 w-24 bg-secondary" />
          <Skeleton className="h-8 w-24 bg-secondary" />
        </div>
      </div>
    </div>
  );
}

// ─── Car Detail Modal ─────────────────────────────────────────────────────────

interface CarModalProps {
  car: Car | null;
  open: boolean;
  onClose: () => void;
  onInquire: (car: Car) => void;
}

function CarModal({ car, open, onClose, onInquire }: CarModalProps) {
  if (!car) return null;
  const img = getCarImage(car.make);
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(car.priceUSD));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border/60">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="aspect-[16/11] lg:aspect-auto overflow-hidden bg-secondary relative">
            <img
              src={img}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-primary/90 text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-bold border-0 px-3 py-1">
                {car.category}
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col p-7 overflow-y-auto max-h-[80vh] lg:max-h-none">
            <DialogHeader className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="h-px w-8 bg-primary" />
                <span className="text-[10px] tracking-[0.25em] text-primary uppercase font-semibold">
                  {Number(car.year)}
                </span>
              </div>
              <DialogTitle className="font-display text-3xl font-bold leading-tight">
                {car.make}{" "}
                <span className="text-muted-foreground font-normal">
                  {car.model}
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-4xl font-bold champagne-text">
                {price}
              </span>
              <span className="text-sm text-muted-foreground">USD</span>
            </div>

            <div className="line-accent mb-6" />

            <p className="text-sm text-muted-foreground leading-relaxed mb-7">
              {car.description}
            </p>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: "Engine", value: car.engine },
                { label: "Horsepower", value: `${Number(car.horsepower)} HP` },
                { label: "Year", value: Number(car.year) },
                { label: "Category", value: car.category },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="bg-secondary/60 p-3 border border-border/40"
                >
                  <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                    {spec.label}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-champagne-light uppercase tracking-widest text-xs font-bold h-12 group"
              onClick={() => {
                onClose();
                onInquire(car);
              }}
            >
              Inquire About This Car
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Showroom ─────────────────────────────────────────────────────────────────

interface ShowroomProps {
  activeBrand: string;
  setActiveBrand: (b: string) => void;
  onViewCar: (car: Car) => void;
}

function Showroom({ activeBrand, setActiveBrand, onViewCar }: ShowroomProps) {
  const { data: cars, isLoading } = useGetCars();

  const filtered =
    activeBrand === "All"
      ? (cars ?? [])
      : (cars ?? []).filter((c) =>
          c.make.toLowerCase().includes(activeBrand.toLowerCase()),
        );

  return (
    <section id="showroom" className="py-28 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-14"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 mb-5"
          >
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs tracking-[0.25em] text-primary font-semibold uppercase">
              Our Collection
            </span>
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none"
            >
              The Showroom
            </motion.h2>

            {/* Brand filter */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 flex-wrap"
            >
              {BRANDS.map((brand) => (
                <button
                  type="button"
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest font-semibold border transition-all duration-200 ${
                    activeBrand === brand
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40 bg-transparent"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Car grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((id) => (
              <CarSkeleton key={id} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground text-base mb-4">
              No vehicles available for this brand.
            </p>
            <Button
              variant="outline"
              onClick={() => setActiveBrand("All")}
              className="uppercase text-xs tracking-widest"
            >
              View All Vehicles
            </Button>
          </div>
        ) : (
          <motion.div
            key={activeBrand}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((car) => (
              <CarCard
                key={String(car.id)}
                car={car}
                onView={() => onViewCar(car)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── Featured ─────────────────────────────────────────────────────────────────

interface FeaturedProps {
  onViewCar: (car: Car) => void;
}

function Featured({ onViewCar }: FeaturedProps) {
  const { data: cars } = useGetCars();
  const featured = (cars ?? []).slice(0, 2);

  if (!featured.length) return null;

  return (
    <section
      id="featured"
      className="py-28 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 48px, oklch(0.78 0.11 82) 48px, oklch(0.78 0.11 82) 49px), repeating-linear-gradient(90deg, transparent, transparent 48px, oklch(0.78 0.11 82) 48px, oklch(0.78 0.11 82) 49px)",
        }}
      />

      <div className="relative container mx-auto px-6 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs tracking-[0.25em] text-primary font-semibold uppercase">
              Editor's Choice
            </span>
            <span className="h-px w-10 bg-primary" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold"
          >
            Featured Picks
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed"
          >
            Hand-selected by our curators — vehicles that represent the absolute
            summit of automotive achievement.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {featured.map((car) => (
            <CarCard
              key={String(car.id)}
              car={car}
              onView={() => onViewCar(car)}
              featured
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const pillars = [
    {
      number: "01",
      title: "Uncompromising Curation",
      description:
        "Every vehicle in our collection is personally selected by our team of experts. We maintain relationships with the world's premier marques and private collections, ensuring access to the most extraordinary automobiles before they reach the open market.",
    },
    {
      number: "02",
      title: "White-Glove Service",
      description:
        "From your first inquiry to the moment you receive your keys, our dedicated specialists handle every detail. Worldwide delivery, bespoke financing, and concierge registration services are all part of the LuxuryCars experience.",
    },
    {
      number: "03",
      title: "Heritage & Trust",
      description:
        "Operating since 2009, we have built a reputation for absolute integrity. Every car comes with a full provenance dossier, independent inspection certificate, and our personal guarantee of authenticity.",
    },
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 mb-5"
            >
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs tracking-[0.25em] text-primary font-semibold uppercase">
                Our Story
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.1] mb-8"
            >
              Where Passion Meets{" "}
              <span className="shimmer-gold italic">Perfection</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed mb-5 text-base"
            >
              At LuxuryCars, we believe that the finest automobiles are not
              merely machines — they are moving works of art, engineering
              masterpieces, and extensions of their owners' ambitions. Our
              dealership was founded on this conviction, and it drives every
              decision we make.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed mb-5 text-base"
            >
              We curate only the finest automobiles from the world's most
              prestigious brands — Lamborghini, Ferrari, Rolls-Royce, Bentley,
              Porsche, and McLaren. Each car is selected for its rarity,
              provenance, condition, and the singular experience it delivers to
              its driver.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed text-base"
            >
              Our clients include collectors, connoisseurs, and those
              experiencing the pinnacle of motoring for the first time. Whatever
              your journey, we are honoured to be part of it.
            </motion.p>
          </motion.div>

          {/* Visual collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/assets/generated/car-ferrari.dim_800x500.jpg"
                  alt="Ferrari"
                  className="w-full h-full object-cover car-img-zoom"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden mt-10">
                <img
                  src="/assets/generated/car-rollsroyce.dim_800x500.jpg"
                  alt="Rolls Royce"
                  className="w-full h-full object-cover car-img-zoom"
                />
              </div>
            </div>
            {/* Decorative champagne frame */}
            <div className="absolute -inset-4 border border-primary/15 pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-24 h-24 border-b-2 border-r-2 border-primary/40 pointer-events-none" />
          </motion.div>
        </div>

        {/* Pillars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.number}
              variants={cardVariant}
              className="group relative border border-border/60 p-7 hover:border-primary/40 transition-all duration-400 bg-card/40 hover:bg-card/80"
            >
              <div className="font-display text-5xl font-bold text-primary/15 mb-5 group-hover:text-primary/30 transition-colors duration-400">
                {pillar.number}
              </div>
              <h3 className="font-display text-lg font-bold mb-3 text-foreground">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

interface ContactProps {
  prefilledCar: Car | null;
  onClearPrefill: () => void;
}

function Contact({ prefilledCar, onClearPrefill }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { mutate, isPending, isSuccess } = useSubmitInquiry();
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // When a car is prefilled, update message
  useEffect(() => {
    if (prefilledCar) {
      const year = Number(prefilledCar.year);
      setForm((prev) => ({
        ...prev,
        message: `I am interested in the ${year} ${prefilledCar.make} ${prefilledCar.model}. Please provide more information.`,
      }));
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [prefilledCar]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const carId = prefilledCar?.id ?? BigInt(0);
    mutate(
      { name: form.name, email: form.email, message: form.message, carId },
      {
        onSuccess: () => {
          toast.success("Inquiry sent. We'll be in touch within 24 hours.");
          setForm({ name: "", email: "", message: "" });
          onClearPrefill();
          formRef.current?.reset();
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  }

  return (
    <section id="contact" ref={sectionRef} className="py-28 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs tracking-[0.25em] text-primary font-semibold uppercase">
              Private Inquiries
            </span>
            <span className="h-px w-10 bg-primary" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold mb-4"
          >
            Begin Your Journey
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Whether you've found your dream car in our showroom or wish to
            commission a bespoke search, our specialists are ready to assist.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="space-y-9"
          >
            {[
              {
                icon: <MapPin className="w-5 h-5 text-primary" />,
                label: "Visit Our Gallery",
                lines: [
                  "One Mayfair Square, London W1K 6AN",
                  "By appointment only",
                ],
              },
              {
                icon: <Phone className="w-5 h-5 text-primary" />,
                label: "Private Line",
                lines: ["+44 20 7946 0184", "Mon–Sat 9AM–7PM GMT"],
              },
              {
                icon: <Mail className="w-5 h-5 text-primary" />,
                label: "Email Our Specialists",
                lines: ["concierge@luxurycars.com", "Response within 2 hours"],
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex items-start gap-5"
              >
                <div className="w-11 h-11 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-1.5">
                    {item.label}
                  </p>
                  {item.lines.map((line, idx) => (
                    <p
                      key={line}
                      className={
                        idx === 0
                          ? "text-foreground font-semibold"
                          : "text-sm text-muted-foreground mt-0.5"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Quote */}
            <motion.blockquote
              variants={fadeUp}
              className="border-l-2 border-primary/40 pl-5 mt-8"
            >
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "Every great automobile deserves a custodian who understands its
                character. We are here to find yours."
              </p>
              <cite className="text-[10px] text-primary uppercase tracking-widest mt-3 block not-italic font-semibold">
                — The LuxuryCars Team
              </cite>
            </motion.blockquote>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {prefilledCar && (
              <div className="mb-5 p-4 bg-primary/10 border border-primary/25 flex items-center justify-between gap-3">
                <p className="text-sm text-foreground">
                  Inquiring about:{" "}
                  <span className="font-semibold champagne-text">
                    {Number(prefilledCar.year)} {prefilledCar.make}{" "}
                    {prefilledCar.model}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClearPrefill();
                    setForm((p) => ({ ...p, message: "" }));
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Remove pre-filled car"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {isSuccess ? (
              <div className="bg-card border border-primary/30 p-10 text-center shadow-champagne">
                <div className="w-14 h-14 mx-auto mb-5 bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <span className="champagne-text text-2xl font-display font-bold">
                    ✓
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  Inquiry Received
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Thank you for your inquiry. One of our specialists will
                  contact you personally within 24 hours.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-card border border-border/60 p-7 space-y-5"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-name"
                    className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="bg-background border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary h-11"
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-email"
                    className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="bg-background border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary h-11"
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-message"
                    className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us how we can assist you..."
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="bg-background border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary resize-none"
                    disabled={isPending}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full bg-primary text-primary-foreground hover:bg-champagne-light uppercase tracking-widest text-xs font-bold h-12"
                >
                  {isPending && (
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  {isPending ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const navLinks = [
    { label: "Showroom", href: "#showroom" },
    { label: "Featured", href: "#featured" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-border/60 bg-card py-14">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div>
            <span className="font-display text-2xl font-bold tracking-tight">
              <span className="champagne-text">LUXURY</span>
              <span className="text-foreground/70">CARS</span>
            </span>
            <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">
              Curated Automotive Excellence
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.2em]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground text-center md:text-right leading-relaxed">
            <p>© {year} LuxuryCars. All rights reserved.</p>
            <p className="mt-1">
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/70 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeBrand, setActiveBrand] = useState("All");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [inquiryCar, setInquiryCar] = useState<Car | null>(null);

  function handleViewCar(car: Car) {
    setSelectedCar(car);
  }

  function handleInquire(car: Car) {
    setInquiryCar(car);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground grain-overlay">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.12 0.006 240)",
            color: "oklch(0.95 0.008 80)",
            border: "1px solid oklch(0.22 0.008 240)",
          },
        }}
      />

      <Navbar />

      <main>
        <Hero />

        <Showroom
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
          onViewCar={handleViewCar}
        />

        <Featured onViewCar={handleViewCar} />

        <About />

        <Contact
          prefilledCar={inquiryCar}
          onClearPrefill={() => setInquiryCar(null)}
        />
      </main>

      <Footer />

      {/* Car detail modal */}
      <CarModal
        car={selectedCar}
        open={!!selectedCar}
        onClose={() => setSelectedCar(null)}
        onInquire={handleInquire}
      />
    </div>
  );
}
