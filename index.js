require('dotenv').config();//manejar variables de entorno
const express = require ('express');//crear servidor
const cors = require('cors');//peticiones front
const mongoose=require('mongoose');//base datos

const app = express();

mongoose.connect(process.env.MONGO_URI,{})

app.use(express.json());//leer solicitudes
app.use(cors());//permitir ¨accesos¨

app.get('/',(req,res)=>{
    res.send('Server on');
});

const PORT=process.env.PORT|| 3000;
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:{$PORT}`)
})