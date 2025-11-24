import { CaseStudy } from "@/lib/types";

/**
 * Case studies data
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "ai-infrastructure",
    title: "AI Infrastructure & RAG System",
    description:
      "Modular AI infrastructure with personal assistant integrated with Obsidian knowledge base using Retrieval Augmented Generation.",
    year: "2024",
    tags: ["AI", "RAG", "Claude Code", "Python", "Architecture"],
    problem:
      "Need for a flexible AI infrastructure that could integrate with existing knowledge bases and provide context-aware responses through RAG.",
    solution:
      "Built a modular AI system with pluggable architecture that integrates with Obsidian, featuring RAG for context-aware responses and a universal document generator prototype.",
    technicalDetails: [
      "Implemented Retrieval Augmented Generation (RAG) for knowledge base integration",
      "Designed pluggable architecture for extensibility",
      "Built with Claude Code and Python",
      "Created universal document generator prototype",
      "Integrated with Obsidian knowledge management system",
    ],
    results: [
      "Successfully integrated personal knowledge base with AI assistant",
      "Achieved context-aware responses through RAG implementation",
      "Created reusable architecture for future AI projects",
    ],
    lessonsLearned: [
      "RAG significantly improves AI response quality with domain-specific knowledge",
      "Modular architecture is crucial for AI systems that need to evolve",
      "Integration with existing tools (like Obsidian) provides immediate value",
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
      "Visual layout engine with Section/Screen components",
      "Dependency graph for object relationships",
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
    images: ["/case-studies/website-builder/db-schema-1.png", "/case-studies/website-builder/db-schema-2.png"],
  },
];
