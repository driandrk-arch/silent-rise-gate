import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import heroSilhouette from "@/assets/hero-silhouette.jpg";
import productNavy from "@/assets/product-navy.jpg";
import productEmerald from "@/assets/product-emerald.jpg";
import detailFabric from "@/assets/detail-fabric.jpg";
import detailHardware from "@/assets/detail-hardware.jpg";
import detailBox from "@/assets/detail-box.jpg";

export const Route = createFileRoute("/")({
  component: SilentRisePage,
});

type ReserveTarget = {
  name: string;
  color: string;
  image: string;
} | null;

function SilentRisePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const [reserve, setReserve] = useState<ReserveTarget>(null);
  const [size, setSize] = useState("M");

  useEffect(() => {
    document.body.style.overflow = unlocked ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [unlocked]);

  useEffect(() => {
    document.body.style.overflow = reserve ? "hidden" : unlocked ? "" : "hidden";
  }, [reserve, unlocked]);

  const handleGate = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim().length >= 4) {
      setUnlocked(true);
    } else {
      setHint("Your access code has not been recognised.");
    }
  };

  return (
    <>
      {!unlocked && <Gate code={code} setCode={setCode} hint={hint} onSubmit={handleGate} />}
      {unlocked && (
        <main className="fade-in-slow">
          <Header />
          <ProductShowcase onReserve={setReserve} />
          <BentoGrid />
          <SpecsSection onReserve={setReserve} />
          <Footer />
        </main>
      )}
      {reserve && (
        <ReserveOverlay
          product={reserve}
          size={size}
          setSize={setSize}
          onClose={() => setReserve(null)}
        />
      )}
    </>
  );
}

/* ---------- Gate ---------- */
function Gate({
  code, setCode, hint, onSubmit,
}: {
  code: string;
  setCode: (v: string) => void;
  hint: string | null;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 vignette">
        <img
          src={heroSilhouette}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-70"
          style={{ animation: "fadeIn 3s ease-out both, gateZoom 24s ease-in-out infinite alternate" }}
        />
      </div>
      <style>{`@keyframes gateZoom { from { transform: scale(1.02); } to { transform: scale(1.12); } }`}</style>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 text-center">
        <p className="rise-in text-[0.65rem] tracking-brand text-foreground/60 uppercase">MMXXV — Allocation I</p>
        <h1
          className="rise-in mt-10 font-serif text-5xl font-light text-foreground sm:text-6xl"
          style={{ letterSpacing: "0.15em", animationDelay: "120ms" }}
        >
          SILENT&nbsp;RISE
        </h1>
        <div className="rise-in gold-line mt-10" style={{ animationDelay: "260ms" }} />
        <p
          className="rise-in mt-10 max-w-md text-sm leading-relaxed text-foreground/65"
          style={{ animationDelay: "380ms" }}
        >
          An aligned circle of individuals.
          <br />
          Enter your access code to proceed.
        </p>

        <form
          onSubmit={onSubmit}
          className="rise-in mt-14 flex w-full max-w-sm flex-col items-center gap-6"
          style={{ animationDelay: "520ms" }}
        >
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Code"
            aria-label="Access code"
            className="input-luxe w-full px-4 py-4 text-center text-sm tracking-wider-2"
          />
          <button type="submit" className="btn-luxe w-full">
            Request Allocation
          </button>
          {hint && (
            <p className="text-[0.7rem] tracking-wider-2 uppercase text-accent">{hint}</p>
          )}
        </form>

        <p className="fade-in mt-20 text-[0.6rem] tracking-brand text-foreground/35 uppercase" style={{ animationDelay: "800ms" }}>
          By invitation only · Private release
        </p>
      </div>
    </section>
  );
}

/* ---------- Header ---------- */
function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-6 sm:px-14">
        <span className="text-[0.7rem] tracking-brand text-foreground/60 uppercase">Member · 0142</span>
        <a href="#top" className="font-serif text-base tracking-brand text-foreground" style={{ letterSpacing: "0.32em" }}>
          SILENT RISE
        </a>
        <span className="text-[0.7rem] tracking-brand text-accent uppercase">Allocation Active</span>
      </div>
    </header>
  );
}

