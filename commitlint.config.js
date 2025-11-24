/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
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
