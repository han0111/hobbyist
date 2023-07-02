const initialState = "";

const ADD_CATEGORY = "ADD_CATEGORY";

export const addCategory = (payload) => ({
  type: ADD_CATEGORY,
  payload,
});

const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return action.payload;

    default:
      return state;
  }
};

export default subcategoryReducer;
