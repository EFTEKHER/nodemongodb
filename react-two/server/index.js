require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vjqq2qt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


let usersx=[];
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const database = client.db("Students");
    const StudentsCollection = database.collection("StudentInfoCollection");
    
//GET API

app.get('/users',async (req, res) => {

    const cursor = StudentsCollection.find({})
    const user= await cursor.toArray();
    res.send(user);
})
//GET API For single User 

app.get('/users/:id', async (req, res) => {
    const id=req.params.id;
    console.log(id);
    const query={_id: new ObjectId(id)}
    const result= await StudentsCollection.findOne(query);
    res.send(result);
})



    // Post API
app.post('/users', async (req, res) => {
      const newUser = req.body;
      usersx=[...usersx,newUser];
      try {
        const result = await StudentsCollection.insertOne(newUser);
        console.log(result);
        res.status(201).send(result);  // Send the result back to the client
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to add user' });
      }
    });
//Delete Api 
app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      try {
        const query = { _id: new ObjectId(id) }; // Correct usage of ObjectId
        const result = await StudentsCollection.deleteOne(query);
        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete user' });
      }
    });

    //update api;
    app.put('/users/:id',async (req,res) => {
      const id= req.params.id;
      const updatedUser=req.body;
      const filter={_id:new ObjectId(id)};
      const options={upsert:true};
      const updateDoc = {
      $set: {
        name:updatedUser.name,
        email:updatedUser.email,
      },
    };
    const result= await StudentsCollection.updateOne(filter,updateDoc,options);
    res.json(result);
    })

  } finally {
    // Don't close the MongoDB client connection here because we want it to stay open
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello, world');
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
