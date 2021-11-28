const { minumobats,pasiens } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async create(req, res) { 
        let result = await minumobats.create({
            pasienId: req.body.pasienId,
            keterangan: "Sudah Minum Obat",
        }).then(result => {
            let pasien = pasiens.findOne({
                where: {
                    id:  req.body.pasienId
                },
            }).then(pasien =>{
                pasien.jumlahhari = pasien.jumlahhari-1;
                pasien.jumlahobat = pasien.jumlahobat-1;
                pasien.save()
            })
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },


    async indexMinum(req, res) {
        let result = await minumobats.findAll({
            where: {
                pasienId: req.params.pasienId
            }
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    async indexMinumsemua(req, res) {
        let result = await minumobats.findAll({
           
            include: [ 
                { model: pasiens,
                    attributes: ['nama','notelppasien'],
                }
            ]
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

  
}
