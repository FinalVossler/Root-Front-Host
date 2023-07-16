const isFileAnImage = (file: File): boolean => {
  return ["image/png", "image/gif", "image/jpeg"].indexOf(file.type) !== -1;
};

export default isFileAnImage;
