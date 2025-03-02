const express = require("express");
const router = express.Router();
const auth = require("../config/firebase");

// 📌 Registro de usuario
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRecord = await auth.createUser({
            email,
            password,
        });
        res.status(201).send(`Usuario registrado: ${userRecord.email}`);
    } catch (error) {
        res.status(400).send(`Error en el registro: ${error.message}`);
    }
});

//  Login (Solo devuelve el token, frontend debería manejar la sesión)
router.post("/login", async (req, res) => {
    const { idToken } = req.body;
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        res.status(200).json({ message: "Autenticado", uid: decodedToken.uid });
    } catch (error) {
        res.status(401).send("Token inválido");
    }
});

// 📌 Logout (En Firebase, el logout es manejado en el frontend)
router.post("/logout", (req, res) => {
    res.status(200).send("Cierre de sesión exitoso");
});

module.exports = router;
