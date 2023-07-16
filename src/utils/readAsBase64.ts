const readAsBase64 = (file: File): Promise<string> => {
  const promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  });

  return promise;
};

export default readAsBase64;
