
export default (state, action) => {
  // state = previous state
  switch (action.type) {
  case 'addFolder': {
    const newFolder = {id: action.payload.ID, title: action.payload.userInput, steps: []};
    return [newFolder, ...state];
  }
  case 'addStep': {

    return console.log(action.payload.userInput);
  }
  // case 'toggleModal': {
  //   return {on: !state.on};
  // }
  }
};


// const addNewStepFunc = ((text, url, ID) => {
//   let copyFolders = [...folders];
//   const match = copyFolders.filter((folder) => folder.id === ID);
//   const STEP = match.steps.length === 0 ? 1 : match.steps[0].step+1;
//   const updatedMatch = {...match, step: STEP, description: text, imageUrl: url};
//   // toggleModalVisibility();
//   setFolders(...copyFolders, updatedMatch);
// });

// working addnewStep for state only within projectfolder
// const addNewStep = (textInput, url) => {

//   const STEP = steps.length === 0 ? 1 : steps[0].step+1;
//   const newStep = {step: STEP, description: textInput, imageUrl: url};
//   // const newStep = {id: randomId, description: textInput, imageUrl: url};
//   setSteps(steps => [newStep, ...steps]);
//   toggleModalVisibility();
// };