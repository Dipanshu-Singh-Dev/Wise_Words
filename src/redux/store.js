const { legacy_createStore: createStore } = require("redux");
const def = {
  role: "admin",
  user: "admin",
};
const reducer = (state = def, action) => {
  if (action)
    return {
      ...state,
      role: action.role,
      user: action.user,
    };
  else return { ...state };
};
const store = createStore(reducer, def);

export default store;
