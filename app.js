import express from "express";
import bodyParser from "body-parser";
import {
    deleteBuilding,
    deleteFirm,
    deleteUser,
    getBuildings,
    getFirms,
    getUsers,
    insertBuilding,
    insertFirm,
    insertUser,
    updateBuilding,
    updateFirm,
    updateUser,
    getFirmsDetail
} from "./src/controller.js";
import { ApiValidator } from "./src/validator.js";

class RestApi {
    _app = express();
    _PORT = 8000;

    run() {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));

        this._app.get("/", (req, res) => {
            res.send("Sensgreen Case Study");
        });

        this._app.get("/firms", getFirms());
        this._app.post(
            "/firm",
            (req, res, next) => {
            
                const validationResult = ApiValidator.validateRequest(
                    req,
                    "firm-post"
                );
                
                if (validationResult.error) {
                    res.status(500).json({ message: validationResult.message });
                } else {
                    next();
                }
            },
            insertFirm()
        );
        this._app.delete(
            "/firm",
            (req, res, next) => {
                
                const validationResult = ApiValidator.validateRequest(
                    req,
                    "firm-delete"
                );
                if (validationResult.error) {
                    res.status(500).json({ message: validationResult.message });
                } else {
                    next();
                }
            },
            deleteFirm()
        );
        this._app.put(
            "/firm",
            (req, res, next) => {
                const validationResult = ApiValidator.validateRequest(
                    req,
                    "firm-update"
                );
                if (validationResult.error) {
                    res.status(500).json({ message: validationResult.message });
                } else {
                    next();
                }
            },
            updateFirm()
        );
        this._app.get("/users", getUsers());
        this._app.post(
            "/user",
            (req, res, next) => {
                const validationResult = ApiValidator.validateRequest(
                    req,
                    "user-post"
                );
                if (validationResult.error) {
                    res.status(500).json({ message: validationResult.message });
                } else {
                    next();
                }
            },
            insertUser()
        );
        this._app.delete(
            "/user",
            (req, res, next) => {
                const validationResult = ApiValidator.validateRequest(
                    req,
                    "user-delete"
                );
                if (validationResult.error) {
                    res.status(500).json({ message: validationResult.message });
                } else {
                    next();
                }
            },
            deleteUser()
        );
        this._app.put(
            "/user",
            (req, res, next) => {
                const validationResult = ApiValidator.validateRequest(
                    req,
                    "user-update"
                );
                if (validationResult.error) {
                    res.status(500).json({ message: validationResult.message });
                } else {
                    next();
                }
            },
            updateUser()
        );
        this._app.get("/buildings", getBuildings());
        this._app.post(
            "/building",
            (req, res, next) => {
                const validationResult = ApiValidator.validateRequest(
                    req,
                    "building-post"
                );
                if (validationResult.error) {
                    res.status(500).json({ message: validationResult.message });
                } else {
                    next();
                }
            },
            insertBuilding()
        );
        this._app.delete(
            "/building",
            (req, res, next) => {
                const validationResult = ApiValidator.validateRequest(
                    req,
                    "building-delete"
                );
                if (validationResult.error) {
                    res.status(500).json({ message: validationResult.message });
                } else {
                    next();
                }
            },
            deleteBuilding()
        );
        this._app.put(
            "/building",
            (req, res, next) => {
                const validationResult = ApiValidator.validateRequest(
                    req,
                    "building-update"
                );
                if (validationResult.error) {
                    res.status(500).json({ message: validationResult.message });
                } else {
                    next();
                }
            },
            updateBuilding()
        );
            this._app.get("/firmsdetail",getFirmsDetail());
            
        this._app.listen(this._PORT, () => {
            console.log(
                `⚡️[server]: Server is running at http://localhost:${this._PORT}`
            );
        });
    }
}

const restApi = new RestApi();
restApi.run();
