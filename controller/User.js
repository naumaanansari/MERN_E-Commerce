const { User } = require("../model/User")

exports.createUser = async (req, res) => {
    const user = new User(req.body)

    try {
        const doc = await user.save()
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchUserById = async (req, res) => {
    const {id} = req.user;
    try {
        const user = await User.findById(id);
        
        res.status(200).json({id:user.id, addresses: user.addresses,email: user.email,role:user.role});
    } catch (err) {
        res.status(400).json(err);
    }    
}

exports.updateUser = async (req,res) => {
    const {id}= req.params;
    try {
        const user = await User.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }    
}


