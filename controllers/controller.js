const {Product, Category, User, Order, Profile} = require("../models")
const bcrypt = require('bcryptjs')
// const {  } = require("../models")
const { Op } = require("sequelize")
const { formatRp } = require("../helper")

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
            const { search } = req.query
            let option = {}
            if (search) {
                option = {name:{
                    [Op.iLike]: `%${search}%`
                }}
            }
            let data = await Product.getCategory(Category, option)
            res.render("homepage",{data, formatRp})
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
            const { username, email, address, password, role} = req.body
            await User.create({username,email, password, role})
            let data = await User.findAll({limit:1, order:[['createdAt','DESC']]})
            let userId = data[0].dataValues.id
            // console.log(data);
            await Profile.create({UserId:userId,email, address})
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
            let data = req.session.userId
            let { ProductId } = req.params
            await Order.create({CustomerId:data, ProductId})
            res.redirect("/home")
        } catch (error) {
            res.send(error)
        }
    }

    static async buyOrders(req, res) {
        try {
            let data = await Order.getProd(Product)
            res.render("cartpage", {data, formatRp})
        } catch (error) {
            res.send(error)
        }
    }

    static async detailProduct(req, res) {
        try {
            let { ProductId:id } = req.params
            let data = await Product.findByPk(+id)
            let cat = await Category.findByPk(data.CategoryId)
            res.render("detail-product",{data, cat, formatRp})
        } catch (error) {
            res.send(error)
        }
    }

    static async addProduct (req, res) {
        try {
            // let { path, msg } = req.query
            let data = await Category.findAll()
            res.render("form-add", {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async postAddProduct (req, res) {
        try {
            let data = req.session.userId
            let {name, CategoryId, price, imgUrl, description} = req.body;
            await Product.create({name, UserId:data, CategoryId, price, imgUrl, description});
            res.redirect("/home")
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
            let { OrderId : id } = req.params;
            let option = {id}
            let data = await Order.getProd(Product, option)
            console.log(data);
            await Order.destroy({ where: { id } })
            res.redirect(`/cart`)
            // /cart/<%=el.id%>/products/<%=el.Product.id%>/delete
        } catch (error) {
            res.send(error.message)
        }
    }

    static getLogout (req, res) {
        req.session.destroy((err) => {
            if(err) res.send(err)
            else{res.redirect('/login')}
        })
    }
}

module.exports = Controller