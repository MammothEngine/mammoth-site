"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMotion } from "@/lib/preferences";
import { startScene } from "@/lib/scene";

export function Background() {
  const pathname = usePathname();
  const enabled = useMotion();
  const ambient = useRef<HTMLCanvasElement>(null);
  const interaction = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!enabled || !pathname || !ambient.current || !interaction.current)
      return;
    const stop = startScene(ambient.current, interaction.current);
    const decorations = document.querySelectorAll<HTMLElement>(
      ".engine-art, .architecture-diagram, .studio",
    );
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries)
        (entry.target as HTMLElement).dataset.visible = String(
          entry.isIntersecting,
        );
    });
    for (const decoration of decorations) observer.observe(decoration);
    return () => {
      stop();
      observer.disconnect();
      for (const decoration of decorations) delete decoration.dataset.visible;
    };
  }, [enabled, pathname]);
  return (
    <>
      <div className="ambient-wash" aria-hidden="true" />
      <canvas
        ref={ambient}
        inert
        tabIndex={-1}
        className="scene scene-ambient"
        aria-hidden="true"
        data-state="off"
      />
      <canvas
        ref={interaction}
        inert
        tabIndex={-1}
        className="scene scene-interaction"
        aria-hidden="true"
        data-state="off"
      />
    </>
  );
}
