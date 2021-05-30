import redis from "redis";
import { promisify } from "util";

class RedisServer {
    #_client;
    #_getAsync;
    #_hGetAllAsync;
    #_hGetAsync;
    constructor() {
        this.#_client = redis.createClient({
            host: "redis",
            port: 6379
        });
        this.#_client.flushall();
        this.#_client.on("error", function (error) {
            console.error(error);
        });
        this.#_getAsync = promisify(this.#_client.get).bind(this.#_client);
        this.#_hGetAllAsync = promisify(this.#_client.hgetall).bind(
            this.#_client
        );
        this.#_hGetAsync = promisify(this.#_client.hget).bind(this.#_client);
    }

    //#region firm
    async getFirmsList(cb) {
        this.#_client.hgetall("firms", cb);
    }
    setFirmData(id, name) {
        this.#_client.hset("firms", id, name);

        console.log("Set firm to cache : " + id + " - " + name);
    }
    deleteFirmData(id) {
        this.#_client.hdel("firms", id.toString());
        console.log("Delete firm to cache : " + id);
    }
    async getFirm(id, cb) {
        this.#_client.hget("firms", id, cb);
        return await this.#_hGetAsync("firms", id);
    }
    //#endregion

    //#region user
    async getUsersList(cb) {
        this.#_client.hgetall("users", cb);
    }
    setUserData(id, name, surname, firmId) {
        this.#_client.hset("users", id, name + "_" + surname + "_" + firmId);

        console.log(
            "Set firm to cache : " +
                id +
                " - " +
                name +
                " - " +
                surname +
                " - " +
                firmId
        );
    }
    deleteUserData(id) {
        this.#_client.hdel("users", id.toString());
        console.log("Delete user to cache : " + id);
    }
    async getUser(id, cb) {
        this.#_client.hget("users", id, cb);
        return await this.#_hGetAsync("users", id);
    }

    //#endregion

    //#region building
    async getBuildingsList(cb) {
        this.#_client.hgetall("buildings", cb);
    }
    setBuildingData(id, name, firmId) {
        this.#_client.hset("buildings", id, name + "_" + firmId);

        console.log(
            "Set buildings to cache : " + id + " - " + name + " - " + firmId
        );
    }
    deleteBuildingData(id) {
        this.#_client.hdel("buildings", id.toString());
        console.log("Delete buildings to cache : " + id);
    }
    async getBuilding(id, cb) {
        this.#_client.hget("buildings", id, cb);
        return await this.#_hGetAsync("buildings", id);
    }
    //#endregion
}

export const redisServer = new RedisServer();
