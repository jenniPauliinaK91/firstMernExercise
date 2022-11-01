const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const User = require('../models/UserSchema')

const reqAuth = async(req,res,next)=>{

    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({message:'Ei oikeuksia, auth token vaaditaan'})
    }

    const token = authorization.split(' ')[1]
    try{
      const {_id }= jwt.verify(token, secret)

      req.user = await User.findOne({_id}).select('_id') //select (id) ==> palauttaa vain id:n 
      
      next()
    }catch(err){
        console.log(err)
        res.status(401).json({message:'Request is not authorized '})
    }


}
module.exports = reqAuth