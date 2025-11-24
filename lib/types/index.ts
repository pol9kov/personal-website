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
  category: "frontend" | "backend" | "tools" | "other";
  proficiency: number; // 1-5
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
