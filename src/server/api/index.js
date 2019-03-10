const { Router } = require('express')
const usersRoutes = require('./users')
const chefRoutes = require('./chefs')
const experienceRoutes = require("./experience");

// const adminRoutes = require('./admin/routes')
const listEndpoints = require('express-list-endpoints')
const authenticate = require('../middleware/authenticate')
const { handleServerErrors } = require('express-server-error')

const router = Router()

router.use('/', handleServerErrors());
router.use('/users', usersRoutes)
router.use('/chefs', chefRoutes)
router.use('/experiences', experienceRoutes)
// router.use('/admin', authenticate(), adminRoutes)

router.get('/', (req, res) => {
  res.json(listEndpoints(router))
});

// 404
router.use("/", (req,res,next)=>{
  return next({
    status: 404,
    message: "Not Found",
    log: false
  });
})
// Error Handling
router.use((err, req, res, next) => {
    // return res.handleServerError(err);
    const host = "https://getmeachef.com";
    let message = "";
    
    if(!err.status || err.status == 500){
      message = err.isPublic ? err.message : "";
    }else{
      message = err.message ? err.message: "Unkown Error Occured"
    }
    
    if(req.xhr || req.headers.accept.indexOf('json') > -1){
      res.status(err.status || 500).json({
        message,
        stack: process.env === 'development' ? err.stack : undefined,
        name: err.name ? err.name : undefined
      })
    }else{
      if(err.status == 404){
        return res.status(404).render("404", {host:host});
      }
      else{
        return res.status(500).render("500", {host:host});
      }
    }
});

module.exports = router
