"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clapperboard,
  Clock3,
  Film,
  Mail,
  Pause,
  Phone,
  Play,
  Sparkles,
  Wand2,
} from "lucide-react";
import {
  DEFAULT_SITE_CONTENT,
  type ServiceIconKey,
  type SiteContent,
  type WorkItem,
} from "@/lib/site-content";
import { loadSiteContent, SITE_CONTENT_STORAGE_KEY } from "@/lib/site-content-storage";

const SERVICE_ICON_MAP: Record<ServiceIconKey, typeof Camera> = {
  camera: Camera,
  film: Film,
  wand: Wand2,
  clock: Clock3,
};

const TRAFFIC_CLIENT_ID_KEY = "ds-productions:traffic-client-id";
const PORTFOLIO_YOUTUBE_URL = "https://www.youtube.com/@Ds.Productions-u9c";

type LandingProps = {
  imageSystemWorkItems?: WorkItem[];
  categoryOneHeroImages?: {
    center?: string;
    right?: string;
    left?: string;
  };
};

function applyImageSystemOverrides(
  baseContent: SiteContent,
  imageSystemWorkItems?: WorkItem[],
  categoryOneHeroImages?: {
    center?: string;
    right?: string;
    left?: string;
  },
): SiteContent {
  let nextContent = baseContent;

  if (imageSystemWorkItems) {
    nextContent = {
      ...nextContent,
      work: {
        ...nextContent.work,
        items: imageSystemWorkItems,
      },
    };
  }

  if (categoryOneHeroImages) {
    const baseMiniShowcase = [
      nextContent.miniShowcase[0] ?? DEFAULT_SITE_CONTENT.miniShowcase[0],
      nextContent.miniShowcase[1] ?? DEFAULT_SITE_CONTENT.miniShowcase[1],
    ];

    nextContent = {
      ...nextContent,
      hero: {
        ...nextContent.hero,
        mediaImage: categoryOneHeroImages.center ?? nextContent.hero.mediaImage,
      },
      miniShowcase: [
        {
          ...baseMiniShowcase[0],
          image: categoryOneHeroImages.right ?? baseMiniShowcase[0].image,
        },
        {
          ...baseMiniShowcase[1],
          image: categoryOneHeroImages.left ?? baseMiniShowcase[1].image,
        },
      ],
    };
  }

  return nextContent;
}

