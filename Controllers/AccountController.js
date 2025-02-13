const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const uploadFile = require('../service/uploadFirebase');
const Package = require('../middlewares/package');
module.exports = {
    login: async (req, res) => {
        try{
            const {username, password} = req.body;

            if(!username || username.length < 1){
                return res.json(package(7, "Please provide your username!", null));
                
            }else if(!password || password.length < 1){
                return res.json(package(8, "Please provide your password!", null));
            }
    
            // Check email and password in DB
            const hashedPassword = hashPassword(password, process.env.SECRET_SALT);
            const user = {
                username: username,
                password: hashedPassword,
            }

            const userDB = await User.findOne({ username });
            if (!userDB) {
                return res.json(package(10, "Invalid username or password", null));
                
            }

            if (user.password === userDB.password) {
                // Store user information in the session
                const userWithoutPassword = { ...userDB };
                delete userWithoutPassword._doc.password;

                prepairUser = {...userWithoutPassword};
                prepairUser._doc.token = jwt.sign(prepairUser._doc, process.env.SESSION_KEY , { expiresIn: '24h' });
                if(prepairUser._doc.status === 'InActive'){
                    return res.json(package(12, "Your account is not active", null));
                }else if(prepairUser._doc.status === 'Lock'){
                    return res.json(package(12, "Your account is locked by Administator", null));
                }


                return res.json(
                    package(0, "Login success", prepairUser._doc)
                );
                
            } else {
                return res.json(package(10, "Invalid username or password", null));
                
            }
        }
        catch(error){
            return res.json(package(11, "Internal error", error.message));
        }
    },
    changePassword: async (req, res) =>{
        try{
            const token = req.header('Authorization');
            const username = extractUsernameFromToken(token);

            if (!username) {
                return res.json(package(9, "Invalid or expired token", null));
                
            }
    
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;
            const confirmPassword = req.body.confirmPassword;
    
            if (!currentPassword || !newPassword || !confirmPassword) {
                return res.json(package(7, "Please provide complete information.", null));
                
            }

            const userDB = await User.findOne({ username });

            if (!userDB) {
                return res.json(package(10, "Account does not exist", null));
                
            }

            if (hashPassword(currentPassword, process.env.SECRET_SALT) !== userDB.password) {
                return res.json(package(10, "Current password is incorrect", null));
                
            }

            if (newPassword !== confirmPassword) {
                return res.json(package(8, "Confirm password does not match", null));
                
            }

            userDB.password = hashPassword(newPassword, process.env.SECRET_SALT);
            const result = await userDB.save();

            return res.json(package(0, "Password changed successfully", result));

        }catch(error){
            return res.json(package(11, "Internal error", error.message));
        }
    },
    getProfile: async (req, res) =>{
        try{
            const token = req.header('Authorization');
            const username = extractUsernameFromToken(token);

            if (!username) {
                return res.json(package(9, "Invalid or expired token", null));   
            }

            const user = await User.findOne({ username }).lean();

            if (!user) {
                return res.json(package(10, "Account does not exist", null));
                
            }

            delete user.password;

            res.json(package(0, "Get user information successfully", user));

        }catch(error){
            return res.json(package(11, "Internal error", error.message));
        }
    },
    updateProfile: async (req, res) =>{
        try {
            const { username, name } = req.body;
            const image = req.file;

            if(!username || !name){
                return res.send(
                    Package(400, "Missing required parameters", null)
                );
            }
    
            // Find the user by username
            const user = await User.findOne({ username }).lean();
            let _id = await user._id;

            if (!user) {
                return res.send(
                    Package(404, "User not found", null)
                );
            }

            let result;
            if(image){
                const uploadImage = await uploadFile(image);
                const url = uploadImage.data;
                result = await User.findByIdAndUpdate({ _id }, { name, image: url }, { new: true });
            }else{
                result = await User.findByIdAndUpdate({ _id }, { name }, { new: true });
            }
            

            return res.send(Package(0, "Update profile successfully.", result));
        } catch (error) {
            return res.send(Package(500, "Error updating profile.", error.message));
        }
    },
    directLogin: async (req, res) =>{
        try{
            const token = req.body.token;
            if (!token) {
                return res.json(package(1, "Missing required fields", null));
            }

            const user_jwt = jwt.verify(token, process.env.SESSION_KEY);
            if(user_jwt){
                const user = await User.findOne({ username: user_jwt.username }).lean();
                if (!user) {
                    return res.json(package(10, "Invalid username", null));
                }
                delete user.password;

                user.token = jwt.sign(user, process.env.SESSION_KEY , { expiresIn: '1h' });

                if(user.status === 'InActive'){
                    return res.json(package(12, "Your account is not active", user));
                }

                
                return res.json(
                    package(0, "Login success", user)
                );
            }else{
                return res.json(package(403, "This token was not valid or expired", null));
            }
        }
        catch(error){
            return res.json(package(403, "This token was not valid or expired", error.message));
        }
    },
    renewPassword: async (req, res) =>{
        try{
            const token = req.header('Authorization');
            const userToken = jwt.verify(token, process.env.SESSION_KEY);
            const {password} = req.body;
            if(!userToken){
                return res.json(package(402, "You must be login!", userToken))
            }
        
            if(!password){
                return res.json(package(402, "Password can not be null!", password))
            }
        
            if(password.length > 36){
                return res.json(405, "The length of password must be less than 36 chars!", null);
            }
        
            const hashedPassword = hashPassword(password, process.env.SECRET_SALT);
            // Find the user by email
            const email = userToken.email;
            const user = await User.findOne({ email }).lean();

            if (!user) {
                return res.json(package(404, "Can not find the user", null));
            }

            // Update the user's name and image
            const result = await User.findOneAndUpdate(
                { email: userToken.email },
                { $set: { password: hashedPassword, status: 'Active' } },
                { new: true }
            );
            return res.json(
                package(0, "Successfully", result)
            );
        }
        catch(error){
            return res.json(package(404, "The request failed", error.message));
        }
    },
    create_admin: async (req, res) =>{
        const {name, email, password} = req.body;
		const username = extractUsername(email);

        // Check null or empty string
        if(!username || !name || !email || !password){
            
            res.json(package(1, "Missing username or name or email or password", null));
            return;
        }

        // Check email format
        const regex = /\S+@\S+\.\S+/;
        if(!regex.test(email)){
            res.json(package(2, "Invalid email format", null));
            return;
        }

        // Check password format length 6-> 32
        if(password.length < 6 || password.length > 32){
            res.json(package(3, "Password length must be from 6 to 32", null));
            return;
        }


        // Hash the password using SHA-256 and the salt
        const hashedPassword = hashPassword(password, process.env.SECRET_SALT);


        // Information Ok => Register
        const user = {
            username: username,
            name: name,
            email: email,
            password: hashedPassword,
            image: process.env.DEFAULT_AVATAR,
            role: 'Administrator',
            status: 'Active'
        }
        
        persitUser(req, res, user);
    }
} 


// Sub functions
function extractUsernameFromToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.SESSION_KEY);
        return decoded.username;
    } catch (error) {
        console.error('Error extracting username from token:', error);
        return null;
    }
}

// Save to DB and session
function persitUser(req, res, user){
    User.findOne({ username: user.username }).then((userFound) => {
        if (userFound) {

              res.json(package(4, "username already exists", null));
          
              return;
        }
        
        // User does not exist, create a new user
        const newUser = new User(user);
        
        newUser.save().then(() => {
          // Establish the session after user creation
          const userWithoutPassword = { ...user };
          delete userWithoutPassword.password;

          res.json(package(0, "Register successfully", userWithoutPassword));
        }).catch((err) => {

          res.json(package(5, "Register failed", err));

        });
      }).catch((err) => {

        res.json(package(5, "Register failed", err));

      });
}