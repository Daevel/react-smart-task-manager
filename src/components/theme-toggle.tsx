import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-8 w-14 items-center justify-center bg-current transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {/* Thumb */}
      <span
        className={`absolute left-1 flex h-6 w-6 items-center justify-center bg-background transition-all duration-300 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </span>
    </button>
  );
}
