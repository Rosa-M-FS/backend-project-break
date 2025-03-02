//esto es bonus
const showDashboard =(req, res)=>{
    try{
        res.send('Bienvenido al Dashboard');
    }
    catch (error) {
        console.error("Error cargando dashboard:", error);
        res.status(500).send("Error cargando dashboard");
    }
};
module.exports={ showDashboard }