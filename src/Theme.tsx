import { createContext, useState, useMemo } from "react";
import { createTheme, Theme } from "@mui/material/styles";

export const tokens = (mode: "light" | "dark") => ({
  ...(mode === "dark"
    ? {
        background: {
          100: "#1d2021",
        },

        secondary: {
          100: "#ffffff",
        },

        color: {
          100: "#2b2f30",
        },

        green: {
          100: "#2a7d2a",
        },
        red: {
          100: "#c73131",
        },

        btn: {
          100: "#4db5da",
        },
      }
    : {
        background: {
          100: "#fcfcfc",
        },
        secondary: {
          100: "#000000",
        },
        color: {
          100: "#ffff",
        },
        green: {
          100: " #09bd09",
        },
        red: {
          100: "#eb2b2b",
        },
        btn: {
          100: "#0a66c2",
        },
      }),
});

export const themeSettings = (mode: "light" | "dark") => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      primary: {
        main: mode === "light" ? "#1d2021" : "#f9f9f9",
      },
      secondary: {
        main: colors.secondary[100],
      },
      neutral: {
        dark: colors.secondary[100],
        main: colors.secondary[100],
        light: colors.secondary[100],
      },
      background: {
        default: mode === "dark" ? "#1d2021" : "#ffff",
      },
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext<{
  toggleColorMode: () => void;
}>({ toggleColorMode: () => {} });

export const useMode = (): [Theme, { toggleColorMode: () => void }] => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
