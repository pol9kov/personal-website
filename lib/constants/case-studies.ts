import { CaseStudy } from "@/lib/types";

/**
 * Case studies data
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "ai-infrastructure",
    title: "AI Integration into CRM for Support Automation",
    description:
      "Connecting LLM to company CRM for automatic responses based on internal knowledge base.",
    year: "2025",
    tags: ["Next.js", "LLM", "RAG", "Architecture"],
    problem:
      "Support team spent significant time processing repetitive requests. Operators had to manually search for information in the knowledge base.",
    solution:
      "Integrated AI layer with CRM: the system analyzes incoming messages, finds relevant materials, and generates responses based on corporate knowledge base. Configured handoff to operator for non-standard situations.",
    technicalDetails: [
      "Next.js",
      "LLM",
      "RAG",
      "REST API integration",
    ],
    results: [
      "Response time reduced from minutes to seconds",
      "Operator workload decreased by more than 40%",
      "Consistent responses at experienced employee level",
      "Operates 24/7 without human intervention",
    ],
    lessonsLearned: [
      "AI is effective for typical requests but requires fallback to human",
      "Knowledge base quality directly affects response quality",
      "Integration with existing systems is critical for adoption",
    ],
  },
  {
    id: "2",
    slug: "mobile-platform",
    title: "Cross-Platform Mobile Platform",
    description:
      "Production-ready mobile platform built with Flutter and AWS, implementing Clean Architecture with comprehensive infrastructure automation.",
    year: "2023",
    tags: ["Flutter", "AWS", "Golang", "DynamoDB", "Clean Architecture"],
    problem:
      "Need for a scalable, maintainable mobile platform with robust backend infrastructure and automated deployment.",
    solution:
      "Implemented Clean Architecture with Feature-based approach in Flutter, backed by AWS serverless infrastructure with full automation using CDK.",
    technicalDetails: [
      "Flutter mobile app with Clean Architecture and Feature-based structure",
      "Reactive state management using Riverpod",
      "AWS Lambda functions in Golang for backend",
      "DynamoDB for data storage",
      "S3 for file storage",
      "Cognito for authentication",
      "Full infrastructure automation with AWS CDK",
      "CI/CD pipeline for automated deployments",
    ],
    results: [
      "Production-ready platform serving real users",
      "Highly maintainable codebase with clear separation of concerns",
      "Fully automated infrastructure deployment",
      "Cost-effective serverless architecture",
    ],
    lessonsLearned: [
      "Clean Architecture pays off in large Flutter applications",
      "Feature-based organization improves team collaboration",
      "Infrastructure as Code (CDK) is essential for reproducible environments",
      "Serverless architecture significantly reduces operational overhead",
    ],
  },
  {
    id: "3",
    slug: "website-builder",
    title: "Dynamic Website Builder Platform",
    description:
      "A flexible website builder system from 10 years ago, featuring Entity-Attribute-Value (EAV) architecture for dynamic schema and multi-tenancy support.",
    year: "2015",
    tags: ["Database Design", "EAV", "Multi-tenancy", "Architecture"],
    problem:
      "Need for a website builder where users could create custom entity types and fields without database migrations, supporting multiple tenants with isolated data.",
    solution:
      "Implemented EAV (Entity-Attribute-Value) pattern with multi-tenancy support, allowing dynamic schema creation and type-safe value storage.",
    technicalDetails: [
      "EAV pattern for dynamic entity/field creation without migrations",
      "Multi-tenancy with Company + ConnectionURL (separate databases per client)",
      "Type-safe value storage with separate tables (Boolean, Integer, String, GeoLocation, Image)",
      "Value storage design: Evaluated linking by ID to custom type tables vs direct type ID reference, chose separate tables for type safety and easier value retrieval",
      "Visual layout engine with Section/Screen components",
      "Dependency graph for object relationships - chose tree structure over cyclic graph for better scalability",
      "Architecture decision: Entity can be used as field in only one parent entity (prevents circular dependencies)",
      "Recursive table relationships: Field references Entity, Entity can reference Field (one-directional)",
      "Dynamic filtering system for user-created entities",
    ],
    results: [
      "Users could create custom entity types without developer intervention",
      "Achieved complete data isolation between tenants",
      "Zero downtime for schema changes",
      "Flexible enough to support various business domains",
    ],
    lessonsLearned: [
      "EAV pattern provides ultimate flexibility but requires careful query optimization",
      "Multi-tenancy at database level provides strongest isolation guarantees",
      "Type-safe value storage prevents data corruption in dynamic systems",
      "Visual builders need strong dependency management to handle complex relationships",
    ],
    images: ["/case-studies/website-builder/db-schema-1-v2.png", "/case-studies/website-builder/db-schema-2-v2.png"],
    githubUrl: "https://github.com/pol9kov/ContractTracking",
  },
];
