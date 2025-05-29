let users = [];

function getAllUsers(req, res) {
    return res.json(users);
}

function createUser(req, res) {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required'});
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email
    };

    users.push(newUser);

    res.status(201).json(newUser);
}

module.exports = {
    getAllUsers,
    createUser
};