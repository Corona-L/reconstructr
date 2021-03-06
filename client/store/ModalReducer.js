export default (state, action) => {
  // state = previous state
  switch (action.type) {
  case 'toggleModal': {
    return !state;
  }
  }
};