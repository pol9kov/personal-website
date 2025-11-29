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
  // Total height includes all rows + gaps, plus extra padding to fully cover container
  const totalHeight = skills.length * rowHeight + (skills.length - 1) * rowGap + rowGap;

  // Points at the right edge of each progress bar
  const basePoints = skills.map((skill, i) => {
    const y = Math.max(4, i * (rowHeight + rowGap) + rowHeight / 2);
    const x = (skill.proficiency / 5) * 100;
    return { x, y };
  });

  // Add a final point below the last skill to extend the wave
  const lastSkill = skills[skills.length - 1];
  if (lastSkill) {
    basePoints.push({
      x: (lastSkill.proficiency / 5) * 100,
      y: totalHeight,
    });
  }

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

  // Polygon with all points including fluctuations - start from top
  const polygonPoints = [
    `0,0`,
    `${first.x},0`,
    ...points.map((p) => `${p.x},${p.y}`),
    `0,${bottomY}`,
  ].join(" ");

  // Generate particles with density increasing toward edge
  const particles: { x: number; y: number; size: number }[] = [];

  // Helper to find wave x at given y
  const getWaveXAtY = (y: number): number => {
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      if (!p1 || !p2) continue;
      if (y >= p1.y && y <= p2.y) {
        const t = (y - p1.y) / (p2.y - p1.y);
        return p1.x + (p2.x - p1.x) * t;
      }
    }
    return points[0]?.x ?? 50;
  };

  // Create particles at different distance bands with decreasing count
  const bands = [
    { minDist: 0, maxDist: 2, count: 10000 },   // Very dense at edge
    { minDist: 2, maxDist: 5, count: 4000 },    // Dense
    { minDist: 5, maxDist: 10, count: 1500 },   // Medium
    { minDist: 10, maxDist: 20, count: 500 },   // Sparse
    { minDist: 20, maxDist: 40, count: 150 },   // Very sparse
  ];

  let particleIndex = 0;
  for (const band of bands) {
    for (let i = 0; i < band.count; i++) {
      const y = seededRandom(particleIndex * 7) * totalHeight;
      const edgeX = getWaveXAtY(y);

      // Scale distance by y position: stay narrow until near bottom, then expand quickly
      const yProgress = y / totalHeight;
      const yScale = 0.03 + Math.pow(yProgress, 6) * 14.97;
      const scaledMinDist = band.minDist * yScale;
      const scaledMaxDist = band.maxDist * yScale;

      // Density decreases with y: keep most at top, few at bottom
      const keepProbability = 1 - Math.pow(yProgress, 1.5);
      if (seededRandom(particleIndex * 31) > keepProbability) {
        particleIndex++;
        continue;
      }

      const dist = scaledMinDist + seededRandom(particleIndex * 13) * (scaledMaxDist - scaledMinDist);
      // Shift particles left by 0.35% to align better with Layer 1 gradient
      const x = edgeX - dist - 0.35;

      if (x > 0) {
        const size = 0.15 + seededRandom(particleIndex * 19) * 0.1;
        particles.push({ x, y, size });
      }
      particleIndex++;
    }
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox={`0 0 100 ${totalHeight}`}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Gradient: fully transparent left side, soft fade on right */}
        <linearGradient id={`area-${seed}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'var(--integral-color-start)' }} stopOpacity="0" />
          <stop offset="50%" style={{ stopColor: 'var(--integral-color-start)' }} stopOpacity="0" />
          <stop offset="75%" style={{ stopColor: 'var(--integral-color-start)' }} stopOpacity="0.1" />
          <stop offset="90%" style={{ stopColor: 'var(--integral-color-start)' }} stopOpacity="0.18" />
          <stop offset="100%" style={{ stopColor: 'var(--integral-color-start)' }} stopOpacity="0.25" />
        </linearGradient>
        {/* Gradient for Layer 1 - more transparent on left (near text) */}
        <linearGradient id={`spray-${seed}`} x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style={{ stopColor: 'var(--integral-color-start)' }} stopOpacity="0" />
          <stop offset="20%" style={{ stopColor: 'var(--integral-color-start)' }} stopOpacity="0" />
          <stop offset="50%" style={{ stopColor: 'var(--integral-color-start)' }} stopOpacity="0.15" />
          <stop offset="70%" style={{ stopColor: 'var(--integral-color-start)' }} stopOpacity="0.35" />
          <stop offset="85%" style={{ stopColor: 'var(--integral-color-end)' }} stopOpacity="0.6" />
          <stop offset="100%" style={{ stopColor: 'var(--integral-color-end)' }} stopOpacity="1" />
        </linearGradient>
        {/* Gradient for Layer 2 - same colors, NO opacity (fully opaque) */}
        <linearGradient id={`spray-solid-${seed}`} x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style={{ stopColor: 'var(--integral-color-start)' }} />
          <stop offset="40%" style={{ stopColor: 'var(--integral-color-start)' }} />
          <stop offset="70%" style={{ stopColor: 'var(--integral-color-start)' }} />
          <stop offset="85%" style={{ stopColor: 'var(--integral-color-end)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--integral-color-end)' }} />
        </linearGradient>
        {/* Clip path to constrain Layer 2 within integral shape */}
        <clipPath id={`clip-${seed}`}>
          <polygon points={polygonPoints} />
        </clipPath>
        {/* Mask for fading at bottom (last 3 rows) */}
        <mask id={`fade-bottom-${seed}`}>
          <rect x="0" y="0" width="100" height={totalHeight - (rowHeight + rowGap) * 3} fill="white" />
          <linearGradient id={`fade-gradient-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <rect
            x="0"
            y={totalHeight - (rowHeight + rowGap) * 3}
            width="100"
            height={(rowHeight + rowGap) * 3}
            fill={`url(#fade-gradient-${seed})`}
          />
        </mask>
      </defs>

      {/* Layer 1: Base gradient fill with fade at bottom */}
      <polygon
        points={polygonPoints}
        fill={`url(#spray-${seed})`}
        fillOpacity="0.7"
        mask={`url(#fade-bottom-${seed})`}
      />

      {/* Layer 2: Particles clipped to integral shape */}
      <g clipPath={`url(#clip-${seed})`}>
        {particles.map((p, i) => {
          // Only fade in last half of the last row
          const fadeZoneHeight = (rowHeight + rowGap) * 0.5;
          const lastRowStart = totalHeight - fadeZoneHeight;
          let opacity = 1;
          if (p.y > lastRowStart) {
            // Sharp fade from 1 to 0 in last half of row
            const fadeProgress = (p.y - lastRowStart) / fadeZoneHeight;
            opacity = 1 - fadeProgress;
          }

          return (
            <rect
              key={i}
              x={p.x}
              y={p.y}
              width={p.size}
              height={p.size * 4}
              fill={`url(#spray-solid-${seed})`}
              fillOpacity={opacity}
            />
          );
        })}
      </g>

      {/* Main gradient fill */}
      <polygon points={polygonPoints} fill={`url(#area-${seed})`} />

    </svg>
  );
}
