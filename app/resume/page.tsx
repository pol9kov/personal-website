import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Egor Polyakov",
  description: "Download my professional resume",
};

export default function ResumePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <svg
                className="h-12 w-12 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Resume
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Download my professional resume in PDF format
            </p>
          </div>

          <a
            href="/resume.pdf"
            download="YegorPolyakovResume.pdf"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            <svg
              className="mr-3 h-6 w-6"
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
            Download Resume PDF
          </a>
        </div>
      </div>
    </main>
  );
}
