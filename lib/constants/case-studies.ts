import { CaseStudy } from "@/lib/types";

/**
 * Case studies data
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "ai-infrastructure",
    title: "We integrate AI into your processes in days, not months",
    description:
      "We connect AI directly to your systems. No building from scratch. No consulting cycles. Results in the first days.",
    year: "2025",
    tags: ["Next.js", "LLM", "RAG", "Architecture"],
    problem:
      "AI implementation usually turns into a long cycle: hiring specialists, choosing models, infrastructure, approvals. First results come in 3-6 months.",
    solution:
      "We connect AI directly to your systems: CRM, chatbot, website, internal services. No building from scratch. No consulting cycles. Results in the first days.",
    technicalDetails: [
      "Auto-responses in support based on your knowledge base",
      "Assistant for managers: client history, documents, next action",
      "Incoming request processing and routing",
      "Data extraction from documents",
    ],
    results: [
      "You describe the task",
      "We connect to your systems",
      "You see a working result",
      "Where models are hosted - cloud or your servers - you decide",
    ],
    lessonsLearned: [
      "Consulting writes custom code for months. Result - custom integration that's hard to maintain",
      "We connect a ready-made service, proven on typical tasks",
      "Faster, more predictable, no technical debt",
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
