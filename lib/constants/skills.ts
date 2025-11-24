import { Skill } from "@/lib/types";

/**
 * Technical skills data
 */
export const skills: Skill[] = [
  // Backend & Languages
  { name: "Golang", category: "backend", proficiency: 4 },
  { name: "Java", category: "backend", proficiency: 3 },
  { name: "JavaScript", category: "frontend", proficiency: 2 },
  { name: "Delphi", category: "backend", proficiency: 2 },
  { name: "Python", category: "backend", proficiency: 1 },
  { name: "C++", category: "backend", proficiency: 1 },
  { name: "C#", category: "backend", proficiency: 1 },
  { name: "Ruby on Rails", category: "backend", proficiency: 1 },

  // Frontend & Mobile
  { name: "Flutter (Dart)", category: "frontend", proficiency: 4 },
  { name: "Android", category: "frontend", proficiency: 3 },
  { name: "Codename One", category: "frontend", proficiency: 1 },

  // Databases
  { name: "DynamoDB", category: "backend", proficiency: 4 },
  { name: "MongoDB", category: "backend", proficiency: 4 },
  { name: "CouchDB", category: "backend", proficiency: 4 },
  { name: "LevelDB", category: "backend", proficiency: 4 },
  { name: "SQLite", category: "backend", proficiency: 3 },
  { name: "MySQL", category: "backend", proficiency: 2 },

  // Cloud & Infrastructure
  { name: "AWS", category: "tools", proficiency: 3 },
  { name: "Linux", category: "tools", proficiency: 3 },
  { name: "Docker", category: "tools", proficiency: 3 },
  { name: "Git", category: "tools", proficiency: 2 },
  { name: "Prometheus", category: "tools", proficiency: 1 },
  { name: "Grafana", category: "tools", proficiency: 1 },

  // Architecture & Design
  { name: "Clean Architecture", category: "backend", proficiency: 4 },
  { name: "Infrastructure as Code", category: "tools", proficiency: 4 },

  // Blockchain
  { name: "Hyperledger Fabric", category: "backend", proficiency: 4 },
  { name: "Bitcoin", category: "backend", proficiency: 1 },
  { name: "Ethereum", category: "backend", proficiency: 1 },
];
