export default (arr, label, value) => {
  arr.map(item => {
    item.label = item[label];
    item.value = item[value];
  });
  return arr;
};
