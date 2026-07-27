import { CaseStudy } from "@/lib/types";

/**
 * Case studies — locale-independent data only.
 *
 * All prose (title, description, problem, solution, technicalDetails, results,
 * lessonsLearned) is read from `messages/<locale>.json` under
 * `caseStudies.items.<slug>`, so it must not be duplicated here.
 *
 * Order in this array is the order the cards render in.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "imperia-os",
    year: "2025",
    tags: [
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "Kuzu",
      "MongoDB",
      "LLM",
      "MCP",
      "Architecture",
    ],
  },
  {
    slug: "mobile-platform",
    year: "2023",
    tags: ["Flutter", "AWS", "Golang", "DynamoDB", "Clean Architecture"],
  },
  {
    slug: "website-builder",
    year: "2015",
    tags: ["Database Design", "EAV", "Multi-tenancy", "Architecture"],
    images: [
      "/case-studies/website-builder/db-schema-1-v2.png",
      "/case-studies/website-builder/db-schema-2-v2.png",
    ],
    githubUrl: "https://github.com/pol9kov/ContractTracking",
  },
];
