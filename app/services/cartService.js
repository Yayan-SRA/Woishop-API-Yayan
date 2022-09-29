const cartRepository = require('../repositories/cartRepository')

module.exports = {
    async cartList({id}) {
        try {
            return await cartRepository.cartList({id})
        } catch (err) {
            throw err
        }
    },

    async addCart(requestBody) {
        return cartRepository.addCart(requestBody)
    },

    async updateCart1({id_user, id_store, id_product},requestBody) {
        return cartRepository.updateCart1({id_user, id_store, id_product},requestBody)
    },

    async updateCart({id},requestBody) {
        return cartRepository.updateCart({id},requestBody)
    },

    async deleteCart({id}) {
        return cartRepository.deleteCart({id})
    }
}