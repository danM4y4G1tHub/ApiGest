import { User } from "../model/User.model.js";

export const createUser = async (req, res) => {
    try {
        const {rolUser, active} = req.body;
        
        const newUser = await User.create({
            rolUser,
            active
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        const user = await User.findOne({
            where: {
                idUser,
            },
        });

        if(!user) return res.status(404).json({message: "El usuario no existe"});

        res.json(user);
    } catch (error) {
        return res.status().json({message: error.message});
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        const { rolUser, active } = req.body;

        const user = await User.findByPK(idUser);
        user.rolUser = rolUser;
        user.active = active;
        await user.save();

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        await User.destroy({
            where: {
                idUser,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};