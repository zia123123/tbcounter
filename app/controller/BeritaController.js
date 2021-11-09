const { beritas } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async create(req, res) { 
        var photo = req.files.photo == null ? null : req.files.photo[0].filename
        let result = await beritas.create({
            judul: req.body.judul,
            deskripsi: req.body.deskripsi,
            archived: false,
            photo: photo
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let berita = await beritas.findByPk(req.params.id);
        if (!berita) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.berita = berita;
            next();
        }
    },

    async index(req, res) {
        let result = await beritas.findAll({
            where: {
                archived: false
            },
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.berita);
    },

    // Update
    async update(req, res) {
        req.berita.judul = req.body.judul;
        req.berita.deskripsi = req.body.deskripsi;
        req.berita.save().then(berita => {
        return apiResponse.successResponseWithData(res, "SUCCESS", berita);
        })
    },

    // Delete
    async delete(req, res) {
        req.berita.archived = true;
        req.berita.save().then(berita => {
        return apiResponse.successResponseWithData(res, "SUCCESS", berita);
        })
    },

}
