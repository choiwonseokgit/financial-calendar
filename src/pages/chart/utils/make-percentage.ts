const makePercentage = (value: number, total: number) => {
  return `${((value / total) * 100).toFixed(1)}%`;
};

export default makePercentage;
