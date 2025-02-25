const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    Nombre: String,
    Descripción:String,
    Imagen:String,
    Categoría:String,
    Talla:{
        type:String,
        enum:["XS", "S", "M", "L", "XL"],
        required:true
    },
    Precio:Number
});

module.exports=mongoose.model('Product',ProductSchema);