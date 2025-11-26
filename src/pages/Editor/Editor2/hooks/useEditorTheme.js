import { useState, useEffect } from "react";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { noctisLilac } from "@uiw/codemirror-theme-noctis-lilac";
import { abcdef } from "@uiw/codemirror-theme-abcdef";
import { androidstudio } from "@uiw/codemirror-theme-androidstudio";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { aura } from "@uiw/codemirror-theme-aura";
import { bbedit } from "@uiw/codemirror-theme-bbedit";
import { bespin } from "@uiw/codemirror-theme-bespin";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { duotoneLight, duotoneDark } from "@uiw/codemirror-theme-duotone";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { gruvboxDark, gruvboxLight } from "@uiw/codemirror-theme-gruvbox-dark";
import { materialDark, materialLight } from "@uiw/codemirror-theme-material";
import { nord } from "@uiw/codemirror-theme-nord";
import { solarizedLight, solarizedDark } from "@uiw/codemirror-theme-solarized";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";

const themeMap = {
  light: {
    githubLight,
    noctisLilac,
    bbedit,
    duotoneLight,
    eclipse,
    gruvboxLight,
    materialLight,
    solarizedLight,
    xcodeLight,
  },
  dark: {
    okaidia,
    abcdef,
    androidstudio,
    atomone,
    aura,
    bespin,
    darcula,
    dracula,
    duotoneDark,
    githubDark,
    gruvboxDark,
    materialDark,
    nord,
    solarizedDark,
    sublime,
    tokyoNight,
    vscodeDark,
    xcodeDark,
  },
};

export const useEditorTheme = (appTheme) => {
  const [editorTheme, setEditorThemeState] = useState(() => {
    // Initialize theme immediately to prevent flickering
    const themeType = appTheme === "lighttheme" ? "light" : "dark";
    const storageKey = `editorThemeStored${themeType === "light" ? "Light" : "Dark"}`;
    const storedThemeName = localStorage.getItem(storageKey);
    const themes = themeMap[themeType];
    return themes[storedThemeName] || (themeType === "light" ? githubLight : okaidia);
  });

  useEffect(() => {
    const themeType = appTheme === "lighttheme" ? "light" : "dark";
    const storageKey = `editorThemeStored${themeType === "light" ? "Light" : "Dark"}`;
    const storedThemeName = localStorage.getItem(storageKey);
    
    const themes = themeMap[themeType];
    const selectedTheme = themes[storedThemeName] || (themeType === "light" ? githubLight : okaidia);
    
    // Only update if theme actually changed
    setEditorThemeState((prevTheme) => {
      if (prevTheme === selectedTheme) return prevTheme;
      return selectedTheme;
    });
  }, [appTheme]);

  const setEditorTheme = (theme) => {
    setEditorThemeState(theme);
  };

  return {
    editorTheme,
    setEditorTheme,
  };
};

