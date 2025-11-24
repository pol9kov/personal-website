/**
 * Common types used across the application
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  category: "languages" | "frameworks" | "databases" | "devops" | "other";
  proficiency: number; // 1-5
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  problem: string;
  solution: string;
  technicalDetails: string[];
  results: string[];
  lessonsLearned?: string[];
  images?: string[];
}
