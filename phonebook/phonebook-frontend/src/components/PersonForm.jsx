const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  onUpdate,
  persons,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button
          onClick={(e) => {
            const existingPerson = persons.find((p) => p.name === newName);

            if (existingPerson) {
              e.preventDefault();
              const confirmUpdate = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
              );

              if (confirmUpdate) {
                const updatedPerson = { ...existingPerson, number: newNumber };
                onUpdate(existingPerson.id, updatedPerson);
              }
            }
          }}
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
