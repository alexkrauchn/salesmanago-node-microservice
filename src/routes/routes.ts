import express from "express";

import { CartController } from '../controllers/CartController';
import { NewsletterController } from '../controllers/NewsletterController';

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).send('SalesManago API is online.');
});

router.route('/cart').post(CartController.sendSalesManagoEvent);
router.route('/newsletter').post(NewsletterController.sendSalesManagoEvent);

export default router;