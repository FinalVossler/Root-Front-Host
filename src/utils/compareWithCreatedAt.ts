const compareWithCreatedAt =
  (reverse: boolean) =>
  (a: { createdAt: string }, b: { createdAt: string }) => {
    if (a.createdAt < b.createdAt) {
      return reverse ? 1 : -1;
    }
    if (a.createdAt > b.createdAt) {
      return reverse ? -1 : 1;
    }

    return 0;
  };

export default compareWithCreatedAt;