/* ---------- Product Showcase ---------- */
function ProductShowcase({ onReserve }: { onReserve: (p: ReserveTarget) => void }) {
  return (
    <section id="top" className="px-6 pt-32 pb-24 sm:px-14 sm:pt-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.65rem] tracking-brand text-accent uppercase">The Inaugural Releases</p>
          <h2 className="mt-8 font-serif text-4xl font-light text-foreground sm:text-6xl" style={{ letterSpacing: "0.04em" }}>
            Two pieces.<br />
            <span className="italic text-foreground/80">One philosophy.</span>
          </h2>
          <div className="gold-line mx-auto mt-10" />
          <p className="mx-auto mt-10 max-w-lg text-sm leading-loose text-foreground/60">
            Constructed in restricted quantity. Numbered. Released without sequel.
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="https://silent-rise-2.myshopify.com/collections/all"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxe btn-solid"
          >
            Vásárlás
          </a>
        </div>

        <div className="mt-32 grid gap-24 lg:grid-cols-2 lg:gap-16">
          <ProductCard
            number="I"
            name="The Navy Polo"
            color="Deep Cruise Navy"
            fit="Slim · Tailored"
            embroidery="Tonal Cloud Dancer SR Monogram, 3D Puff"
            image={productNavy}
            url="https://silent-rise-2.myshopify.com/products/mens-dress-wear-example-product-3"
          />
          <ProductCard
            number="II"
            name="The Emerald Polo"
            color="Harrods Bottle Green"
            fit="Italian Placket · Tailored Sleeve"
            embroidery="Sand 3D Puff Monogram, Discrete"
            image={productEmerald}
            url="https://silent-rise-2.myshopify.com/products/short-t-shirt"
          />
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  number, name, color, fit, embroidery, image, url,
}: {
  number: string;
  name: string;
  color: string;
  fit: string;
  embroidery: string;
  image: string;
  url: string;
}) {
  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden bg-card">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={1080}
          height={1440}
          className="aspect-[3/4] w-full object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        <span className="absolute top-6 left-6 text-[0.65rem] tracking-brand text-foreground/80 uppercase">
          № {number} / II
        </span>
      </div>

      <div className="mt-10 flex flex-col gap-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-3xl font-light text-foreground" style={{ letterSpacing: "0.04em" }}>
            {name}
          </h3>
          <span className="text-[0.7rem] tracking-wider-2 text-foreground/50 uppercase">€ 480</span>
        </div>

        <dl className="grid grid-cols-1 gap-3 border-t border-border/60 pt-6 text-[0.72rem] tracking-wider-2 uppercase">
          <SpecRow k="Colour" v={color} />
          <SpecRow k="Fit" v={fit} />
          <SpecRow k="Embroidery" v={embroidery} />
          <SpecRow k="Allocation" v="08 of 60 remaining" gold />
        </dl>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxe mt-4 self-start"
        >
          Reserve Piece
        </a>
      </div>
    </article>
  );
}

function SpecRow({ k, v, gold = false }: { k: string; v: string; gold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border/40 pb-3">
      <dt className="text-foreground/45">{k}</dt>
      <dd className={gold ? "text-accent" : "text-foreground/85"}>{v}</dd>
    </div>
  );
}

/* ---------- Bento ---------- */
function BentoGrid() {
  return (
    <section className="bg-card px-6 py-32 sm:px-14 sm:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.65rem] tracking-brand text-accent uppercase">The Anatomy of Quality</p>
          <h2 className="mt-8 font-serif text-4xl font-light text-foreground sm:text-5xl" style={{ letterSpacing: "0.04em" }}>
            Engineered <span className="italic text-foreground/80">in silence.</span>
          </h2>
          <div className="gold-line mx-auto mt-10" />
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-6 md:grid-rows-2">
          <BentoCard
            className="md:col-span-3 md:row-span-2"
            image={detailFabric}
            eyebrow="01 — The Substance"
            title="215 GSM Combed Cotton"
            body="A heavy, dense piqué knit engineered to hold its silhouette, move with absolute comfort, and promise a lifetime of structural integrity."
            tall
          />
          <BentoCard
            className="md:col-span-3"
            image={detailHardware}
            eyebrow="02 — The Hardware"
            title="The Signature Plate"
            body="A laser-etched, rigid carbon fibre plate secured by dual gunmetal rivets. High-tech engineering meeting traditional couture."
          />
          <BentoCard
            className="md:col-span-3"
            image={detailBox}
            eyebrow="03 — The Ritual"
            title="The Presentation"
            body="Delivered in a heavy-duty matte black magnetic-closure box. Wrapped in black tissue. Verified by an individually numbered Certificate of Authenticity."
          />
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  className = "", image, eyebrow, title, body, tall = false,
}: {
  className?: string;
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  tall?: boolean;
}) {
  return (
    <article className={`group relative overflow-hidden bg-background ${className}`}>
      <img
        src={image}
        alt=""
        loading="lazy"
        width={1280}
        height={tall ? 1600 : 800}
        className={`w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105 ${tall ? "h-full min-h-[520px]" : "h-72 sm:h-80"}`}
      />
      <div className="absolute inset-x-0 bottom-0 scrim p-8 sm:p-10">
        <p className="text-[0.65rem] tracking-brand text-accent uppercase">{eyebrow}</p>
        <h3 className="mt-4 font-serif text-2xl font-light text-foreground sm:text-3xl" style={{ letterSpacing: "0.04em" }}>
          {title}
        </h3>
        <p className="mt-4 max-w-md text-[0.78rem] leading-relaxed text-foreground/65">{body}</p>
      </div>
    </article>
  );
}

