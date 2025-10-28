import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
// Delayed persistence to avoid missing module error if AsyncStorage not installed
import { setColorScheme } from "nativewind";

export type AppTheme = "light" | "dark";

type ThemeContextValue = {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (next: AppTheme) => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = "APP_THEME_PREFERENCE";

async function getStoredTheme(): Promise<AppTheme | null> {
  try {
    // @ts-expect-error
    return (globalThis.__APP_THEME__ as AppTheme | undefined) ?? null;
  } catch {
    return null;
  }
}

async function setStoredTheme(next: AppTheme): Promise<void> {
  try {
    // @ts-expect-error
    globalThis.__APP_THEME__ = next;
  } catch {}
}

export function ThemeProviderApp({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AppTheme>("light");

  useEffect(() => {
    (async () => {
      const saved = await getStoredTheme();
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
        try {
          setColorScheme(saved);
        } catch {}
      }
    })();
  }, []);

  const setTheme = useCallback(async (next: AppTheme) => {
    setThemeState(next);
    await setStoredTheme(next);
    try {
      setColorScheme(next);
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);

  const value = useMemo(
    () => ({ theme, isDark: theme === "dark", toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = React.useContext(ThemeContext);
  return ctx;
}
