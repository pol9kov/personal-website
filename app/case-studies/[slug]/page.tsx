import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/constants/case-studies";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

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

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {study.description}
          </p>

          {study.githubUrl && (
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-white px-4 py-2 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View Source Code
            </a>
          )}
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
