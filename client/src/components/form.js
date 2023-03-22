import { useState } from "react";

const Form = (props) => {
  const { initialAnimal = { id: null, nickname: "", r_c_timestamp: "" } } =
    props;

     // This is the oroginal State with not initial student 
  const [animal, setAnimal] = useState(initialAnimal);

    // This is the oroginal State with not initial student
  const [species, setSpecies] = useState(initialSpecies);

  //Step1 modify setAniamls to be setSpecies
  useEffect(() => {
    fetch("http://localhost:8080/api/species") //changing url
      .then((response) => response.json())
      .then((speciesdata) => {
        setSpecies(speciesdata);
        console.log("Species fetched...", speciesdata); //console.log just for checking
      });
  }, []);

  
  //create functions that handle the event of the user typing into the form
  const handleNickNameChange = (event) => {
    const nickname = event.target.value;
    setAnimal((animal) => ({ ...animal, nickname }));
  };

  const handleRCTimestampChange = (event) => {
    const r_c_timestamp = event.target.value;
    setAnimal((animal) => ({ ...animal, r_c_timestamp }));
  };

  //A function to handle the post request
  const postAnimal = (newAnimal) => {
    return fetch("http://localhost:8080/api/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnimal),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        props.saveAnimal(data);
      });
  };

  //A function to handle the Update request
  const updateAnimal = (existingAnimal) => {
    return fetch(`http://localhost:8080/api/animals/${existingAnimal.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(existingAnimal),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From put request ", data);
        props.saveAnimal(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (animal.id) {
      updateAnimal(animal);
    } else {
      postAnimal(animal);
    }
  };


  //S3 have a drop down in here for species 

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>Animal Nickname</label>
        <input
          type="text"
          id="add-animal-nickname"
          placeholder="Animal Nickname"
          required
          value={animal.nickname}
          onChange={handleNickNameChange}
        />
        <label>R_C_Timestamp</label>
        <input
          type="date"
          id="add-record-timestamp"
          placeholder="Timestamp"
          required
          value={animal.r_c_timestamp}
          onChange={handleRCTimestampChange}
        />
      </fieldset>
      <button type="submit">{!animal.id ? "ADD" : "SAVE"}</button>
    </form>
  );
};

export default Form;
