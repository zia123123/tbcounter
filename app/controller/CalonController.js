const { calons } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async create(req, res) { 
        var photo = req.files.photo == null ? null : req.files.photo[0].filename
        let result = await calons.create({
            nourut: req.body.nourut,
            nama: req.body.nama,
            visi: req.body.visi,
            voteId: req.body.voteId,
            archived: false,
            photo: photo
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let calon = await calons.findByPk(req.params.id);
        if (!calon) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.calon = calon;
            next();
        }
    },

    async indexCalon(req, res) {
        let result = await calons.findAll({
            where: {
                archived: false,
                voteId: req.params.voteId
            },
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    
    async indexAll(req, res) {
        let result = await calons.findAll({
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.calon);
    },

    // Update
    async update(req, res) {
        req.calon.nourut = req.body.nourut;
        req.calon.nama = req.body.nama;
        req.calon.visi = req.body.visi;
        req.calon.save().then(calon => {
        return apiResponse.successResponseWithData(res, "SUCCESS", calon);
        })
    },

    // Delete
    async delete(req, res) {
        req.calon.archived = true;
        req.calon.save().then(calon => {
        return apiResponse.successResponseWithData(res, "SUCCESS", calon);
        })
    },

}
