const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    name:{type: String, required:true},
    description:{type: String, required:true},
    image:[{type: String, required:false}],
    categories:[{type: String,enum:["Novedades", "Colección", "Accesorios", "Calzado", "Promociones"], required:true}],
    subcategory: { type: String, required: true },
    size:{
        type:[String],
        enum:["XS", "S", "M", "L", "XL"],
        required:true
    },
    price: { type: Number, required: true },
},{timestamps:true});

module.exports=mongoose.model('Product',ProductSchema); 