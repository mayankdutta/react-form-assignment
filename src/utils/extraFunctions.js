export const DISABLED_COLUMNS = ["rating", "image", "description"];

export const limitNames = (name) => {
  if (typeof name !== "string") {
    return name;
  }
  return name.length < 20 ? name : name.substring(0, 40) + "...";
};

export function extraData(currLength, N) {
  let arr = [];
  let categoryArr = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];
  for (let i = currLength + 1; i <= currLength + N; i++) {
    // console.log('categories : ', categoryArr[parseInt(Math.random() * 4)])
    arr.push({
      id: i,
      title: `Random Title ${i}`,
      price: (Math.random() * 1000).toFixed(2),
      category: categoryArr[parseInt(Math.random() * 4)],
    });
  }

  return arr;
}
