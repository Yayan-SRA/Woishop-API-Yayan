const authService = require("../../../services/authService")
const {User} = require("../../../models");
const jwt = require("jsonwebtoken");
const shortid = require('shortid');
const axios = require("axios").default;
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal')
const client = new Client({
    authStrategy: new LocalAuth(),
    restartOnAuthFail: true,
    puppeteer: { headless: true }
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr)
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

client.on('disconnected', (reason) => {
    // Destroy and reinitialize the client when disconnected
    client.destroy();
    client.initialize();
  });

class authController {
    coba = (req,res) => {
        client.on('qr', qr).then(()=>{
            console.log("tes qr", qr)
            qrcode.toDataURL(qr, (err, url)).then(()=>{
                res.render("index", { url })
            }) 
        })
    }

    cobaKirim = async (req,res) => {
        // try {
        const phone = req.body.phone_number
        const headers = {
                'Content-Type': 'application/json',
                'Authorization' : 'Basic dXNtYW5ydWJpYW50b3JvcW9kcnFvZHJiZWV3b293YToyNjM3NmVkeXV3OWUwcmkzNDl1ZA=='
            }
        try {
            const kirim = await axios.post('http://45.77.34.32:8000/demo/send_message', {
                phone_no : phone,
                key : "db63f52c1a00d33cf143524083dd3ffd025d672e255cc688",
                message : "coba kirim",
            }, {
                headers:headers
            })
            console.log("isi kirim", kirim)
            if(kirim){
               return res.json({ok:"ok"})
            }
        } catch (error) {
            if(AxiosError){
                return res.json({ok:"oklah"})
            }
            
        }
    
            // } catch (error) {
            //     console.log("ini error", error)
            // }
        
    }


    // jika dijalankan harus restart terminal
    logoutWA = () => { 
        client.logout();
    }

    getUser = (req,res) => {
            authService
            .getUser()
            .then((users)=>{
                res.status(200).json({
                    status : "success",
                    data:users
                })
            })
            .catch((err)=>{
                res.status(422).json({
                    status: "Fail",
                    messager: err.message
                })
            })
    }

    registration = (req,res) => {
        authService
        .registration(req.body)
        .then((data) => {
            const phone = data.phone_number
            const otp = Math.floor(1000 + Math.random() * 90000)
            const msg = `Here is your otp code ${otp}, Don't share with anyone. You register on WoiShop App. If this isn't you, you can ignore it`
            client.sendMessage(phone+"@c.us", msg).then(()=>{ 
                const userId = data.id
                authService
                .update({userId},{
                    otp:otp
                }).then(()=>{
                    res.status(200).json({
                        msg: "Resgister Success",
                        otp: otp,
                        phone_number: phone
                    })
                })
            })
            .catch((err)=>{
                res.status(422).json({
                    status: "Fail",
                    messager: err.message
                })
            })
        })
        .catch((err)=>{
            res.status(422).json({
                status: "Fail",
                messager: err.message
            })
        })
    }

    activateAccount = (req, res) => {
        const phone = req.params.phone
        const otp = req.body.otp
        authService
        .activate({phone, otp},{
            isActive:true
        })
        .then((active)=>{
            if(active == 1)
            {   res.status(200).json({
                status: "Success",
                msg: "Your account has been activated. Now you can login to the App",
                
            })
            } else{
            res.status(409).json({
                status: "Fail",
                msg: "Can't update data",
                
            })
            }
        }).catch((err)=>{
            res.status(409).json({
                status: "Fail",
                messager: err.message
            })
        })
    }

    login = (req,res) => {
        const phone_number = req.body.phone_number
        authService
        .login({phone_number})
        .then((account)=>{
            const userId = account.id;
            const name = account.full_name;
            const phone_number = account.phone_number;
            const otp = Math.floor(Math.random() * 10000)
            const accessToken = jwt.sign({userId, name, phone_number}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '2000s'
            }) 
            const msg = `Here is your otp code ${otp}, Don't share with anyone. If this isn't you, you can ignore it`
            const result = client.sendMessage(phone_number+"@c.us", msg)
                .then(response=>{
                    if(response){
                    const coba= authService.update({userId}, {
                        otp:otp,
                        })
                        if(coba) return res.status(200).json({
                            status: "Succes",
                            otp: otp,
                            phone_number: phone_number,
                            msg:"please input your otp code to continue login",
                            
                        })
                    }else if(!response){
                        res.status(500).json({
                            status: false,
                            response:err
                        })
                    }
            }).catch(err => {
                        res.status(500).json({
                            status: false,
                            response:err
                        })
                    })
        })
        .catch((err)=>{
            res.status(422).json({
                status: "Fail",
                messager: err.message
            })
        })

    }

    inputOtp = (req, res) => {
        try {
            const phone = req.params.phone
            const otp = req.body.otp
            authService
            .inputOtp({phone, otp})
            .then((account)=>{
                const userId = account.id;
                const name = account.full_name;
                const phone_number = account.phone_number;
                const accessToken = jwt.sign({userId, name, phone_number}, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '20000s' 
                }) 
                const refreshToken = jwt.sign({userId, name, phone_number}, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: '1d'
                })
                const coba= authService.update({userId}, {
                    refresh_token: refreshToken,
                })

                res.cookie('refreshToken', refreshToken,{
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
                res.json({accessToken, phone_number})
                })
        } catch (err) {
            res.status(422).json({
                status: "Fail",
                messager: err.message
            })
        }
    }

    async logout(req,res) {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(204)
        const user = await User.findOne({
            where: {refresh_token:refreshToken}
        })
        if(!user) return res.sendStatus(204)
        const userId = user.id;
        const update = authService.update({userId}, {
            refresh_token: null,
            otp: null,
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
    }
    
}
module.exports = authController