const {Cart, Store, User, Product} = require('../models')
const { Op } = require("sequelize");

module.exports = {
    cartList ({id}) {
        return Cart.findAll({
            where: {id_user:id},
            order: ['id'],
            include: [Store, User, Product]
        })
    },

    addCart(createArgs) {
        return Cart.create(createArgs);
    },

    updateCart1({id_user, id_store, id_product},updateBody) {
        return Cart.update(updateBody,{
            where: {
                [Op.and]: [
                    { id_user: id_user },
                    { id_store: id_store},
                    { id_product : id_product }
                ]
            }
        });
    },

    updateCart({id},updateBody) {
        return Cart.update(updateBody,{
            where: {id:id}
        });
    },

    deleteCart({id}) {
        return Cart.destroy({
            where: {id:id}
        });
    }
}