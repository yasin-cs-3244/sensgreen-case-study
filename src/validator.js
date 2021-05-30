import { Models } from "./models.js";

class Validator {
    validateRequest(req, control) {
        let result = {
            error: false,
            message: ""
        };
        const options = {
            abortEarly: true, 
            allowUnknown: true, 
            stripUnknown: true 
        };
        let valResult;
        switch (control) {
            case "firm-post":
                valResult = Models.RequestFirmInsertValidationModel.validate(
                    req,
                    options
                );
                break;
            case "firm-delete":
                valResult = Models.RequestFirmDeleteValidationModel.validate(
                    req,
                    options
                );
                break;
            case "firm-update":
                valResult = Models.RequestFirmUpdateValidationModel.validate(
                    req,
                    options
                );
                break;
            case "user-post":
                valResult = Models.RequestUserInsertValidationModel.validate(
                    req,
                    options
                );
                break;
            case "user-delete":
                valResult = Models.RequestUserDeleteValidationModel.validate(
                    req,
                    options
                );
                break;
            case "user-update":
                valResult = Models.RequestUserUpdateValidationModel.validate(
                    req,
                    options
                );
                break;
            case "building-post":
                valResult =
                    Models.RequestBuildingInsertValidationModel.validate(
                        req,
                        options
                    );
                break;
            case "building-delete":
                valResult =
                    Models.RequestBuildingDeleteValidationModel.validate(
                        req,
                        options
                    );
                break;
            case "building-update":
                valResult =
                    Models.RequestBuildingUpdateValidationModel.validate(
                        req,
                        options
                    );
                break;
        }

        if (valResult.error) {
            result.error = true;
            result.message = `Request validation error: ${valResult.error.details
                .map((x) => x.message)
                .join(", ")}`;
        }
        return result;
    }
}

export const ApiValidator = new Validator();
