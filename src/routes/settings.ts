import * as express from 'express';
import Crypto from '../util/Crypto.js';
import SettingController from '../controller/SettingController.js';
import Assignment from '../model/Assignment.js';
import Setting from '../model/Setting.js';
import { catchAsync } from '../util/Network.js';
import Constants from '../util/Constants.js';
const router = express.Router();

router.get(
  '/settings',
  catchAsync(async (_: express.Request, res: express.Response) => {
    try {
      const setting = SettingController.getSettings();
      res.status(200).type('json').send(setting);
    } catch (e: any) {
      res.status(500).type('json').send({ message: e.message });
    }
  })
);
router.post(
  '/settings',
  catchAsync(async (req: express.Request, res: express.Response) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token || !Crypto.validToken(token)) {
      res.status(401).type('json').send({ message: 'Token is invalid' });
      return;
    }
    const setting = req.body as Setting;
    await SettingController.saveSettings(setting);
    res.status(200).send();
  })
);
router.put(
  '/settings',
  catchAsync(async (req: express.Request, res: express.Response) => {
    let xsrf: string;
    if (req.cookies && req.cookies[Constants.XSRF_TOKEN]) {
      xsrf = req.cookies[Constants.XSRF_TOKEN];
    } else {
      xsrf = req.headers[Constants.XSRF_TOKEN.toLowerCase()] as string;
    }
    if (!xsrf || !Crypto.validXSRF(xsrf)) {
      res.status(417).type('json').send({ message: 'XSRF is invalid, please refresh page' });
      return;
    }
    const assignment = req.body as Assignment;
    SettingController.addAssignment(assignment);
    res.status(201).send();
  })
);
router.delete(
  '/settings/assignment/:id',
  catchAsync(async (req: express.Request, res: express.Response) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token || !Crypto.validToken(token)) {
      res.status(401).type('json').send({ message: 'Token is invalid' });
      return;
    }
    const assignmentId = parseInt(req.params.id!);
    await SettingController.removeAssignment(assignmentId);
    res.status(200).send();
  })
);
export default router;
