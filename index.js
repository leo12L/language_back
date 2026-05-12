const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/users');
const profileRoutes = require('./routes/profile');
const chatRouetes = require('./routes/chat');
const paymentRoutes = require('./routes/payments')


app.use(express.json()); 
app.use(cors());


app.use('/users', userRoutes);
app.use('/profile', profileRoutes)
app.use('/chat', chatRouetes)
app.use('/payments', paymentRoutes)


app.listen(3015, ()=>{
    console.log('servidor corriendo')
})