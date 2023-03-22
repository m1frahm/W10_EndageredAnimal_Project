import { useState } from "react";

const Form = (props) => {

  const {initialAnimal = {id: null, 
                          firstname: "", 
                        lastname: ""}} = props;


  // This is the oroginal State with not initial student 
  const [animal, setAnimal] = useState(initialAnimal);

  //create functions that handle the event of the user typing into the form
  const handleNameChange = (event) => {
    const firstname = event.target.value;
    setAnimal((animal) => ({ ...animal, firstname }));
  };

  const handleLastnameChange = (event) => {
    const lastname = event.target.value;
    setAnimal((animal) => ({ ...animal, lastname }));
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
    const updateAnimal = (existingAnimal) =>{
      return fetch(`http://localhost:8080/api/animals/${existingAnimal.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(existingAnimal)
        }).then((response) => {
            return response.json()
        }).then((data) => {
          console.log("From put request ", data);
          props.saveAnimal(data);
      });

  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(animal.id){
      updateAnimal(animal);
    } else{
      postAnimal(animal);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>First Name</label>
        <input
          type="text"
          id="add-user-name"
          placeholder="First Name"
          required
          value={animal.firstname}
          onChange={handleNameChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          id="add-user-lastname"
          placeholder="Last Name"
          required
          value={animal.lastname}
          onChange={handleLastnameChange}
        />
      </fieldset>
      <button type="submit">{!animal.id ? "ADD": "SAVE"}</button>
    </form>
  );
};

export default Form;
