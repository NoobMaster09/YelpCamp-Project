var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");

//LANDING PAGE
router.get("/",function(req, res){
    res.render("home");
})

//REGISTER ROUTES
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register",{error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Signed In, Welcome to YelpCamp " + user.username +" !");
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN ROUTES
router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: 'Welcome to YelpCamp!'
}), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success", "Logged Out, See You Again !!!");
    res.redirect("/campgrounds");
});

module.exports = router;