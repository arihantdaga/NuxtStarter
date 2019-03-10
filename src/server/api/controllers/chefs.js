const { ServerError } = require('express-server-error')
const mongoose = require("mongoose");
const Chef = mongoose.model("Chef");


module.exports = exports

exports.index = {
  async get (req, res, next) {
    try {
      let chefs = await Chef.find({})
      res.json(chefs)
    } catch (error) {
      return next(error)
    }
  },
  async post (req,res,next) {
          try{
                let obj = {
                        email: req.body.email,
                        name: req.body.name,
                        passowrd: req.body.passowrd
                }
                let chef = new Chef(obj);
                chef = await chef.save();
                return res.json({chef});
          }catch(err){

          }
  }
}

