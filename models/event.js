const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title:{
        type: String, 
       

    },
    description:{
        type: String,
        
    },
    location:{
        type: String,
      
    },
    startTime:{
        type: String,
     
    },
    endTime:{
        type: String,
        
    }
});

const EventModel = mongoose.model("Events",eventSchema );

module.exports = EventModel;