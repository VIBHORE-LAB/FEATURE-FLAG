import fastify from "fastify";
import { healthRoutes } from "./routes/health";
import { initDB } from "./db";
import { runMigrations } from "./db/migrate";
export function buildApp(){
    const app = fastify({logger: true});

    app.addHook('onReady', async() => {
        await initDB();
        await runMigrations();
    })

    app.register(healthRoutes, {prefix:'/health'});

    return app;
}