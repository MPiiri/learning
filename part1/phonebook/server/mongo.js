import mongoose from 'mongoose';

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
if (!password) {
    console.log("❌ Please provide a password: node mongo.js <password> [name] [number]");
    process.exit(1);
}

const url = `mongodb+srv://mats:${password}@qa.l0mge.mongodb.net/phonebook?retryWrites=true&w=majority&appName=QA`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const User = mongoose.model("User", userSchema);

if (name && number) {
    const person = new User({ name, number });

    person.save().then(() => {
        console.log(`✅ Added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    User.find({}).then(result => {
        console.log("📖 Phonebook:");
        result.forEach(user => console.log(`${user.name} ${user.number}`));
        mongoose.connection.close();
    });
}
