const extractContentFromHtml = (htmlText: string): string => {
  const span = document.createElement("span");
  span.innerHTML = htmlText;
  const content: string = span.textContent || span.innerText;

  span.remove();

  return content;
};

export default extractContentFromHtml;
