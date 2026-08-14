/**
 * СЛОВО ВЛАДЕЛЬЦА В ТЕЛЕ КОММИТА ОБЯЗАНО НЕСТИ ID СОБЫТИЯ.
 * Разбор 2026-08-14, класс owner-bafflement: c67f4c2 заявил «пары, утверждённые
 * Егором построчно» на строфе, сочинённой агентом, и через сутки владелец не
 * узнал свои слова на живом сайте. Правило и его укус по истории репозитория —
 * scripts/owner-approval-claim.mjs + scripts/owner-approval-claim.test.mjs.
 */
const OWNER_APPROVAL_RULE = "owner-approval-needs-event-id";

/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        // Относительный динамический import: резолвится от самого файла конфига,
        // без require() — его запрещает eslint-правило репозитория.
        [OWNER_APPROVAL_RULE]: async (parsed) => {
          const mod = await import("./scripts/owner-approval-claim.mjs");
          const verdict = mod.ownerApprovalVerdict(parsed.raw ?? "");
          return [verdict.ok, verdict.ok ? "" : verdict.red];
        },
      },
    },
  ],
  rules: {
    // Апрув владельца, названный прозой, обязан назвать событие с его словом
    [OWNER_APPROVAL_RULE]: [2, "always"],
    // Type должен быть один из списка
    "type-enum": [
      2,
      "always",
      [
        "feat", // новая feature
        "fix", // исправление бага
        "refactor", // рефакторинг
        "perf", // оптимизация производительности
        "docs", // документация
        "style", // форматирование
        "test", // тесты
        "chore", // обслуживание
        "ci", // CI/CD
        "revert", // откат
      ],
    ],
    // Scope обязателен (hero, images, layout и т.д.)
    "scope-empty": [2, "never"],
    // Subject не должен быть пустым
    "subject-empty": [2, "never"],
    // Subject не должен заканчиваться точкой
    "subject-full-stop": [2, "never", "."],
    // Subject должен быть в lowercase
    "subject-case": [2, "always", "lower-case"],
    // Header не должен быть длиннее 100 символов
    "header-max-length": [2, "always", 100],
    // Body должен начинаться с пустой строки
    "body-leading-blank": [1, "always"],
    // Footer должен начинаться с пустой строки
    "footer-leading-blank": [1, "always"],
  },
};
