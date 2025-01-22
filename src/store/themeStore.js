import { create } from "zustand";

const themeStore = create((set) => ({
  theme: "light", // 기본 테마 설정

  initializeTheme: () => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const storedTheme = localStorage.getItem("theme");
    const currentTheme = storedTheme || systemTheme;

    document.body.setAttribute("data-theme", currentTheme);
    set({ theme: currentTheme });
  },

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),

  syncSystemTheme: (isDark) => {
    const newTheme = isDark ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.removeItem("theme"); // 사용자가 선택한 테마 초기화
    set({ theme: newTheme });
  },
}));

export default themeStore;
