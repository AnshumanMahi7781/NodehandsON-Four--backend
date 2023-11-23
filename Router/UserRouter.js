const route = require("express").Router();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config()
const secretKey = process.env.secretkey
const userDetails = [];
const saltRound = 10;

route.post("/register", (request, response) => {
    const tempData = request.body;
    let notRegistred = userDetails.every((user) => user.email !== tempData.email);
    if (notRegistred) {

        tempData.password = bcrypt.hashSync(tempData.password, saltRound);

        userDetails.push(tempData);

        const jwtToken = JWT.sign({ Owner: tempData.email }, secretKey);
        console.log(userDetails)
        return response.send({ resMsg: "User Registred Successfully", TOKEN: jwtToken });

    }
     else {
        return response.send({ resMsg: "User Already Exists" });
    }
});

route.post("/login", (request, response) => {
    const tempData = request.body;

    let findUser = userDetails.find((item)=> item.email === tempData.email);

    if(!findUser){
        return response.send({ resMsg: "User Not Registred" });
    }

    const userValidate = bcrypt.compareSync(tempData.password, findUser.password);
    if(userValidate){
        const token = JWT.sign({Owner : tempData.email}, secretKey, {expiresIn : "9000"});
        return response.send({ resMsg: "User Login Successfully", TOKEN: token });
    }else{
        return response.send({ resMsg: "Password is not Correct" });
    }

});



module.exports = route;