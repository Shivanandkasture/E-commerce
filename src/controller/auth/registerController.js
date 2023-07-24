const userModel = require('./../../model/userModel')
const bcrypt = require('bcrypt')
const Joi = require('joi')

const userRegister = async (req, res) => {

    try {
        const data = req.body

        const { fname, lname, phone, email, password } = data

        console.log(data)

        if (!fname || !lname || !phone || !email || !password)
            return res.status(400).send({ status: false, message: 'fill all the details' })


        const isExist = await userModel.findOne({ email });



        if (isExist) {
            return res.status(422).send({ status: false, message: 'user already exists.' })
        }
        else {
            let hashedPassword = await bcrypt.hash(password, 10)
            let userHash = hashedPassword
            data.password = userHash
            
            const user = await userModel.create(data);

            return res.status(201).send({ status: true, message: "user register successfully.", Data: user })
        }






        // console.log(hashedPassword)

        // const user = { fname, lname, email, phone, password }

        // console.log(user)

        // const userRegisterSchema = Joi.object({
        //     fname: Joi.string().min(3).max(30).required(),
        //     lname: Joi.string().min(3).max(30).required(),
        //     email: Joi.string().email().required(),
        //     // phone: Joi.string().phone().required(),
        // })


        // const error = userRegisterSchema.validate(user)

        // if(error) return res.status(400).send({status:false, message:error.value})

        // let userData = await userModel.create(req.body)
        // return res.status(201).send({ status: true, message: 'user register', data:userData })

    } catch (error) {

    }
}
module.exports.userRegister = userRegister