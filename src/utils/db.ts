import {openSync,closeSync, existsSync} from "fs"
import { Level } from "level"

// TODO: We should have a DB class, where this function should be a method
export const keyExists = async (db: Level<string, string>, key: string): Promise<boolean> => {
    try {
        await db.get(key);
        }
        catch(err) {
            if (err.code === "LEVEL_NOT_FOUND") {
                return false;
            }
            else {
                throw err;
            }
        }

        return true;
}

// export const createDBFile = (filePath: string,  overwrite=false) => {
//     const fileExists = existsSync(filePath);

//     if (!fileExists || overwrite) {
//         closeSync(openSync(filePath,'w'));
//     }
// }
