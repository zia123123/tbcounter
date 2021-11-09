const { pasiens } = require('../models/index');
const bcrypt = require('bcrypt'); 
const authConfig = require('../../config/auth');  
const apiResponse = require("../helpers/apiResponse");

module.exports = {


  sign(req, res) {
    let { noktp, password } = req.body;
        pasiens.findOne({
            where: {
              noktp: noktp  
            },
        }).then(pasien => {
            if (!pasien) {
                res.status(404).json({ message: "Password Salah" });
            } else {
                if (bcrypt.compareSync(password, pasien.password)) {         
                    res.json({
                        status: 200,
                        message:"SUCCESS",
                        data: pasien,
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

   


    //create
    async create(req, res) { 
      let password = bcrypt.hashSync("tbcounter", Number.parseInt(authConfig.rounds))
        let result = await pasiens.create({
            nama: req.body.nama,
            noktp: req.body.noktp,
            alamat: req.body.alamat,  
            password: password, 
            jeniskelamin: req.body.jeniskelamin,
            notelppasien: req.body.notelppasien,
            notelppmo: req.body.notelppmo,
            pekerjaan: req.body.pekerjaan,
            jumlahhari: 0,
            jumlahobat: 0,
            status: false,
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {  
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let pasien = await pasiens.findByPk(req.params.id);
        if (!pasien) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.pasien = pasien;
            next();
        }
    },

    async index(req, res) {
        let result = await pasiens.findAll({  
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.pasien);
    },

    // Update
    async update(req, res) {
        req.pasien.nama = req.body.nama;
        req.pasien.noktp = req.body.noktp;
        req.pasien.alamat = req.body.alamat;
        req.pasien.jeniskelamin= req.body.jeniskelamin,
        req.pasien.notelppasien= req.body.notelppasien,
        req.pasien.notelppmo= req.body.notelppmo,
        req.pasien.pekerjaan= req.body.pekerjaan,
        req.pasien.jumlahhari= req.body.jumlahhari,
        req.pasien.jumlahobat= req.body.jumlahobat,
        req.pasien.save().then(pasien => {
        return apiResponse.successResponseWithData(res, "SUCCESS", pasien);
        })
    },

    async updateJumlahHari(req, res) {
      req.pasien.jumlahhari= req.body.jumlahhari,
      req.pasien.save().then(pasien => {
      return apiResponse.successResponseWithData(res, "SUCCESS", pasien);
      })
  },
    async updateJumlahObat(req, res) {
      req.pasien.jumlahobat= req.body.jumlahobat,
      req.pasien.save().then(pasien => {
      return apiResponse.successResponseWithData(res, "SUCCESS", pasien);
      })
},


}
