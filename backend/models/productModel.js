import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['percentage', 'bogo', 'bundle'],
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  validUntil: Date // Optional: expire offers
});

const ProductSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    price :{
        type : Number,
        required : true,
    },
    size :{
        type : String,
        required : true,
    },
    stock :{
        type : Number,
        required : true,
    },
    image :{
        type : String,
        // required : true,
    },
    offer : offerSchema,
});

export const Product = mongoose.model('product',ProductSchema);