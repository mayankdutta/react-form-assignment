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
      return action.data;
    }

    case "EXTRA_ROW": {
      // const newData = [...state, ...extraData(state.length, action.extraRows)];
      // console.log(newData);

      return [...state, ...action.extraRows];
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

export default tableReducer;
