export const getNewSeries = (lastDate, options) => {
  const { min, max } = options;
  const newDataPoint = {
    x: new Date().getTime(),
    y: Math.floor(Math.random() * (max - min + 1)) + min,
  };
  return newDataPoint;
};
