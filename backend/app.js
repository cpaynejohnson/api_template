const express = require("express");
//require basicAuth
const basicAuth = require('express-basic-auth');
//require bcrypt
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
// set salt
const saltRounds = 2;
const bodyParser= require('body-parser')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors')

const apiKey = process.env.API_KEY;
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

// //import axios
const axios = require('axios');



const {User, Item, School, Favorite, Major} = require('./models');
const { use } = require("bcrypt/promises");
const { application } = require("express");
const { sequelize } = require("./db");

// initialise Express
const app = express();

// Allow express to read json request bodies
app.use(express.json());
app.use(cors());

//multer options
const fileStorageEngine = multer.diskStorage({
destination: (req,file, cb)  => {
    cb(null, './images')
},

filename: (req, file, cb) => {
  cb(null, Date.now() + "--" + file.originalname);
  },
});
// will include ' + "--" + Favorite.UserId' at end of filename when login is created to relate pic to user
//  or include SchoolID so that pic can attach to correct school
const upload = multer({ storage:  fileStorageEngine });

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-bl8uap80.us.auth0.com/.well-known/jwks.json'
}),
audience: 'http://localhost:3000',
issuer: 'https://dev-bl8uap80.us.auth0.com/',
algorithms: ['RS256']
});

// app.use(jwtCheck);


// // configure basicAuth
// app.use(basicAuth({
//   authorizer : dbAuthorizer,
//   authorizeAsync : true,
//   unauthorizedResponse : () => "You do not have access to this content"
// }))

// compare username and password with db content
// return boolean indicating password match
async function dbAuthorizer(username, password, callbak){
  try {
    // get matching user from db
    const user = await User.findOne({where: {name:username}})
    // if username is valid compare passwords
    let isValid = (user != null ) ? await bcrypt.compare(password, user.password) : false;
    callbak(null, isValid)
  } catch(err) {
    //if authorize fails, log error
    console.log("Error: ", err)
    callbak(null, false)
  }
}


// GET routes go here


app.get('/', (req, res) => {
  res.send('<h1>App Running</h1>')
})
// app.get('/', (req, res) => {
//   res.sendFile("./index.html")
// })


app.get(`/items`, async (req,res) => {
  const items = await Item.findAll();
  res.json({items});
})

app.get(`/users/:userid/favorites`, async (req,res) => {
  const favorites = await User.findAll({ 
    where: {id: req.params.userid}, 
      attributes: { exclude: ['password']}, 
        include: { model: School, attributes: ['name', 'fafsa', 'city', 'state']}
      });
  res.json({favorites});
 }); 

 app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, './index2.html'));   
});

app.get(`/majors/:schoolid`, async (req,res) => {
  const major = await Major.findAll(
    {where : {SchoolId: req.params.schoolid}});
  res.json({major});  
})

app.get(`/items/:id`, async (req,res) => {
  const singleitems = await Item.findByPk(req.params.id);
  res.json({singleitems});
})

app.get(`/users`, async (req,res) => {
  const users = await User.findAll();
  res.json({users});
})

app.get(`/users/:id`, jwtCheck, async (req,res) => {
  const users = await User.findOne(
    {where: {id: req.params.id}});
  res.json({users});
})

app.get(`/school`, async (req,res) => {
  const schools = await School.findAll({
    // include: { model: Tour, attributes: ['tour_url']}
  });  
  res.json({schools});
 })

app.get(`/school/:id`, async (req,res) => {
  const singleschool = await School.findAll({
    where: {id: req.params.id},
      // include: { model: Tour, attributes: ['tour_url']}
    }); 
  res.json({singleschool});
})

app.get(`/schoolname/:name`, async (req,res) => {
  const searchTerm = req.params.name;
    const schoolsname = await School.findAll({
    where : {name: {[Op.like] : `%${searchTerm}%`}},
      // include: { model: Tour, attributes: ['tour_url']}
    });
   res.json({schoolsname});  
})  

app.get(`/schoolstate/:state`, async (req,res) => {
  const schoolsbyst = await School.findAll(
    {where : {state: req.params.state}});
    
  res.json({schoolsbyst});  
})

app.get(`/schoolcity/:city`, async (req,res) => {
  const schoolscity = await School.findAll(
    {where : {city: req.params.city}});
    if(schoolscity.length===0)
    { return res.send('Error - invalid city entered or no results found')}
  res.json({schoolscity});  
})

app.get(`/schoolowner/:ownership`, async (req,res) => {
  const schoolsowner = await School.findAll({
    where : {ownership: req.params.ownership},
        attributes: ['name', 'fafsa', 'city', 'state']
    });
  res.json({schoolsowner});  
})


// POST routes go here


app.post(`/items`, async (req,res) => {
   const newitem = await Item.create(req.body)
   res.send( `${newitem.name} has been created!`);
 })

app.post(`/users/:userid/favorites`, async (req,res) => {
  const favorites = await Favorite.create({
    'UserId': req.params.userid,
    'SchoolId': req.body.SchoolId
  })
    res.send(`${favorites.SchoolId} has been added to your favorites`)
})

app.post(`/users`, async (req,res) => {
  bcrypt.hash(req.body.password,saltRounds, async function(err,hash){
    let newUser = await User.create({'name':req.body.name, 'password':hash});
    console.log(hash)
    res.json({newUser})
  })
});

app.post('/upload', upload.single('image'), (req, res) =>{
  console.log(req.file, req.body);
  res.send("Thank you for uploading a file")
})
app.post('/uploads', upload.array('images', 3), (req, res) => {
  console.log(req.files);
  res.send("Thank you for uploading multiple images")
})

// app.post('/sessions', async(req,res) => {
//   const thisUser = await User.findOne({
//     where: {name: req.body.name}
//   });
//   if(!thisUser){
//     res.send('User not found')
//   } else {
//     bcrypt.compare(req.body.password, thisUser.password, async function (err, result){
//     if(result){
//       res.json(thisUser)
//     } else {
//       res.send("Passwords do not match")
//     }
//   })
//   }    
//   })


// DELETE routes go here


app.delete(`/favorite/:userid/:schoolid`, async (req,res) => {
  const deletefave = await Favorite.findOne({
  where: {UserId: req.params.userid, SchoolId: req.params.schoolid}
  
});
  await deletefave.destroy()
  res.send( `Heads up...one of your favorites has been deleted!!!`)
})

app.delete("/users/:id", async (req, res) => {
  const deletedUser = await User.destroy({
    where: { id: req.params.id },
  });
  res.send(deletedUser ? "A user has been deleted" : "Deletion Failed");
//   res.send(`${favorites.SchoolId} has been added to your favorites`)
});

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });  
