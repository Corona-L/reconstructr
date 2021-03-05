
export default (state, action) => {
  // state = previous state
  switch (action.type) {
  case 'addFolder':
    // eslint-disable-next-line no-case-declarations
    const newFolder = {id: action.payload.ID, title: action.payload.userInput, steps: []};
    return [
      newFolder,
      ...state
    ];
  case 'addStep':
    // action.payload.text...
    return state;
  }
};


// const addFolderFunc = () => {
//   // I use state here which gets updated when user types in input field
// goes into component
//   if (!inputValue.length) return Alert.alert('Please enter a project name');

//   const ID = (+folders[0].id+1).toString();
//   const newFolder = {id: ID, title: inputValue, steps: []};

//   // how would this work with a reducer?
//   setFolders(folders => [newFolder, ...folders]);
//   setInputValue('');
//   toggleModalVisibility();
// };

// const addNewStepFunc = ((text, url, ID) => {
//   let copyFolders = [...folders];
//   const match = copyFolders.filter((folder) => folder.id === ID);
//   const STEP = match.steps.length === 0 ? 1 : match.steps[0].step+1;
//   const updatedMatch = {...match, step: STEP, description: text, imageUrl: url};
//   // toggleModalVisibility();
//   setFolders(...copyFolders, updatedMatch);
// });