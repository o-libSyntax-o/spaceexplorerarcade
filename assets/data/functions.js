function loadData(data) {
    try {
      //Return value of storage string
      //If the user doesn't have save data it loads from template
      if (localStorage.getItem("saveGame") == undefined) {
        localStorage.setItem("saveGame", JSON.stringify(data));
        return localStorage.getItem("saveGame");
        //If game data is found it loads from localStorage
      } else {
        return localStorage.getItem("saveGame");
      }
      //Error Exception
    } catch (e) {
      return (
        "[ Space Tycoon ] Encountered an error while loading data: " + e.message
      );
    }
  }
  
  //Func for saving new data to localStorage periodically...
  let saveData = async function (data) {
    try {
      //Gets all data from game object and saves it
      localStorage.setItem("saveGame", JSON.stringify(data.getAll()));
      return "[ Space Tycoon ] A save was instantiated";
      //Error Exception
    } catch (e) {
      return (
        "[ Space Tycoon ] Encountered an error while saving data: " + e.message
      );
    }
  };