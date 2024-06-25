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


export function getCurrentTime() {
  const now = new Date();
  
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Pad single-digit hours, minutes, and seconds with a leading zero
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}