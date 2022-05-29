export const getMarketName = (storeId) => {
  if (storeId.trim().startsWith("CV")) return "Computer Village";
  if (storeId.trim().startsWith("BM")) return "Eko Market";
  if (storeId.trim().startsWith("EM")) return "Eko Market";
  if (storeId.startsWith("TM")) return "Thrindle Mall";
  return "Other Market";
};

export const getMarketID = (marketValue) => {
  if (marketValue !== "") {
    let marketData = JSON.parse(localStorage.getItem("marketData"));
    let findMarket = marketData.find((item) => item.name === marketValue);
    return findMarket.id;
  }
  return false;
};

export const getSubCategories = (categoryValue) => {
  let marketData = JSON.parse(localStorage.getItem("marketCategories"));
  let findMarket = marketData.find((item) => item.name === categoryValue);
  let subcategory = findMarket?.subcategories;
  return subcategory;
};

export const getWeightClass = (categoryValue) => {
  let marketData = JSON.parse(localStorage.getItem("marketCategories"));
  let findMarket = marketData.find((item) => item.name === categoryValue);
  let weightList = findMarket?.weight.map((item) => item.name); // maps real-time weight class
  return weightList; // renders real-time weight class
};

export const getUploadDate = (updatedAt) => {
  const date = new Date(updatedAt);
  let newDay = date.getDate();
  let newMonth = date.getMonth() + 1;
  let newYear = date.getFullYear();
  return `${newDay}/${newMonth}/${newYear}`;
};

export const getCategoryId = (category) => {
  let marketData = JSON.parse(localStorage.getItem("marketCategories"));
  let findMarket = marketData.find((item) => item.name === category);
  return findMarket._id;
};

export const getSubCategoryId = (subCategoryValue, categoryHandler) => {
  let findMarket = categoryHandler.subcategory.find(
    (item) => item.name === subCategoryValue
  );
  return findMarket._id;
};