import Category from "../../models/category.model";

export async function POST(req){
    const {name} = await req.json();

    const category = new Category({name});
    await category.save();

    return Response.json(category);

}

export async function GET(){
    const categories = await Category.find();
    return Response.json(categories);
}

export async function PUT(req){

    const {_id, name} = await req.json();
    console.log('ban', name)
 
    const category = await Category.updateOne({_id}, {$set: {name: name}});

    return Response.json(category);
}

export async function DELETE(req){
    const newUrl = new URL(req.url);
    console.log('newUrl', req.url);
    const id = newUrl.searchParams.get('id')
    console.log('id', id);
    
     await Category.deleteOne({_id: id})

    return Response.json({message:"Category deleted successfully!"})
}