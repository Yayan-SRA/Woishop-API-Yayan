const {User} = require("../models");

module.exports = {
    getUser(){
        return User.findAll({
            order: ['id']
        })
    },
    getOneUser({refreshToken}){ 
        return User.findOne({
            where: {refresh_token:refreshToken}
        })
    },

    create(createArgs) {
        return User.create(createArgs)
    },

    findOneNumber({phone_number}){
        return User.findOne({
            where: {phone_number:phone_number}
        })
    },
    
    update({userId}, updateBody){
        return User.update(updateBody,{
            where: {id:userId}
        })
    },

    otp({phone, otp}){
        return User.findOne({
            where: {
                phone_number:phone,
                otp:otp
            }
        })
    },

    active({phone, otp},updateBody){
        return User.update(updateBody,{
            where:{
                phone_number:phone,
                otp:otp
            }
        })
    }
}