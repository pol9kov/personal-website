import { skills } from "@/lib/constants/skills";
import { Skill } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { SkillIntegralChart } from "@/components/ui";

/**
 * Skills section props
 */
export interface SkillsProps {
  className?: string;
}

/**
 * Skills section - technical skills display
 *
 * @example
 * ```tsx
 * <Skills />
 * ```
 */
export function Skills({ className }: SkillsProps) {
  const categories: Record<Skill["category"], string> = {
    languages: "Languages",
    frameworks: "Frameworks & Platforms",
    databases: "Databases",
    devops: "DevOps & Cloud",
    other: "Other",
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
    <section className={cn("bg-white dark:bg-gray-950 py-20", className)} id="skills">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Skills & Technologies</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Technologies and tools I work with
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                {categories[category as Skill["category"]]}
              </h3>
              <div className="flex flex-col gap-6">
                {categorySkills
                  .sort((a, b) => b.proficiency - a.proficiency)
                  .map((skill) => (
                    <SkillIntegralChart key={skill.name} skill={skill} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
