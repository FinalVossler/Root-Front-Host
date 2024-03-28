function formatCentsToDollars(cents: number | string): string {
  let toConvert: number | string = cents;
  if (typeof cents === "string") {
    toConvert = parseInt(cents);
  }
  const dollars = Math.floor((toConvert as number) / 100);
  const remainingCents = (toConvert as number) % 100;
  return `${dollars}.${remainingCents.toString().padStart(2, "0")}`;
}

export default formatCentsToDollars;
