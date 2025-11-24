import Link from "next/link";
import { Card } from "@/components/ui";
import { projects } from "@/lib/constants/projects";
import { cn } from "@/lib/utils/cn";

/**
 * Projects section props
 */
export interface ProjectsProps {
  className?: string;
}

/**
 * Projects section - portfolio projects showcase
 *
 * @example
 * ```tsx
 * <Projects />
 * ```
 */
export function Projects({ className }: ProjectsProps) {
  return (
    <section
      className={cn("bg-gray-50 dark:bg-gray-900 py-20", className)}
      id="projects"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            A selection of my recent work showcasing various technologies and
            approaches
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} hoverable padding="lg">
              <div className="flex flex-col gap-4">
                <div className="aspect-video w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg" />

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-4">
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      View Live →
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      GitHub →
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
