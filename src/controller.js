import { redisServer } from "./redisserver.js";
import { DBAccessFunctions } from "./db-access-functions.js";

export function getFirms() {
    return async (req, res, next) => {
        try {
            let cacheData;
            await redisServer.getFirmsList(
                function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        cacheData = results;
                        let result;
                        if (cacheData) {
                            console.log("Found in cache");
                            result = [];
                            for (const key of Object.keys(cacheData)) {
                                result.push({
                                    id: key,
                                    name: cacheData[key]
                                });
                            }
                        } else {
                            result = [];
                        }
                        res.status(200).json(result);
                        next();
                    }
                }.bind(this)
            );
        } catch (e) {
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function insertFirm() {
    return async (req, res, next) => {
        try {
            let id = await DBAccessFunctions.insertFirmDb(req.body.name);
            redisServer.setFirmData(id, req.body.name);

            res.status(200).json(id);
            next();
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function updateFirm() {
    return async (req, res, next) => {
        try {
            let cacheData;
            await redisServer.getFirm(
                req.body.id.toString(),
                async function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        cacheData = results;
                        if (cacheData) {
                            let name = await DBAccessFunctions.updateFirmDb(
                                req.body.id,
                                req.body.name
                            );
                            redisServer.setFirmData(
                                req.body.id.toString(),
                                name
                            );
                            res.status(200).json(name);
                            next();
                        } else {
                            res.status(500).json({ message: "No firm found" });
                        }
                    }
                }.bind(this)
            );
        } catch (e) {
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function deleteFirm() {
    return async (req, res, next) => {
        try {
            let cacheData;
            await redisServer.getFirm(
                req.body.id.toString(),
                async function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        cacheData = results;
                        if (cacheData) {
                            let id = await DBAccessFunctions.deleteFirmDb(
                                req.body.id
                            );
                            redisServer.deleteFirmData(req.body.id.toString());
                            res.status(200).json(id);
                            next();
                        } else {
                            res.status(500).json({ message: "No firm found" });
                        }
                    }
                }.bind(this)
            );
        } catch (e) {
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function getUsers() {
    return async (req, res, next) => {
        try {
            let cacheData;

            await redisServer.getUsersList(
                function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        cacheData = results;
                        let result;
                        if (cacheData) {
                            console.log("Found in cache");
                            result = [];
                            for (const key of Object.keys(cacheData)) {
                                const data = cacheData[key].split("_");
                                result.push({
                                    id: key,
                                    name: data[0],
                                    surname: data[1],
                                    firmId: data[2]
                                });
                            }
                        } else {
                            result = [];
                        }

                        res.status(200).json(result);
                        next();
                    }
                }.bind(this)
            );
        } catch (e) {
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function insertUser() {
    return async (req, res, next) => {
        try {
            let id = await DBAccessFunctions.insertUserDb(
                req.body.name,
                req.body.surname,
                req.body.firmId
            );

            redisServer.setUserData(
                id,
                req.body.name,
                req.body.surname,
                req.body.firmId.toString()
            );

            res.status(200).json(id);
            next();
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function updateUser() {
    return async (req, res, next) => {
        try {
            let cacheData;
            await redisServer.getUser(
                req.body.id.toString(),
                async function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        cacheData = results;
                        if (cacheData) {
                            let name = await DBAccessFunctions.updateUserDb(
                                req.body.id,
                                req.body.name,
                                req.body.surname,
                                req.body.firmId
                            );

                            redisServer.setUserData(
                                req.body.id.toString(),
                                name,
                                req.body.surname,
                                req.body.firmId.toString()
                            );

                            res.status(200).json(name);
                            next();
                        } else {
                            res.status(500).json({ message: "No user found" });
                        }
                    }
                }.bind(this)
            );
        } catch (e) {
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function deleteUser() {
    return async (req, res, next) => {
        try {
            let cacheData;
            await redisServer.getUser(
                req.body.id.toString(),
                async function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        cacheData = results;
                        if (cacheData) {
                            let id = await DBAccessFunctions.deleteUserDb(
                                req.body.id
                            );
                            redisServer.deleteUserData(req.body.id.toString());
                            res.status(200).json(id);
                            next();
                        } else {
                            res.status(500).json({ message: "No user found" });
                        }
                    }
                }.bind(this)
            );
        } catch (e) {
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function getBuildings() {
    return async (req, res, next) => {
        try {
            let cacheData;

            await redisServer.getBuildingsList(
                function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        cacheData = results;
                        let result;
                        if (cacheData) {
                            console.log("Found in cache");
                            result = [];
                            for (const key of Object.keys(cacheData)) {
                                const data = cacheData[key].split("_");
                                result.push({
                                    id: key,
                                    name: data[0],

                                    firmId: data[1]
                                });
                            }
                        } else {
                            result = [];
                        }

                        res.status(200).json(result);
                        next();
                    }
                }.bind(this)
            );
        } catch (e) {
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function insertBuilding() {
    return async (req, res, next) => {
        try {
            let id = await DBAccessFunctions.insertBuildingDb(
                req.body.name,
                req.body.firmId
            );

            redisServer.setBuildingData(
                id,
                req.body.name,
                req.body.firmId.toString()
            );
            res.status(200).json(id);
            next();
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function updateBuilding() {
    return async (req, res, next) => {
        try {
            let cacheData;
            await redisServer.getBuilding(
                req.body.id.toString(),
                async function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        cacheData = results;
                        if (cacheData) {
                            let name = await DBAccessFunctions.updateBuildingDb(
                                req.body.id,
                                req.body.name,

                                req.body.firmId
                            );

                            redisServer.setBuildingData(
                                req.body.id.toString(),
                                name,
                                req.body.firmId.toString()
                            );

                            res.status(200).json(name);
                            next();
                        } else {
                            res.status(500).json({ message: "No user found" });
                        }
                    }
                }.bind(this)
            );
        } catch (e) {
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function deleteBuilding() {
    return async (req, res, next) => {
        try {
            let cacheData;
            await redisServer.getBuilding(
                req.body.id.toString(),
                async function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        cacheData = results;
                        if (cacheData) {
                            let id = await DBAccessFunctions.deleteBuildingDb(
                                req.body.id
                            );
                            redisServer.deleteBuildingData(
                                req.body.id.toString()
                            );
                            res.status(200).json(id);
                            next();
                        } else {
                            res.status(500).json({ message: "No user found" });
                        }
                    }
                }.bind(this)
            );
        } catch (e) {
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
export function getFirmsDetail() {
    return async (req, res, next) => {
        try {
            let result = await DBAccessFunctions.getFirmsDetailDb();

            res.status(200).json(result);
            next();
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Error Occured" });
        }
    };
}
