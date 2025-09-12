import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    }
}, 
{
    timestamps: true
}
)

const Category = mongoose?.models?.Category || mongoose.model("Category", categorySchema);

export default Category;