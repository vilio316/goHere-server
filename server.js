const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/authRoute')
app.use(express.json())

const corsOptions = {
    origin: ['http://localhost:5173'], credentials: true
};
app.use(cors(corsOptions));
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

async function mainMongConnect(){
    await mongoose.connect(process.env.MONGO_STRING).then(console.log("Connected!"))
}

mainMongConnect()

const {searchByTxt} = require('./maps_requests');
const { Signup } = require('./controllers/authController');
app.use(cookieParser())



app.get('/api', (req, res) => {
    res.json({"fruits" : ["a", "b", "c", "jackfruit"]});
})

//Text Search
app.get('/search/:query' , async (req, res)=> {
    const requestResults = await searchByTxt(req.params.query)
    res.json(
      requestResults
)
})


/*
app.post('/sign-in', (req, res) => {
    UserModel.findOne({user: req.body.email}).then(
        (results) => {try{
            console.log(results)
        } catch(error){
            console.log(error)
            res.json({'errorMessage' : error})
        }
    }
    )
})
*/

app.get('/geocoded_location/:lat/:long', async(req, res) => {
    const location_details = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.lat},${req.params.long}&key=${process.env.PLACES_API_KEY}`)
    const location_res = await location_details.json()
    res.json(location_res)
})

app.use('/auth', authRoute)

app.listen(8090, ()=> {
    console.log("Server started on port 8090");
});