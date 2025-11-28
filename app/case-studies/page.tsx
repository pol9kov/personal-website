import { caseStudies } from "@/lib/constants/case-studies";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";

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
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </main>
  );
}
