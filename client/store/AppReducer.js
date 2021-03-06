
export default (state, action) => {
  // state = previous state
  switch (action.type) {
  case 'addFolder': {
    const newFolder = {id: action.payload.ID, title: action.payload.userInput, steps: []};
    return [newFolder, ...state];
  }
  case 'addStep': {
    const ID = action.payload.ID;
    const match = state.find((folder) => folder.id === ID);
    const rest = state.filter((folder) => folder.id !== ID);
    const step = match.steps.length === 0 ? 1 : match.steps[0].step+1;
    const newItem = {step, description: action.payload.userInput, imageUrl: action.payload.url};
    match.steps.unshift(newItem);
    return [...rest, match];
  }
  }
};
