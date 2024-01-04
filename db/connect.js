const mongoose = require('mongoose')

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://wallew:hadeetha@nodeexpressprojects.anpkc5g.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB;
// .then(()=>console.log('CONNECTED TO THE DB...'))
// .catch((err)=>console.log(err)) 