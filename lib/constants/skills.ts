import { Skill } from "@/lib/types";

/**
 * Technical skills data
 */
export const skills: Skill[] = [
  // Languages
  { name: "TypeScript", category: "languages", proficiency: 4 },
  { name: "Golang", category: "languages", proficiency: 4 },
  { name: "Dart", category: "languages", proficiency: 4 },
  { name: "Java", category: "languages", proficiency: 3 },
  { name: "Rust", category: "languages", proficiency: 2 },
  { name: "Python", category: "languages", proficiency: 2 },

  // Frameworks & Platforms
  { name: "Claude Agent SDK", category: "frameworks", proficiency: 4 },
  { name: "Node.js", category: "frameworks", proficiency: 4 },
  { name: "MCP", category: "frameworks", proficiency: 4 },
  { name: "Clean Architecture", category: "frameworks", proficiency: 4 },
  { name: "Infrastructure as Code", category: "frameworks", proficiency: 4 },
  { name: "Hyperledger Fabric", category: "frameworks", proficiency: 4 },
  { name: "Flutter", category: "frameworks", proficiency: 4 },
  { name: "React/Next.js", category: "frameworks", proficiency: 3 },

  // Databases
  { name: "MongoDB", category: "databases", proficiency: 4 },
  { name: "DynamoDB", category: "databases", proficiency: 4 },
  { name: "PostgreSQL", category: "databases", proficiency: 3 },
  { name: "Kuzu graph", category: "databases", proficiency: 3 },
  { name: "Redis", category: "databases", proficiency: 3 },
  { name: "S3", category: "databases", proficiency: 4 },
  { name: "Vector search", category: "databases", proficiency: 3 },

  // DevOps & Cloud
  { name: "AWS", category: "devops", proficiency: 4 },
  { name: "Linux", category: "devops", proficiency: 3 },
  { name: "Docker", category: "devops", proficiency: 3 },
  { name: "Git", category: "devops", proficiency: 2 },
  { name: "systemd", category: "devops", proficiency: 3 },
  { name: "Playwright", category: "devops", proficiency: 3 },
  { name: "Vercel", category: "devops", proficiency: 3 },
];
