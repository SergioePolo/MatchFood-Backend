import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const UPLOADS_BASE = path.join(_dirname, "../../uploads");

if (!fs.existsSync(UPLOADS_BASE)) {
    fs.mkdirSync(UPLOADS_BASE);  
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let insideFolder;
        try {
            switch(req.uploadType){
                case 'userProfile': 
                    insideFolder = path.join(UPLOADS_BASE,'users/profilePictures', req.userId);
                    break;
                case 'restaurantProfile':
                    insideFolder = path.join(UPLOADS_BASE, 'restaurants/profilePictures', req.restaurantId);
                    break;
                case 'userPost':
                    insideFolder = path.join(UPLOADS_BASE, 'users/tempFiles', req.userId);
                    break;
                case 'ratingPost':
                    insideFolder = path.join(UPLOADS_BASE, 'restaurants/tempFiles', req.userId);
                    break;
                default:
                    return cb(new Error('Invalid upload type'));
            }
            fs.mkdirSync(insideFolder, {recursive: true});
            cb(null, insideFolder);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
        cb(null, `${base}-${Date.now()}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/svg+xml", 
        "image/webp",
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("File not permited"));
    }
};

const limits = {
  fileSize: 5 * 1024 * 1024,
};

export const upload = multer({ storage, fileFilter, limits });
