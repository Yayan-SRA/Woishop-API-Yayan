const cartService = require('../../../services/cartService')

module.exports = {
    cartList (req, res) {
        const id = req.user.id
        cartService
        .cartList({id})
        .then((data)=>{
            res.status(200).json({
                status: "Success",
                data: data
            })
        })
        .catch((err)=>{
            res.status(400).json({
                status: "Fail",
                msg: err.msg
            })
        })
    },

    addCart (req, res) {
        const get = req.check 
        const price = req.price
        const id_user = req.user.id
        const {id_store, id_product} = req.body
        if(get == "update"){
            cartService
            .updateCart1({id_user, id_store, id_product},{
                amount : req.body.amount,
                total_price: price
            })
            .then((cart)=>{
                res.status(200).json({
                    status: "Success",
                    data: cart
                })
            })
            .catch((err)=>{
                res.status(400).json({
                    status : "Fail",
                    message : err.message
                })
            })
        } else if(get == "add"){
            cartService
            .addCart({
                id_store : req.body.id_store,
                id_user : id_user,
                id_product : req.body.id_product,
                amount : req.body.amount,
                total_price : price,
            })
            .then((cart)=>{
                res.status(200).json({
                    status: "Success",
                    data: cart
                })
            })
            .catch((err)=>{
                res.status(400).json({
                    status : "Fail",
                    message : err.message
                })
            })
        } else{
            res.status(400).json({msg:"req.check error"})
        }
    },

    updateCart (req, res) {
        const id = req.params.id
        const total_price = req.price
        cartService
        .updateCart({id},{
            amount : req.body.amount,
            total_price : total_price,
        })
        .then((cart)=>{
            res.status(200).json({
                status: "Success",
                data: cart
            })
        })
        .catch((err)=>{
            res.status(400).json({
                status : "Fail",
                message : err.message
            })
        })
    },

    deleteCart (req, res) {
        const id = req.params.id
        cartService
        .deleteCart({id})
        .then((cart)=>{
            res.status(200).json({
                status: "Success",
                data: cart
            })
        })
        .catch((err)=>{
            res.status(400).json({
                status : "Fail",
                message : err.message
            })
        })
    },
}