const { votes } = require('../models/index');
const { Op } = require("sequelize");
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async create(req, res) { 
        var photo = req.files.photo == null ? null : req.files.photo[0].filename
        let result = await votes.create({
            judul: req.body.judul,
            deskripsi: req.body.deskripsi,
            archived: false,
            rw: req.body.rw,
            rt: req.body.rt,
            photo: photo
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let vote = await votes.findByPk(req.params.id);
        if (!vote) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.vote = vote;
            next();
        }
    },
    async findRt(req, res, next) {
        let vote = await votes.findAll({
            where: {
                [Op.or]: [
                    {rt: req.params.rt},
                    {rw: true}
                ]
            },
        });
        if (!vote) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.vote = vote;
            next();
        }
    },


    async index(req, res) {
        let result = await votes.findAll({
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
        return apiResponse.successResponseWithData(res, "SUCCESS", req.vote);
    },

    // Update
    async update(req, res) {
        req.vote.judul = req.body.judul;
        req.vote.deskripsi = req.body.deskripsi;
        req.vote.rt = req.body.rt;
        req.vote.save().then(vote => {
        return apiResponse.successResponseWithData(res, "SUCCESS", vote);
        })
    },

    // Delete
    async delete(req, res) {
        req.vote.destroy().then(vote => {
            res.json({ msg: "Berhasil di delete" });
        })
    },

}
