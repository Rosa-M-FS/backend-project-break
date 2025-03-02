const admin = require("./config/firebase");

async function makeAdmin(email) {
    try {
        
        const user = await admin.auth().getUserByEmail(email);

        //asignar ser admin
        await admin.auth().setCustomUserClaims(user.uid, { admin: true });

        console.log(`✅ Usuario ${email} ahora es administrador.`);
    } catch (error) {
        console.error("❌ Error asignando rol de admin:", error.message);
    }
}


makeAdmin("admin@roseshop.com");
