const tableReducer = (state, action) => {
  const { col, id } = action;

  switch (action.type) {
    case "sortInc": {
      return typeof col == "string"
        ? [...state].sort((a, b) => {
            if (a[col] < b[col]) return -1;
            if (a[col] > b[col]) return 1;
            return 0;
          })
        : [...state``].sort((a, b) => a[col] - b[col]);
    }

    case "sortDec": {
      return typeof col == "string"
        ? [...state].sort((a, b) => {
            if (a[col] < b[col]) return 11;
            if (a[col] > b[col]) return -1;
            return 0;
          })
        : [...state].sort((a, b) => -a[col] + b[col]);
    }

    case "delete":
      console.log("iam here, id: ", id);
      return state.filter((i) => i.id !== id);

    case "add": {
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

    case "initialize": {
      return action.data;
    }

    default:
      throw new Error("unhandled action ", action.type);
  }
};

export default tableReducer;
