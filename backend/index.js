const express=require('express')
const app=express()
const cors = require('cors');
const PORT=8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested, Content-Type, Accept Authorization"
//     )
//     if (req.method === "OPTIONS") {
//       res.header(
//         "Access-Control-Allow-Methods",
//         "POST, PUT, PATCH, GET, DELETE"
//       )
//       return res.status(200).json({})
//     }
//     next()
//   })
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


require("./connection/connection")
require("./schemas/user")
require("./schemas/vendor")
require("./schemas/proposal")

app.use(express.json())
app.use('/users',require("./routes/users"))
app.use('/vendors',require("./routes/vendors"))
app.use('/event',require("./routes/event"))

app.listen(PORT, ()=>{
    console.log("server starting on port "+ PORT)
})