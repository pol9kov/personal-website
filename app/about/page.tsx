import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Your Name",
  description: "Learn more about my journey, philosophy, and what drives me as a developer.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              My journey, philosophy, and what drives me
            </p>
          </div>

          {/* Story Sections */}
          <div className="space-y-16">
            {/* Who I Am */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Who I Am
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                  I&apos;m a backend engineer with over a decade of experience
                  building systems that need to be both robust and adaptable.
                  What defines me is not just technical skill, but a deep
                  commitment to honesty, presence, and care in everything I build.
                </p>
                <p>
                  I don&apos;t play roles or hide behind jargon. I stay true to
                  myself and bring full presence to my work-whether that&apos;s
                  architecting a system, reviewing code, or mentoring a teammate.
                  My strength lies in <em>transparency and the ability to face
                  hard truths</em>, both in code and in collaboration.
                </p>
                <p className="italic text-gray-600 dark:text-gray-400">
                  Mind brings clarity. Heart brings depth. Presence is my gift.
                </p>
              </div>
            </section>

            {/* The Journey */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                The Journey
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                  I graduated from LNMO (Laboratory of Continuous Mathematical
                  Education) in St. Petersburg, where I explored over a dozen
                  programming languages-from Pascal to OCaml, C, Haskell, and
                  even Brainfuck. From my school years, I was involved in
                  scientific research and presented at academic conferences. I
                  placed 3rd in Mathematics at ICYS-2012 in the Netherlands, 1st
                  at the St. Petersburg State Competition, and 3rd at the Baltic
                  Science and Engineering Competition. In 2015-2016, I served on
                  the youth jury for the Baltic competition. During this time, I
                  worked on information decomposition algorithms, neural
                  networks, and data analysis.
                </p>
                <p>
                  My path in development has been shaped by a principle:{" "}
                  <em>life is a continuous stream of experience that makes you
                  stronger and wiser</em>. Each project is an opportunity to
                  learn-not just about technology, but about how systems serve
                  people.
                </p>
                <p>
                  I used to approach problems from my head, chasing control and
                  perfect solutions. Over time, I learned that true engineering
                  happens when you stay present with the problem, listen deeply,
                  and act from understanding rather than avoidance. The best
                  architectures emerge when you respect both technical constraints
                  and human needs.
                </p>
                <p>
                  From building dynamic EAV systems a decade ago to designing
                  cloud-native Go microservices today, I&apos;ve learned that
                  sustainable solutions come from discipline, patience, and a
                  willingness to stay with complexity until clarity emerges.
                </p>
              </div>
            </section>

            {/* Philosophy */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                My Approach
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                  I build systems <strong>step by step, without rushing</strong>.
                  There are no shortcuts to quality. Every action-writing code,
                  designing architecture, reviewing pull requests-is an expression
                  of care for the craft and for the people who depend on what we
                  build.
                </p>
                <p>
                  My approach is grounded in{" "}
                  <strong>responsibility over control</strong>. Control is an
                  illusion; you can&apos;t predict every edge case or prevent
                  every bug. But you <em>can</em> take full ownership of your
                  decisions, your code quality, and the trust you build with your
                  team. This mindset has guided me through complex migrations,
                  system redesigns, and moments where clarity only came after
                  sitting with the problem longer than was comfortable.
                </p>
                <p>
                  I value <strong>practical solutions</strong> that work today
                  while remaining adaptable for tomorrow. Clean architecture,
                  well-tested code, and honest documentation aren&apos;t
                  formalities-they are acts of care for future maintainers,
                  including yourself six months from now when you&apos;ve
                  forgotten why you made that choice.
                </p>
                <p>
                  Most importantly, I bring <strong>presence</strong> to my work.
                  Not just technical attention, but genuine engagement with the
                  problem at hand. Great engineering happens when you stop
                  avoiding complexity and start listening to what the system is
                  telling you.
                </p>
              </div>
            </section>

            {/* Current Focus */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Current Focus
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                  Right now, I&apos;m deepening my expertise in Go, exploring
                  the intersection of backend systems and AI infrastructure, and
                  building tools that bridge powerful technologies with
                  practical human needs.
                </p>
                <p>
                  I&apos;m particularly interested in systems that need to be
                  both robust and adaptable-microservices architectures that can
                  evolve, databases that can handle dynamic schemas, and APIs
                  that developers actually enjoy using.
                </p>
              </div>
            </section>

            {/* Beyond Code */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Beyond Code
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                  Outside of programming, I&apos;m interested in mindfulness
                  practices, physical training, and the philosophy of continuous
                  improvement. I believe that maintaining balance-between focus
                  and rest, intensity and ease-makes me a better engineer.
                </p>
                <p>
                  These interests aren&apos;t separate from my work; they inform
                  how I approach problems. Attention, patience, and presence are
                  as important in debugging a complex system as they are in any
                  other practice.
                </p>
              </div>
            </section>

            {/* Values */}
            <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:from-blue-950/30 dark:to-purple-950/30">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                Core Values
              </h2>
              <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🌱</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Continuous Learning:
                    </strong>{" "}
                    Every experience is an opportunity to grow. I treat each
                    project as a chance to learn something new about systems,
                    people, or myself.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🔍</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Curiosity:
                    </strong>{" "}
                    Asking &quot;why&quot; and &quot;how&quot; leads to better
                    solutions. I dig deep into problems to understand root
                    causes, not just symptoms.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">📈</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Progress Over Perfection:
                    </strong>{" "}
                    Step by step, without rushing. Sustainable progress beats
                    flashy shortcuts every time.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🤝</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Trust and Care:
                    </strong>{" "}
                    Building trust through reliability, clear communication, and
                    genuine care for the people I work with and the systems we
                    maintain together.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">⚖️</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      Balance:
                    </strong>{" "}
                    Technical excellence matters, but so does pragmatism.
                    Innovation is important, but so is stability. Finding
                    harmony between competing needs is where real engineering
                    happens.
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
