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
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
  Snowflake,
  Star,
  Wind,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Product } from "./backend.d";
import { useListCoats, useSubmitContactForm } from "./hooks/useQueries";

// ─── Image mapping ────────────────────────────────────────────────────────────

function getCoatImage(product: Product): string {
  const name = `${product.name} ${product.category}`.toLowerCase();
  if (name.includes("wool") || name.includes("overcoat")) {
    return "/assets/generated/coat-wool-overcoat.dim_600x800.jpg";
  }
  if (name.includes("trench")) {
    return "/assets/generated/coat-trench.dim_600x800.jpg";
  }
  if (name.includes("camel") || name.includes("wrap")) {
    return "/assets/generated/coat-camel.dim_600x800.jpg";
  }
  if (
    name.includes("puffer") ||
    name.includes("down") ||
    name.includes("arctic")
  ) {
    return "/assets/generated/coat-puffer.dim_600x800.jpg";
  }
  if (
    name.includes("pea") ||
    name.includes("naval") ||
    name.includes("peacoat")
  ) {
    return "/assets/generated/coat-peacoat.dim_600x800.jpg";
  }
  if (
    name.includes("parka") ||
    name.includes("expedition") ||
    name.includes("alpine")
  ) {
    return "/assets/generated/coat-parka.dim_600x800.jpg";
  }
  if (name.includes("bomber") || name.includes("satin")) {
    return "/assets/generated/coat-bomber.dim_600x800.jpg";
  }
  if (name.includes("rain") || name.includes("urban")) {
    return "/assets/generated/coat-raincoat.dim_600x800.jpg";
  }
  // fallback by category
  if (name.includes("winter"))
    return "/assets/generated/coat-puffer.dim_600x800.jpg";
  if (name.includes("casual"))
    return "/assets/generated/coat-bomber.dim_600x800.jpg";
  return "/assets/generated/coat-wool-overcoat.dim_600x800.jpg";
}

const CATEGORIES = ["All", "Classic", "Winter", "Casual"];

