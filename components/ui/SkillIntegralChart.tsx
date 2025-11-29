import { Skill } from "@/lib/types";

export interface SkillIntegralChartProps {
  skills: Skill[];
  rowHeight?: number;
  rowGap?: number;
}

/**
 * Simple area chart overlay - fills area from left edge to skill proficiency line
 */
export function SkillIntegralChart({
  skills,
  rowHeight = 40,
  rowGap = 16,
}: SkillIntegralChartProps) {
  if (skills.length === 0) return null;

  const seed = skills.reduce((acc, s) => acc + s.name.charCodeAt(0), 0);
  const totalHeight = skills.length * rowHeight + (skills.length - 1) * rowGap;

  // Points at the right edge of each progress bar
  const basePoints = skills.map((skill, i) => {
    const y = Math.max(4, i * (rowHeight + rowGap) - rowGap / 2);
    const x = (skill.proficiency / 5) * 100;
    return { x, y };
  });

  // Seeded random for consistent spikes
  const seededRandom = (i: number) => {
    const x = Math.sin(seed * 9999 + i * 7777) * 10000;
    return x - Math.floor(x);
  };

  // Wave function - mix of low frequency (large smooth) + high frequency (small detailed)
  const waveType = seed % 4;
  const waveFunction = (t: number, segmentIndex: number, _pointIndex: number, proficiencyScale: number): number => {
    // Random phase offset for each segment - so waves don't start from same place
    const randomPhaseOffset = seededRandom(segmentIndex * 37) * Math.PI * 2;
    const randomPhaseOffset2 = seededRandom(segmentIndex * 53) * Math.PI * 2;
    const phase = segmentIndex * 0.5 + randomPhaseOffset;

    // Low frequency - large smooth waves (amplitude scales with proficiency)
    const lowFreqAmp = 8 + proficiencyScale * 12; // 8-20
    let lowFreq = 0;
    switch (waveType) {
      case 0:
        lowFreq = Math.sin(t * Math.PI * 0.3 + phase) * lowFreqAmp;
        break;
      case 1:
        lowFreq = Math.sin(t * Math.PI * 0.25 + phase) * lowFreqAmp;
        break;
      case 2:
        lowFreq = Math.cos(t * Math.PI * 0.28 + phase) * lowFreqAmp;
        break;
      default:
        lowFreq = Math.sin(t * Math.PI * 0.35 + phase) * lowFreqAmp;
    }

    // High frequency - small detailed oscillations (different random phase)
    const highFreqAmp = 2 + proficiencyScale * 3; // 2-5
    const highFreq = Math.sin(t * Math.PI * 3 + randomPhaseOffset2) * highFreqAmp;

    // Combine: 70% low freq + 30% high freq
    const wave = lowFreq * 0.7 + highFreq * 0.3;

    return wave;
  };

  // Generate path with smooth curves
  const points: { x: number; y: number }[] = [];
  const pointsPerSegment = 16; // More points for smoother curves

  // Always start with first point
  const firstBase = basePoints[0];
  if (firstBase) {
    points.push({ x: firstBase.x, y: firstBase.y });
  }

  for (let i = 0; i < basePoints.length - 1; i++) {
    const current = basePoints[i];
    const next = basePoints[i + 1];
    if (!current || !next) continue;

    // Generate intermediate points with wave + random spikes
    // proficiencyScale: 0-1 based on average X position (higher X = higher proficiency)
    const avgProficiency = (current.x + next.x) / 2 / 100;

    for (let j = 1; j <= pointsPerSegment; j++) {
      const t = j / pointsPerSegment;
      const baseY = current.y + (next.y - current.y) * t;
      const baseX = current.x + (next.x - current.x) * t;
      // Apply wave, fading at endpoints, scaled by proficiency
      const edgeFade = Math.sin(t * Math.PI);
      const waveOffset = waveFunction(t, i, j, avgProficiency) * edgeFade;
      points.push({
        x: Math.max(0, Math.min(100, baseX + waveOffset)),
        y: baseY,
      });
    }
  }

  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) return null;

  const bottomY = totalHeight;

  // Polygon with all points including fluctuations
  const polygonPoints = [
    `0,${first.y}`,
    ...points.map((p) => `${p.x},${p.y}`),
    `0,${bottomY}`,
  ].join(" ");

  // Extend points to bottom
  const extendedPoints = [...points, { x: last.x, y: bottomY }];

  // Multiple strip widths for gradient spray effect
  const createStripPolygon = (width: number) => [
    ...extendedPoints.map((p) => `${p.x},${p.y}`),
    ...extendedPoints.slice().reverse().map((p) => `${Math.max(0, p.x - width)},${p.y}`),
  ].join(" ");

  const stripMedium = createStripPolygon(14);  // middle
  const stripWide = createStripPolygon(24);    // outer, most sparse

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 100 ${totalHeight}`}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Gradient: fully transparent left side, soft fade to color on right */}
        <linearGradient id={`area-${seed}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
          <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
          <stop offset="75%" stopColor="rgb(139, 92, 246)" stopOpacity="0.1" />
          <stop offset="90%" stopColor="rgb(139, 92, 246)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.25" />
        </linearGradient>
        {/* Gradient for spray layers - visible from middle */}
        <linearGradient id={`spray-${seed}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
          <stop offset="40%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
          <stop offset="70%" stopColor="rgb(139, 92, 246)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="1" />
        </linearGradient>
        {/* Gradient for solid edge fill - only visible very close to edge */}
        <linearGradient id={`edge-${seed}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
          <stop offset="80%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
          <stop offset="92%" stopColor="rgb(139, 92, 246)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.7" />
        </linearGradient>
        {/* Blur filters for spray effect layers */}
        <filter id={`blur-light-${seed}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
        <filter id={`blur-medium-${seed}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
        <filter id={`blur-heavy-${seed}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
        </filter>
      </defs>

      {/* Layer 1: Spray effect - blurred layers with gradient fade */}
      <polygon
        points={polygonPoints}
        fill={`url(#spray-${seed})`}
        fillOpacity="0.15"
        filter={`url(#blur-heavy-${seed})`}
      />
      <polygon
        points={polygonPoints}
        fill={`url(#spray-${seed})`}
        fillOpacity="0.2"
        filter={`url(#blur-medium-${seed})`}
      />
      <polygon
        points={polygonPoints}
        fill={`url(#spray-${seed})`}
        fillOpacity="0.25"
        filter={`url(#blur-light-${seed})`}
      />

      {/* Layer 2: Strip fill - multiple widths with decreasing density (dimmer than layer 1) */}
      <polygon
        points={stripWide}
        fill="rgb(139, 92, 246)"
        fillOpacity="0.04"
        filter={`url(#blur-medium-${seed})`}
      />
      <polygon
        points={stripMedium}
        fill="rgb(139, 92, 246)"
        fillOpacity="0.08"
        filter={`url(#blur-light-${seed})`}
      />

      {/* Main gradient fill */}
      <polygon points={polygonPoints} fill={`url(#area-${seed})`} />

    </svg>
  );
}
