/**
 * External Dependencies
 */
import { KeyboardEvent, useCallback, useRef } from "react";

/**
 * Internal Dependencies
 */
import { detectMacPlatform } from "@/utils/utils";

/**
 * Type Definitions
 */
interface UseHandlePromptLineProps {
  /** Current value of the textarea */
  value: string;
  /** Callback to update the textarea value */
  onChange: (newValue: string) => void;
}

/**
 * Direction type for line movement
 */
type Direction = "up" | "down";

/**
 * useHandlePromptLine Hook
 *
 * @description
 * Custom hook for handling line movements in a textarea.
 * Features:
 * - Move lines up/down
 * - Copy lines up/down
 * - Maintains cursor position
 * - Handles multi-line selections
 * - Platform-specific keyboard shortcuts
 *
 * @param {UseHandlePromptLineProps} props - Hook properties
 * @returns {Object} Hook methods and handlers
 */
export function useHandlePromptLine({
  value,
  onChange,
}: UseHandlePromptLineProps) {
  // Refs for managing undo groups and scroll position
  const undoGroupId = useRef<number>(0);
  const lastScrollPosition = useRef<number>(0);

  /**
   * Creates a new undo group for the textarea
   * Ensures multiple operations are grouped as one undo action
   */
  const createUndoGroup = useCallback(() => {
    undoGroupId.current = Date.now();
  }, []);

  /**
   * Moves or copies selected lines in the specified direction
   *
   * @param {Direction} direction - Direction to move/copy ("up" or "down")
   * @param {boolean} shouldCopy - Whether to copy instead of move
   */
  const moveSelectedLine = (direction: Direction, shouldCopy = false) => {
    const lines = value.split("\n");
    const textarea = document.activeElement as HTMLTextAreaElement;
    const { selectionStart, selectionEnd } = textarea;

    // Calculate line numbers for selection
    const textBeforeStart = value.substring(0, selectionStart);
    const startLineNumber = textBeforeStart.split("\n").length - 1;
    const textBeforeEnd = value.substring(0, selectionEnd);
    const endLineNumber = textBeforeEnd.split("\n").length - 1;

    // Check movement boundaries
    if (
      !shouldCopy &&
      ((direction === "up" && startLineNumber === 0) ||
        (direction === "down" && endLineNumber === lines.length - 1))
    ) {
      return;
    }

    // Calculate line offsets for cursor positioning
    const lineOffsets = lines.reduce<number[]>((acc, line, i) => {
      acc.push(i === 0 ? 0 : acc[i - 1] + lines[i - 1].length + 1);
      return acc;
    }, []);

    // Handle selection details
    const isMultiLineSelection = startLineNumber !== endLineNumber;
    const selectionStartOffset = selectionStart - lineOffsets[startLineNumber];
    const selectionEndOffset = selectionEnd - lineOffsets[endLineNumber];

    // Modify lines based on operation type
    const newLines = [...lines];
    const swapIndex =
      direction === "up" ? startLineNumber - 1 : endLineNumber + 1;

    if (shouldCopy) {
      // Handle line copying
      if (isMultiLineSelection) {
        const selectedLines = newLines.slice(
          startLineNumber,
          endLineNumber + 1
        );
        const insertPosition =
          direction === "up" ? startLineNumber : endLineNumber + 1;
        newLines.splice(insertPosition, 0, ...selectedLines);
      } else {
        const insertPosition =
          direction === "up" ? startLineNumber : startLineNumber + 1;
        newLines.splice(insertPosition, 0, newLines[startLineNumber]);
      }
    } else {
      // Handle line moving
      if (isMultiLineSelection) {
        const selectedLines = newLines.splice(
          startLineNumber,
          endLineNumber - startLineNumber + 1
        );
        newLines.splice(
          direction === "up" ? swapIndex : swapIndex - selectedLines.length + 1,
          0,
          ...selectedLines
        );
      } else {
        [newLines[startLineNumber], newLines[swapIndex]] = [
          newLines[swapIndex],
          newLines[startLineNumber],
        ];
      }
    }

    // Create undo group and update text
    createUndoGroup();
    onChange(newLines.join("\n"));

    // Handle cursor position and scrolling
    requestAnimationFrame(() => {
      const newLineOffsets = newLines.reduce<number[]>((acc, line, i) => {
        acc.push(i === 0 ? 0 : acc[i - 1] + newLines[i - 1].length + 1);
        return acc;
      }, []);

      // Calculate new selection positions
      const newStartLine = shouldCopy
        ? direction === "up"
          ? startLineNumber
          : startLineNumber + 1
        : direction === "up"
        ? startLineNumber - 1
        : startLineNumber + 1;

      const newEndLine = shouldCopy
        ? direction === "up"
          ? endLineNumber
          : endLineNumber + 1
        : direction === "up"
        ? endLineNumber - 1
        : endLineNumber + 1;

      // Update selection range
      const newSelectionStart =
        newLineOffsets[newStartLine] + selectionStartOffset;
      const newSelectionEnd = isMultiLineSelection
        ? newLineOffsets[newEndLine] + selectionEndOffset
        : newSelectionStart;

      // Ensure cursor stays within line bounds
      const finalSelectionStart = Math.min(
        newSelectionStart,
        newLineOffsets[newStartLine] + newLines[newStartLine].length
      );
      const finalSelectionEnd = Math.min(
        newSelectionEnd,
        newLineOffsets[newEndLine] + newLines[newEndLine].length
      );

      // Handle scrolling
      const currentScrollTop = textarea.scrollTop;
      const scrollHeight = textarea.scrollHeight;
      const clientHeight = textarea.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      const lineHeight = scrollHeight / newLines.length;
      const targetLinePosition = lineHeight * newStartLine;
      const buffer = lineHeight * 2;

      // Update selection
      textarea.setSelectionRange(finalSelectionStart, finalSelectionEnd);

      // Calculate and apply optimal scroll position
      let newScrollTop = currentScrollTop;
      if (
        direction === "up" &&
        targetLinePosition - buffer < currentScrollTop
      ) {
        newScrollTop = Math.max(0, targetLinePosition - buffer);
      } else if (
        direction === "down" &&
        targetLinePosition + lineHeight + buffer >
          currentScrollTop + clientHeight
      ) {
        newScrollTop = Math.min(
          maxScroll,
          targetLinePosition - clientHeight + lineHeight + buffer
        );
      }

      // Apply smooth scrolling if needed
      if (newScrollTop !== currentScrollTop) {
        textarea.scrollTo({
          top: newScrollTop,
          behavior: "smooth",
        });
        lastScrollPosition.current = newScrollTop;
      }
    });
  };

  /**
   * Handles keyboard events for line operations
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (value.trim() === "") return;

    const isMac = detectMacPlatform();
    const isMoveKeyCombination = isMac
      ? (e.metaKey || e.altKey) &&
        (e.key === "ArrowUp" || e.key === "ArrowDown")
      : e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown");

    if (isMoveKeyCombination) {
      e.preventDefault();
      moveSelectedLine(e.key === "ArrowUp" ? "up" : "down", e.shiftKey);
    }
  };

  return { handleKeyDown };
}
