import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';


export const signin = async (req, res) =>{
    const { email, password } = req.body;


    try {
        const existingUser = await User.findOne( {email} );

        if(!existingUser) return res.status(404).json({message: "User doesn't exits."});

        const isCorrectPassword  =  await bcrypt.compare(password, existingUser.password );

        if(!isCorrectPassword ) return res.status(400).json({message: 'Invalid Credentials'});

        const token = jwt.sign( {email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: "1h"});
        
        res.status(200).json({result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.'});
    }
}


export const signup = async (req, res) =>{
        const { email, password, firstName, lastName, confirmPassword } = req.body;

    try{
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json( {message: 'User already exist'});

        if(password !== confirmPassword ) return res.status(400).json({ message: "Password doesn't match"});
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create( {email, password: hashedPassword, name: `${firstName} ${lastName}`});


        const token = jwt.sign( {email: result.email, id: result._id }, 'test', {expiresIn: "1h"});        
        

        return res.status(201).json( {resut, token});

    }catch(error){
        return res.status(500).send(error);
    }

}