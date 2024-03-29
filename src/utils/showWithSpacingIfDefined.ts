const showWithSpacingIfDefined = (toShow: string | undefined): string => {
  return toShow ? " " + toShow : "";
};

export default showWithSpacingIfDefined;
