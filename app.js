const express = require("express")
// const serverLess = require("serverless-http")
const path = require("path")
const profileRouter = require("./routes/profileRoutes")
const elementRouter = require("./routes/elementsRoutes")
const fileUpload = require('express-fileupload');
const cors = require("cors")
const {getRecentProfile} = require('./controllers/profile');
const jwt = require("jsonwebtoken")
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const authenticate = require("./middleware/authentication")

require("dotenv").config()
require('express-async-errors');

const app = express()

app.use(cors(
    {
      origin:['http://localhost:3000','https://canvas-backend.onrender.com/api/v1'],
  
  }))

app.use(express.json())


 app.use(fileUpload({ useTempFiles: true }));

const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login',(req,res)=>{
  const {username,password} = req.body 
  if(password == username + "tengen-sama"){
      const token = jwt.sign({username,password},"tengensama")
      res.status(200).json({success:true, token})
   }else{
     res.status(401).json({success:false, msg: "unauthorized"})
   } 
})

// sample page
app.get('/profile/ZsfHDdP6CaZp', (req, res) => {

  
  // Here, you can dynamically read the appropriate HTML file based on profileId
  // and send it as the response.
  // For example:
  const filePath = path.join(__dirname, `public/profile.html`); // Adjust the path as needed
  
  res.sendFile(filePath);
});

app.get('/profile/preview/ZsfHDdP6CaZp',(req,res)=>{

  const filePath = path.join(__dirname, `public/preview.html`); // Adjust the path as needed
  res.sendFile(filePath);
})
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/elements', elementRouter)

app.use(authenticate)



// Dynamic profile route
app.get('/profile/:profileId', (req, res) => {
    const profileId = req.params.profileId;
    
    // Here, you can dynamically read the appropriate HTML file based on profileId
    // and send it as the response.
    // For example:
    const filePath = path.join(__dirname, `public/profile.html`); // Adjust the path as needed
    
    res.sendFile(filePath);
  });

app.get('/profile/preview/:profileId',(req,res)=>{

  const filePath = path.join(__dirname, `public/preview.html`); // Adjust the path as needed
  res.sendFile(filePath);
})

app.get('/profiles',async(req,res)=>{
     
  const profiles = await getRecentProfile()
 

  res.render('index',{profiles})

})

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(notFound)
app.use(errorHandlerMiddleware)

app.listen(port,()=>{
    console.log(`listening on ${port}`)
}
)

