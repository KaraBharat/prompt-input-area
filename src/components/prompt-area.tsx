"use client";

/**
 * External Dependencies
 */
import React, { KeyboardEvent } from "react";

/**
 * Internal Dependencies
 */
import { usePromptArea } from "@/hooks/use-prompt-area";

/**
 * Type Definitions
 */
interface PromptAreaProps {
  /** The current message value */
  message: string;
  /** Callback to update the message value */
  setMessage: (message: string) => void;
  /** Placeholder text for the textarea */
  placeholder?: string;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Optional keyboard event handler */
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

/**
 * PromptArea Component
 *
 * @description
 * A textarea component optimized for AI prompt input with auto-resize functionality
 * and keyboard event handling. Supports accessibility features and custom styling.
 *
 * @param {PromptAreaProps} props - Component properties
 * @returns {ReactElement} Rendered textarea component
 */
function PromptArea({
  placeholder = "Ask me anything...",
  disabled = false,
  message,
  setMessage,
  onKeyDown,
}: PromptAreaProps): React.ReactElement {
  // Custom hook for textarea functionality
  const { textareaRef, handleKeyDown } = usePromptArea({
    message,
    setMessage,
  });

  return (
    <div
      className="max-h-[300px] w-full overflow-y-auto px-4 pt-4"
      role="textbox"
      aria-label="AI Prompt Input Area"
    >
      <textarea
        ref={textareaRef}
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          handleKeyDown(e);
          onKeyDown?.(e);
        }}
        placeholder={placeholder}
        disabled={disabled}
        className="h-full w-full resize-none bg-transparent leading-6 focus:outline-none disabled:opacity-50 dark:text-white"
        // Accessibility attributes
        aria-multiline="true"
        aria-label={placeholder}
        aria-disabled={disabled}
        // Additional attributes for better user experience
        spellCheck="true"
        autoComplete="off"
      />
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default React.memo(PromptArea);
