/**
 * External Dependencies
 */
import type { ReactElement } from "react";

/**
 * Internal Dependencies
 * - Components are imported from feature directories for better organization
 */
import PromptAreaForm from "@/features/prompt-area-form";

/**
 * Home Page Component
 *
 * @description
 * Main landing page component that showcases the AI prompt input area.
 * Features a responsive layout with a header section and the main prompt form.
 * Implements accessibility standards and responsive design patterns.
 *
 * @returns {ReactElement} Rendered home page component
 */
export default function Home(): ReactElement {
  return (
    <main
      className="flex items-center justify-center mt-10 w-full"
      role="main"
      aria-label="Prompt Area Main Content"
      tabIndex={-1}
    >
      <div
        className="flex flex-col items-center justify-center w-full p-4 md:p-8 gap-4 md:gap-10"
        role="region"
        aria-labelledby="page-title"
      >
        {/* 
          Header Section
          Contains the main title and description of the application
          Implements semantic HTML and accessibility attributes
        */}
        <header
          className="text-center mb-12 max-w-3xl px-4 relative "
          role="banner"
        >
          {/* Ambient glow effects */}
          <div className="absolute -top-20 left-1/2 transform -z-10">
            <div className="h-40 w-[60rem] bg-gradient-to-r from-violet-600/30 via-fuchsia-500/30 to-blue-600/30 blur-3xl animate-float" />
          </div>

          <h1
            id="page-title"
            className="text-4xl md:text-6xl font-bold mb-8 animate-gradient-fast relative"
            aria-level={1}
          >
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
              Prompt Area
            </span>
            <span className="block text-xl md:text-2xl mt-3 font-normal bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              Advanced AI Prompt Input Box
            </span>
          </h1>

          <p
            className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-200 max-w-2xl mx-auto relative"
            role="doc-subtitle"
            aria-describedby="page-title"
          >
            A powerful textarea input control for AI tools. Supports{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-violet-700 dark:text-violet-300 font-medium animate-pulse">
                single-line
              </span>
              <span className="absolute inset-0 bg-violet-400/10 blur-sm animate-pulse-slow" />
            </span>{" "}
            and{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600 dark:text-blue-300 font-medium animate-pulse">
                multi-line
              </span>
              <span className="absolute inset-0 bg-blue-400/10 blur-sm animate-pulse-slow" />
            </span>{" "}
            movements, copying, boundary handling, and more for seamless large
            prompt input management.
          </p>

          {/* Subtle floating particles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-violet-400/30 animate-float-slow" />
            <div className="absolute top-3/4 right-1/4 h-2 w-2 rounded-full bg-blue-400/30 animate-float-medium" />
            <div className="absolute top-1/2 left-3/4 h-2 w-2 rounded-full bg-fuchsia-400/30 animate-float-fast" />
          </div>
        </header>

        {/* 
          Main Form Section
          Renders the primary interaction component for user input
          PromptAreaForm handles its own state and accessibility
        */}
        <div className="w-full relative">
          {/* Layered glow effects */}
          <div className="absolute inset-0 -z-10">
            {/* glows */}
            <div className="absolute top-0 left-0 right-0 -z-20">
              <div className="h-40 w-3/4 mx-auto bg-gradient-to-r from-purple-800/20 via-fuchsia-900/20 to-blue-800/20 blur-[80px] animate-glow-spread" />
            </div>
          </div>

          {/* Form container with subtle glass effect */}
          <div className="relative z-10 backdrop-blur-[2px]">
            <PromptAreaForm />
          </div>
        </div>
      </div>
    </main>
  );
}
