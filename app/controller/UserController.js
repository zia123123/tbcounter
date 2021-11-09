const { users,validates } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth');
const apiResponse = require("../helpers/apiResponse");

module.exports = {
    //create
  async createValidate(req, res) { 
    validates.create({
        noktp: req.body.noktp,
        nama: req.body.nama,
        rt: req.body.rt,
        blok: req.body.blok,
        status : false,
        archived : false
    }).then(validates => {
        return apiResponse.successResponseWithData(res, "SUCCESS", validates);
    }).catch(err => {
        return apiResponse.ErrorResponse(res, err);
    });
   },



async signupUser(req, res) { 
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds))
    let result = await users.create({
        username: req.body.username,
        password: password,
        noktp : req.body.noktp,
        archived: false
    }).then(result => {
        let validate = validates.findOne({
            where: {
                noktp:  req.body.noktp
            },
        }).then(validate =>{
            validate.status = true;
            validate.save()
        })
        return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
    }).catch(function (err)  {
        return apiResponse.ErrorResponse(res, err);
    });
  },

//login
signInUser(req, res) {
    let { username, password } = req.body;
        users.findOne({
            where: {
                username: username
            },
        }).then(user => {
            if (!user) {
                res.status(404).json({ message: "Password Salah" });
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                     
                    res.json({
                        status: 200,
                        message:"SUCCESS",
                        data: user,
                        token: token
                    })
                } else {
                    // Unauthorized Access
                    res.status(401).json({ msg: "Password Salah" })
                }
            }
        }
        ).catch(err => {
            res.status(500).json(err);
        })   
    },


 //FIND
 async find(req, res, next) {
    let user = await users.findByPk(req.params.id);
    if (!user) {
    return apiResponse.notFoundResponse(res, "Not Fond");
    } else {
        req.user = user;
        next();
    }
},


    //FIND
    async findValidate(req, res, next) {
        let validate = await validates.findByPk(req.params.id);
        if (!validate) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.validate = validate;
            next();
        }
    },

async findKtp(req, res, next) {
    let user = await users.findOne({
        where: {
            noktp: req.params.ktp
        }
    });
    if (!user) {
    return apiResponse.notFoundResponse(res, "Not Fond");
    } else {
        req.user = user;
        next();
    }
},
//FIND BY NO KTP
async cektp(req, res, next) {
    let { noktp } = req.body;
    let validate = await validates.findOne({
        where: {
            noktp: noktp
        }
    });
    if (!validate) {
    return apiResponse.notFoundResponse(res, "Maaf Nomor KTP tidak terdaftar");
    } else {
        req.validate = validate;
        next();
    }
},

async cektpku(req, res, next) {
    let validate = await validates.findOne({
        where: {
            noktp: req.params.ktp
        }
    });
    if (!validate) {
    return apiResponse.notFoundResponse(res, "Maaf Nomor KTP tidak terdaftar");
    } else {
        req.validate = validate;
        next();
    }
},
//CEK SUDAH REGIS ATAU BELUM
async cekstatus(req, res) {
    if (req.validate.status == true) {
        return apiResponse.successResponseWithData(res, "Success", req.validate);
        } else {
            return apiResponse.successResponseWithData(res, "Lanjut", req.validate);
        }
},



//INDEX  
async index(req, res) {
    let result = await users.findAll().then(result => {
        return apiResponse.successResponseWithData(res, "SUCCESS", result);
        }).catch(function (err){
            return apiResponse.ErrorResponse(res, err);
        });
},
//all validate
async indexvalidate(req, res) {
    let result = await validates.findAll().then(result => {
        return apiResponse.successResponseWithData(res, "SUCCESS", result);
        }).catch(function (err){
            return apiResponse.ErrorResponse(res, err);
        });
},
 // Show
 async show(req, res) {
    return apiResponse.successResponseWithData(res, "SUCCESS", req.validate );
},
 // Show
 async showUser(req, res) {
    return apiResponse.successResponseWithData(res, "SUCCESS", req.user );
},

async updatePassword(req, res) {
    let password = bcrypt.hashSync("password123", Number.parseInt(authConfig.rounds))
    req.user.password = password;
    req.user.save().then(user => {
    return apiResponse.successResponseWithData(res, "Password Berhasil di update Menjadi : password123", user);
    })
},

// Update to true
async updateTrue(req, res) {
    req.validate.status = true;
    req.validate.save().then(validate => {
    return apiResponse.successResponseWithData(res, "SUCCESS", validate);
    })
},

    // Update to true
    async updateValidate(req, res) {
        req.validate.noktp = req.body.noktp;
        req.validate.save().then(validate => {
        return apiResponse.successResponseWithData(res, "SUCCESS", validate);
        })
    },

     // Update to true
     async updateNama(req, res) {
        req.validate.nama = req.body.nama;
        req.validate.save().then(validate => {
        return apiResponse.successResponseWithData(res, "SUCCESS", validate);
        })
    },

    async updateRt(req, res) {
        req.validate.rt = req.body.rt;
        req.validate.save().then(validate => {
        return apiResponse.successResponseWithData(res, "SUCCESS", validate);
        })
    },


    // Delete

    async deleteUser(req, res) {
    req.user.destroy().then(user => {
        res.json({ msg: "Berhasil di delete" });
    })

    },

    async deleteValidate(req, res) {
        req.user.destroy().then(vote => {
            res.json({ msg: "Berhasil di delete" });
        })
    }


}