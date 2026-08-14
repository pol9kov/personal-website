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
 */
import { useEffect, useState } from "react";

const WIDGET_ORIGIN = "https://dev.imperiaos.com";

export function ImperiaWidgetFrame({ locale }: { locale: string }) {
  const [height, setHeight] = useState(208);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== WIDGET_ORIGIN) return;
      const d = e.data as { type?: string; height?: number };
      if (d?.type === "imperia-widget-height" && typeof d.height === "number") {
        setHeight(Math.max(120, Math.min(900, Math.ceil(d.height))));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <iframe
        src={`${WIDGET_ORIGIN}/widget/executor?lang=${locale}`}
        title="Imperia OS — live"
        loading="lazy"
        scrolling="no"
        style={{ height }}
        className="block w-full border-0 transition-[height] duration-300"
      />
    </div>
  );
}
