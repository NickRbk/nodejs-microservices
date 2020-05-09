import express from 'express';

import { currentUser } from '../middlewares/currentUser';

const router = express.Router();

router.get('/api/users/current', currentUser, (req, res) => {
  res.send(req.currentUser || null);
});

export { router as currentUserRouter };
