"use client";

/**
 * External Dependencies
 */
import React from "react";

/**
 * Internal Dependencies
 */
import { detectMacPlatform } from "@/utils/utils";

/**
 * Type Definitions
 */
interface ShortcutItemProps {
  keys: (string | React.ReactNode)[];
  description: string;
}

/**
 * ShortcutItem Component
 * Renders a single keyboard shortcut item with its description
 */
const ShortcutItem = ({
  keys,
  description,
}: ShortcutItemProps): React.ReactNode => (
  <div className="flex items-center gap-1" role="listitem">
    {keys.map((key, index) => (
      <React.Fragment key={index}>
        {index > 0 && <span aria-hidden="true">+</span>}
        <kbd
          className="rounded bg-gray-100 px-1 font-mono dark:bg-gray-700"
          role="img"
          aria-label={typeof key === "string" ? key : "keyboard key"}
        >
          {key}
        </kbd>
      </React.Fragment>
    ))}
    <span className="ml-1 text-gray-400 dark:text-gray-200">{description}</span>
  </div>
);

/**
 * KeyboardShortcutGuide Component
 *
 * @description
 * Displays a list of keyboard shortcuts with platform-specific keys (Mac/Windows).
 * Includes shortcuts for sending messages, new lines, moving lines, and copying lines.
 *
 * @returns {JSX.Element} Rendered keyboard shortcut guide
 */
export const KeyboardShortcutGuide = (): React.ReactNode => {
  const isMac = detectMacPlatform();

  // Shortcut configurations
  const shortcuts: ShortcutItemProps[] = [
    { keys: ["Enter"], description: "Send message" },
    { keys: [isMac ? "⇧" : "Shift", "Enter"], description: "New line" },
    { keys: [isMac ? "⌥" : "Alt", "↑/↓"], description: "Move line" },
    {
      keys: [isMac ? "⌥" : "Alt", isMac ? "⇧" : "Shift", "↑/↓"],
      description: "Copy line",
    },
  ];

  return (
    <div
      className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 px-4 text-[11px] text-gray-400"
      role="list"
      aria-label="Keyboard shortcuts"
    >
      {/* Main shortcuts */}
      {shortcuts.map((shortcut, index) => (
        <ShortcutItem
          key={index}
          keys={shortcut.keys}
          description={shortcut.description}
        />
      ))}

      {/* Mac-specific alternative shortcut */}
      {isMac && (
        <div
          className="flex items-center gap-1 md:hidden lg:flex"
          role="listitem"
          aria-label="Alternative Mac shortcut"
        >
          <span className="text-[10px]" aria-hidden="true">
            (or
          </span>
          <kbd
            className="rounded bg-gray-100 px-1 font-mono dark:bg-gray-700"
            role="img"
            aria-label="Command"
          >
            ⌘
          </kbd>
          <span aria-hidden="true">+</span>
          <kbd
            className="rounded bg-gray-100 px-1 font-mono dark:bg-gray-700"
            role="img"
            aria-label="Up or Down arrow"
          >
            ↑/↓
          </kbd>
          <span className="text-[10px]" aria-hidden="true">
            )
          </span>
        </div>
      )}
    </div>
  );
};
