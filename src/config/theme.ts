export type Theme = {
  primary: string;
  secondary: string;
  textColor: string;
  subtleColor: string;
  errorColor: string;
  linkColor: string;
  borderColor: string;
  formMaxWidth: string;
  chatBackground: string;
  chatContentBackground: string;
  chatImportantText: string;
  chatContentBoxColor: string;
  chatButtonColor: string;
  chatInputBorderColor: string;
  chatContactsColor: string;
  chatSelectContactBoxColor: string;
  chatCurrentUserColor: string;
};

const theme: Theme = {
  primary: "#e68a91",
  secondary: "#c4656c",
  textColor: "#4c4c4d",
  subtleColor: "#b8b9b8",
  errorColor: "red",
  linkColor: "blue",
  borderColor: "#e0e0e0",
  formMaxWidth: "400px",

  chatBackground: "#131222",
  chatContentBackground: "#0a0b13",
  chatImportantText: "#3c01ce",
  chatContentBoxColor: "#3f3c51",
  chatButtonColor: "#9885ec",
  chatInputBorderColor: "#27125e",
  chatContactsColor: "#08041e",
  chatSelectContactBoxColor: "#9086ee",
  chatCurrentUserColor: "#080925",
};

export default theme;
