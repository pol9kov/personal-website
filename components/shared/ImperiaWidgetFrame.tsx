"use client";

/**
 * Рамка живого виджета Imperia OS с автовысотой: окно меряет себя и шлёт
 * высоту postMessage'ом, рамка растёт за содержимым — фиксированная высота
 * обрезала раскрывающиеся разделы (нож Егора 2026-08-14). Принимаются только
 * сообщения с origin платформы и полем высоты.
 */
import { useEffect, useRef, useState } from "react";

const WIDGET_ORIGIN = "https://dev.imperiaos.com";

export function ImperiaWidgetFrame({ locale }: { locale: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
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
    <iframe
      ref={ref}
      src={`${WIDGET_ORIGIN}/widget/executor?lang=${locale}`}
      title="Imperia OS — live"
      loading="lazy"
      style={{ height }}
      className="w-full rounded-xl border border-gray-200 transition-[height] duration-300 dark:border-gray-800"
    />
  );
}
