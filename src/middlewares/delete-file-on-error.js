import fs from "fs/promises";
import { join } from "path"; 

export const deleteFileOnError = async (req, res, next) => {
    if (req.file && req.file.path) {
        const filePath = join(req.filePath, req.file.filename);
        try {
            await fs.unlink(filePath);
        } catch (unlinkErr) {
            console.log(`Error deleting file: ${unlinkErr}`);
        }
    }
    next();
};
