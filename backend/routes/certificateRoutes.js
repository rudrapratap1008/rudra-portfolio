const express = require('express');
const router = express.Router();
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCertificates)
  .post(protect, adminOnly, createCertificate);

router.route('/:id')
  .put(protect, adminOnly, updateCertificate)
  .delete(protect, adminOnly, deleteCertificate);

module.exports = router;
