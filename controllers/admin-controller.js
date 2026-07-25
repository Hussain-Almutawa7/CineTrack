const Review = require("../models/review");
const User = require("../models/user");

const showUsers = async (req, res) => {
    const users = await User.find();

    res.render("admin/manage-users.ejs", { users });
}

const showUser = async (req, res) => {

}

const addUser = async (req, res) => {
    
}

const editUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

module.exports = {
    showUsers,
    showUser,
    addUser,
    editUser,
    deleteUser,
}