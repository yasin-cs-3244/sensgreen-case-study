import Joi from "joi";

export const Models = {
  
    RequestFirmInsertValidationModel: Joi.object({
        body: Joi.object({
            name: Joi.string().max(50).required()
        })
    }),
    RequestFirmDeleteValidationModel: Joi.object({
        body: Joi.object({
            id: Joi.number().greater(0).required()
        })
    }),
    RequestFirmUpdateValidationModel: Joi.object({
        body: Joi.object({
            id: Joi.number().greater(0).required(),
            name: Joi.string().max(50).required()
        })
    }),
    RequestUserInsertValidationModel: Joi.object({
        body: Joi.object({
            name: Joi.string().max(50).required(),
            surname: Joi.string().max(50).required(),
            firmId: Joi.number().greater(0).required()
        })
    }),
    RequestUserDeleteValidationModel: Joi.object({
        body: Joi.object({
            id: Joi.number().greater(0).required()
        })
    }),
    RequestUserUpdateValidationModel: Joi.object({
        body: Joi.object({
            id: Joi.number().greater(0).required(),
            name: Joi.string().max(50).required(),
            surname: Joi.string().max(50).required(),
            firmId: Joi.number().greater(0).required()
        })
    }),
    RequestBuildingInsertValidationModel: Joi.object({
        body: Joi.object({
            name: Joi.string().max(50).required(),
            firmId: Joi.number().greater(0).required()
        })
    }),
    RequestBuildingDeleteValidationModel: Joi.object({
        body: Joi.object({
            id: Joi.number().greater(0).required()
        })
    }),
    RequestBuildingUpdateValidationModel: Joi.object({
        body: Joi.object({
            id: Joi.number().greater(0).required(),
            name: Joi.string().max(50).required(),
            firmId: Joi.number().greater(0).required()
        })
    })
};
