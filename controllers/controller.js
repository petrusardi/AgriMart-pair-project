// const {  } = require("../models")
// const { Op } = require("sequelize")
// const { } = require("../helper")

class Controller {
    static async showAll(req, res) {
        try {
            res.send("ini home")
        } catch (error) {
            res.send(error)
        }
    }

    static async register(req, res) {
        try {
            res.send("ini regist users")
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            res.send("ini post regist users")
        } catch (error) {
            res.send(error)
        }
    }

    static async login(req, res) {
        try {
            res.send("ini login")
        } catch (error) {
            res.send(error)
        }
    }

    static async getOrders(req, res) {
        try {
            res.send("ini order di cart")
        } catch (error) {
            res.send(error)
        }
    }

    static async buyOrders(req, res) {
        try {
            res.send("ini klik buy")
        } catch (error) {
            res.send(error)
        }
    }

    static async detailProduct(req, res) {
        try {
            res.send("ini detail Product")
        } catch (error) {
            res.send(error)
        }
    }

    static async getProduct(req, res) {
        try {
            res.send("masukin product ke keranjang")
        } catch (error) {
            res.send(error)
        }
    }

    static async editProduct(req, res) {
        try {
            res.send("edit product buat seller")
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditProduct(req, res) {
        try {
            res.send("post edit product")
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteOrder(req, res) {
        try {
            res.send("delete order di cart")
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller