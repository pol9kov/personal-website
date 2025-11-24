import Link from "next/link";
import { caseStudies } from "@/lib/constants/case-studies";
import { cn } from "@/lib/utils/cn";

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Case Studies
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Deep dives into technical solutions and architectural decisions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className={cn(
                "group block rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg",
                "dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-400"
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {study.year}
                </span>
              </div>

              <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {study.title}
              </h2>

              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {study.description}
              </p>

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
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