const CATEGORY_META = {
  Classic: {
    icon: <Star className="w-6 h-6" />,
    description:
      "Timeless silhouettes crafted from the finest wool and cashmere blends.",
    image: "/assets/generated/coat-trench.dim_600x800.jpg",
  },
  Winter: {
    icon: <Snowflake className="w-6 h-6" />,
    description:
      "Technical performance meets refined aesthetics for the coldest days.",
    image: "/assets/generated/coat-parka.dim_600x800.jpg",
  },
  Casual: {
    icon: <Wind className="w-6 h-6" />,
    description: "Effortless everyday styles that move with your life.",
    image: "/assets/generated/coat-bomber.dim_600x800.jpg",
  },
};

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Collections", href: "#collections" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-blur bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-3 group"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold tracking-wide">
            Coat <span className="text-gold-DEFAULT gold-text">Factory</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide uppercase"
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
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-primary text-primary-foreground hover:bg-gold-light font-medium tracking-wide uppercase text-xs px-5"
          >
            Shop Now
          </Button>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-sm text-foreground hover:bg-accent transition-colors"
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
            className="md:hidden border-t border-border/50 bg-background/95 nav-blur overflow-hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors uppercase tracking-wide"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-border/50">
                <Button
                  className="w-full bg-primary text-primary-foreground uppercase text-xs tracking-wide"
                  onClick={() => {
                    setMobileOpen(false);
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Shop Now
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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x600.jpg"
          alt="Coat Factory hero"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Est. 1987 · Premium Outerwear
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance mb-6"
          >
            Crafted for <span className="gold-text italic">Every</span>
            <br />
            Season.
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed max-w-md mb-10"
          >
            Over three decades of outerwear excellence. Each coat is designed
            with precision and built to become a lifelong companion.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-primary text-primary-foreground hover:bg-gold-light font-semibold tracking-wide uppercase px-8 text-sm"
            >
              Shop Collection
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById("collections")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-foreground/30 text-foreground hover:bg-foreground/10 font-medium tracking-wide uppercase text-sm"
            >
              View Collections
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex items-center gap-10"
          >
            {[
              { value: "38+", label: "Years of craftsmanship" },
              { value: "200+", label: "Styles available" },
              { value: "50k+", label: "Satisfied customers" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-display text-2xl font-bold gold-text">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative vertical text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
        <span className="h-20 w-px bg-primary/30" />
        <span
          className="text-xs text-primary/60 tracking-[0.3em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Premium Outerwear Since 1987
        </span>
        <span className="h-20 w-px bg-primary/30" />
      </div>
    </section>
  );
}

// ─── Collections ─────────────────────────────────────────────────────────────

interface CollectionsProps {
  onSelectCategory: (cat: string) => void;
}

function Collections({ onSelectCategory }: CollectionsProps) {
  return (
    <section id="collections" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Curated Collections
            </span>
            <span className="h-px w-10 bg-primary" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl font-bold mb-4"
          >
            Shop by Style
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Explore our carefully curated collections — from enduring classics
            to high-performance winter essentials.
          </motion.p>
        </motion.div>

        {/* Collection cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {(
            Object.entries(CATEGORY_META) as [
              string,
              (typeof CATEGORY_META)[keyof typeof CATEGORY_META],
            ][]
          ).map(([category, meta]) => (
            <motion.button
              key={category}
              variants={cardVariant}
              whileHover={{ y: -6 }}
              onClick={() => {
                onSelectCategory(category);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden rounded text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={meta.image}
                  alt={`${category} collection`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 gold-text mb-2">
                  {meta.icon}
                  <span className="text-xs uppercase tracking-[0.15em] font-semibold">
                    {category}
                  </span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  {meta.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-primary uppercase tracking-wide font-semibold group-hover:gap-2 transition-all duration-200">
                  Explore <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onView,
}: { product: Product; onView: () => void }) {
  const img = getCoatImage(product);
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -4 }}
      className="group relative bg-card rounded overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer flex flex-col"
      onClick={onView}
    >
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-base font-semibold leading-snug group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
          <Badge
            variant="secondary"
            className="shrink-0 text-xs bg-accent text-accent-foreground border-0 uppercase tracking-wide"
          >
            {product.category}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-xl font-bold gold-text">
            ${product.price.toLocaleString()}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-xs uppercase tracking-wide transition-all duration-200"
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

// ─── Product Skeleton ─────────────────────────────────────────────────────────

function ProductSkeleton() {
  return (
    <div className="bg-card rounded overflow-hidden shadow-card">
      <Skeleton className="aspect-[3/4] w-full bg-secondary" />
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 flex-1 bg-secondary" />
          <Skeleton className="h-5 w-16 bg-secondary" />
        </div>
        <Skeleton className="h-4 w-full bg-secondary" />
        <Skeleton className="h-4 w-3/4 bg-secondary" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-7 w-20 bg-secondary" />
          <Skeleton className="h-8 w-24 bg-secondary" />
        </div>
      </div>
    </div>
  );
}

// ─── Product Modal ────────────────────────────────────────────────────────────

function ProductModal({
  product,
  open,
  onClose,
}: { product: Product | null; open: boolean; onClose: () => void }) {
  if (!product) return null;
  const img = getCoatImage(product);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="aspect-[3/4] sm:aspect-auto overflow-hidden bg-secondary">
            <img
              src={img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 sm:p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary/20 text-primary border-0 uppercase tracking-wide text-xs">
                  {product.category}
                </Badge>
              </div>
              <DialogTitle className="font-display text-2xl sm:text-3xl font-bold leading-snug">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <div className="flex items-center gap-2 mb-6">
              <span className="font-display text-3xl font-bold gold-text">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">USD</span>
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-border mb-6" />

            <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
              {product.description}
            </p>

            {/* Features */}
            <ul className="space-y-2 mb-8 text-sm">
              {[
                "Premium natural materials",
                "Expert hand-stitched details",
                "Fully lined interior",
                "Available in multiple sizes",
              ].map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-2 text-foreground/80"
                >
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-gold-light uppercase tracking-wider text-sm font-semibold"
            >
              <ShoppingBag className="mr-2 w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────

interface ProductsProps {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}

function Products({ activeCategory, setActiveCategory }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: products, isLoading } = useListCoats();

  const filtered =
    activeCategory === "All"
      ? (products ?? [])
      : (products ?? []).filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-12"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Our Products
            </span>
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold"
            >
              The Collection
            </motion.h2>

            {/* Filter bar */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 flex-wrap"
            >
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-medium rounded-sm border transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Product grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => `skeleton-${i}`).map((id) => (
              <ProductSkeleton key={id} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground text-lg">
              No coats found in this category.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setActiveCategory("All")}
            >
              Show All
            </Button>
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                onView={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Product detail modal */}
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const values = [
    {
      number: "01",
      title: "Heritage Craft",
      description:
        "Each coat begins with the finest raw materials — Italian wool, British gabardine, Canadian goose down. We source only from artisan mills with generations of experience.",
    },
    {
      number: "02",
      title: "Expert Construction",
      description:
        "Our master tailors bring decades of experience to every piece. Hand-stitched details, precision-cut patterns, and meticulous finishing elevate each coat to a work of art.",
    },
    {
      number: "03",
      title: "Enduring Design",
      description:
        "We design for the long term. Trends come and go — our coats are engineered to be worn for decades, becoming more distinguished with every season.",
    },
  ];

  return (
    <section id="about" className="py-24 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, oklch(0.74 0.12 75) 40px, oklch(0.74 0.12 75) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, oklch(0.74 0.12 75) 40px, oklch(0.74 0.12 75) 41px)",
          }}
        />
      </div>

      <div className="relative container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                Our Story
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6"
            >
              Built on a Belief in{" "}
              <span className="gold-text italic">Better</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed mb-4"
            >
              Coat Factory was founded in 1987 by master tailor Elias Marchetti,
              who believed that outerwear should do more than keep you warm — it
              should make you feel invincible.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed"
            >
              From a small workshop in the garment district, we've grown to
              dress executives, explorers, and everyday heroes. Our commitment
              to quality has never wavered: every coat that leaves our factory
              is a promise kept to our customers.
            </motion.p>
          </motion.div>

          {/* Right image collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[2/3] overflow-hidden rounded">
                <img
                  src="/assets/generated/coat-camel.dim_600x800.jpg"
                  alt="Camel coat"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[2/3] overflow-hidden rounded mt-8">
                <img
                  src="/assets/generated/coat-peacoat.dim_600x800.jpg"
                  alt="Peacoat"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Decorative gold frame */}
            <div className="absolute -inset-3 border border-primary/20 rounded pointer-events-none" />
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((val) => (
            <motion.div
              key={val.number}
              variants={cardVariant}
              className="border border-border p-6 rounded group hover:border-primary/50 transition-colors duration-300"
            >
              <div className="font-display text-4xl font-bold text-primary/30 mb-4 group-hover:text-primary/60 transition-colors duration-300">
                {val.number}
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                {val.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { mutate, isPending, isSuccess } = useSubmitContactForm();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    mutate(form, {
      onSuccess: () => {
        toast.success("Message sent! We'll be in touch within 24 hours.");
        setForm({ name: "", email: "", message: "" });
        formRef.current?.reset();
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  }

  return (
    <section id="contact" className="py-24 bg-secondary/30">
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
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Get in Touch
            </span>
            <span className="h-px w-10 bg-primary" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl font-bold mb-4"
          >
            We'd Love to Hear from You
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Whether you have a question about our coats, need sizing advice, or
            want to discuss a bespoke order — our team is here to help.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="space-y-8"
          >
            {[
              {
                icon: <MapPin className="w-5 h-5 text-primary" />,
                label: "Visit Our Showroom",
                lines: ["1247 Garment District Ave", "New York, NY 10018"],
              },
              {
                icon: <Phone className="w-5 h-5 text-primary" />,
                label: "Call Us",
                lines: ["+1 (212) 555-0174", "Mon–Fri 9AM–6PM EST"],
              },
              {
                icon: <Mail className="w-5 h-5 text-primary" />,
                label: "Email Us",
                lines: ["hello@coatfactory.com", "We reply within 24 hours"],
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                    {item.label}
                  </p>
                  {item.lines.map((line) => (
                    <p
                      key={line}
                      className={
                        item.lines.indexOf(line) === 0
                          ? "text-foreground font-medium"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded p-6 sm:p-8 space-y-5"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Marchetti"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  disabled={isPending || isSuccess}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  disabled={isPending || isSuccess}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary resize-none"
                  disabled={isPending || isSuccess}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isPending || isSuccess}
                className="w-full bg-primary text-primary-foreground hover:bg-gold-light uppercase tracking-wider text-sm font-semibold"
              >
                {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                {isSuccess
                  ? "Message Sent!"
                  : isPending
                    ? "Sending..."
                    : "Send Message"}
              </Button>
            </form>
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
    { label: "Collections", href: "#collections" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-semibold tracking-wide">
              Coat <span className="gold-text">Factory</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground text-center md:text-right">
            <p>© {year} Coat Factory. All rights reserved.</p>
            <p className="mt-1">
              Built with ❤ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
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
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background text-foreground grain-overlay">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.22 0.008 60)",
            color: "oklch(0.96 0.01 80)",
            border: "1px solid oklch(0.28 0.01 65)",
          },
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <Collections onSelectCategory={setActiveCategory} />
        <Products
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
