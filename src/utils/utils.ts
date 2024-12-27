/**
 * Interface representing the Navigator User Agent Data
 * Used for modern browsers that support the User Agent Client Hints API
 */
interface NavigatorUserAgentData {
  platform: string;
}

/**
 * Detects if the current platform is macOS
 * Uses modern User Agent Client Hints API with fallback to legacy userAgent string
 *
 * @returns {boolean} True if platform is macOS, false otherwise
 */
export const detectMacPlatform = (): boolean => {
  // Return false if running in non-browser environment (e.g., SSR)
  if (typeof window === "undefined") {
    return false;
  }

  // Modern approach: Use User Agent Client Hints API
  if ("userAgentData" in navigator) {
    const userAgentData = navigator.userAgentData as NavigatorUserAgentData;
    return userAgentData?.platform === "macOS";
  }

  // Fallback: Use legacy userAgent string
  return navigator.userAgent.toLowerCase().includes("mac");
};
