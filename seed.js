const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User"); // adjust path if needed

dotenv.config();

const users = [
    { name: "Rahul", points: 0 },
    { name: "Kamal", points: 0 },
    { name: "Sanak", points: 0 },
    { name: "Arti", points: 0 },
    { name: "Sneha", points: 0 },
    { name: "Rohan", points: 0 },
    { name: "Meena", points: 0 },
    { name: "Manoj", points: 0 },
    { name: "Sonal", points: 0 },
    { name: "Ajay", points: 0 }
];

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        await User.deleteMany();
        await User.insertMany(users);
        console.log("Users seeded successfully!");
        mongoose.disconnect();
    })
    .catch((err) => console.log(err));
