const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person, index) => (
        <p key={index}>
          {person.name} : {person.number}
          <button
            onClick={() => {
              if (window.confirm(`Delete ${person.name} ?`)) {
                onDelete(person.id);
              } else {
                console.log("nowork");
              }
            }}
            type="delete"
          >
            Delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
