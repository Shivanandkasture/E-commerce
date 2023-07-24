const userModel = require('./../../model/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginController = async(req,res)=>{

    try {
        
        const {email, password} = req.body;

        if(!email) return res.status(400).send({status:false, message:'Enter email'})
        if(!password) return res.status(400).send({status:false, message:'Enter password'})

         let userData =  await userModel.findOne({email})
        //  if(!userData.password) return res.status(404).send({status:false, message:'user not found'})


   
        if (userData) {
          // console.log(userData,userData.password)

            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(password,userData.password);
            // console.log(validPassword,userData.password)
            if (!validPassword) {
              return res
                .status(401)
                .send({ status: false, message: "Invalid Password" });
            }
          }
      
          let token = jwt.sign( {userId: userData._id.toString()},"projectGroup06",{ expiresIn: "24h" });
      
          res.setHeader("x-api-key", token);
          console.log(token, userData._id.toString())

          return res.status(200).send({ status: true, message: "Success",data: {userId: userData._id,token: token}});

    } catch (error) {
        
    }
}

module.exports.loginController = loginController;