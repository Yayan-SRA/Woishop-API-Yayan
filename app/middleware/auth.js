//importing modulesuser
const {User} = require("../models");
const jwt = require("jsonwebtoken");

//Function to check if phone number or email already exist in the database
//this is to avoid having two users with the same phone number and email
 const saveUser = async (req, res, next) => {
 //search the database to see if user exist
 try {
   const phone = req.body.phone_number
   if(phone.length >= 10 && phone.length <= 14) {
     const phone_number = await User.findOne({
       where: { 
         phone_number: phone,
        },
      });
      const check = phone.substring(0, 3);
      if(check !== "+62") return res.status(409).json({msg : "replace (0) at the beginning of the number with (+62)"})
      //if phone number exist in the database respond with a status of 409
      if (phone_number) {
        return res.status(409).json({msg : "phone number already taken"});
      }else{
        const email = req.body.email
        if(email){
          const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
          const emailToValidate = email;
          const validation = emailRegex.test(emailToValidate);
          if(validation == false) return res.status(409).json({msg:"Not correct format of email"})
          next()
        }else{
          // next()
        }
      }
    } else{
      res.status(409).json({msg: "number length not standard"})
    }   
    } catch (error) {
    console.log(error);
  }
};

const login = async (req,res,next) => {
  try {
    const phone = req.body.phone_number
    const check = await User.findOne({
      where: {phone_number:phone}
    })
    if(!check){
      res.status(409).json({msg:"phone number different"})
    }else{
      if(check.isActive == false) return res.status(409).json({msg:"Your account is not active yet"})
      next()
    }
  } catch (error) {
    console.log(error)
  }
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.status(401).json({msg:"Login to access this feature"});
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if(err) return res.sendStatus(403);
    req.phone_number = decoded.phone_number;
    
    const user = await User.findOne({
      where:{id:decoded.userId}
    })
    req.user = user
    next();
  })
}

const refreshToken = async(req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(401);
    const user = await User.findOne({
      where: {refresh_token:refreshToken}
    })
    if(!user) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if(err) return res.sendStatus(403);
      const userId = user.id;
      const name = user.full_name;
      const phone_number = user.phone_number;
      const accessToken = jwt.sign({userId, name, phone_number}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s'
      });
      res.json({ accessToken })
    }) 
  } catch (error) {
    
  }
}

const check = async (req, res, next) => {
  const phone = req.params.phone
  const otp = req.body.otp
  const checking = await User.findOne({
    where:{
      phone_number:phone,
      otp:otp
    }
  })
  if(!checking) return res.status(409).json({msg:"your input false"})
  next()
}
//exporting module
 module.exports = {
 saveUser, login, verifyToken, refreshToken, check
};