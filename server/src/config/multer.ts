import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

interface FileStored extends Express.Multer.File{
    key: string
    url: string
}

export const multerConfig = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (
            req: Express.Request, 
            file: Express.Multer.File, 
            cb: (error: Error | null, destination: string) => void
        ) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (
            req: Express.Request, 
            file: FileStored, 
            cb: (error: Error | null, destination: string) => void
        ) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err, null);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (
        req: Express.Request, 
        file: Express.Multer.File, 
        cb: (error: Error | null, destination: string | boolean) => void
    ) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ]

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new Error('Tipo de arquivo Inválido'), null)
        }
    }
}
