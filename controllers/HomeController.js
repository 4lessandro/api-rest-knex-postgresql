class HomeController{

    async index(req, res) {
        res.send('Página Inicial');
    }

    async validate(req, res) {
        res.send('Tudo OK')
    }

}

module.exports = new HomeController();