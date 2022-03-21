// Break Customers Array into smaller arrays for pagination

const paginationArr = (arr, size) => {
  return Array.from({ length: Math.ceil(arr?.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export default paginationArr;
