const extractLinksFromText = (text: string): string[] => {
  let expression =
    /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
  let matches = text.match(expression);

  return matches as string[];
};

export default extractLinksFromText;
