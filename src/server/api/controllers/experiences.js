const { ServerError } = require('express-server-error')
const mongoose = require("mongoose");
const Exp = mongoose.model("Exp");


module.exports = exports

exports.index = {
  async get (req, res, next) {
    try {
      let exps = await Exp.find({})
      res.json(exps);
    } catch (error) {
      return next(error)
    }
  },
  async post (req,res,next) {
        try{
              let obj = {
                      chef: req.body.chef,
                      title: req.body.title,
                      short_desc: req.body.short_desc,
                      description: req.body.description
              }
              let exp = new Exp(obj);
              exp = await exp.save();
              return res.json({exp});

        }catch(err){
                return next(err);
        }
        }
}

