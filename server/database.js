const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI);
mongoose.connection.on("error", () => console.log("DB is not connected"));
mongoose.connection.on("connected", () =>  console.log("DB is connected"));