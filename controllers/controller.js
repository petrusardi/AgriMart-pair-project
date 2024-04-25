const {Product,Category, User} = require("../models")
const bcrypt = require('bcryptjs')
// const {  } = require("../models")
// const { Op } = require("sequelize")
// const { } = require("../helper")

class Controller {
    static async landing(req, res) {
        try {
            res.render("landingpage")
            // res.send(data)
        } catch (error) {
            res.send(error)
        }
    }

    static async showAll(req, res) {
        try {
            let data = await Product.getCategory(Category)
            res.render("homepage",{data})
            // res.send(data)
        } catch (error) {
            res.send(error)
        }
    }

    static async register(req, res) {
        try {
            res.render("register")
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            const {username,email, password, role} = req.body
            await User.create({username,email, password, role})
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }

    static async login(req, res) {
        try {
            const {error} = req.query
            res.render('login', {error})
        } catch (error) {
            res.send(error)
        }
    }

    static postLogin(req, res) {
        const {email,password} = req.body
        User.findOne({where: {email}})
        .then (user => {
            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)

                if (isValidPassword) {
                    req.session.userId = user.id
                    return res.redirect('/home')
                } else {
                    const error = "invalid email/password"
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = "invalid email/password"
                return res.redirect(`login?error=${error}`)
            }
        })
        .catch(err => res.send(err))
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
            let { ProductId:id } = req.params
            let data = await Product.findByPk(+id)
            let cat = await Category.findByPk(data.CategoryId)
            res.render("detail-product",{data, cat})
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
            const { ProductId } = req.params
            const products = await Product.findByPk(ProductId)
            const category = await Category.findByPk(products.CategoryId)
            res.render('editProduct', { products, category })
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditProduct(req, res) {
        try {
            let { 
                name, description, price } = req.body
                let { ProductId } = req.params;
                Product.update({name, description, price }, 
                    { where: { id: ProductId }})
        
                  res.redirect('/')
            res.redirect(`/products/${ProductId}/edit`)
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteOrder(req, res) {
        try {
            const { ProductId } = req.params

            await Employee.destroy({
              where: { ProductId }
            })
            res.send("delete order di cart")
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller