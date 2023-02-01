export type Theme = {
  darkTextColor: string;
  lightTextColor: string;
  primary: string;
  secondary: string;
  errorColor: string;
  borderColor: string;
  formMaxWidth: string;
  backgroundColor: string;
  contentBackgroundColor: string;
  boxColor: string;
  transparentBackground: string;
  subContentBackgroundColor: string;
  shadowColor: string;
};

const theme: Theme = {
  darkTextColor: "#4c4c4d",
  lightTextColor: "white",

  primary: "#9885ec",
  secondary: "#27125e",
  errorColor: "red",
  borderColor: "#e0e0e0",
  formMaxWidth: "400px",
  transparentBackground: "#0a0b1399",
  backgroundColor: "#131222",
  contentBackgroundColor: "#0a0b13",
  subContentBackgroundColor: "#08041e",
  boxColor: "#3f3c51",
  shadowColor: "#00000024",
};

export default theme;
