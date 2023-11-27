require("dotenv").config()
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const authentication = require('./middleware/auth')
const database = require("./database");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits : { fileSize : 50 * 1024 * 1024 },
    useTempFiles : true,
    tempFileDir : "/tmp/"
}))

/**
* @AUTH_ROUTE
*/
app.use("/api", require('./routes/auth/authRoutes'))

// If route not found
app.use(async (req, res, next)=>{
    next(createError.NotFound("Page not found"))
})

// Error message
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error : {
            status : err.status || 500,
            message : err.message
        }
    })
})

const server = app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})