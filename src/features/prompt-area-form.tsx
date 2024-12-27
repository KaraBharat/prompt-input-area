"use client";

/**
 * External Dependencies
 */
import React from "react";
import { SendHorizontal, Paperclip, Sparkles, Mic } from "lucide-react";

/**
 * Internal Dependencies
 */
import usePromptForm from "@/hooks/use-prompt-form";
import PromptArea from "@/components/prompt-area";
import { KeyboardShortcutGuide } from "./keyboard-shortcut-guide";

/**
 * PromptAreaForm Component
 *
 * @description
 * Main form component for handling AI prompts. Features include:
 * - Text input with auto-resize
 * - File attachments
 * - Voice input
 * - GPT-4 mode toggle
 * - Keyboard shortcuts
 *
 * @returns {React.ReactElement} The prompt area form component
 */
function PromptAreaForm(): React.ReactElement {
  // Custom hook for form functionality
  const {
    message,
    setMessage,
    handleSubmit,
    handleKeyDown,
    handleFileInput,
    fileInputRef,
    onVoiceInput,
  } = usePromptForm();

  return (
    <div
      className="relative mx-auto w-full max-w-4xl"
      role="region"
      aria-label="AI Chat Input Area"
    >
      {/* Main Form Element */}
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full flex-col"
        aria-label="Message Input Form"
      >
        {/* Input Container */}
        <div className="relative w-full rounded-3xl border-2 border-fuchsia-200 bg-stone-100 shadow-lg dark:border-fuchsia-700 dark:bg-gray-800">
          {/* Text Input Area */}
          <PromptArea
            message={message}
            setMessage={setMessage}
            placeholder="Ask me anything..."
            disabled={false}
            onKeyDown={handleKeyDown}
          />

          {/* Action Buttons Bar */}
          <div
            className="flex w-full items-center justify-between px-2 pb-2 dark:border-gray-700 dark:bg-gray-800/95"
            role="toolbar"
            aria-label="Message Actions"
          >
            {/* Left Side Actions */}
            <div
              className="flex items-center gap-2"
              role="group"
              aria-label="Primary Actions"
            >
              {/* File Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg rounded-bl-2xl p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                title="Attach files"
                aria-label="Upload files"
              >
                <Paperclip className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                className="hidden"
                multiple
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>

            {/* Right Side Actions */}
            <div
              className="flex items-center gap-2"
              role="group"
              aria-label="Secondary Actions"
            >
              {/* GPT-4 Toggle */}
              <button
                type="button"
                className="rounded-lg p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                title="Use GPT-4"
                aria-label="Toggle GPT-4 mode"
              >
                <Sparkles className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Voice Input Button */}
              <button
                type="button"
                onClick={onVoiceInput}
                className="rounded-lg p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                title="Voice input"
                aria-label="Start voice input"
              >
                <Mic className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Send Message Button */}
              <button
                type="submit"
                disabled={!message.trim()}
                className="rounded-lg rounded-br-2xl p-1 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
                title="Send message"
                aria-label="Send message"
              >
                <SendHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts Guide */}
        <KeyboardShortcutGuide />
      </form>
    </div>
  );
}

export default React.memo(PromptAreaForm);
