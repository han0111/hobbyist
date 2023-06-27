const ADD_COMMENT = "ADD_COMMENT";

export const addComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload: payload,
  };
};

const initialState = [];

const comments = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default comments;
