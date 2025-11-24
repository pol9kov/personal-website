import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/constants/case-studies";

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = caseStudies.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-20">
        <Link
          href="/case-studies"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Case Studies
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {study.year}
            </span>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {study.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300">
            {study.description}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Problem
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{study.problem}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Solution
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{study.solution}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Details
            </h2>
            <ul className="space-y-2">
              {study.technicalDetails.map((detail, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {detail}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Results
            </h2>
            <ul className="space-y-2">
              {study.results.map((result, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {result}
                </li>
              ))}
            </ul>
          </section>

          {study.lessonsLearned && study.lessonsLearned.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Lessons Learned
              </h2>
              <ul className="space-y-2">
                {study.lessonsLearned.map((lesson, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-300">
                    {lesson}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {study.images && study.images.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Architecture Diagrams
              </h2>
              <div className="space-y-8">
                {study.images.map((image, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <Image
                      src={image}
                      alt={`${study.title} - Diagram ${index + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
