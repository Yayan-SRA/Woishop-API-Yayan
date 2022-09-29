const authRepository = require("../repositories/authRepository");

module.exports= {
    async getUser(){
        try {
            return await authRepository.getUser()
        } catch (error) {
            throw err
        }
    },

    async getOneUser({refreshToken}){
        try {
            return await authRepository.getOneUser({refreshToken})
        } catch (error) {
            throw err
        }
    },

    async registration(requestBody){
        try {
            const data = await authRepository.create(requestBody)
            return data
        } catch (err) {
            throw err;
        }
    },

    async login({phone_number}){
        try {
            const dataNumber = await authRepository.findOneNumber({phone_number})
            return dataNumber;
        } catch (err) {
            throw err;
        }
    },
    
    async update({userId}, requestBody){
        try {
            return await authRepository.update({userId}, requestBody)
        } catch (err) {
            throw err;
        }
    },

    async inputOtp({phone, otp}){
        try {
            return await authRepository.otp({phone, otp})
        } catch (err) {
            throw err;
        }
    },

    async activate({phone, otp}, requestBody){
        try {
            return await authRepository.active({phone,otp}, requestBody)
        } catch (err) {
            throw err;
        }
    }
}