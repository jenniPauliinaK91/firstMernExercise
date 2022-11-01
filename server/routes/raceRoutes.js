const express = require('express')
const router = express.Router()
const RaceSchema = require('../models/RaceSchema')

const reqAuth = require('../middleware/requireAuth')

//router.use(reqAuth)
router.get('/getraces', async(req,res)=>{
    const races = await RaceSchema.find({}).sort({date: 1})
    
    res.status(200).json(races)
})



router.get('/getRace/:id', async(req, res)=>{
    const id=req.params.id

    const tiedot = await RaceSchema.findById(id)

    if(!tiedot){
        return res.status(404).json({message:'Not found'})
    }
    if(tiedot){
        return res.status(200).json(tiedot)
    }

    
})



router.use(reqAuth)
router.post('/addrace', async (req,res)=>{
    const {name, organization, address, city, date,time, distance,  zipcode, description, url} = req.body
    const owner= req.user._id
    if(!name||!organization||!address||!city||!date||!time||!distance||!owner||!zipcode ||!description){
      return res.status(400).json({message:"Täytäthän kaikki kentät"})
   
    }
  //  router.use(reqAuth)

    const newrace = new RaceSchema({name, organization, address, city, date,time, distance, owner, zipcode, description, url})

    const response = await newrace.save()

    if(response){
        return res.status(200).json({message:'Kisa lisätty', name})
    }
    if(!response){
        return res.status(400).json({message:'Jotain meni pieleen'})
    }
})
router.use(reqAuth)
router.get('/getMyRaces', async(req,res)=>{

    const id = req.user._id
    const races = await RaceSchema.find({owner:id})
    if(races){
        return res.status(200).json({races})
    }
    if(!races){
        return res.status(400).json({message:'Jotain meni pieleen'})
    }



})

router.post('/cancelEvent', async(req,res)=>{

    const raceId= req.body.id
   
    const cancel= await RaceSchema.findByIdAndUpdate(raceId, {isCancelled:true})

    if(cancel){
        return res.status(200).json({message:"Peruttu"}) 
    }
    if(!cancel){
        return res.status(400).json({message:"Ei onnistunut"}) 
    }

})
module.exports = router