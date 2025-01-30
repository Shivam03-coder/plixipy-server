import { Request } from "express";
import { File } from "multer"; 

interface MulterRequest extends Request {
  file?: File;
  files?: File[];
}

export default MulterRequest;
