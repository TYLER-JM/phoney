import { Request, Response } from "express";

function get(req: Request, res: Response) {
  res.json({sucess: true, data: 'lots of data'})
}

export {
  get
} 