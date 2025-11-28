import { Skill } from "@/lib/types";

/**
 * SkillsIntegralChart props
 */
export interface SkillIntegralChartProps {
  skills: Skill[];
  width?: number;
  height?: number;
}

/**
 * Decorative integral "icicle" visualization
 * Visual element showing category proficiency as an integral shape
 *
 * @example
 * ```tsx
 * <SkillIntegralChart skills={categorySkills} width={160} height={140} />
 * ```
 */
export function SkillIntegralChart({
  skills,
  width = 160,
  height = 140,
}: SkillIntegralChartProps) {
  // Calculate average proficiency for the category
  const avgProficiency = skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length;
  const proficiencyPercent = (avgProficiency / 5) * 100;

  // Seed based on all skill names for consistent randomness
  const seed = skills.reduce((acc, s) => acc + s.name.charCodeAt(0), 0);

  // Generate elegant icicle curve
  const numPoints = 60;
  const centerX = width / 2;
  const maxWidth = width * 0.4;
  const icicleHeight = (proficiencyPercent / 100) * (height - 25); // Leave space for text

  const curvePoints: string[] = [];
  const fillPoints: string[] = [];

  // Start from top center
  fillPoints.push(`M ${centerX} 0`);

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const y = t * icicleHeight;

    // Create elegant organic wave pattern
    const wave1 = Math.sin(t * Math.PI * 2.5 + seed * 0.01) * maxWidth * 0.45;
    const wave2 = Math.sin(t * Math.PI * 6 + seed * 0.02) * maxWidth * 0.25;
    const wave3 = Math.cos(t * Math.PI * 4 + seed * 0.015) * maxWidth * 0.15;
    const taper = Math.sin(t * Math.PI) * 0.85 + 0.15; // Smooth taper

    const offset = (wave1 + wave2 + wave3) * taper;
    const x = centerX + offset;

    curvePoints.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    fillPoints.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  // Close the path
  fillPoints.push(`L ${centerX} ${icicleHeight.toFixed(2)}`);
  fillPoints.push("Z");

  const curvePath = curvePoints.join(" ");
  const filledPath = fillPoints.join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="transition-all duration-500 hover:scale-105 cursor-pointer"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
    >
      <defs>
        {/* Light theme gradient */}
        <linearGradient
          id={`icicle-gradient-light-${seed}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0.6" />
          <stop offset="50%" stopColor="rgb(129, 140, 248)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="rgb(167, 139, 250)" stopOpacity="0.8" />
        </linearGradient>

        {/* Dark theme gradient */}
        <linearGradient
          id={`icicle-gradient-dark-${seed}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.7" />
          <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Filled icicle shape - light theme */}
      <path
        d={filledPath}
        fill={`url(#icicle-gradient-light-${seed})`}
        className="transition-all duration-500 dark:hidden"
      />

      {/* Filled icicle shape - dark theme */}
      <path
        d={filledPath}
        fill={`url(#icicle-gradient-dark-${seed})`}
        className="hidden dark:block transition-all duration-500"
      />

      {/* Outline curve */}
      <path
        d={curvePath}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-blue-600 dark:text-blue-400 opacity-70"
      />

      {/* Percentage text in center */}
      <text
        x={centerX}
        y={icicleHeight / 2 + 5}
        textAnchor="middle"
        className="text-2xl font-bold fill-white dark:fill-white"
        style={{ userSelect: "none" }}
      >
        {proficiencyPercent.toFixed(0)}%
      </text>

      {/* Integral symbol at bottom */}
      <text
        x={centerX}
        y={height - 8}
        textAnchor="middle"
        className="text-base font-mono fill-gray-600 dark:fill-gray-400 opacity-50"
        style={{ userSelect: "none" }}
      >
        ∫ f(x)dx
      </text>
    </svg>
  );
}
