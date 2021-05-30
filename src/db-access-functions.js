import { dbClient } from "./dbclient.js";

class DbAccessFunctions {
    async insertFirmDb(name) {
        const { rows, rowCount } = await dbClient.query(
            `
                INSERT INTO public.firms (name) VALUES ($1)
                RETURNING id
            `,
            [name]
        );

        return rowCount > 0 ? rows[0].id : undefined;
    }
    async deleteFirmDb(id) {
        const { rows, rowCount } = await dbClient.query(
            `
                DELETE FROM public.firms WHERE id = $1
                RETURNING id
            `,
            [id]
        );

        return rowCount > 0 ? rows[0].id : undefined;
    }
    async updateFirmDb(id, name) {
        const { rows, rowCount } = await dbClient.query(
            `
                UPDATE public.firms 
                SET name = $1
                WHERE id = $2
                RETURNING name
            `,
            [name, id]
        );

        return rowCount > 0 ? rows[0].name : undefined;
    }
    async insertUserDb(name, surname, firmId) {
        const { rows, rowCount } = await dbClient.query(
            `
                INSERT INTO public.users (name,surname,"firmId") VALUES ($1,$2,$3)
                RETURNING id
            `,
            [name, surname, firmId]
        );

        return rowCount > 0 ? rows[0].id : undefined;
    }
    async deleteUserDb(id) {
        const { rows, rowCount } = await dbClient.query(
            `
                DELETE FROM public.users WHERE id = $1
                RETURNING id
            `,
            [id]
        );

        return rowCount > 0 ? rows[0].id : undefined;
    }
    async updateUserDb(id, name, surname, firmId) {
        const { rows, rowCount } = await dbClient.query(
            `
                UPDATE public.users 
                SET name = $1, surname= $2 ,"firmId" = $3
                WHERE id = $4
                RETURNING name
            `,
            [name, surname, firmId, id]
        );

        return rowCount > 0 ? rows[0].name : undefined;
    }
    async insertBuildingDb(name, firmId) {
        const { rows, rowCount } = await dbClient.query(
            `
                INSERT INTO public.buildings (name,"firmId") VALUES ($1,$2)
                RETURNING id
            `,
            [name, firmId]
        );

        return rowCount > 0 ? rows[0].id : undefined;
    }
    async deleteBuildingDb(id) {
        const { rows, rowCount } = await dbClient.query(
            `
                DELETE FROM public.buildings WHERE id = $1
                RETURNING id
            `,
            [id]
        );

        return rowCount > 0 ? rows[0].id : undefined;
    }
    async updateBuildingDb(id, name, firmId) {
        const { rows, rowCount } = await dbClient.query(
            `
                UPDATE public.buildings 
                SET name = $1 , "firmId" = $2
                WHERE id = $3
                RETURNING name
            `,
            [name, firmId, id]
        );

        return rowCount > 0 ? rows[0].name : undefined;
    }
    async getFirmsDetailDb() {
        const { rows, rowCount } = await dbClient.query(
            `
            select f.id as "firmId", f.name as "firmName" , json_agg( distinct u.*) as users, json_agg(distinct b.*) as buildings
            from public.firms as f
            left join public.users as u on u."firmId" = f.id
            left join public.buildings as b on b."firmId" = f.id
            group by f.id
            `
        );

        return rowCount > 0 ? rows : undefined;
    }
}

export const DBAccessFunctions = new DbAccessFunctions();
