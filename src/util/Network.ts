import * as express from "express";

export function catchAsync(fn: Function) {
  return (req: express.Request, res: express.Response) => {
    fn(req, res).catch((e: Error) => {
      res.status(500).json(e);
    });
  };
}
