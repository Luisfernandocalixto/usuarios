const { validatePartialUser } = require("../verify/functions");
const User = require('../model/User.js');
const ITEMS_PER_PAGE = 5;
class UserController {

    //  Fetch All Users
    static async getUsers(req, res) {
        try {
            let {page} = req.query;
            if(!page) page = 1;
            // Is important offset for pagination
            const offset = (page - 1) * ITEMS_PER_PAGE;

            const queryUsers = await User.find({},{__v: 0})
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(ITEMS_PER_PAGE);

            const users = queryUsers.map(user => {
                return {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                }
            })

            const  queryPages = await User.find().countDocuments();
            
            const totalPages = Math.ceil(Number(queryPages) / ITEMS_PER_PAGE)

            return res.status(200).json({users, totalPages});
        } catch (error) {
            return res.status(500).json({ message: 'Error internal server, error show users' })
        }
    };


    //  Fetch a Single User by ID
    static async getUser(req, res) {
        try {
            const {id} = req.params;
            const verify = validatePartialUser({ id });
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => `${err.message}, `);
                return res.status(400).json(errors)
            }

            const queyUser = await User.findOne({_id: id},{__v:0});

            const user = {
                id: queyUser._id,
                email: queyUser.email,
                name: queyUser.name,
            }

            return res.status(200).json(user);



        } catch (error) {
            return res.status(500).json({ message: 'Error internal server, error show user' })
        }
    };

    //  Add User 
    static async createUser(req, res) {
        try {
            const verify = validatePartialUser(req.body);
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => `${err.message}, `);
                return res.status(400).json(errors)
            }
            
            const newUser = new User({
                name: verify.data.name,
                email: verify.data.email
                
            })
            
            const result = await newUser.save()
            const user = {id: result._id,name:result.name,email:result.email}
            
            return res.status(200).json(user);
            
        } catch (error) {
            return res.status(500).json({ message: 'Error internal server, error adding to user' })
        }
    };

    //  Update User by ID  
    static async updateUser(req, res) {
        try {
            const verify = validatePartialUser(req.params);
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => `${err.message}, `);
                return res.status(400).json(errors)
            }

            const exist = await User.exists({_id: verify.data.id});
            if(!exist) return res.status(500).json('User not found');
            
            const result = await User.findByIdAndUpdate(verify.data.id, { name: req.body.name, email: req.body.email });
            const user = {id: result.id, name:req.body.name, email: result.email};

            return res.status(200).json(user);
            
            
        } catch (error) {
            return res.status(500).json({ message: 'Error internal server' })
        }
    };

    //  Delete  User by ID  
    static async deleteUser(req, res) {
        try {
            const verify = validatePartialUser(req.params);
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors = message.map(err => `${err.message}, `);
                return res.status(400).json(errors)
            }

            const exist = await User.exists({_id: verify.data.id});
            if(!exist) return res.status(500).json('User not found');

            const result = await User.findByIdAndDelete({_id:verify.data.id});
            const user = {id: result._id, name: result.name, email: result.email}

            return res.status(200).json(user);


        } catch (error) {
            return res.status(500).json({ message: 'Error internal server' });
        }
    };
    
    
    
}



module.exports = UserController

