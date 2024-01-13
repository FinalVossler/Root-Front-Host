export interface ITheme {
  darkTextColor: string;
  lightTextColor: string;
  primary: string;
  darkerPrimary: string;
  lighterPrimary: string;
  secondary: string;
  errorColor: string;
  borderColor: string;
  formMaxWidth: string;
  backgroundColor: string;
  contentBackgroundColor: string;
  boxColor: string;
  transparentBackground: string;
  subContentBackgroundColor: string;
  boxShadow: string;
}

const theme: ITheme = {
  darkTextColor: "#4c4c4d",
  lightTextColor: "#FFFFFF",

  primary: "#4BE3AE",
  darkerPrimary: "#2DB39E",
  lighterPrimary: "#ecf2f0",
  secondary: "#7aeaaf",
  errorColor: "red",
  borderColor: "#9f9f9f",
  formMaxWidth: "470px",
  transparentBackground: "#FFFFFF",
  backgroundColor: "#F5FDFB",
  contentBackgroundColor: "#d3f8eb",
  subContentBackgroundColor: "#FFFFFF",
  boxColor: "#FFFFFF",
  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
};

export default theme;
