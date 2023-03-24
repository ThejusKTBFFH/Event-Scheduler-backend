const  express = require("express") ;
const  cors = require("cors") ;
const  mongoose = require("mongoose") ;

const EventModel = require("../models/event.js");


const router = express.Router();

router.get("/", async(req,res)=>{
    try{

       const result = await EventModel.find({});
       res.status(201).json(result);

    }
    catch(err){
        res.status(500).json(err);
    }
});

router.get("/:id", async(req,res)=>{
    try{

       const result = await EventModel.findById(req.params.id);
       res.status(201).json(result);

    }
    catch(err){
        res.status(404).json({error: "There is no event with that id"});
    }
});

router.post("/", async(req,res)=>{

    const {title,description,location, startTime,endTime} = req.body;

    if(title=="" || description=="" || location=="" || startTime=="" || endTime==""){
        return res.status(400).json({
            error:"Empty fields not allowed"
        })
    }

    const event = new EventModel({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location ,
        startTime: req.body.startTime,
        endTime : req.body.endTime

    });

  
    console.log(event);

    try{
        const result = await event.save();
         return res.status(201).json({result

        })
    }
    catch(error){
        res.status(500).json(error.message)
    }
})


router.put("/:id", async(req,res)=>{

    try{

    const{id}= req.params;

    const {title,description,location, startTime,endTime} = req.body;

    if(title=="" || description=="" || location=="" || startTime=="" || endTime==""){
        return res.status(400).json({
            error:"Empty fields not allowed"
        })
    }

    


    const event = await EventModel.findByIdAndUpdate(id,req.body);

    if(!event){
        return res.status(404).json({message:` cannot find any event with id ${id}`})
    }

    const updatedEvent = await EventModel.findById(id);
    res.status(200).json(updatedEvent);
   
  

  
      
    }
    catch(error){
        res.status(500).json(error.message)
    }
})


router.delete("/:id", async(req,res)=>{

    try{

    const{id}= req.params;



    const event = await EventModel.findByIdAndDelete(id);

    // if(!event){
    //     return res.status(404).json({message:` cannot find any event with id ${id}`})
    // }

   
    res.status(204).json();
      
    }
    catch(error){
        res.status(204).json();
    }
})


module.exports = router;