export type Theme = {
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
};

const theme: Theme = {
  darkTextColor: "#4c4c4d",
  lightTextColor: "white",

  primary: "#9885ec",
  darkerPrimary: "#795ef0",
  lighterPrimary: "#b0a2f1",
  secondary: "#27125e",
  errorColor: "red",
  borderColor: "#e0e0e0",
  formMaxWidth: "400px",
  transparentBackground: "#0a0b1399",
  backgroundColor: "#131222",
  contentBackgroundColor: "#0a0b13",
  subContentBackgroundColor: "#08041e",
  boxColor: "#3f3c51",
  boxShadow: "1px 2px 5px 4px black",
};

export default theme;
