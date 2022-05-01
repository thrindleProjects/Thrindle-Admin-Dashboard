const getMarketName = (storeId) => {
  if (storeId?.startsWith("CV")) return "Computer Village";
  if (storeId?.startsWith("BM")) return "Eko Market";
  if (storeId?.startsWith("EM")) return "Eko Market";
  return "Other Market";
};

export default getMarketName;
