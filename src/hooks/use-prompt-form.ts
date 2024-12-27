/**
 * External Dependencies
 */
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import { toast } from "sonner";

/**
 * usePromptForm Hook
 *
 * @description
 * Manages form state and handlers for the prompt area including:
 * - Message input handling
 * - File upload processing
 * - Voice input support
 * - Form submission
 * - Keyboard shortcuts
 *
 * @returns {Object} Hook methods and state
 */
function usePromptForm() {
  // State and Refs
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles textarea value changes
   * @param {ChangeEvent<HTMLTextAreaElement>} e - Change event
   */
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  /**
   * Handles form submission
   * Validates and processes the message
   * @param {FormEvent} e - Form event
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Form Submitted");
      console.log(message.trim());

      toast.message("Form Submitted", {
        description: message,
        style: {
          whiteSpace: "pre-line", // Preserves new lines
          maxHeight: "400px", // Prevents too tall toasts
          overflowY: "auto", // Adds scroll if content is too long
        },
      });

      // Clear the message input
      setMessage("");
    }
  };

  /**
   * Handles keyboard events
   * Supports Enter to submit, Shift+Enter for new line
   * @param {KeyboardEvent<HTMLTextAreaElement>} e - Keyboard event
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  /**
   * Handles file input changes
   * Processes and validates uploaded files
   * @param {ChangeEvent<HTMLInputElement>} e - File input event
   */
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement file input

    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        console.log("File attached");
        console.log(file);

        toast.message("File Attached", {
          description: file.name,
        });
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Handles voice input activation
   * Initializes voice recognition if available
   */
  const onVoiceInput = () => {
    // TODO: Implement voice input

    console.log("Voice Input");

    toast.message("Voice", {
      description: "Voice input",
    });
  };

  return {
    message,
    setMessage,
    textareaRef,
    fileInputRef,
    handleChange,
    handleSubmit,
    handleKeyDown,
    handleFileInput,
    onVoiceInput,
  };
}

export default usePromptForm;
