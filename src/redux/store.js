const { legacy_createStore: createStore } = require("redux");
const reducer = (
  action,
  state = {
    role: "",
  }
) => {
  if (action) return { ...state, role: action.payload };
  else return { ...state };
};
const store = createStore(reducer);

export default store;
