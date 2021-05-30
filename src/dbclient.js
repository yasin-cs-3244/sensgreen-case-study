import pg from "pg";
const { Pool } = pg;

class DBClient {
    #_pool;

    constructor() {
        this.#_pool = new Pool({
            host: "postgres",
            user: "postgres",
            database: "sensgreen_db",
            password: "postgres",
            port: 5432,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        });
    }

    async initDB() {
        await this.queryTrx(`
            DROP TABLE IF EXISTS public.buildings;
            DROP SEQUENCE IF EXISTS buildings_id_seq;

            DROP TABLE IF EXISTS public.users;
            DROP SEQUENCE IF EXISTS users_id_seq;

            DROP TABLE IF EXISTS public.firms;
            DROP SEQUENCE IF EXISTS firms_id_seq;
        `);
        await this.queryTrx(`
            CREATE SEQUENCE firms_id_seq
            start 1
            increment 1;
            
            -- DROP TABLE public.firms;

            CREATE TABLE IF NOT EXISTS public.firms
            (
                id bigint NOT NULL DEFAULT nextval('firms_id_seq'::regclass),
                name character varying(50) COLLATE pg_catalog."default" NOT NULL,
                CONSTRAINT firms_pkey PRIMARY KEY (id),
                CONSTRAINT unique_firms_name UNIQUE (name)
                    INCLUDE(name)
            )
            
            TABLESPACE pg_default;
            
            ALTER TABLE public.firms
                OWNER to postgres;
        `);
        await this.queryTrx(`
            CREATE SEQUENCE users_id_seq
            start 1
            increment 1;
            
            -- DROP TABLE public.users;

            CREATE TABLE IF NOT EXISTS public.users
            (
                id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
                name character varying(50) COLLATE pg_catalog."default" NOT NULL,
                surname character varying(50) COLLATE pg_catalog."default" NOT NULL,
                "firmId" bigint NOT NULL,
                CONSTRAINT users_pkey PRIMARY KEY (id),
                CONSTRAINT unique_users UNIQUE (name, surname)
                    INCLUDE(name, surname),
                CONSTRAINT users_firms_fk FOREIGN KEY ("firmId")
                    REFERENCES public.firms (id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
                    NOT VALID
            )

            TABLESPACE pg_default;

            ALTER TABLE public.users
                OWNER to postgres;
        `);
        await this.queryTrx(`
            CREATE SEQUENCE buildings_id_seq
            start 1
            increment 1;
            
            -- DROP TABLE public.buildings;

            CREATE TABLE IF NOT EXISTS public.buildings
            (
                id bigint NOT NULL DEFAULT nextval('buildings_id_seq'::regclass),
                name character varying(50) COLLATE pg_catalog."default" NOT NULL,
                "firmId" bigint NOT NULL,
                CONSTRAINT buildings_pkey PRIMARY KEY (id),
                CONSTRAINT unique_buildings_name UNIQUE (name)
                    INCLUDE(name),
                CONSTRAINT buildings_firms_fk FOREIGN KEY ("firmId")
                    REFERENCES public.firms (id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
                    NOT VALID
            )

            TABLESPACE pg_default;

            ALTER TABLE public.buildings
                OWNER to postgres;
        `);
    }

    async queryTrx(query, queryParams) {
        const client = await this.#_pool.connect();
        try {
            await client.query("BEGIN");
            const response = await client.query(query, queryParams);
            await client.query("COMMIT");
        } catch (e) {
            console.error("Error in transaction", e.stack);
            await client.query("ROLLBACK");
        } finally {
            client.release();
        }
    }
    async query(query, queryParams) {
        let response = {
            rows: undefined,
            rowCount: -1
        };
        const client = await this.#_pool.connect();
        try {
            response = await client.query(query, queryParams);
        } catch (error) {
            console.error("Error in query", error.stack);
        } finally {
            client.release();
        }
        return response;
    }
}

const initClass = () => {
    const dbClient = new DBClient();
    dbClient.initDB();
    return dbClient;
};

export const dbClient = initClass();
