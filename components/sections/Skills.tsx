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

// Layout constants for skill rows
const ROW_HEIGHT = 40; // Height of each skill row (name + bar)
const ROW_GAP = 16; // Gap between rows (gap-4 = 16px)

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
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const sortedSkills = [...categorySkills].sort((a, b) => b.proficiency - a.proficiency);

            return (
              <div key={category}>
                <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                  {categories[category as Skill["category"]]}
                </h3>

                {/* Skills list with integral overlay */}
                <div className="relative">
                  {/* Integral area chart overlay */}
                  <SkillIntegralChart
                    skills={sortedSkills}
                    rowHeight={ROW_HEIGHT}
                    rowGap={ROW_GAP}
                  />

                  {/* Skill bars */}
                  <div className="relative z-10 flex flex-col gap-4">
                    {sortedSkills.map((skill) => (
                      <div key={skill.name} className="flex flex-col justify-end" style={{ height: ROW_HEIGHT }}>
                        <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {skill.name}
                        </span>
                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
                            style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
