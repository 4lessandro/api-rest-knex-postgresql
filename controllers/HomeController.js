class HomeController{

    async index(req, res){
        res.send("Página Inicial");
    }

}

module.exports = new HomeController();