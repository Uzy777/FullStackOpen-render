import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
    const [serverPersons, setServerPersons] = useState([]);
    const [persons, setPersons] = useState([]);
    // const [persons, setPersons] = useState([
    //     { name: "Arto Hellas", number: "040-123456", id: 1 },
    //     { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    //     { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    //     { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    // ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newSearch, setNewSearch] = useState("");
    const [allPersons, setAllPersons] = useState([...persons]);
    const [updateMessage, setUpdateMessage] = useState("");
    const [messageType, setMessageType] = useState("success"); // 'success' or 'error'

    useEffect(() => {
        personService.getAll().then((response) => {
            console.log("sucessful - backend");
            setPersons(response.data);
            setAllPersons(response.data);
            // setServerPersons(response.data);
        });

        // console.log("testing");
        // axios.get("http://localhost:3001/persons").then((response) => {
        //   console.log("successful");
        //   setServerPersons(response.data);
        // });
    }, []);
    console.log("render", serverPersons, "persons");

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };

    const addName = (event) => {
        event.preventDefault();
        console.log(event.target);

        const nameExists = persons.some((person) => person.name === newName);

        if (nameExists) {
            alert(`${newName} is already added to the phonebook`);
            setNewName("");
            return;
        }

        const nameObject = {
            name: newName,
            number: newNumber,
        };

        // setPersons(persons.concat(nameObject));
        // setAllPersons(allPersons.concat(nameObject));
        setNewName("");
        setNewNumber("");

        axios.post("http://localhost:3001/persons", nameObject).then((response) => {
            setPersons(persons.concat(response.data));
            setAllPersons(allPersons.concat(response.data));
            console.log(response);

            setMessageType("success");
            setUpdateMessage(`Added ${response.data.name}`);

            // Clear message after 5 seconds
            setTimeout(() => {
                setUpdateMessage("");
            }, 5000);
        });
    };

    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    };

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setNewSearch(searchValue);

        const filtered = allPersons.filter((person) => person.name.toLowerCase().includes(searchValue.toLowerCase()));
        setPersons(filtered);

        if (searchValue === "") {
            setPersons(allPersons);
        }
    };

    const deleteEntry = (id) => {
        console.log(id);
        axios.delete(`http://localhost:3001/persons/${id}`, id).then((response) => {
            console.log(`deleted ${id}`);
            console.log(response);

            setPersons(persons.filter((person) => person.id !== id)); // refresh
        });
    };

    const updateNumber = (id, updatedPerson) => {
        console.log(id);
        axios
            .put(`http://localhost:3001/persons/${id}`, updatedPerson)
            .then((response) => {
                console.log(`updated number for ${id}`);
                console.log(response);

                setPersons(persons.map((p) => (p.id !== id ? p : response.data)));

                setMessageType("success");
                setUpdateMessage(`Updated number for ${response.data.name}`);

                // Clear message after 5 seconds
                setTimeout(() => {
                    setUpdateMessage("");
                }, 5000);
            })
            .catch((error) => {
                const person = persons.find((p) => p.id === id);
                setMessageType("error");
                setUpdateMessage(`Information of ${person?.name || "this person"} has already been removed from server`);

                setTimeout(() => {
                    setUpdateMessage("");
                }, 5000);
            });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={updateMessage} type={messageType} />
            <Filter value={newSearch} onChange={handleSearchChange} />
            <h2>Add a new record</h2>
            <PersonForm
                onSubmit={addName}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
                onUpdate={updateNumber}
                persons={persons}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} onDelete={deleteEntry} />
        </div>
    );
};

export default App;
