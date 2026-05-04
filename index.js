const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const userRoutes = require('./routes/users');



app.use(express.json()); 


app.use('/users', userRoutes);

app.listen(3015, ()=>{
    console.log('servidor corriendo')
})