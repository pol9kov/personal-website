import { Skill } from "@/lib/types";

/**
 * SkillIntegralChart props
 */
export interface SkillIntegralChartProps {
  skill: Skill;
  width?: number;
  height?: number;
}

/**
 * Mathematical visualization of skill proficiency as an integral
 * Shows a curve with filled area representing skill level
 *
 * @example
 * ```tsx
 * <SkillIntegralChart skill={skill} />
 * ```
 */
export function SkillIntegralChart({
  skill,
  width = 200,
  height = 60,
}: SkillIntegralChartProps) {
  const proficiencyPercent = (skill.proficiency / 5) * 100;
  const integralLimit = (proficiencyPercent / 100) * width;

  // Generate smooth curve points using sine wave
  const generateCurvePath = (): string => {
    const points: string[] = [];
    const numPoints = 50;
    const amplitude = height * 0.3; // Wave amplitude
    const frequency = 0.05; // Wave frequency
    const baseline = height * 0.5; // Center line

    for (let i = 0; i <= numPoints; i++) {
      const x = (i / numPoints) * width;
      const y = baseline - Math.sin(x * frequency) * amplitude;
      points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }

    return points.join(" ");
  };

  // Create filled area path (curve + vertical lines to close)
  const createFilledPath = (): string => {
    const numPoints = 50;
    const limitPoint = Math.floor((integralLimit / width) * numPoints);

    // Get curve points only up to integral limit
    const points: string[] = [];
    const amplitude = height * 0.3;
    const frequency = 0.05;
    const baseline = height * 0.5;

    for (let i = 0; i <= limitPoint; i++) {
      const x = (i / numPoints) * width;
      const y = baseline - Math.sin(x * frequency) * amplitude;
      points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }

    // Close the path by drawing to baseline
    const lastX = (limitPoint / numPoints) * width;
    points.push(`L ${lastX.toFixed(2)} ${height}`);
    points.push(`L 0 ${height}`);
    points.push("Z");

    return points.join(" ");
  };

  const curvePath = generateCurvePath();
  const filledPath = createFilledPath();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {skill.name}
        </span>
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
          {proficiencyPercent.toFixed(0)}%
        </span>
      </div>

      <div className="relative">
        <svg
          width={width}
          height={height}
          className="overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient
              id={`gradient-${skill.name}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Filled area under curve (the "integral") */}
          <path
            d={filledPath}
            fill={`url(#gradient-${skill.name})`}
            className="transition-all duration-500"
          />

          {/* Main curve */}
          <path
            d={curvePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-600 dark:text-blue-400"
          />

          {/* Integral limit line */}
          <line
            x1={integralLimit}
            y1="0"
            x2={integralLimit}
            y2={height}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 2"
            className="text-purple-600 dark:text-purple-400 opacity-50"
          />
        </svg>

        {/* Integral notation */}
        <div className="mt-1 text-xs font-mono text-gray-500 dark:text-gray-400">
          <span>∫</span>
          <sub>0</sub>
          <sup>{proficiencyPercent.toFixed(0)}</sup>
          <span className="ml-1">f(x)dx</span>
        </div>
      </div>
    </div>
  );
}
