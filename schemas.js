const joi = require('joi');

module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        name: joi.string().required(),
        careerObjective: joi.string().required(),
        ssc: joi.number().required().min(0).max(100),
        hsc: joi.number().required().min(0).max(100),
        graduation: joi.number().required().min(0).max(10),
        // image: joi.string().required(),
        skill: joi.string().required(),
        project: joi.string().required(),
        internship: joi.string().required(),
        achievement: joi.string().required()
    }
    ).required()
});