export default function Landing({
  imageSystemWorkItems,
  categoryOneHeroImages,
}: LandingProps) {
  const [content, setContent] = useState<SiteContent>(() =>
    applyImageSystemOverrides(
      DEFAULT_SITE_CONTENT,
      imageSystemWorkItems,
      categoryOneHeroImages,
    ),
  );

  useEffect(() => {
    setContent(
      applyImageSystemOverrides(
        loadSiteContent(),
        imageSystemWorkItems,
        categoryOneHeroImages,
      ),
    );

    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key === SITE_CONTENT_STORAGE_KEY) {
        setContent(
          applyImageSystemOverrides(
            loadSiteContent(),
            imageSystemWorkItems,
            categoryOneHeroImages,
          ),
        );
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [categoryOneHeroImages, imageSystemWorkItems]);

  const { navigation } = content;
  const services = content.process.services;
  const processSteps = content.process.steps;
  const workItems = content.work.items;
  const sectionOrderMap = new Map(
    (content.layout?.sectionOrder ?? ["studio", "work", "process", "contact"]).map(
      (key, index) => [key, index],
    ),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const clientId = getOrCreateTrafficClientId();

    void fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        path: window.location.pathname,
        clientId,
      }),
    }).catch(() => {
      // Silent fail: tracking should never block rendering.
    });
  }, []);

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-x-clip bg-[#070709] text-zinc-100"
    >
      <BackgroundDecor />

      <header className="sticky top-0 z-40 px-4 pb-2 pt-4 sm:px-6 lg:px-10">
        <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 sm:px-5">
          <Link href="#hero" className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-white/10">
              <Image
                src="/assets/danielmovie.png"
                alt="Ds.Productions"
                width={28}
                height={28}
                unoptimized
                className="h-7 w-7 object-contain"
                priority
              />
            </div>
            <p className="whitespace-nowrap font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.02em] text-white sm:text-base">
              {content.hero.brandLine}
            </p>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/15"
          >
            בואו נדבר
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="relative z-10 pb-12">
        <section id="hero" className="scroll-mt-28 px-4 pt-3 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="section-shell animate-fade-in-up relative overflow-hidden rounded-[1.8rem] p-6 sm:p-8 lg:p-10">
              <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-orange-400/15 blur-2xl" />
              <div className="relative">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-xs text-zinc-200">
                  <Sparkles className="h-3.5 w-3.5 text-orange-300" />
                  {content.hero.badge}
                </div>

                <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  <span className="block">{content.hero.titleLine1}</span>
                  <span className="block text-zinc-300">
                    {content.hero.titleLine2}
                  </span>
                  <span className="mt-2 block font-[family-name:var(--font-display)] text-3xl uppercase tracking-[0.18em] text-gradient sm:text-4xl">
                    {content.hero.brandLine}
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
                  {content.hero.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                  >
                    {content.hero.primaryCta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    {content.hero.secondaryCta}
                    <Mail className="h-4 w-4" />
                  </Link>
                  <Link
                    href={content.contact.phone.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:border-white/25 hover:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    {content.contact.phone.value}
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {content.hero.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <p className="font-[family-name:var(--font-display)] text-xl tracking-wider text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-zinc-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 hidden items-center gap-3 text-sm text-zinc-400 sm:flex">
                  <ChevronBadge text={content.labels.premiumSetup} />
                  {content.hero.helperText}
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up relative [animation-delay:140ms]">
              <div className="glass-panel group relative overflow-hidden rounded-[1.8rem] p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
                  <Image
                    src={content.hero.mediaImage}
                    alt={content.hero.mediaAlt}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-zinc-300">
                        {content.hero.mediaKicker}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {content.hero.mediaTitle}
                      </p>
                    </div>
                    <div className="hidden rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:block">
                      <Clapperboard className="h-5 w-5 text-orange-200" />
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {content.miniShowcase.map((item) => (
                    <MiniShowcaseCard
                      key={`${item.image}-${item.title}`}
                      image={item.image}
                      title={item.title}
                      subtitle={item.subtitle}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="mx-auto mt-6 max-w-7xl">
            <div className="section-shell overflow-hidden rounded-2xl px-3 py-3 sm:px-4">
              <InfiniteMarquee items={content.marqueeItems} />
            </div>
          </div>
        </section>

        <div className="flex flex-col">
        <section
          id="studio"
          className="scroll-mt-28 px-4 pt-16 sm:px-6 lg:px-10 lg:pt-24"
          style={{ order: sectionOrderMap.get("studio") ?? 0 }}
        >
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="section-shell rounded-[1.8rem] p-6 sm:p-8">
              <SectionBadge>{content.studio.badge}</SectionBadge>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {content.studio.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                {content.studio.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {content.studio.features.map((feature) => (
                  <FeaturePill key={feature} text={feature} />
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="section-shell rounded-[1.8rem] p-6">
                <h3 className="text-lg font-semibold text-white">
                  {content.studio.deliverablesTitle}
                </h3>
                <div className="mt-5 space-y-4">
                  {services.slice(0, 2).map((service) => {
                    const Icon = SERVICE_ICON_MAP[service.icon] ?? Camera;
                    return (
                      <div
                        key={service.title}
                        className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                            <Icon className="h-[18px] w-[18px] text-orange-200" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {service.title}
                            </p>
                            <p className="mt-1 text-xs leading-6 text-zinc-400">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="section-shell animate-fade-in-up rounded-[1.8rem] p-6 [animation-delay:220ms]">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
                  {content.studio.workflowKicker}
                </p>
                <div className="mt-4 flex items-start gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-orange-200/20 bg-orange-300/10">
                    <Clapperboard className="h-5 w-5 text-orange-200" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {content.studio.workflowTitle}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-zinc-400">
                      {content.studio.workflowDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="scroll-mt-28 px-4 pt-16 sm:px-6 lg:px-10 lg:pt-24"
          style={{ order: sectionOrderMap.get("work") ?? 1 }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionBadge>{content.work.badge}</SectionBadge>
                <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                  {content.work.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
                  {content.work.description}
                </p>
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white transition hover:bg-white/[0.06]"
              >
                {content.work.ctaLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <WorkCarousel items={workItems} />

            <div className="mt-6 flex justify-center">
              <Link
                href={PORTFOLIO_YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-300 to-orange-400 px-7 py-4 text-base font-bold text-zinc-950 shadow-[0_12px_30px_rgba(251,146,60,0.28)] ring-1 ring-orange-100/40 transition hover:from-orange-200 hover:to-orange-300 sm:min-w-[280px]"
              >
                צפייה בתיק עבודות
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="process"
          className="scroll-mt-28 px-4 pt-16 sm:px-6 lg:px-10 lg:pt-24"
          style={{ order: sectionOrderMap.get("process") ?? 2 }}
        >
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="grid gap-4 sm:grid-cols-2 lg:order-2">
              {services.map((service, index) => {
                const Icon = SERVICE_ICON_MAP[service.icon] ?? Camera;
                return (
                  <div
                    key={service.title}
                    className="section-shell animate-fade-in-up rounded-[1.5rem] p-5"
                    style={{ animationDelay: `${60 + index * 70}ms` }}
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                      <Icon className="h-5 w-5 text-orange-200" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="section-shell rounded-[1.8rem] p-6 sm:p-8 lg:order-1">
              <SectionBadge>{content.process.badge}</SectionBadge>
              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                {content.process.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">
                {content.process.description}
              </p>

              <ol className="mt-8 space-y-4">
                {processSteps.map((step, index) => (
                  <li key={step.title} className="relative pr-14">
                    {index < processSteps.length - 1 && (
                      <span className="absolute right-[1.15rem] top-10 h-[calc(100%-0.25rem)] w-px bg-gradient-to-b from-white/20 to-transparent" />
                    )}
                    <div className="absolute right-0 top-0 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-sm font-medium text-white">
                      {index + 1}
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="text-sm font-semibold text-white">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-7 text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-2xl border border-orange-200/15 bg-orange-300/5 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] text-orange-200" />
                  <p className="text-sm leading-7 text-zinc-200">
                    {content.process.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-28 px-4 pt-16 sm:px-6 lg:px-10 lg:pt-24"
          style={{ order: sectionOrderMap.get("contact") ?? 3 }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-orange-300/10 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
              <div className="animate-float-slow absolute -left-16 top-8 h-44 w-44 rounded-full bg-orange-300/15 blur-3xl" />
              <div className="animate-float-reverse absolute -bottom-20 right-10 h-52 w-52 rounded-full bg-blue-300/10 blur-3xl" />
              <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <SectionBadge>{content.contact.badge}</SectionBadge>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                    {content.contact.title}
                    <span className="mt-1 block text-zinc-300">
                      {content.contact.subtitle}
                    </span>
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-200/90 sm:text-base">
                    {content.contact.description}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href={content.contact.email.href}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                    >
                      <Mail className="h-4 w-4" />
                      {content.contact.emailButtonLabel}
                    </Link>
                    <Link
                      href={content.contact.phone.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      <Phone className="h-4 w-4" />
                      {content.contact.phoneButtonLabel}
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4">
                  <ContactCard
                    icon={Mail}
                    title={content.contact.email.title}
                    value={content.contact.email.value}
                    href={content.contact.email.href}
                    hint={content.contact.email.hint}
                  />
                  <ContactCard
                    icon={Phone}
                    title={content.contact.phone.title}
                    value={content.contact.phone.value}
                    href={content.contact.phone.href}
                    hint={content.contact.phone.hint}
                  />
                  <div className="section-shell rounded-[1.4rem] p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <Sparkles className="h-[18px] w-[18px] text-orange-200" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {content.contact.availabilityTitle}
                        </p>
                        <p className="mt-1 text-sm leading-7 text-zinc-400">
                          {content.contact.availabilityDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>

      <footer className="px-4 pb-8 pt-12 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
              <Image
                src="/assets/danielmovie.png"
                alt=""
                width={18}
                height={18}
                unoptimized
                className="h-[18px] w-[18px] object-contain opacity-95"
              />
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.24em] text-zinc-300">
                {content.hero.brandLine}
              </p>
              <p className="text-xs text-zinc-500">
                {content.brand.footerSubtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {navigation.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function getOrCreateTrafficClientId() {
  if (typeof window === "undefined") {
    return "server";
  }

  const existing = window.localStorage.getItem(TRAFFIC_CLIENT_ID_KEY);

  if (existing) {
    return existing;
  }

  const next =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `client-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  window.localStorage.setItem(TRAFFIC_CLIENT_ID_KEY, next);
  return next;
}

function InfiniteMarquee({ items }: { items: string[] }) {
  const baseItems = items.length > 0 ? items : DEFAULT_SITE_CONTENT.marqueeItems;
  const repeatedItems: string[] = [];

  while (repeatedItems.length < Math.max(14, baseItems.length * 3)) {
    repeatedItems.push(...baseItems);
  }

  const trackItems = [...repeatedItems, ...repeatedItems];

  return (
    <div className="relative overflow-hidden" dir="ltr">
      <div className="animate-marquee flex min-w-max items-center gap-3">
        {trackItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.16em] text-zinc-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function WorkCarousel({ items }: { items: WorkItem[] }) {
  if (items.length === 0) {
    return (
      <div className="section-shell animate-fade-in-up mx-auto max-w-5xl overflow-hidden rounded-[1.6rem] p-4 sm:p-5">
        <div className="rounded-[1.25rem] border border-white/10 bg-black/30 p-6 text-center">
          <p className="text-sm font-medium text-white">
            אין עדיין תמונות בתיקיית המערכת
          </p>
          <p className="mt-2 text-xs leading-6 text-zinc-400">
            הוסף קבצים לתיקיה <span dir="ltr">public/assets/image-system</span>
            <br />
            ורק הם יוצגו בסליידר התמונות
          </p>
        </div>
      </div>
    );
  }

  const safeItems = items;
  const canLoop = safeItems.length > 1;
  const slides = canLoop
    ? [safeItems[safeItems.length - 1], ...safeItems, safeItems[0]]
    : safeItems;

  const [displayIndex, setDisplayIndex] = useState(canLoop ? 1 : 0);
  const [isPaused, setIsPaused] = useState(false);
  const [withTransition, setWithTransition] = useState(true);
  const minDisplayIndex = 0;
  const maxDisplayIndex = canLoop ? safeItems.length + 1 : Math.max(safeItems.length - 1, 0);

  const clampDisplayIndex = (nextIndex: number) =>
    Math.min(Math.max(nextIndex, minDisplayIndex), maxDisplayIndex);

  useEffect(() => {
    setDisplayIndex(canLoop ? 1 : 0);
    setWithTransition(true);
  }, [canLoop, safeItems.length]);

  useEffect(() => {
    if (!canLoop || isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setWithTransition(true);
      setDisplayIndex((current) => clampDisplayIndex(current + 1));
    }, 4500);

    return () => window.clearInterval(interval);
  }, [canLoop, isPaused]);

  const activeIndex = canLoop
    ? (((displayIndex - 1) % safeItems.length) + safeItems.length) % safeItems.length
    : 0;

  const activeItem = safeItems[activeIndex] ?? safeItems[0];

  const goNext = () => {
    if (!canLoop) {
      return;
    }

    setWithTransition(true);
    setDisplayIndex((current) => clampDisplayIndex(current + 1));
  };

  const goPrev = () => {
    if (!canLoop) {
      return;
    }

    setWithTransition(true);
    setDisplayIndex((current) => clampDisplayIndex(current - 1));
  };

  const goTo = (index: number) => {
    if (index < 0 || index >= safeItems.length) {
      return;
    }

    setWithTransition(true);
    setDisplayIndex(canLoop ? index + 1 : index);
  };

  const handleTrackTransitionEnd = () => {
    if (!canLoop) {
      return;
    }

    if (displayIndex <= 0) {
      setWithTransition(false);
      setDisplayIndex(safeItems.length);
      requestAnimationFrame(() => requestAnimationFrame(() => setWithTransition(true)));
      return;
    }

    if (displayIndex >= safeItems.length + 1) {
      setWithTransition(false);
      setDisplayIndex(1);
      requestAnimationFrame(() => requestAnimationFrame(() => setWithTransition(true)));
    }
  };

  return (
    <div
      className="section-shell animate-fade-in-up mx-auto max-w-5xl overflow-hidden rounded-[1.6rem] p-3 sm:p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
            Work Slider
          </p>
          <p className="mt-1 text-sm text-zinc-200">
            {activeIndex + 1} / {safeItems.length}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            גודל קבוע לכל התמונות כדי לשמור על נראות אחידה באתר
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-white transition hover:bg-white/[0.06] disabled:opacity-40"
            aria-label="Previous slide"
            disabled={!canLoop}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-white transition hover:bg-white/[0.06] disabled:opacity-40"
            aria-label={isPaused ? "Resume slider" : "Pause slider"}
            disabled={!canLoop}
          >
            {isPaused ? (
              <Play className="h-4 w-4 fill-white" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-white transition hover:bg-white/[0.06] disabled:opacity-40"
            aria-label="Next slide"
            disabled={!canLoop}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/30">
        <div className="absolute inset-x-0 top-0 z-10 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black/35 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black/35 to-transparent" />

        <div className="relative aspect-[16/9] min-h-[12.5rem] sm:min-h-[17.5rem] lg:min-h-[20rem]" dir="ltr">
          <div
            className={`flex h-full ${withTransition ? "transition-transform duration-700" : "transition-none"}`}
            style={{
              transform: `translateX(-${displayIndex * 100}%)`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDuration: "900ms",
            }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {slides.map((item, index) => (
              <div key={`${item.image}-${item.title}-${index}`} className="relative h-full min-w-full">
                <div className="absolute inset-0 bg-black" />
                <Image
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  unoptimized
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover blur-2xl scale-110 opacity-60 saturate-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/25" />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-contain p-2 sm:p-3"
                  priority={index === 1}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/10 to-transparent opacity-30" />

                <div dir="rtl" className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="mb-2 inline-flex rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] text-zinc-100 backdrop-blur">
                        {item.tag}
                      </div>
                      <p className="text-base font-semibold text-white sm:text-lg">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-300 sm:text-xs">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="hidden rounded-xl border border-white/20 bg-white/10 p-2 text-white backdrop-blur sm:block">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-300 to-orange-500 transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / safeItems.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {safeItems.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            type="button"
            onClick={() => goTo(index)}
            className={[
              "h-2.5 rounded-full transition-all",
              index === activeIndex
                ? "w-8 bg-orange-300"
                : "w-2.5 bg-white/25 hover:bg-white/40",
            ].join(" ")}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#070709]" />
      <div className="bg-grid-pattern absolute inset-0 opacity-40" />
      <div className="animate-float-slow absolute -top-28 right-[-7rem] h-[26rem] w-[26rem] rounded-full bg-orange-300/20 blur-3xl" />
      <div className="animate-float-reverse absolute left-[-8rem] top-[28%] h-[24rem] w-[24rem] rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute bottom-[-8rem] right-[18%] h-[22rem] w-[22rem] rounded-full bg-fuchsia-300/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
    </div>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-zinc-300">
      <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
      {children}
    </div>
  );
}

function FeaturePill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-zinc-200">
      <CheckCircle2 className="h-4 w-4 text-orange-200" />
      <span>{text}</span>
    </div>
  );
}

function MiniShowcaseCard({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-2">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-300">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
  hint,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  href: string;
  hint: string;
}) {
  return (
    <Link
      href={href}
      className="section-shell group rounded-[1.4rem] p-5 transition hover:border-white/20"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
          <Icon className="h-[18px] w-[18px] text-orange-200" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="mt-1 truncate text-base font-semibold text-white">
            {value}
          </p>
          <p className="mt-1 text-xs leading-6 text-zinc-500">{hint}</p>
        </div>
        <ArrowUpRight className="mr-auto h-4 w-4 shrink-0 text-zinc-500 transition group-hover:text-white" />
      </div>
    </Link>
  );
}

function ChevronBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-300" />
      </span>
      <span className="text-xs uppercase tracking-[0.15em] text-zinc-300">
        {text}
      </span>
    </div>
  );
}
