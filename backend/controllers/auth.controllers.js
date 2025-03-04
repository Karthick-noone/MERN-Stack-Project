import User from '../models/user.models.js  '
import bcrypt, { hash } from 'bcryptjs'
import generateToken from '../utils/generateToken.js'

export const signup =async (req, res) => {
    // res.send("signup controller");
    try {

        

        const  {username, fullName, email, password}  = req.body

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if(!emailRegex.test(email)){
            return res.status(400).json({ error: "Invalid email format"})
        }

        // const existingUser = await User.findOne({email : email}) this method is aldo valid
        const existinEmail = await User.findOne({email})
        const existingUser = await User.findOne({username})

        if(existinEmail || existingUser){
            return res.status(400).json({error : "Email or Username is already exists"})
        }

        if(password.length < 6 ){
            return res.status(400).json({error: "Password must have 6 characters or more"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        const newUser =  new User({
            username: username,
            fullName : fullName,
            email:email,
            password: hashedpassword
        })
            

        if(newUser){

            generateToken(newUser._id, res)
            await newUser.save();
            res.status(200).json({
                _id : newUser._id,
                username: newUser.username,
                fullName:newUser.fullName,
                email:newUser.email,
                followers:newUser.followers,
                following: newUser.following,
                profileImg:newUser.profileImg,
                coverImg:newUser.coverImg,
                bio:newUser.bio,
                link:newUser.link    
            })
        }
        else{
            res.status(400).json({error: "Invalid user data"})
        }
        
    } catch (error) {

        console.log(`Error in signup controller: ${error}`)
        res.status(500).json({error: "Internal Server Error"})
        
    }

}

export const login =async (req, res) => {
   try {
     const {username, password} = req.body;
     const user = await User.findOne({username})
     const isPasswordCorrect = await bcrypt.compare(password, user?.password  || "");

     if(!user || !isPasswordCorrect){
        return res.status(404).json({error:"User not found"})
     }
     generateToken(user._id, res);

     res.status(200).json({
        _id : user._id,
        username: user.username,
        fullName:user.fullName,
        email:user.email,
        followers:user.followers,
        following: user.following,
        profileImg:user.profileImg,
        coverImg:user.coverImg,
        bio:user.bio,
        link:user.link    
     })
   } catch (error) {
    console.log(`Error in login controller: ${error}`)
    res.status(500).json({error: "Internal Server Error"})
   }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt","", {maxAge: 0})
        res.status(200).json({message: "Logout Successfully"})
    } catch (error) {
        console.log(`Error in login controller: ${error}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}


export const getMe = async (req, res) => {
    try {

        const user = await User.findOne({_id: req.user._id}).select("-password")
        res.status(200).json(user)
        
    } catch (error) {
        console.log(`Error in protected middleware: ${error}`)
        res.status(500).json({error: "Internal Server Error"})
    }
 }


