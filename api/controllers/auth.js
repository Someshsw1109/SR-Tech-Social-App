import  {db}  from "../myappconnection.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists");

        // Hashing the password
        const salt = bcrypt.genSaltSync(10);
        const hashedpass = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = "INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)";
        const values = [req.body.username, req.body.email, hashedpass, req.body.name];

        db.query(insertQuery, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been added to our world");
        });
    });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};