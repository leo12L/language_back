const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const userRoutes = require('./routes/users');
const profileRoutes = require('./routes/profile');


app.use(express.json()); 


app.use('/users', userRoutes);
app.use('/profile', profileRoutes)


app.listen(3015, ()=>{
    console.log('servidor corriendo')
})