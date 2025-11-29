/**
 * Script to generate static SVG images for skill integral charts
 * Run: npx tsx scripts/generate-skill-images.ts
 */

import * as fs from "fs";
import * as path from "path";

// Skill type definition
interface Skill {
  name: string;
  category: "languages" | "frameworks" | "databases" | "devops" | "other";
  proficiency: number;
}

// Skills data (copied from lib/constants/skills.ts to avoid import issues)
const skills: Skill[] = [
  // Languages
  { name: "Golang", category: "languages", proficiency: 4 },
  { name: "Dart", category: "languages", proficiency: 4 },
  { name: "Java", category: "languages", proficiency: 3 },
  { name: "JavaScript", category: "languages", proficiency: 2 },
  { name: "Delphi", category: "languages", proficiency: 2 },
  { name: "Python", category: "languages", proficiency: 1 },
  { name: "C", category: "languages", proficiency: 1 },

  // Frameworks & Platforms
  { name: "Flutter", category: "frameworks", proficiency: 4 },
  { name: "Android", category: "frameworks", proficiency: 3 },
  { name: "Clean Architecture", category: "frameworks", proficiency: 4 },
  { name: "Infrastructure as Code", category: "frameworks", proficiency: 4 },
  { name: "Hyperledger Fabric", category: "frameworks", proficiency: 4 },
  { name: "React/Next.js", category: "frameworks", proficiency: 1 },
  { name: "Ruby on Rails", category: "frameworks", proficiency: 1 },

  // Databases
  { name: "DynamoDB", category: "databases", proficiency: 4 },
  { name: "MongoDB", category: "databases", proficiency: 4 },
  { name: "CouchDB", category: "databases", proficiency: 4 },
  { name: "LevelDB", category: "databases", proficiency: 4 },
  { name: "SQLite", category: "databases", proficiency: 3 },
  { name: "MySQL", category: "databases", proficiency: 2 },

  // DevOps & Cloud
  { name: "AWS", category: "devops", proficiency: 3 },
  { name: "Linux", category: "devops", proficiency: 3 },
  { name: "Docker", category: "devops", proficiency: 3 },
  { name: "Git", category: "devops", proficiency: 2 },
  { name: "Prometheus", category: "devops", proficiency: 1 },
  { name: "Grafana", category: "devops", proficiency: 1 },
  { name: "Bitcoin", category: "devops", proficiency: 1 },
  { name: "Ethereum", category: "devops", proficiency: 1 },
];

// Layout constants (must match Skills.tsx)
const ROW_HEIGHT = 40;
const ROW_GAP = 16;

// Hard-coded colors - matching name gradient (cyan to blue)
const COLOR_START = "rgb(6, 182, 212)"; // cyan-500
const COLOR_END = "rgb(37, 99, 235)"; // blue-600

/**
 * Generates SVG content for integral visualization
 */
function generateIntegralSVG(categorySkills: Skill[]): string {
  const sortedSkills = [...categorySkills].sort(
    (a, b) => b.proficiency - a.proficiency
  );
  const seed = sortedSkills.reduce((acc, s) => acc + s.name.charCodeAt(0), 0);
  const totalHeight =
    sortedSkills.length * ROW_HEIGHT +
    (sortedSkills.length - 1) * ROW_GAP +
    ROW_HEIGHT; // Extra padding at bottom (full row height)

  // Points at the right edge of each progress bar
  const basePoints = sortedSkills.map((skill, i) => {
    const y = Math.max(4, i * (ROW_HEIGHT + ROW_GAP) + ROW_HEIGHT / 2);
    const x = (skill.proficiency / 5) * 100;
    return { x, y };
  });

  // Add final points below the last skill - curve down to zero
  const lastSkill = sortedSkills[sortedSkills.length - 1];
  if (lastSkill) {
    const lastY = (sortedSkills.length - 1) * (ROW_HEIGHT + ROW_GAP) + ROW_HEIGHT / 2;
    const lastX = (lastSkill.proficiency / 5) * 100;
    // Intermediate point to curve down
    basePoints.push({
      x: lastX * 0.5,
      y: lastY + ROW_GAP * 1.5,
    });
    // Final point at zero
    basePoints.push({
      x: 0,
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
  const waveFunction = (
    t: number,
    segmentIndex: number,
    proficiencyScale: number
  ): number => {
    const randomPhaseOffset = seededRandom(segmentIndex * 37) * Math.PI * 2;
    const randomPhaseOffset2 = seededRandom(segmentIndex * 53) * Math.PI * 2;
    const phase = segmentIndex * 0.5 + randomPhaseOffset;

    const lowFreqAmp = 8 + proficiencyScale * 12;
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

    const highFreqAmp = 2 + proficiencyScale * 3;
    const highFreq =
      Math.sin(t * Math.PI * 3 + randomPhaseOffset2) * highFreqAmp;

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

  const polygonPoints = [
    `0,0`,
    `${first.x},0`,
    ...points.map((p) => `${p.x},${p.y}`),
    `0,${totalHeight}`,
  ].join(" ");

  // Progressive blur using two layers: blurred underneath, sharp on top with gradient mask
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 ${totalHeight}" preserveAspectRatio="none">
  <defs>
    <linearGradient id="area-${seed}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${COLOR_START}" stop-opacity="0"/>
      <stop offset="55%" stop-color="${COLOR_START}" stop-opacity="0"/>
      <stop offset="75%" stop-color="${COLOR_START}" stop-opacity="0.1"/>
      <stop offset="90%" stop-color="${COLOR_START}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${COLOR_START}" stop-opacity="0.25"/>
    </linearGradient>
    <linearGradient id="spray-${seed}" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${COLOR_END}" stop-opacity="0"/>
      <stop offset="35%" stop-color="${COLOR_END}" stop-opacity="0.2"/>
      <stop offset="50%" stop-color="${COLOR_END}" stop-opacity="0.6"/>
      <stop offset="65%" stop-color="${COLOR_END}" stop-opacity="1"/>
      <stop offset="82%" stop-color="${COLOR_START}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${COLOR_START}" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <polygon points="${polygonPoints}" fill="url(#spray-${seed})" fill-opacity="0.7"/>
  <polygon points="${polygonPoints}" fill="url(#area-${seed})"/>
</svg>`;
}

// Group skills by category
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

// Generate SVG files
const outputDir = path.join(process.cwd(), "public/images/skills");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

for (const [category, categorySkills] of Object.entries(groupedSkills)) {
  const svg = generateIntegralSVG(categorySkills);
  const filename = path.join(outputDir, `${category}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`Generated: ${filename}`);
}

console.log("Done!");
