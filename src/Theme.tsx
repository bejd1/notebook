import { createContext, useState, useMemo } from "react";
import { createTheme, Theme } from "@mui/material/styles";

export const tokens = (mode: "light" | "dark") => ({
  ...(mode === "dark"
    ? {
        background: {
          100: "#000000",
        },
        secondary: {
          100: "#FFFFFF",
        },
        secondBackground: {
          100: "#2b2f30",
        },
        green: {
          100: "#21ad21",
        },
        red: {
          100: "#ED4956",
        },
        btn: {
          100: "#4169e1",
        },
      }
    : {
        background: {
          100: "#FFFFFF",
        },
        secondary: {
          100: "#000000",
        },
        secondBackground: {
          100: "#ffff",
        },
        green: {
          100: "#21ad21",
        },
        red: {
          100: "#ED4956",
        },
        btn: {
          100: "#4169e1",
        },
      }),
});
export const themeSettings = (mode: "light" | "dark") => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      primary: {
        main: mode === "light" ? "#000" : "#fff",
      },
      secondary: {
        main: colors.secondary[100],
        ...(mode === "light" && {
          input: "red",
        }),
      },
      background: {
        default: mode === "dark" ? "#1D2124" : "#FFFFFF",
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
