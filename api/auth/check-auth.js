const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    
    
    try{
        const decoded = jwt.verify(req.headers.authorization, process.env.Tokenkey);
        res.status(200);
        console.log('AUTHORIZATION SUCCESFULL!')
        next();
    } 
    catch(err){
        console.log('unauthorized');
        return res.status(401).json({
            error: err,
            message: 'Unauthorized'
        })
    }
    
}