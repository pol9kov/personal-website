import { Skill } from "@/lib/types";

/**
 * Technical skills data
 */
export const skills: Skill[] = [
  // Languages
  { name: "Golang", category: "languages", proficiency: 4 },
  { name: "Dart", category: "languages", proficiency: 4 },
  { name: "Java", category: "languages", proficiency: 3 },
  { name: "JavaScript", category: "languages", proficiency: 2 },
  { name: "Delphi", category: "languages", proficiency: 2 },
  { name: "Python", category: "languages", proficiency: 1 },
  { name: "C", category: "languages", proficiency: 1 },

  // Frameworks & Platforms
  { name: "Flutter", category: "frameworks", proficiency: 4 },
  { name: "Android", category: "frameworks", proficiency: 3 },
  { name: "Clean Architecture", category: "frameworks", proficiency: 4 },
  { name: "Infrastructure as Code", category: "frameworks", proficiency: 4 },
  { name: "Hyperledger Fabric", category: "frameworks", proficiency: 4 },
  { name: "React/Next.js", category: "frameworks", proficiency: 1 },
  { name: "Ruby on Rails", category: "frameworks", proficiency: 1 },

  // Databases
  { name: "DynamoDB", category: "databases", proficiency: 4 },
  { name: "MongoDB", category: "databases", proficiency: 4 },
  { name: "CouchDB", category: "databases", proficiency: 4 },
  { name: "LevelDB", category: "databases", proficiency: 4 },
  { name: "SQLite", category: "databases", proficiency: 3 },
  { name: "MySQL", category: "databases", proficiency: 2 },

  // DevOps & Cloud
  { name: "AWS", category: "devops", proficiency: 3 },
  { name: "Linux", category: "devops", proficiency: 3 },
  { name: "Docker", category: "devops", proficiency: 3 },
  { name: "Git", category: "devops", proficiency: 2 },
  { name: "Prometheus", category: "devops", proficiency: 1 },
  { name: "Grafana", category: "devops", proficiency: 1 },
  { name: "Bitcoin", category: "devops", proficiency: 1 },
  { name: "Ethereum", category: "devops", proficiency: 1 },
];
