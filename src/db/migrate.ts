import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDB } from './index';


const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename);


export async function runMigrations(){
    const db = getDB();
    const migrationsDir = path.join(_dirname, 'migrations');

    const files = fs
        .readdirSync(migrationsDir)
        .filter(f => f.endsWith('.sql'))
        .sort();

    for (const file of files) {
        const sql = fs.readFileSync(
            path.join(migrationsDir, file),
            'utf-8'
        )

        console.log(`running migrations for files : ${file}`);
        await db.query(sql)
        console.log(`done: ${file}`)
    }
}