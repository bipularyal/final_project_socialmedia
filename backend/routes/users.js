const User = require("../schema/userSchema");
const router = require("express").Router();
const bcrypt = require("bcrypt");

var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
// updating the user
router.put("/:id",jsonParser, async (req, res) => {
    // user can update the info only if user is the admin and user is in their id
    // there is an error as in the quthentication is not quiet right we can update only with user id and we don't neeed to be logged in
    // started the project too late to figure out a way to fix that
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        // to update password, change the password same as register
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Acc data updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("UNSUCESSFIL! You can update  your account only!");
    }
  });


// deleting a user account
  router.delete("/:id",jsonParser, async (req, res) => {
    // user can update the info only if user is the admin and user is in their id
    console.log(req.params.id)
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Acc sucessfully deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("UNSUCESSFIL! You can delete your account only!");
    }
  });


//get a user 

router.get("/:id",jsonParser, async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
    try {
      const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    //   we well not send the aboce items when user info is requested
      const { password, updatedAt,isAdmin,email, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get skills

// router.get("/s/:userId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     const friends = await Promise.all(
//       user.skills.map((skill) => {
//         return User.findById(friendId);
//       })
//     );
//     let friendList = [];
//     fav_foods.map((friend) => {
//       const { _id, username, profilePicture } = friend;
//       friendList.push({ _id, username, profilePicture });
//     });
//     res.status(200).json(friendList)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


  module.exports=router; 