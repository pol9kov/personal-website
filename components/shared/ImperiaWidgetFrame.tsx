"use client";

/**
 * Рамка живого виджета Imperia OS с автовысотой: окно меряет свой контент и
 * шлёт высоту postMessage'ом, рамка становится РОВНО такой — фиксированная
 * высота обрезала раскрывающиеся разделы (нож Егора 2026-08-14).
 *
 * Приём скопирован у iframe-resizer (канон встраиваемых виджетов): одну
 * сторону задаёт хозяин (width:100%), вторую считает содержимое; у самого
 * iframe рамки НЕТ — border и скругление живут на обёртке. scrolling="no" —
 * оттуда же: высоту держит рамка, своей полосы прокрутки у окна быть не должно.
 *
 * Принимаются только сообщения с origin платформы и полем высоты.
 *
 * РАМКА СВОЮ ВЫСОТУ НЕ АНИМИРУЕТ — становится присланным числом тем же кадром.
 * Анимация рамки была ложью о размере: содержимое внутри менялось мгновенно,
 * а окно доезжало 300 мс, и всё это время окно МЕНЬШЕ содержимого — его нож
 * 2026-08-14: «когда нажимаешь, в это мгновение у тебя обрезанный контент,
 * типа числа обрезаны». Плавность живёт ВНУТРИ окна.
 *
 * ТЕМА ОКНА = ТЕМА САЙТА (его вопрос 2026-08-15: «А че виджет не адаптируется
 * под тему?»). Тема едет тем же каналом, что и язык, — параметром адреса
 * (?theme=light|dark), и других каналов нет намеренно: второй путь для того же
 * факта — вторая правда. Тему знает только браузер (её ставит next-themes
 * классом на <html>), поэтому окно рисуется лишь после того, как она стала
 * известна; иначе светлая страница успела бы отрисовать тёмное окно.
 */
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const WIDGET_ORIGIN = "https://dev.imperiaos.com";
// Полотно виджета — своя тёплая пара, а не #ffffff/#0a0a0a страницы: окно
// стоит карточкой в бордюре, и на светлой теме чистый белый слил бы её со
// страницей, оставив висеть в воздухе один бордюр.
const CANVAS = { dark: "#201e1b", light: "#faf8f5" } as const;

export function ImperiaWidgetFrame({ locale }: { locale: string }) {
  const [height, setHeight] = useState(208);
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();
  const theme: "light" | "dark" = resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== WIDGET_ORIGIN) return;
      const d = e.data as { type?: string; height?: number };
      if (d?.type === "imperia-widget-height" && typeof d.height === "number") {
        setHeight(Math.max(120, Math.min(900, Math.ceil(d.height))));
        setReady(true);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    // ЦВЕТ ПОЛОТНА ВИДЖЕТА — НА САМОЙ РАМКЕ, А НЕ ТОЛЬКО ВНУТРИ ОКНА. Пока
    // документ окна не загружен, браузер красит площадь iframe СВОИМ дефолтным
    // холстом — белым; на телефоне это видно как светлая вспышка (Егор
    // 2026-08-15). Значения — ровно полотно embed-страницы платформы
    // (packages/app/app/widget/executor/page.tsx, --widget-canvas).
    <div
      className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
      style={{ backgroundColor: CANVAS[theme] }}
    >
      {/* ОКНО РИСУЕМ ТОЛЬКО КОГДА ТЕМА ИЗВЕСТНА. На сервере и в первом кадре
          гидратации next-themes темы ещё не знает (её ставит его скрипт классом
          на <html>), и окно, отрисованное до этого, уехало бы за тёмным
          адресом даже на светлой странице — а потом перезагрузилось бы. До
          этого момента площадь держит сама рамка, уже покрашенная полотном. */}
      {resolvedTheme ? (
        <iframe
          src={`${WIDGET_ORIGIN}/widget/executor?lang=${locale}&theme=${theme}`}
          title="Imperia OS — live"
          loading="lazy"
          scrolling="no"
          // ОКНО ПОКАЗЫВАЕМ ТОЛЬКО КОГДА ОНО ЗАГОВОРИЛО: до первого сообщения о
          // высоте браузер красит его площадь белым ПОВЕРХ фона элемента —
          // Егор поймал это скриншотом с телефона 2026-08-15. При смене темы
          // адрес меняется и окно перезагружается, но старый документ остаётся
          // на экране до готовности нового — пустого кадра не возникает.
          style={{ height, backgroundColor: CANVAS[theme], opacity: ready ? 1 : 0 }}
          className="block w-full border-0"
        />
      ) : (
        <div style={{ height }} />
      )}
    </div>
  );
}
