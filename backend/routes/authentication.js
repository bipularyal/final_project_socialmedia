const router = require("express").Router();
const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
//REGISTER a new user
router.post("/register", jsonParser,async (req, res) => {
console.log(req.body)
  try {
    //generate new password
    // we use salts which are  (new random bytes) 
    // to passwords before encrypting each password so that hash attachs can be prevented and unique passwords are created even if 2 users have same passwords
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //registering a new user
    const newUser = new User({
      username: req.body.email,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond according to success info
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});


//LOGIN previous user
router.post("/login", jsonParser,async (req, res) => {
  try {
    // check if username exists
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        console.log("invalid user")
        res.status(404).json("user not found");
    }
    else{
        // if yes validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            console.log("invalid pass")
            res.status(400).json("wrong password");
        }
        else{
            res.status(200).json(user)
        }
    }

  } catch (err) {
    res.status(500).json(err)
  }
});

 
module.exports = router;