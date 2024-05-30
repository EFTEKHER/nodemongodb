const express= require('express');
const app=express();
const cors = require('cors');
const {MongoClient,ServerApiVersion}=require('mongodb')
const port=process.env.PORT || 5000;
//middleware
app.use(cors());

const users = [
    {id: 0, name: "Efte", phone: "+880-1538597500", gmail: "efte460@yahoo.com"},
    {id: 1, name: "Alex", phone: "+880-1521270086", gmail: "alex858@yahoo.com"},
    {id: 2, name: "Sam", phone: "+880-1220946733", gmail: "sam742@yahoo.com"},
    {id: 3, name: "Chris", phone: "+880-1114928217", gmail: "chris796@hotmail.com"},
    {id: 4, name: "Jordan", phone: "+880-1863860312", gmail: "jordan592@hotmail.com"},
    {id: 5, name: "Taylor", phone: "+880-1872033914", gmail: "taylor499@yahoo.com"},
    {id: 6, name: "Jamie", phone: "+880-1411900385", gmail: "jamie81@gmail.com"},
    {id: 7, name: "Morgan", phone: "+880-1665806318", gmail: "morgan498@yahoo.com"},
    {id: 8, name: "Riley", phone: "+880-1567179682", gmail: "riley833@hotmail.com"},
    {id: 9, name: "Cameron", phone: "+880-1790514316", gmail: "cameron458@hotmail.com"},
    {id: 10, name: "Parker", phone: "+880-1199032712", gmail: "parker385@gmail.com"},
    {id: 11, name: "Casey", phone: "+880-1712833339", gmail: "casey205@hotmail.com"},
    {id: 12, name: "Dakota", phone: "+880-1958641655", gmail: "dakota223@gmail.com"},
    {id: 13, name: "Kendall", phone: "+880-1437946757", gmail: "kendall500@yahoo.com"},
    {id: 14, name: "Skyler", phone: "+880-1901981353", gmail: "skyler699@hotmail.com"},
    {id: 15, name: "Reese", phone: "+880-1861108656", gmail: "reese809@gmail.com"},
    {id: 16, name: "Rowan", phone: "+880-1183392713", gmail: "rowan545@yahoo.com"},
    {id: 17, name: "Harper", phone: "+880-1816786987", gmail: "harper561@gmail.com"},
    {id: 18, name: "Avery", phone: "+880-1217553375", gmail: "avery5@gmail.com"},
    {id: 19, name: "Blake", phone: "+880-1353590129", gmail: "blake381@yahoo.com"}
];



const uri = "mongodb+srv://binary2ai:efte2000@cluster0.vjqq2qt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
      // Connect to the "insertDB" database and access its "haiku" collection
      await client.connect();
      const database = client.db("MyDbmanagement");
      const userCollection = database.collection("userCollection");
      
      // Create a document to insert
      const obj = {
        name:"efte",
        email:"efte@gmail.com",
        phone:"+880-1712854822"

      }
      // Insert the defined document into the "haiku" collection
      const result = await userCollection.insertOne(obj);
      // Print the ID of the inserted document
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
       // Close the MongoDB client connection
      await client.close();
    }
  }
  // Run the function and handle any errors
  run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello, world');
})

app.get("/users",(req, res)=>{
    res.send(users);
})
//dynamic api

//query search
app.get("/usersx", (req, res) => {
    const search = req.query.name;

    if (search) {
        const filteredSearch = users.filter(user => 
            user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );
        res.send(filteredSearch);
    } else {
        res.send(users);
    }    
});

app.get('/users/:id',(req, res)=>{
    const id= req.params.id;
    const user= users[id];
    res.send(user);
})

 



app.listen(port,()=>{
    console.log(`listening on ${port}`);

});

