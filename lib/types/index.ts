/**
 * Common types used across the application
 */

export interface Skill {
  name: string;
  category: "languages" | "frameworks" | "databases" | "devops" | "other";
  proficiency: number; // 1-5
}

/**
 * Locale-independent metadata for a case study.
 *
 * Everything a reader sees — title, description, problem, solution, technical
 * details, results, lessons — is prose, so it lives in `messages/<locale>.json`
 * under `caseStudies.items.<slug>`. It used to be duplicated here in English as
 * well, and the copy went stale: this file still carried claims that had already
 * been edited out of the rendered text.
 */
export interface CaseStudy {
  slug: string;
  year: string;
  tags: string[];
  images?: string[];
  githubUrl?: string;
}
