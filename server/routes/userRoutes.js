const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const UserSchema= require('../models/UserSchema')
const secret = process.env.SECRET
const jwt= require('jsonwebtoken')

const reqAuth = require('../middleware/requireAuth')

const createToken =(_id)=>{
 return jwt.sign({_id}, secret, {expiresIn:'3d'} )
}



router.post('/register', async (req, res) => {
    const {email, password, firstname, lastname, age} = req.body
  
    if(!email||!password||!firstname||!lastname||!age){
      return res.status(400).json({message:"Täytäthän kaikki kentät"})
   
    }
    const userExists= await UserSchema.findOne({email})
    if(userExists){
        return res.status(400).json({message:"Käyttäjä on jo olemassa."})
     
    }

    if(password.length<10){
      return res.status(400).json({message:"Salasanan tulee olla vähintään 10 merkkiä pitkä."})
    }
    const uusiKayttaja = new UserSchema({firstname, lastname, email,password, age})
    bcrypt.hash(password, 10, async(err, hash)=>{
      if(err){
          return res.status(400).json({message: "Virhe salasanaa tallentaessa."})
      }
      uusiKayttaja.password= hash
      const tallennettuKayttajaRes = await uusiKayttaja.save()
      const token = createToken(uusiKayttaja._id)
      if(tallennettuKayttajaRes){
          return res.status(200).json({message:"Käyttäjä lisätty.", token, email})
       
      }
    })
  })
  
  router.post('/login', async(req,res)=>{

    const {email, password} = req.body
    if(!email||!password){
       return res.status(400).json({message:"Täytä kentät."})
    }
    const user = await UserSchema.findOne({email:email})
    if(!user){
        return res.status(400).json({message:"Käyttäjää ei löydy"})
    }
    const matchSalasanat= await bcrypt.compare(password, user.password)
    if(matchSalasanat){

        const token = createToken(user._id)
        return res.status(200).json({token, email})
    }else{
        return res.status(400).json({message:"Salasana ei täsmää."})
    }

  })

  //Omien tietojen hakeminen ja kisoihin ilmoittautuminen vaatii reqAuthin
  router.use(reqAuth) 

  router.get('/me', async(req,res)=>{
    const id = req.user._id // _id määritetty reqauthssa
     try{
      const myInfo = await UserSchema.findOne(id).select('-password')
      return res.status(200).json({myInfo})
     }
   catch(err){
    return res.status(401).json(err)

   }
  
})
router.post('/reg', async(req,res)=>{
  const id=req.user._id
 const kisaId = req.body.kisaId

 const query= {_id:id, "registrations.kisaId":kisaId}
 try{
 const alreadyReg= await UserSchema.findOne(query)
 if(alreadyReg){
  return res.status(400).json({message:"Olet jo ilmoittautunut tähän."}) 
 }
 if(!alreadyReg){

  await UserSchema.findByIdAndUpdate(id, {$push:{registrations:{kisaId:kisaId}}})
  return res.status(200).json({message:"Ilmottauduttu."}) 
 }
}catch(err){
  return res.status(401).json({message:"Jotain meni pieleen"}) 
}
})
    





module.exports = router

