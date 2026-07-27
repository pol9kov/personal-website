import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Resume | Egor Polyakov",
  description:
    "AI Platform Engineer. Building Imperia OS — a runtime where an LLM call is an atomic state-machine step.",
};

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

interface Job {
  role: string;
  org: string;
  period: string;
  place: string;
  bullets: string[];
}

interface Study {
  degree: string;
  org: string;
  period: string;
}

const CONTACTS = [
  { label: "egor.pol9kov@gmail.com", href: "mailto:egor.pol9kov@gmail.com" },
  { label: "t.me/pol9kov", href: "https://t.me/pol9kov" },
  {
    label: "linkedin.com/in/egor-polyakov",
    href: "https://www.linkedin.com/in/egor-polyakov/",
  },
  { label: "github.com/pol9kov", href: "https://github.com/pol9kov" },
];

export default async function ResumePage({ params }: ResumePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resume");
  const tHero = await getTranslations("hero");

  const experience = t.raw("experience") as Job[];
  const education = t.raw("education") as Study[];
  const awards = t.raw("awards") as string[];
  const languages = t.raw("languages") as string[];
  const stack = t.raw("stack") as string[];

  return (
    <main className="min-h-screen bg-white py-12 dark:bg-gray-950 sm:py-16 print:py-0">
      <div className="container mx-auto px-4">
        <article className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="border-b border-gray-200 pb-6 dark:border-gray-800">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {tHero("name")}
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                  {t("subtitle")}
                </p>
              </div>
              <PrintButton label={t("print")} />
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {CONTACTS.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </header>

          {/* Summary */}
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t("summaryTitle")}
            </h2>
            <p className="leading-relaxed text-gray-800 dark:text-gray-200">
              {t("summary")}
            </p>
          </section>

          {/* Experience */}
          <section className="mt-10">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t("experienceTitle")}
            </h2>
            <div className="space-y-8">
              {experience.map((job) => (
                <div key={`${job.role}-${job.period}`} className="print-avoid-break">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {job.role}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {job.org} · {job.place}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {job.bullets.map((b) => (
                      <li
                        key={b}
                        className="relative pl-5 leading-relaxed text-gray-800 dark:text-gray-200"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Stack */}
          <section className="mt-10 print-avoid-break">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t("stackTitle")}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-gray-200 px-2.5 py-1 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {/* Education + Awards + Languages */}
          <div className="mt-10 grid gap-10 sm:grid-cols-2 print-avoid-break">
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {t("educationTitle")}
              </h2>
              <div className="space-y-4">
                {education.map((e) => (
                  <div key={e.period}>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {e.degree}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {e.org} · {e.period}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {t("awardsTitle")}
              </h2>
              <ul className="space-y-1 text-gray-800 dark:text-gray-200">
                {awards.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>

              <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {t("languagesTitle")}
              </h2>
              <ul className="space-y-1 text-gray-800 dark:text-gray-200">
                {languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </section>
          </div>

          <p className="mt-12 text-xs text-gray-400 dark:text-gray-500">
            {t("updated")}
          </p>
        </article>
      </div>
    </main>
  );
}
