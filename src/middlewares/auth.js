const adminAuth = (req, res, next) => {
    let token = "xyz";
    let isAuthorized = token === "xyz";
    if(!isAuthorized){
        res.status(401).send("Unauthorized");
    }
    else{
        next();
    }
}

module.exports = adminAuth;