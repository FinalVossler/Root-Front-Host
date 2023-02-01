const compareWithCreatedAt = (
  a: { createdAt: string },
  b: { createdAt: string }
) => {
  if (a.createdAt < b.createdAt) {
    return -1;
  }
  if (a.createdAt > b.createdAt) {
    return 1;
  }

  return 0;
};

export default compareWithCreatedAt;
