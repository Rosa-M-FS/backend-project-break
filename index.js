require('dotenv').config();//manejar variables de entorno
const express = require ('express');//crear servidor
const cors = require('cors');//peticiones front
const mongoose=require('mongoose');//base datos
const cookieParser = require("cookie-parser");

const methodOverride = require('method-override');
const authRoutes = require("./routes/authRoutes");
const productRoutes=require('./routes/productRoutes');

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('Connect to MongoDB'))
.catch(error=>console.log(error));

const app = express();
app.use(methodOverride('_method'));
/* const multer=require('multer'); */
app.use("/auth", authRoutes);

app.use(express.json());//leer solicitudes
app.use(cors());//permitir ¨accesos¨
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));//archivos estáticos de public

app.use('/',productRoutes);

const PORT=process.env.PORT|| 3030;
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})