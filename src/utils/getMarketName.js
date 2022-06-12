const getMarketName = (storeId) => {
  if (storeId?.startsWith("CV")) return "CV";
  if (storeId?.startsWith("BM")) return "EM";
  if (storeId?.startsWith("EM")) return "EM";
  if (storeId?.startsWith("TM")) return "TM";
  return "Other Market";
};

export default getMarketName;
