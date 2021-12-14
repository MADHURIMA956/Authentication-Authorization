module.exports = function (permittedRoles) { //wrapping function 
  return function (req, res, next) {  //return middleware
    // first get the user from the req
    user = req.user.user;

    // check if the roles on the user have any of the role in permittedRoles
    isAllowed = false;

    user.roles.map((role) => {
      if (permittedRoles.includes(role)) {
        isAllowed = true;
      }
    });

    // if not then throw an error
    if (!isAllowed)
      return res.status(401).json({
        status: "failed",
        message: " You are not allowed to access this",
      });

    next();
  };
};



//wrapping function :-> passing data to ur middleware u have to have a wrapping function , this wrapping funvction get the data and then this returns ur middleware.

// when u have the data to pass in the middleware u might be need wrapping function.