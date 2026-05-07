const express = require("express")
const {connectToMongoDB} = require("./connect")
const urlRoute = require('./routes/url')
const URL = require('./models/ulr')
const app = express();
const path = require('path')
const staticRoute = require('./routes/staticRouter')
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=> console.log('mongodb Conneted'))

app.set("view engine", "ejs")
app.set("views", path.resolve("./Views"))


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/url", urlRoute);
app.use('/', staticRoute)

// app.get("/test", async(req,res)=>{
//   const allUrls = await URL.find({});
//   return res.render('home',{
//     urls: allUrls,  
//   })
// })

app.get('/:shortId', async (req,res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  },{$push:{
    visitHistory:{
      Timestamp : Date.now(),
    }
  },
}
)
res.redirect(entry.redirectURL)
})

app.listen(PORT, ()=> console.log(`server started at PORT : ${PORT}`)
)