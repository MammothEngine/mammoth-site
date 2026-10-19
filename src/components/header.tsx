"use client";
import {
  Check,
  ChevronDown,
  Menu,
  Monitor,
  Moon,
  Mouse,
  MouseOff,
  Sun,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Github } from "@/components/github-icon";
import {
  MOTION_KEY,
  setPreference,
  THEME_KEY,
  useMotion,
  useTheme,
} from "@/lib/preferences";
import { Logo } from "./logo";

const choices = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;
export function Header() {
  const theme = useTheme();
  const enabled = useMotion();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const id = useId();
  const Choice = choices.find((c) => c.value === theme) ?? choices[2];
  const MotionIcon = enabled ? Mouse : MouseOff;
  const motionLabel = enabled ? "Animasyonları kapat" : "Animasyonları aç";
  useEffect(() => {
    if (!open) return;
    root.current?.querySelector<HTMLInputElement>("input:checked")?.focus();
    const outside = (event: PointerEvent | FocusEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        setOpen(false);
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [open]);
  useEffect(() => {
    if (!menu) return;
    const dismissOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", dismissOnEscape);
    return () => document.removeEventListener("keydown", dismissOnEscape);
  }, [menu]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" aria-label="Mammoth home">
          <Logo />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#features">Why Mammoth</Link>
          <Link href="/#architecture">The engine</Link>
          <Link href="/docs/">Documentation</Link>
        </nav>
        <div className="header-actions">
          <div className="theme-picker" ref={root}>
            <button
              type="button"
              ref={trigger}
              className="theme-trigger"
              aria-label={`Color theme: ${Choice.label}`}
              aria-expanded={open}
              aria-controls={`${id}-theme`}
              aria-haspopup="dialog"
              onClick={() => setOpen(!open)}
            >
              <Choice.icon size={17} />
              <span>{Choice.label}</span>
              <ChevronDown size={13} />
            </button>
            {open && (
              <div
                className="theme-panel"
                role="dialog"
                id={`${id}-theme`}
                aria-label="Appearance"
              >
                <strong>Make yourself comfortable.</strong>
                <p>A little light. A little dark. Your call.</p>
                <fieldset>
                  <legend className="sr-only">Color theme</legend>
                  {choices.map(({ value, label, icon: Icon }) => (
                    <label key={value} className="theme-option">
                      <input
                        type="radio"
                        name={`${id}-theme-choice`}
                        checked={theme === value}
                        onChange={() => setPreference(THEME_KEY, value)}
                      />
                      <span className={`theme-preview preview-${value}`}>
                        <span className="preview-window">
                          <i />
                          <b />
                          <b />
                          <b />
                        </span>
                        <Icon size={17} />
                        {theme === value && (
                          <Check className="choice-check" size={13} />
                        )}
                      </span>
                      <span>{label}</span>
                    </label>
                  ))}
                </fieldset>
                <small>
                  {theme === "system"
                    ? "Follows your device’s appearance."
                    : `${Choice.label} mode selected.`}
                </small>
              </div>
            )}
          </div>
          <button
            className={`icon-button motion-toggle ${enabled ? "is-active" : ""}`}
            type="button"
            aria-label={motionLabel}
            title={motionLabel}
            aria-pressed={enabled}
            onClick={() => setPreference(MOTION_KEY, enabled ? "off" : "on")}
          >
            <MotionIcon size={19} />
            <span className="control-tooltip" aria-hidden="true">
              {motionLabel}
            </span>
          </button>
          <span className="header-divider" />
          <a
            className="github-link"
            href="https://github.com/MammothEngine/mammoth"
            aria-label="Mammoth on GitHub"
          >
            <Github size={19} />
            <span>GitHub</span>
          </a>
          <button
            type="button"
            ref={menuButton}
            className="icon-button menu-toggle"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls={`${id}-navigation`}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menu && (
        <nav
          className="mobile-nav container"
          id={`${id}-navigation`}
          aria-label="Mobile navigation"
        >
          {[
            ["/#features", "Why Mammoth"],
            ["/#architecture", "The engine"],
            ["/docs/", "Documentation"],
            ["https://github.com/MammothEngine/mammoth", "GitHub"],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenu(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
