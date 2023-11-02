const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
   .then(() => {
    //*Insertando nueva receta
    return Recipe.create({
    title: "Spaguetti Carbonara",
    level: "UltraPro Chef",
    ingredients: [
     "Spaguettis",
     "Egg",
     "Bacon",
      "Cream",
     "Onion"
    ],
    cuisine: "Italian",
    dishType: "main_course",
    image: "https://i0.wp.com/isinginthekitchen.com/wp-content/uploads/2014/12/dsc_0036.jpg?ssl=1",
    duration: 30,
    creator: "Chef Ratatoullie",
    created: "02/11/2023"
    
    })
  
            
  })
  .then(()=>{
    //*Añadiendo array de data.json
    return Recipe.insertMany(data) 
  })
  .then(()=>{
    //*Actualizar obj array
    return Recipe.findOneAndUpdate({title : "Rigatoni alla Genovese"}, {duration: 100})

  })
  .then(()=>{
    //*Eliminar obj array
    return Recipe.findOneAndDelete({title: "Carrot Cake" })
  })
  .then((response)=>{
    console.log(response)    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  mongoose.disconnect(()=>{
    console.log("closed")
  })

