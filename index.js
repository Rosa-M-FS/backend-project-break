require('dotenv').config();//manejar variables de entorno
const express = require ('express');//crear servidor
const cors = require('cors');//peticiones front
const mongoose=require('mongoose');//base datos

const app = express();

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('Connect to MongoDB'))
.catch(error=>console.log(error));

app.use(express.json());//leer solicitudes
app.use(cors());//permitir ¨accesos¨
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));//archivos estáticos de public
app.get('/',(req,res)=>{
    res.send('Server on');
});

const PORT=process.env.PORT|| 3030;
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:{$PORT}`)
})