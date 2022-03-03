import numbro from "numbro";

export const numberFormat = (val = 0) => {
  return numbro(Number(val)).format({ thousandSeparated: true, mantissa: 2 });
};
