const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");
const path = require("path");

const { showDashboard } = require('../controllers/authController');

//login pag
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

//Registro de usuario
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRecord = await admin.auth.createUser({
            email,
            password,
        });
        res.status(201).send(`Usuario registrado: ${userRecord.email}`);
    } catch (error) {
        res.status(400).send(`Error en el registro: ${error.message}`);
    }
});

//  Login 
router.post("/login", async (req, res) => {
    const { idToken } = req.body;
    try {
        const decodedToken = await admin.auth.verifyIdToken(idToken);
        const userRecord = await admin.auth().getUser(decodedToken.uid);
        const isAdmin = userRecord.customClaims && userRecord.customClaims.admin;
        res.cookie("token", idToken, { httpOnly: true });

        if (isAdmin) {
            res.redirect("/dashboard");
        } else {
            res.redirect("/home"); 
        }
        res.status(200).json({ message: "Autenticado", uid: decodedToken.uid });
    } catch (error) {
        res.status(401).send("Token inválido");
    }
});

// Logout 
router.post("/logout", (req, res) => {
    res.status(200).send("Cierre de sesión exitoso");
});
router.get('/dashboard',  showDashboard);

module.exports = router;
