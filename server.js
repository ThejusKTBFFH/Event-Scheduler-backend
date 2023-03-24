const  express = require("express") ;
const  cors = require("cors") ;
const  mongoose = require("mongoose") ;

const eventRoute = require("./routes/event.js")



const app = express();

app.use(express.json());

app.use(cors());


app.use("/v1/events", eventRoute);

const url="mongodb+srv://1thejusjoshi:eventscheduler@event-scheduler.aqwmy3d.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect( url,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("Database connected");
}).catch((error)=>{
    console.log(error);
})


app.listen(3000,()=>{
    console.log("server started at 3000");
})