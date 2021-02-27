const Users = require("./users-model.js")
const router = require("express").Router()

//middelwares

router.get("/", (req, res) => {
  Users.find(req.query)
    //when adding req.query here, you're asking what is in the query?
    //when adding middleware, this should check what is in the 
    .then(users => {
    res.json(users)
    })
    .catch(err => {
      res.send(err)
  })
})

module.exports = router;