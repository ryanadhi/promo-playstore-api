const userController = {
    getUsers: (req, res) => {
        res.json({
            message: "get users"
        });
    },
    postUsers: (req, res) => {
        res.json({
            message: "post users"
        });
    }
}

module.exports = userController;