/* ---------- Specs ---------- */
function SpecsSection() {
  const specs = [
    ["Material", "Organic Supima Cotton, 215 GSM"],
    ["Knit", "Heavy-weight piqué, diamond waffle"],
    ["Collar", "Italian collar construction, hand-set"],
    ["Stitch", "12–14 stitch-per-inch reinforced side seams"],
    ["Finish", "Non-iron shape retention, garment washed"],
    ["Hardware", "Carbon fibre signature plate, gunmetal rivets"],
    ["Origin", "Cut & sewn in Northern Italy"],
    ["Allocation", "Numbered, 60 pieces per colourway"],
  ];

  return (
    <section className="px-6 py-32 sm:px-14 sm:py-44">
      <div className="mx-auto grid max-w-[1400px] gap-20 lg:grid-cols-[1fr_1.2fr] lg:gap-32">
        <div>
          <p className="text-[0.65rem] tracking-brand text-accent uppercase">Specifications</p>
          <h2 className="mt-8 font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl" style={{ letterSpacing: "0.04em" }}>
            Every choice<br />
            <span className="italic text-foreground/80">considered.</span>
          </h2>
          <div className="gold-line mt-10" />
          <p className="mt-10 max-w-md text-sm leading-loose text-foreground/60">
            No detail is incidental. Each component is selected with the intention of permanence.
          </p>

          <button
            onClick={() =>
              onReserve({
                name: "The Navy Polo",
                color: "Deep Cruise Navy",
                image: productNavy,
              })
            }
            className="btn-luxe btn-solid mt-14"
          >
            Request Allocation
          </button>
        </div>

        <dl className="divide-y divide-border/60">
          {specs.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[1fr_2fr] gap-6 py-6">
              <dt className="text-[0.7rem] tracking-brand text-foreground/45 uppercase">{k}</dt>
              <dd className="font-serif text-lg font-light text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border/50 px-6 py-16 sm:px-14">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-serif text-lg tracking-brand text-foreground/80" style={{ letterSpacing: "0.32em" }}>
          SILENT RISE
        </p>
        <p className="text-[0.65rem] tracking-brand text-foreground/40 uppercase">
          Allocation MMXXV · Numbered Release · Northern Italy
        </p>
        <p className="text-[0.65rem] tracking-brand text-foreground/40 uppercase">
          Atelier · Concierge · Press
        </p>
      </div>
    </footer>
  );
}

/* ---------- Reserve Overlay ---------- */
function ReserveOverlay({
  product, size, setSize, onClose,
}: {
  product: NonNullable<ReserveTarget>;
  size: string;
  setSize: (s: string) => void;
  onClose: () => void;
}) {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const panelRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    // Focus the close button on open
    closeBtnRef.current?.focus();

    const getFocusable = () => {
      const panel = panelRef.current;
      if (!panel) return [] as HTMLElement[];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("aria-hidden"));
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusable = getFocusable();
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !panelRef.current?.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="reserve-title">
      <button
        onClick={onClose}
        aria-label="Close reservation"
        tabIndex={-1}
        className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm"
        style={{ animation: "fadeIn 400ms ease-out both" }}
      />
      <aside
        ref={panelRef}
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-card text-foreground"
        style={{ animation: "slideIn 600ms cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

        <div className="flex items-center justify-between border-b border-border/60 px-8 py-6">
          <p className="text-[0.65rem] tracking-brand text-accent uppercase">Reservation</p>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close reservation (Esc)"
            className="focus-luxe rounded-sm px-1 text-[0.65rem] tracking-brand text-foreground/60 uppercase transition-colors hover:text-accent"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-10">
          <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
          <div className="mt-8">
            <h3 id="reserve-title" className="font-serif text-2xl font-light" style={{ letterSpacing: "0.04em" }}>{product.name}</h3>
            <p className="mt-2 text-[0.7rem] tracking-wider-2 text-foreground/55 uppercase">{product.color}</p>
            <p className="mt-6 text-[0.7rem] tracking-brand text-accent uppercase">€ 480 · Numbered Piece</p>
          </div>

          <div className="mt-10">
            <p id="size-label" className="text-[0.65rem] tracking-brand text-foreground/50 uppercase">Select size</p>
            <div role="radiogroup" aria-labelledby="size-label" className="mt-5 grid grid-cols-5 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  role="radio"
                  aria-checked={size === s}
                  onClick={() => setSize(s)}
                  className={`focus-luxe border py-3 text-[0.75rem] tracking-wider-2 uppercase transition-colors ${
                    size === s
                      ? "border-accent text-accent"
                      : "border-border text-foreground/70 hover:border-foreground/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="hairline mt-12" />

          <ul className="mt-8 space-y-3 text-[0.7rem] tracking-wider-2 text-foreground/55 uppercase">
            <li className="flex justify-between"><span>Edition</span><span className="text-foreground/85">№ 53 / 60</span></li>
            <li className="flex justify-between"><span>Despatch</span><span className="text-foreground/85">7 — 10 days</span></li>
            <li className="flex justify-between"><span>Presentation</span><span className="text-foreground/85">Magnetic rigid box</span></li>
          </ul>
        </div>

        <div className="border-t border-border/60 px-8 py-6">
          <button className="btn-luxe btn-solid w-full">Proceed to Secure Checkout</button>
          <p className="mt-4 text-center text-[0.6rem] tracking-brand text-foreground/40 uppercase">
            Stripe · Apple Pay · Wire
          </p>
        </div>
      </aside>
    </div>
  );
}
