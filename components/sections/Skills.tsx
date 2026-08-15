"use client";

import { useTranslations } from "next-intl";
import { skills } from "@/lib/constants/skills";
import { Skill } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

/**
 * Skills section props
 */
export interface SkillsProps {
  className?: string;
}

// Layout constant for skill rows

/**
 * Skills section - technical skills display
 *
 * @example
 * ```tsx
 * <Skills />
 * ```
 */
export function Skills({ className }: SkillsProps) {
  const t = useTranslations("skills");

  const categories: Record<Skill["category"], string> = {
    languages: t("categories.languages"),
    frameworks: t("categories.frameworks"),
    databases: t("categories.databases"),
    devops: t("categories.devops"),
    other: t("categories.other"),
  };

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<Skill["category"], Skill[]>
  );

  return (
    <section
      className={cn("bg-white dark:bg-gray-950 py-20", className)}
      id="skills"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const sortedSkills = [...categorySkills].sort((a, b) => b.proficiency - a.proficiency);

            return (
              <div key={category}>
                <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                  {categories[category as Skill["category"]]}
                </h3>

                {/* Графики сняты (Егор 2026-08-15: «убрать графики… это фейк») —
                    остаются только названия: в чём есть опыт, без самооценок. */}
                <ul className="space-y-3">
                  {sortedSkills.map((skill) => (
                    <li
                      key={skill.name}
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
