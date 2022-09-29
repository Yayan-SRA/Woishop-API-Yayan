const {Product, Category, Product_has_category} = require("../models")

const validationFilter = async (req,res,next) => {
    const cate = req.params.category
    const count = await Category.count()

    if(cate>0 && cate<=count){
        const data = await Product_has_category.findAll({
            where: {id_category:cate}
        })
        if(data.length == 0){
        res.status(404).json({msg:"data product not found"})
        } else {
            next()
        }
    } else {
        res.status(405).json({msg:"selected category invalid"})
    }
}

//exporting module
module.exports = {
    validationFilter
   };