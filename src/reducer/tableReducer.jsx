const tableReducer = (state, action) => {
  switch (action.type) {
    case "DELETE": {
      return state.filter((i) => i.id !== action.id);
    }

    case "ADD": {
      return [
        ...state,
        {
          id: state.length ? state[state.length - 1].id + 1 : 1,
          title: action.title,
          price: action.price,
          category: action.category,
        },
      ];
    }

    case "INITIALIZE": {
      console.log("initializing data");
      return action.data;
    }

    case "EXTRA_ROW": {
      console.log("adding extra row");
      const newData = [...state, ...extraData(state.length, action.extraRows)];
      console.log(newData);
      return [...state, ...extraData(state.length, action.extraRows)];
    }

    default:
      throw new Error("unhandled action ", action.type);
  }
};

export const REDUCER_TYPE = {
  ADD: "ADD",
  DELETE: "DELETE",
  INITIALIZE: "INITIALIZE",
  EXTRA_ROW: "EXTRA_ROW",
};

function extraData(currLength, N) {
  let arr = [];
  let categoryArr = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];
  for (let i = currLength; i <= currLength + N; i++) {
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
export default tableReducer;
