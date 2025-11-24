import Link from "next/link";
import { Button } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Your Name",
  description: "My professional experience, skills, and education.",
};

// Resume data structure
const experience = [
  {
    period: "2024 - Present",
    company: "Current Company",
    position: "Senior Backend Developer",
    description: [
      "Leading backend development initiatives",
      "Architecting scalable systems",
      "Mentoring junior developers",
    ],
    technologies: ["Go", "AWS", "Docker", "Kubernetes"],
  },
  {
    period: "2020 - 2024",
    company: "Previous Company",
    position: "Backend Developer",
    description: [
      "Developed microservices architecture",
      "Improved system performance",
      "Implemented CI/CD pipelines",
    ],
    technologies: ["Go", "PostgreSQL", "Redis", "gRPC"],
  },
  {
    period: "2015 - 2020",
    company: "Earlier Company",
    position: "Full Stack Developer",
    description: [
      "Built full-stack applications",
      "Designed database schemas",
      "Managed cloud infrastructure",
    ],
    technologies: ["JavaScript", "Node.js", "MongoDB", "AWS"],
  },
];

const education = [
  {
    period: "2010 - 2015",
    institution: "University Name",
    degree: "Bachelor's in Computer Science",
    description: "Focus on software engineering and algorithms",
  },
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2022",
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    year: "2021",
  },
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h1 className="mb-2 text-5xl font-bold text-gray-900 dark:text-white">
                Resume
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Professional Experience & Skills
              </p>
            </div>
            <Button
              variant="primary"
              className="whitespace-nowrap"
              onClick={() => {
                // Placeholder for PDF download
                alert("PDF download will be implemented");
              }}
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </Button>
          </div>

          <div className="space-y-16">
            {/* Experience */}
            <section>
              <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                Work Experience
              </h2>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-blue-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-blue-700"
                  >
                    {/* Timeline indicator */}
                    <div className="absolute -left-3 top-10 h-6 w-6 rounded-full border-4 border-white bg-blue-600 dark:border-gray-950" />

                    <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {job.period}
                    </div>
                    <h3 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                      {job.position}
                    </h3>
                    <div className="mb-4 text-lg text-gray-600 dark:text-gray-400">
                      {job.company}
                    </div>
                    <ul className="mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                      {job.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900/50"
                  >
                    <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {edu.period}
                    </div>
                    <h3 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <div className="mb-2 text-lg text-gray-600 dark:text-gray-400">
                      {edu.institution}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                Certifications
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/50"
                  >
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      {cert.name}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.issuer} • {cert.year}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Summary */}
            <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:from-blue-950/30 dark:to-purple-950/30">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Technical Skills
              </h2>
              <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
                For a detailed breakdown of my skills and proficiency levels,
                visit the{" "}
                <Link
                  href="/#skills"
                  className="font-semibold text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Skills section
                </Link>
                .
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Golang",
                  "AWS",
                  "Docker",
                  "Kubernetes",
                  "PostgreSQL",
                  "MongoDB",
                  "gRPC",
                  "Microservices",
                  "CI/CD",
                  "System Design",
                ].map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white px-4 py-2 font-medium text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
