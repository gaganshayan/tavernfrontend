import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  // URL VARIABLE
  const url = "localhost:3000"
  // STATE TO HOLD DOGS
  const [person, setPerson] = React.useState([])
  // EMPTY FOR THE FORM
  const emptyPerson = {
    name: "",
    movie: "",
    img: ""
  }
  // SelectDog for user to select a dog to update
  const [selectedPerson, setSelectedPerson] = React.useState(emptyPerson)
  // FUNCTION TO FETCH PERSONS
  const getPersons = () => {
    fetch(url + "/person/")
    .then(response => response.json())
    .then(data => {
      setPersons(data)
    })
  }
  // GET PERSONS ON PAGE LOAD
  React.useEffect(() => {
    getPersons()
  }, [])
  // handleCreate Function for creating persons
  const handleCreate = (newPerson) => {
    fetch(url+"/Person/", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newPerson)
    })
    .then(response => getPersons())
  }

  // handleUpdate to update a dog when form is clicked
  const handleUpdate = (Person) => {
    fetch(url + "/Person/" + person._id, {
      method: "put",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(person)
    })
    .then(response => getPersons())
  }

  // selectDog which selects a person
  const selectPerson = (person) => {
    setSelectedPersons(person)
  }

  // deleteDog function to delete a person
  const deletePerson = (person) => {
    fetch(url + "/person/" + person._id, {
      method: "delete"
    })
    .then(response => getPerson())
  }

  return (
    <div className="App">
      <h1>Welcome to the Tavern</h1>
      <h2>STAR WARS EDITION</h2>
      <hr />
      <Link to="/create">
        <button>Add Person</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} person={person} selectPerson={selectPerson} deletePerson={deletePerson} />}  />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" person={emptyPerson} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" person={selectedPerson} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
