// import {NextFunction, Request, Response} from 'express';

// export default function CorsStar(req: Request, res: Response, next: NextFunction) {
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   next();
// }
import { NextFunction, Request, Response } from 'express';

export default function Cors(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add 'Content-Type' to the allowed headers

  next();
}