const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    name:{type: String, required:true},
    description:{type: String, required:true},
    image:[{type: String, required:true}],
    categories:{type: String,enum:["Colección", "Accesorios", "Calzado", "Promociones"], required:true},
    subcategory: { type: String, required: true },
    size:{
        type:[String],
        enum:["XS", "S", "M", "L", "XL"],
        required:true
    },
    price: { type: Number, required: true },
    isNew:{type: Boolean, default:false} //novedades
},{timestamps:true});

module.exports=mongoose.model('Product',ProductSchema); 