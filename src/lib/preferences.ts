"use client";

import { useSyncExternalStore } from "react";

export const MOTION_KEY = "mammoth-motion";
export const THEME_KEY = "mammoth-theme";
const CHANGE = "mammoth:preferences";
const fallback = new Map<string, string>();
export type Theme = "light" | "dark" | "system";

function subscribe(callback: () => void) {
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const sync = () => {
    applyPreferences();
    callback();
  };
  window.addEventListener(CHANGE, sync);
  window.addEventListener("storage", sync);
  media.addEventListener("change", sync);
  return () => {
    window.removeEventListener(CHANGE, sync);
    window.removeEventListener("storage", sync);
    media.removeEventListener("change", sync);
  };
}
function read(key: string) {
  if (fallback.has(key)) return fallback.get(key) ?? null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function motionEnabled() {
  const saved = read(MOTION_KEY);
  return (
    saved === "on" ||
    (saved !== "off" && !matchMedia("(prefers-reduced-motion: reduce)").matches)
  );
}
export function currentTheme(): Theme {
  const saved = read(THEME_KEY);
  return saved === "light" || saved === "dark" ? saved : "system";
}
function applyPreferences() {
  document.documentElement.dataset.motion = motionEnabled() ? "on" : "off";
  document.documentElement.dataset.theme = currentTheme();
}
export function setPreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
    fallback.delete(key);
  } catch {
    fallback.set(key, value);
  }
  if (key === MOTION_KEY) document.documentElement.dataset.motion = value;
  if (key === THEME_KEY) document.documentElement.dataset.theme = value;
  window.dispatchEvent(new Event(CHANGE));
}
export function useMotion() {
  return useSyncExternalStore(subscribe, motionEnabled, () => false);
}
export function ambientMotionEnabled() {
  return !matchMedia("(prefers-reduced-motion: reduce)").matches;
}
export function useAmbientMotion() {
  return useSyncExternalStore(subscribe, ambientMotionEnabled, () => false);
}
export function useTheme() {
  return useSyncExternalStore(subscribe, currentTheme, () => "system" as Theme);
}
