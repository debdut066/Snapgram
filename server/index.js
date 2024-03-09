require("dotenv").config()
require("./database");
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const authentication = require('./middleware/auth')
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 8000;
const { redisConnect } = require('./redisConnect');
const { subscriber }= require("./services/redis-Pub-Sub")
const SocketService = require("./services/socket")
const socketService = new SocketService()

const app = express();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits : { fileSize : 50 * 1024 * 1024 },
    useTempFiles : true,
    tempFileDir : "/tmp/"
}))

// redisConnect();
subscriber();

/**
* @AUTH_ROUTE
*/
app.use("/api", require('./routes/auth/authRoutes'))

/**
* @USER_ROUTE
*/
app.use("/api/user",authentication, require('./routes/user/userRoute'))

/**
* @POST_ROUTE
*/
app.use("/api/post", authentication, require('./routes/post/postRoute'))

/**
* @Comment_ROUTE
*/
app.use("/api/comment", authentication, require('./routes/comment/commentRoute'))

// If route not found
app.use(async (req, res, next)=>{
    next(createError.NotFound("Page not found"))
})

// Error message
app.use((err, req, res) => {
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

socketService._io.attach(server);

socketService.initListeners()
