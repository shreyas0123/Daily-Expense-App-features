const signUpUserDetails = require('../models/signup');
const bcrypt = require('bcrypt');

//login page
exports.login = async (req,res) =>{
    try{

        const email = req.body.email;
        const password = req.body.password;

        if(email.length === "" || password.length === ""){
            return res.status(400).json({success:false,message:'email or password is missing'})
        }
        //find wheather entered email matches with existing email in database
        //matched email is stored in uniqEmail
        //then compare matched email password from databse with entered password
        //if matches then user logged in succesfully
        //if password does not match then incorrect password
        //if email length ===0 then user does not exist
        const uniqEmail = await signUpUserDetails.findAll({where:{email:email}})
        console.log('uniqEmail',uniqEmail);
        if(uniqEmail.length !== 0){
            //The bcrypt.compare function is used to compare the password entered by the user (in plain text) in form fields
            //with the hashed password retrieved from the database.
            bcrypt.compare(password,uniqEmail[0].password, (err,result)=>{
                if(err){
                    throw new error('something went wrong');
                }
                if(result === true){
                    return res.status(200).json({success:true,message:'user logged in succesfully'})
                }else{
                    return res.status(400).json({success:false,message:'incorrect password'})
                }
            })
                
            
        }else{
            return res.status(400).json({success:false,message:'user does not exist'})
        }
    }catch(error){
        console.log('error from login page',error);
    }
}