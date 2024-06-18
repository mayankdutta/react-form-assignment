const tableReducer = (state, action) => {
  switch (action.type) {
    case "delete": {
      return state.filter((i) => i.id !==  action.id);
    }

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
