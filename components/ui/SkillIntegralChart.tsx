import { Skill } from "@/lib/types";

export interface SkillIntegralChartProps {
  skills: Skill[];
  rowHeight?: number;
  rowGap?: number;
}

/**
 * Generates SVG content for integral visualization
 * Pre-computed on server to avoid 16k+ React elements during hydration
 */
function generateIntegralSVG(
  skills: Skill[],
  rowHeight: number,
  rowGap: number
): string {
  const seed = skills.reduce((acc, s) => acc + s.name.charCodeAt(0), 0);
  const totalHeight = skills.length * rowHeight + (skills.length - 1) * rowGap + rowGap;

  // Points at the right edge of each progress bar
  const basePoints = skills.map((skill, i) => {
    const y = Math.max(4, i * (rowHeight + rowGap) + rowHeight / 2);
    const x = (skill.proficiency / 5) * 100;
    return { x, y };
  });

  // Add final point below the last skill
  const lastSkill = skills[skills.length - 1];
  if (lastSkill) {
    basePoints.push({
      x: (lastSkill.proficiency / 5) * 100,
      y: totalHeight,
    });
  }

  // Seeded random for consistent results
  const seededRandom = (i: number) => {
    const x = Math.sin(seed * 9999 + i * 7777) * 10000;
    return x - Math.floor(x);
  };

  // Wave function
  const waveType = seed % 4;
  const waveFunction = (t: number, segmentIndex: number, proficiencyScale: number): number => {
    const randomPhaseOffset = seededRandom(segmentIndex * 37) * Math.PI * 2;
    const randomPhaseOffset2 = seededRandom(segmentIndex * 53) * Math.PI * 2;
    const phase = segmentIndex * 0.5 + randomPhaseOffset;

    const lowFreqAmp = 8 + proficiencyScale * 12;
    let lowFreq = 0;
    switch (waveType) {
      case 0: lowFreq = Math.sin(t * Math.PI * 0.3 + phase) * lowFreqAmp; break;
      case 1: lowFreq = Math.sin(t * Math.PI * 0.25 + phase) * lowFreqAmp; break;
      case 2: lowFreq = Math.cos(t * Math.PI * 0.28 + phase) * lowFreqAmp; break;
      default: lowFreq = Math.sin(t * Math.PI * 0.35 + phase) * lowFreqAmp;
    }

    const highFreqAmp = 2 + proficiencyScale * 3;
    const highFreq = Math.sin(t * Math.PI * 3 + randomPhaseOffset2) * highFreqAmp;

    return lowFreq * 0.7 + highFreq * 0.3;
  };

  // Generate wave points
  const points: { x: number; y: number }[] = [];
  const pointsPerSegment = 16;

  const firstBase = basePoints[0];
  if (firstBase) {
    points.push({ x: firstBase.x, y: firstBase.y });
  }

  for (let i = 0; i < basePoints.length - 1; i++) {
    const current = basePoints[i];
    const next = basePoints[i + 1];
    if (!current || !next) continue;

    const avgProficiency = (current.x + next.x) / 2 / 100;

    for (let j = 1; j <= pointsPerSegment; j++) {
      const t = j / pointsPerSegment;
      const baseY = current.y + (next.y - current.y) * t;
      const baseX = current.x + (next.x - current.x) * t;
      const edgeFade = Math.sin(t * Math.PI);
      const waveOffset = waveFunction(t, i, avgProficiency) * edgeFade;
      points.push({
        x: Math.max(0, Math.min(100, baseX + waveOffset)),
        y: baseY,
      });
    }
  }

  const first = points[0];
  if (!first) return "";

  const bottomY = totalHeight;
  const polygonPoints = [
    `0,0`,
    `${first.x},0`,
    ...points.map((p) => `${p.x},${p.y}`),
    `0,${bottomY}`,
  ].join(" ");

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

  // Generate particles (more at top, some at bottom)
  const bands = [
    { minDist: 0, maxDist: 2, count: 30000 },
    { minDist: 2, maxDist: 5, count: 12000 },
    { minDist: 5, maxDist: 10, count: 5000 },
    { minDist: 10, maxDist: 20, count: 2000 },
    { minDist: 20, maxDist: 40, count: 600 },
  ];

  const fadeZoneHeight = (rowHeight + rowGap) * 0.5;
  const lastRowStart = totalHeight - fadeZoneHeight;

  // No blur zones
  const blurZones = [
    { maxY: 1.0, blur: 0 },
  ];

  const particlesByZone: string[] = blurZones.map(() => "");
  let particleIndex = 0;

  for (const band of bands) {
    for (let i = 0; i < band.count; i++) {
      const y = seededRandom(particleIndex * 7) * totalHeight;
      const edgeX = getWaveXAtY(y);

      const yProgress = y / totalHeight;
      const yScale = 0.03 + Math.pow(yProgress, 6) * 14.97;
      const scaledMinDist = band.minDist * yScale;
      const scaledMaxDist = band.maxDist * yScale;

      // More at top, fewer at bottom (but still some)
      const keepProbability = Math.pow(1 - yProgress, 1.5);
      if (seededRandom(particleIndex * 31) > keepProbability) {
        particleIndex++;
        continue;
      }

      const dist = scaledMinDist + seededRandom(particleIndex * 13) * (scaledMaxDist - scaledMinDist);
      const x = edgeX - dist - 0.35;

      if (x > 0) {
        // Size increases towards bottom: 0.15-0.2 at top, 0.25-0.35 at bottom
        const baseSize = 0.15 + yProgress * 0.15;
        const size = baseSize + seededRandom(particleIndex * 19) * (0.05 + yProgress * 0.1);
        let opacity = 1;
        if (y > lastRowStart) {
          const fadeProgress = (y - lastRowStart) / fadeZoneHeight;
          opacity = 1 - fadeProgress;
        }
        const rectStr = `<rect x="${x}" y="${y}" width="${size}" height="${size * 4}" fill="url(#spray-solid-${seed})" fill-opacity="${opacity}"/>`;

        // Find which zone this particle belongs to
        for (let z = 0; z < blurZones.length; z++) {
          const zone = blurZones[z];
          if (zone && yProgress <= zone.maxY) {
            particlesByZone[z] += rectStr;
            break;
          }
        }
      }
      particleIndex++;
    }
  }

  // Build complete SVG string
  return `<svg class="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 ${totalHeight}" preserveAspectRatio="none">
    <defs>
      <linearGradient id="area-${seed}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:var(--integral-color-start)" stop-opacity="0"/>
        <stop offset="50%" style="stop-color:var(--integral-color-start)" stop-opacity="0"/>
        <stop offset="75%" style="stop-color:var(--integral-color-start)" stop-opacity="0.1"/>
        <stop offset="90%" style="stop-color:var(--integral-color-start)" stop-opacity="0.18"/>
        <stop offset="100%" style="stop-color:var(--integral-color-start)" stop-opacity="0.25"/>
      </linearGradient>
      <linearGradient id="spray-${seed}" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" style="stop-color:var(--integral-color-start)" stop-opacity="0"/>
        <stop offset="20%" style="stop-color:var(--integral-color-start)" stop-opacity="0"/>
        <stop offset="50%" style="stop-color:var(--integral-color-start)" stop-opacity="0.15"/>
        <stop offset="70%" style="stop-color:var(--integral-color-start)" stop-opacity="0.35"/>
        <stop offset="85%" style="stop-color:var(--integral-color-end)" stop-opacity="0.6"/>
        <stop offset="100%" style="stop-color:var(--integral-color-end)" stop-opacity="1"/>
      </linearGradient>
      <linearGradient id="spray-solid-${seed}" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" style="stop-color:var(--integral-color-start)"/>
        <stop offset="40%" style="stop-color:var(--integral-color-start)"/>
        <stop offset="70%" style="stop-color:var(--integral-color-start)"/>
        <stop offset="85%" style="stop-color:var(--integral-color-end)"/>
        <stop offset="100%" style="stop-color:var(--integral-color-end)"/>
      </linearGradient>
      <clipPath id="clip-${seed}">
        <polygon points="${polygonPoints}"/>
      </clipPath>
      ${blurZones.filter(z => z.blur > 0).map((z, i) =>
        `<filter id="blur-${seed}-${i}"><feGaussianBlur stdDeviation="${z.blur}"/></filter>`
      ).join('\n      ')}
      <mask id="fade-bottom-${seed}">
        <rect x="0" y="0" width="100" height="${totalHeight * 0.1}" fill="white"/>
        <linearGradient id="fade-gradient-${seed}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="white"/>
          <stop offset="100%" stop-color="black"/>
        </linearGradient>
        <rect x="0" y="${totalHeight * 0.1}" width="100" height="${totalHeight * 0.9}" fill="url(#fade-gradient-${seed})"/>
      </mask>
    </defs>
    <polygon points="${polygonPoints}" fill="url(#spray-${seed})" fill-opacity="0.7" mask="url(#fade-bottom-${seed})"/>
    <g clip-path="url(#clip-${seed})">
      ${particlesByZone.map((particles, i) => {
        const zone = blurZones[i];
        if (zone && zone.blur > 0) {
          return `<g filter="url(#blur-${seed}-${i})">${particles}</g>`;
        }
        return particles;
      }).join('\n      ')}
    </g>
    <polygon points="${polygonPoints}" fill="url(#area-${seed})"/>
  </svg>`;
}

/**
 * Server-rendered integral chart overlay
 * SVG is pre-generated as string to avoid 16k+ React elements
 */
export function SkillIntegralChart({
  skills,
  rowHeight = 40,
  rowGap = 16,
}: SkillIntegralChartProps) {
  if (skills.length === 0) return null;

  const svgContent = generateIntegralSVG(skills, rowHeight, rowGap);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
