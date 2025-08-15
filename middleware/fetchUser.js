


const jwt = require('jsonwebtoken')

const jwt_secret = process.env.JWT_SECRET || "pglgod";

const fetchUser = async ( req, res, next)=>{
    const token = await req.body.authToken;
    // const token = await req.headers.authToken;
    if (!token) {
        res.status(401).json({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user;
        next();
    } catch (error) {
        // res.status(401).send({error: "Please Authenticat using a valid token"})
        res.status(401).send({error: error})
    }
}

module.exports = fetchUser;