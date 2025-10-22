const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const inputtedName = process.argv[3];
const inputtedNumber = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.di8eqb3.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: inputtedName,
    number: inputtedNumber,
});

if (process.argv.length < 4) {
    console.log("Phonebook:");
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(person.name, person.number);
        });
        mongoose.connection.close();
    });
} else {
    person.save().then((result) => {
        console.log(`Added ${person.name}. Number: ${person.number} to phonebook!`);
        mongoose.connection.close();
    });
}

// Note.find({ important: true }).then((result) => {
//     result.forEach((note) => {
//         console.log(note);
//     });
//     mongoose.connection.close();
// });
