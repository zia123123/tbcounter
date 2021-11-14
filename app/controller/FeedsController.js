const { feeds } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async create(req, res) { 
        let result = await feeds.create({
            pembuat : req.body.pembuat,
            judul: req.body.judul,
            content: req.body.content,
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let feed = await feeds.findByPk(req.params.id);
        if (!feed) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.feed = feed;
            next();
        }
    },

    async index(req, res) {
        let result = await feeds.findAll({
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.feed);
    },

    // Delete
    async delete(req, res) {
        req.feed.destroy().then(feed => {
            res.json({ msg: "Berhasil di delete" });
        })
    },

}
