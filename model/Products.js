const mongoose = require ('mongoose');
const {Schema}= mongoose;


const productSchema = new Schema({
    title:  {type: String, required:true, unique: true},
    description:{type:String, required:true},
    price:{type:Number, required:true, min:[1, 'Wrong Minimum Price'],max:[10000,'Wrong Maximum Price']},
    discountPercentage:{type:Number,  min:[1, 'Wrong Minimum Discount'],max:[99,'Wrong Maximum Discount']},
    rating:{type:Number,  min:[0, 'Wrong Minimum Price'],max:[5,'Wrong Maximum Price'], default:0 },
    stock:{type:Number,  min:[0, 'Wrong Minimum Price'], default:0 },
    brand:{type:String},
    category:{type:String, required:true},
    thumbnail:{type:String, required:true},
    images:{type:[String], required:true},
    colors:{ type : [Schema.Types.Mixed] },
    sizes:{ type : [Schema.Types.Mixed]},
    discountedPrice:{type:Number},
    highlights:{ type : [String]},

    deleted:{type:Boolean, default:false}
});
const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id;
});
productSchema.set("toJSON",{
    virtuals:true,
    versionKey:false,
    transform: function(doc,ret){
        delete ret._id
    }
})

exports.Product = mongoose.model('Product',productSchema)