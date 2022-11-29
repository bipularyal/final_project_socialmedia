const express = require("express");
const app = express();
const cors = require("cors")

// database
const mongoose = require("mongoose");
// just makes our life a lot easier ... no need to do much things
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const users_route = require('./routes/users.js')
const auth_route = require('./routes/authentication.js')
const post_route = require('./routes/post.js')

var bodyParser = require('body-parser')
const multer = require('multer')
const path = require("path")
// configuring dotenv for envrionment variables
dotenv.config();

// connecting to db
 

// middleware
app.use(cors())
app.use(express());
app.use(express.json())
app.use(helmet());
app.use(morgan('common'));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

// when we go to this page ... usersroute is run
app.use('/api/user/',users_route)
app.use('/api/auth/',auth_route)
app.use('/api/posts',post_route)

app.post("/api/upload",upload.single("file"),(req,res)=>{
  try{
    return res.status(200).json("file uploaded sucessfully")
  }
  catch(err){
    console.log(err)
  }
})
app.get('/',(req,res)=>{
    res.send('welcome to homepage')
})


let dbUrl="mongodb+srv://1234:1234@cluster0.v14qbxi.mongodb.net/?retryWrites=true&w=majority"
mongoose
  .connect(dbUrl)
  .then(() => app.listen(3001, () => console.log("Listening to Port 3001...")))
  .catch((err) => console.log(err));


// if we use /files as path name ... go to public/images instead of making a get request
app.use("/public/files",express.static(path.join(__dirname,"public/files")))
