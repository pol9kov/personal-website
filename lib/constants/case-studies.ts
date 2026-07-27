import { CaseStudy } from "@/lib/types";

/**
 * Case studies data
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "imperia-os",
    title: "Imperia OS — AI-First Development Platform",
    description:
      "Full-stack AI platform with state-machine runtime, three knowledge graphs, and self-building agent system.",
    year: "2025",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Kuzu", "MongoDB", "LLM", "MCP", "Architecture"],
    problem:
      "AI assistants are stateless — no persistent memory, no business context, no ability to act on real systems. Building a real assistant requires a platform: runtime, knowledge base, agent system, and infrastructure.",
    solution:
      "Built Imperia OS from scratch: state-machine runtime where LLMs are atomic steps, three knowledge graphs (business model, tests, code), MCP tool system for typed database access, and hot-standby infrastructure with automatic failover.",
    technicalDetails: [
      "State-machine runtime for deterministic LLM orchestration",
      "Three knowledge graphs in Kuzu: business domain, tests, code structure",
      "MCP tool system — PostgreSQL, Kuzu, MongoDB via typed interfaces",
      "Thought engine — persistent memory with wikilinks and embeddings",
      "Hot standby with 15s health checks and automatic failover",
      "Monorepo: Next.js + TypeScript + pnpm workspaces",
    ],
    results: [
      "Running in production since 2025",
      "9 services across prod/standby/dev environments",
      "Zero-downtime deployment with automated pipeline",
      "Development flow: business scenarios → tests → agents generate code",
    ],
    lessonsLearned: [
      "LLMs become reliable when each call is a bounded step in a state machine",
      "Three separate knowledge graphs beat one merged graph — different query patterns need different schemas",
      "Building the platform with itself is the strongest validation",
    ],
  },
  {
    id: "2",
    slug: "mobile-platform",
    title: "Cross-Platform Mobile Platform",
    description:
      "Scalable mobile platform on Flutter and AWS with clean architecture and automated infrastructure.",
    year: "2023",
    tags: ["Flutter", "AWS", "Golang", "DynamoDB", "Clean Architecture"],
    problem:
      "Needed a foundation for a cross-platform product with reliable backend and automated deployment. Typical approaches led to fragmented architecture.",
    solution:
      "Implemented Clean Architecture with Feature-based structure in Flutter. Backend - serverless on AWS (Lambda in Golang). Infrastructure defined in CDK and deploys automatically.",
    technicalDetails: [
      "Clean Architecture + Feature-based structure",
      "Serverless backend on AWS (Lambda, DynamoDB, Cognito)",
      "Infrastructure as Code (AWS CDK)",
    ],
    results: [
      "Architectural and infrastructure foundation implemented",
      "Fully automated deployment",
      "Modular structure simplifies further development",
      "Backend in production-ready state",
    ],
    lessonsLearned: [
      "Clean Architecture pays off on large projects",
      "Infrastructure as Code is critical for reproducibility",
      "Serverless reduces operational overhead",
    ],
  },
  {
    id: "3",
    slug: "website-builder",
    title: "Dynamic Website Builder Platform",
    description:
      "Flexible website builder system with dynamic data schema and multi-tenancy support.",
    year: "2015",
    tags: ["Database Design", "EAV", "Multi-tenancy", "Architecture"],
    problem:
      "Needed a builder where users can create arbitrary entity types and fields without DB migrations. Plus data isolation between clients.",
    solution:
      "Implemented EAV (Entity-Attribute-Value) pattern with multi-tenancy at the database level. Users create their entities and fields through the interface, data is stored in a universal and extensible structure.",
    technicalDetails: [
      "EAV pattern for dynamic schema without migrations",
      "Multi-tenancy with isolated databases per client",
      "Type-safe storage of different data types",
    ],
    results: [
      "Users create entities without developer involvement",
      "Complete data isolation between clients",
      "Zero downtime for schema changes",
      "System adapts to different business domains",
    ],
    lessonsLearned: [
      "EAV provides maximum flexibility but requires query optimization",
      "Multi-tenancy at DB level is the most reliable isolation",
      "Type-safe storage prevents data corruption",
    ],
    images: ["/case-studies/website-builder/db-schema-1-v2.png", "/case-studies/website-builder/db-schema-2-v2.png"],
    githubUrl: "https://github.com/pol9kov/ContractTracking",
  },
];
