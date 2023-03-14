import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const saltRounds = 10;

export const register = (req,res) => {
    
    //CHECK IS USER EXISTS

    const q = "SELECT * FROM Users WHERE email = ?"

    db.query(q, [req.body.email], (err,data) => {
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User already exists")
        //CREATE NEW USER
            //HASH PASSWORD

            const password = req.body.password

            bcrypt.hash(password, saltRounds, (err, hash) =>{
                if(err){
                  console.log(err)
                }

            const q = "INSERT INTO Users (`firstName`,`lastName`,`username`,`email`,`password`) VALUE (?)"
            const values = [req.body.firstName, req.body.lastName, req.body.username, req.body.email, hash]

            db.query(q, [values], (err,data) => {
                if(err) return res.status(500).json(err)
                return res.status(200).json("User has been created");
            })})
    })
}

export const login = (req,res) => {

    const q = "SELECT * FROM Users WHERE email = ?"

    db.query(q, [req.body.email], (err,data) => {
        if(err) return res.status(500).json(err)
        if(data.length === 0) return res.status(404).json("User not found")

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) 
            return res.status(400).json("Wrong email or password")

        const {password, ...others} = data[0];

        const token = jwt.sign({userID: data[0].userID}, "secretkey");

        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json(others);
    })

}

export const logout = (req,res) => {
    
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out")
}