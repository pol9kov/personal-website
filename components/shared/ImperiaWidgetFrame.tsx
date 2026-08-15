"use client";

/**
 * Рамка живого виджета Imperia OS с автовысотой: окно меряет свой контент и
 * шлёт высоту postMessage'ом, рамка становится РОВНО такой — фиксированная
 * высота обрезала раскрывающиеся разделы (нож Егора 2026-08-14).
 *
 * Приём скопирован у iframe-resizer (канон встраиваемых виджетов): одну
 * сторону задаёт хозяин (width:100%), вторую считает содержимое; у самого
 * iframe рамки НЕТ — border и скругление живут на обёртке. Бордюр на самом
 * окне съедал 2px внутреннего вьюпорта, и содержимое переставало влезать в
 * собственную рамку: замер живой страницы 2026-08-14 — рамка 345, окно внутри
 * 343, содержимое 345, внутри поднимался свой скролл. scrolling="no" — оттуда
 * же: высоту держит рамка, своей полосы прокрутки у окна быть не должно.
 *
 * Принимаются только сообщения с origin платформы и полем высоты.
 *
 * РАМКА СВОЮ ВЫСОТУ НЕ АНИМИРУЕТ — становится присланным числом тем же кадром
 * (там же, у iframe-resizer: хозяин повторяет размер, а не догоняет его).
 * Анимация рамки была ложью о размере: содержимое внутри менялось мгновенно,
 * а окно доезжало 300 мс, и всё это время окно МЕНЬШЕ содержимого — его нож
 * 2026-08-14: «когда нажимаешь, в это мгновение у тебя обрезанный контент,
 * типа числа обрезаны». Плавность живёт ВНУТРИ окна: тело раздела
 * раскрывается само, кадр за кадром, и каждый кадр шлёт свою высоту —
 * рамка равна содержимому в любой момент.
 */
import { useEffect, useState } from "react";

const WIDGET_ORIGIN = "https://dev.imperiaos.com";
const WIDGET_CANVAS = "#201e1b";

export function ImperiaWidgetFrame({ locale }: { locale: string }) {
  const [height, setHeight] = useState(208);
  const [ready, setReady] = useState(false);

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
    // холстом — белым; на телефоне это видно как светлая вспышка на полсекунды
    // перед тем, как виджет станет тёмным (Егор 2026-08-15). Фон на элементе
    // iframe и на обёртке занимает тот же прямоугольник ДО загрузки, а после
    // загрузки его перекрывает собственный фон документа — вспышке взяться
    // неоткуда. Значение — ровно полотно embed-страницы платформы
    // (packages/app/app/widget/executor/page.tsx, background: '#201e1b').
    <div
      className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
      style={{ backgroundColor: WIDGET_CANVAS }}
    >
      <iframe
        src={`${WIDGET_ORIGIN}/widget/executor?lang=${locale}`}
        title="Imperia OS — live"
        loading="lazy"
        scrolling="no"
        // ОКНО ПОКАЗЫВАЕМ ТОЛЬКО КОГДА ОНО ЗАГОВОРИЛО. Пока документ окна не
        // отрисован (платформа перезапускается, сеть тормозит, страница пустая),
        // браузер красит его площадь белым ПОВЕРХ фона элемента — Егор поймал
        // это 2026-08-15 скриншотом с телефона: на месте виджета белый
        // прямоугольник. Первое сообщение о высоте = документ жив; до него
        // видна тёмная рамка того же цвета, что и полотно виджета.
        style={{ height, backgroundColor: WIDGET_CANVAS, opacity: ready ? 1 : 0 }}
        className="block w-full border-0"
      />
    </div>
  );
}
