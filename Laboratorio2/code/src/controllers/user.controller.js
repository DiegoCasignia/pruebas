let users = [];

function getAllUsers(req, res) {
    return res.json(users);
}

function createUser(req, res) {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = {
        id: Date.now(),
        name,
        email
    };

    users.push(newUser);

    res.status(201).json(newUser);
}

function updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
}

function deleteUser(req, res) {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
}

function resetUsers() {
    users = [];
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    resetUsers
};