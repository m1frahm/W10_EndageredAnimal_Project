import { useState, useEffect } from "react";
import Form from "./form";

function Animals() {
  // this is my original state with an array of students
  const [animals, setAnimals] = useState([]);

  // New State to contro the existing student Id that the user wants to edit
  const [editAnimalId, setEditAnimalId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/animals")
      .then((response) => response.json())
      .then((animalsdata) => {
        setAnimals(animalsdata);
        console.log("Animals fetched...", animalsdata); //try not to console.log after the state you are setting, you might get null
      });
  }, []);

  const addAnimal = (newAnimal) => {
    //console.log(newAnimal);
    //postStudent(newAnimal);
    setAnimals((animals) => [...animals, newAnimal]);
  };

  //A function to control the update in the parent (student component)

  const updateAnimal = (savedAnimal) => {
    console.log("Line 29 savedAnimal", savedAnimal);
    // This function should update the whole list of students -
    setAnimals((animals) => {
      const newArrayAnimals = [];
      for (let animal of animals) {
        if (animal.id === savedAnimal.id) {
          newArrayAnimals.push(savedAnimal);
        } else {
          newArrayAnimals.push(animal);
        }
      }
      return newArrayAnimals;
    });
    // This line is only to close the form;
    setEditAnimalId(null);
  };

  const onEdit = (animal) => {
    animal.preventDefault(); //
    const editingID = animal.id;
    setEditAnimalId(editingID);
    //trying adding a prevent default 
  };

  //original return
  //   return (
  //     <div className="animals">
  //       <h2> List of Animals </h2>
  //       <br></br>
  //         {animals.map((animal) => {
  //           if(animal.id === editAnimalId){
  //             //something needs to happento allow the user edit that existing student
  //             // At some point I need to pass the update function as props - connect this to the backend
  //             return <Form initialAnimal={animal} saveAnimal={updateAnimal}/>
  //           } else{
  //             return (
  //               <table key={animal.id}>
  //           {animal.name} {animal.livingage} {animal.nickname} {animal.location} {animal.sighting_date}  <button key={animal.r_c_timestamp} type="button" onClick={() =>{onEdit(animal)}}>EDIT</button>
  //         </table>
  //             )
  //           }
  //         })}

  //       <Form saveAnimal={addAnimal} />
  //     </div>
  //   );
  // }

  return (
    <div className="animals">
      <h2> List of Animals </h2>
      <br></br>
      <div>
        <table>
          <thead>
            <tr>
              <td>Edit</td>
              <td>Name</td>
              <td>Age</td>
              <td>Nickname</td>
              <td>Location</td>
              <td>Sighting Date</td>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => {
              return (
                <tr key={animal.id}>
                  <td>
                    {" "}
                    <button
                      key={animal.r_c_timestamp}
                      type="button"
                      onClick={() => {
                        onEdit(animal);
                      }}
                    >
                      EDIT
                    </button>
                  </td>
                  <td>{animal.name}</td>
                  <td>{animal.livingage} </td>
                  <td> {animal.nickname} </td>
                  <td>{animal.location} </td>
                  <td>{animal.sighting_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Form saveAnimal={addAnimal} />
    </div>
  );
}

export default Animals;
