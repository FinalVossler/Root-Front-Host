const shortenString = (myString: string, length: number): string => {
  let shortenedString: string = myString.substring(0, length);

  if (shortenedString.length < myString.length)
    shortenedString = shortenedString.concat("...");

  return shortenedString;
};

export default shortenString;
