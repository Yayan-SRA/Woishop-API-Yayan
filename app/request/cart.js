const {Cart, Product} = require("../models");

const checkCart = async (req,res,next) => {
    const id_user = req.user.id
    const {id_store,id_product,amount} = req.body
    const { Op } = require("sequelize");
    if(!id_product) return res.json({msg:"Empty id_product"})
    const check = await Cart.findOne({
    where:
        { id_user: id_user }
    })
    const product = await Product.findOne({
        where:{id:id_product}
    }) 
    if(!product) return res.json({msg:"product not found"})
    if(amount > product.stock) return res.json({msg:"out of stock"})
    const total_price = product.price*amount
    if(!check){
        req.check = "add"
        req.price = total_price
    } else{
        if(check.id_store === id_store && check.id_product === id_product){
            // store dan produk sama
            if(amount == 0) {
                await Cart.destroy({
                    where: {
                        [Op.and]: [
                            { id_user: check.id_user },
                            { id_store: check.id_store },
                            { id_product : check.id_product }
                        ]
                    }
                })
            }
            const product = await Product.findOne({
                where:{id:check.id_product}
            })
            const to_price = product.price*amount
            req.check = "update"
            req.price = to_price
        } else if(check.id_store === id_store && check.id_product !== id_product){
            // store sama dan produk tidak sama
            req.check = "add"
            req.price = total_price
        }
        else if(check.id_store !== id_store){
            // store beda
            await Cart.destroy({
                where:{id_user:check.id_user}
            })
            req.check = "add"
            req.price = total_price
        }
    }
    next()
}

const cartAmount = async(req,res,next) => {
    const id = req.user.id
    const available = await Cart.findAll({
        where: {id_user:id}
    })
    if(available.length == 0)return res.json({msg:"Empty cart"})
    next()
}

const updateCart = async (req,res,next) => {
    const id = req.params.id
    const amount = req.body.amount
    const cart = await Cart.findOne({
        where: {id:id}
    })
    if(!cart) return res.json({msg:"there is no cart"})
    if(amount == 0){
        return await Cart.destroy({
            where:{id:id}
        })
    }
    const product = await Product.findOne({
        where:{id:cart.id_product}
    })
    const to_price = product.price*amount
    req.price = to_price
    next()
}

module.exports = {
    checkCart, cartAmount, updateCart
};