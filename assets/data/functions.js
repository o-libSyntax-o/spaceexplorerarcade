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

let descriptions = [
  `
    Sputnik 1 :

	    First artificial satellite to be successfully placed in 
      orbit around the earth.

    Vostok 1 :

	    The first manned mission into space, manned by Yuri Gagarin.

    International Space Station :

	    Launched on November 20, 1998, 
      the International Space Station houses 
      a number of astronauts that conduct 
      experiments according to the space 
      programs specifications,  just in the orbit of Earth.
    `,
  `
    Apollo 11 : 

			First men on the moon, manned by Neil Armstrong, 
      Buzz Aldrin, 
      and Micahel Collins. The Rocket Saturn V was launched 
      from  Cape Kennedy on July 16, 1969, 
      containing the lunar module (Eagle).

    Artemis : 

			A proposed mission by NASA that tests 
      to push the boundaries of space exploration
      by discovering unexplored regions of the Moon, 
      and build a long term presence on 
      the surface of the Moon.
    `,
  `
    Mariner 4 : 

			The Mariner 4, the first 
      successful flyby of 
      Mars in order to return closeups of Mars back to the Earth.

    Mariner 9 :

			The Mariner 9 was a monumental mission in Mars exploration, 
      following a brief delay due to surface storms, the Mariner 9 
      returned a full surface mapping of mars 
      along with a total of 54 billion bits of scientific data.

    Spirit and Opportunity :

		The rover twins, Spirit and Opportunity, 
    were launched twenty-one days apart in January of 2004.
    These rovers succeeded in finding 
    evidence that Mars was once “wetter”,
    along with supporting information that Mars could 
    have supported microbial life if it had ever existed.

    `,
];
