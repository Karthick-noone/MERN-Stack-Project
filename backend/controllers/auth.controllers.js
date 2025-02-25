import User from '../models/user.models.js  '
export const signup =async (req, res) => {
    // res.send("signup controller");
    try {

        const  {username, fullname, email, password}  = req.body

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if(!emailRegex.text(email)){
            return res.status(400).json({ error: "Invalid email format"})
        }

        // const existingUser = await User.findOne({email : email}) this method is aldo valid
        const existinEmail = await User.findOne({email})
        const existingUser = await User.findOne({username})

        if(existinEmail || existingUser){
            return res.status(400).json({error : "Email or Username is already exists"})
        }
            
        
    } catch (error) {

        console.log(`Error in signup controller: ${error}`)
        res.status(500).json({error: "Internal Server Error"})
        
    }

}

export const login = (req, res) => {
    res.send("login controller");
}

export const logout = (req, res) => {
    res.send("logout controller");
}


