export const dateParser = (timestamp: any, localtime = 0): string => {
  const parser = new Date(Date.parse(timestamp));
  const day = parser.getDate() === 0 ? 1 : parser.getDate();
  const month = parser.getMonth() === 0 ? 1 : parser.getMonth();
  return `${day < 10 ? "0" : ""}${day}.${month < 9 ? "0" : ""}${
    localtime === 1 ? month + 1 : month
  }.${parser.getFullYear()}`;
};
