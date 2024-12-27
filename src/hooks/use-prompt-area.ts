/**
 * External Dependencies
 */
import { useEffect, useRef } from "react";

/**
 * Internal Dependencies
 */
import { useHandlePromptLine } from "./use-handle-prompt-line";

/**
 * Type Definitions
 */
interface UsePromptAreaProps {
  /** Current message value */
  message: string;
  /** Callback to update message value */
  setMessage: (message: string) => void;
}

/**
 * usePromptArea Hook
 *
 * @description
 * Custom hook for managing the prompt textarea area.
 * Features:
 * - Auto-resizing textarea
 * - Line movement handling
 * - Accessibility support
 * - Height constraints
 *
 * @param {UsePromptAreaProps} props - Hook properties
 * @returns {Object} Hook methods and refs
 */
export function usePromptArea({ message, setMessage }: UsePromptAreaProps) {
  // Ref for textarea element
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Line movement handler from separate hook
  const lineMovement = useHandlePromptLine({
    value: message,
    onChange: setMessage,
  });

  /**
   * Adjusts textarea height based on content
   * Maintains maximum height constraint
   */
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate proper scrollHeight
    textarea.style.height = "auto";

    // Calculate and set new height with maximum constraint
    const maxHeight = 180; // Maximum height in pixels
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;

    // Add scrollbar if content exceeds maximum height
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  /**
   * Effect to adjust textarea height when content changes
   */
  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return {
    message,
    textareaRef,
    handleKeyDown: lineMovement.handleKeyDown,
  };
}
