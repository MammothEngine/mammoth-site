"use client";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useRef } from "react";
import { useAmbientMotion, useMotion } from "@/lib/preferences";
import { startScene } from "@/lib/scene";

export function Background() {
  const pathname = usePathname();
  const enabled = useMotion();
  const ambientEnabled = useAmbientMotion();
  const scene = useRef<ReturnType<typeof startScene> | null>(null);
  const ambient = useRef<HTMLCanvasElement>(null);
  const interaction = useRef<HTMLCanvasElement>(null);
  const syncInteraction = useEffectEvent(() => {
    scene.current?.setInteractionEnabled(enabled);
  });
  useEffect(() => {
    if (!pathname || !ambient.current || !interaction.current) return;
    const current = startScene(
      ambient.current,
      interaction.current,
      ambientEnabled,
    );
    scene.current = current;
    syncInteraction();
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
      current.stop();
      scene.current = null;
      observer.disconnect();
      for (const decoration of decorations) delete decoration.dataset.visible;
    };
  }, [ambientEnabled, pathname]);
  useEffect(() => {
    scene.current?.setInteractionEnabled(enabled);
  }, [enabled]);
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
