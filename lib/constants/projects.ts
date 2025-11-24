import { Project } from "@/lib/types";

/**
 * Portfolio projects data
 */
export const projects: Project[] = [
  {
    id: "1",
    title: "AI Infrastructure & RAG System",
    description:
      "Modular AI infrastructure with personal assistant integrated with Obsidian knowledge base using Retrieval Augmented Generation. Built with Claude Code and features pluggable architecture with universal document generator prototype.",
    image: "/placeholder-project.jpg",
    tags: ["AI", "RAG", "Claude Code", "Python", "Architecture"],
  },
  {
    id: "2",
    title: "Cross-Platform Mobile Platform",
    description:
      "Production-ready mobile platform built with Flutter and AWS. Implemented Clean Architecture with Feature-based approach, reactive state management (Riverpod), and full AWS infrastructure automation using CDK. Backend includes Lambda (Golang), DynamoDB, S3, and Cognito authentication.",
    image: "/placeholder-project.jpg",
    tags: ["Flutter", "AWS", "Golang", "DynamoDB", "Clean Architecture"],
  },
  {
    id: "3",
    title: "Enterprise Blockchain Solutions",
    description:
      "Multiple blockchain implementations including Hyperledger Fabric chaincode development, Bitcoin hash anchoring system, and end-to-end encryption in distributed networks. Achieved 40% performance improvement through LevelDB migration and implemented monitoring with Prometheus/Grafana.",
    image: "/placeholder-project.jpg",
    tags: ["Blockchain", "Hyperledger Fabric", "Golang", "Bitcoin"],
    github: "https://github.com/pol9kov",
  },
];
