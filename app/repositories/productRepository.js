const { Product } = require("../models");
const { Category } = require("../models");
const { Product_has_category } = require("../models");

module.exports = {
    findAllProduct() {
        return Product.findAll({
            include: [Category]
        });
    },

    findAllCategory() {
        return Category.findAll();
    },
    
    productDetail({id}) {
        console.log("masuk sini1", id)
        const coba = Product.findOne({
            where: {id:id},
            include: [Category]
        });
        console.log("isi coba", coba)
        return coba
    },
    
    productFilter({kate}) {
        return Product_has_category.findAll({
            where:{id_category:kate},
            include: [Category, Product]
        });
    },

    create(createArgs) {
    return Product.create(createArgs);
    },

    getTotalCategory(){
        return Category.count()
    }
};
