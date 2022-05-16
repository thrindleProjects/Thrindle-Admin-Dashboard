const getMarketName = (storeId) => {
  if (storeId?.startsWith("CV")) return "Computer Village";
  if (storeId?.startsWith("BM")) return "Eko Market";
  if (storeId?.startsWith("EM")) return "Eko Market";
  if (storeId.startsWith("TM")) return "Thrindle Mall";
  return "Other Market";
};

export default getMarketName;
