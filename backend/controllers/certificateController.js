const Certificate = require('../models/Certificate');
const { initialCertificates } = require('../seed/seedData');

let memoryCertificates = [...initialCertificates.map((c, idx) => ({ ...c, _id: `cert_${idx + 1}` }))];

// @desc    Get certificates
// @route   GET /api/certificates
// @access  Public
const getCertificates = async (req, res) => {
  if (Certificate.db && Certificate.db.readyState === 1) {
    try {
      const certificates = await Certificate.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, count: certificates.length, data: certificates });
    } catch (err) {
      console.warn('DB error fetching certificates:', err.message);
    }
  }

  return res.json({ success: true, count: memoryCertificates.length, data: memoryCertificates });
};

// @desc    Create certificate
// @route   POST /api/certificates
// @access  Private/Admin
const createCertificate = async (req, res) => {
  const { title, issuer, issueDate, credentialId, credentialUrl, image, description } = req.body;

  if (!title || !issuer || !issueDate || !image) {
    return res.status(400).json({ success: false, message: 'Title, issuer, issue date, and image URL are required.' });
  }

  const certData = { title, issuer, issueDate, credentialId, credentialUrl, image, description };

  if (Certificate.db && Certificate.db.readyState === 1) {
    try {
      const created = await Certificate.create(certData);
      return res.status(201).json({ success: true, data: created });
    } catch (err) {
      console.warn('DB error creating certificate:', err.message);
    }
  }

  const createdMock = { ...certData, _id: `cert_${Date.now()}` };
  memoryCertificates.unshift(createdMock);
  return res.status(201).json({ success: true, data: createdMock });
};

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Private/Admin
const updateCertificate = async (req, res) => {
  const { id } = req.params;

  if (Certificate.db && Certificate.db.readyState === 1) {
    try {
      const cert = await Certificate.findById(id);
      if (cert) {
        Object.assign(cert, req.body);
        const updated = await cert.save();
        return res.json({ success: true, data: updated });
      }
    } catch (err) {
      console.warn('DB error updating certificate:', err.message);
    }
  }

  const idx = memoryCertificates.findIndex((c) => c._id === id);
  if (idx !== -1) {
    memoryCertificates[idx] = { ...memoryCertificates[idx], ...req.body };
    return res.json({ success: true, data: memoryCertificates[idx] });
  }

  res.status(404).json({ success: false, message: 'Certificate not found.' });
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private/Admin
const deleteCertificate = async (req, res) => {
  const { id } = req.params;

  if (Certificate.db && Certificate.db.readyState === 1) {
    try {
      const cert = await Certificate.findById(id);
      if (cert) {
        await cert.deleteOne();
        return res.json({ success: true, message: 'Certificate deleted successfully.' });
      }
    } catch (err) {
      console.warn('DB error deleting certificate:', err.message);
    }
  }

  const idx = memoryCertificates.findIndex((c) => c._id === id);
  if (idx !== -1) {
    memoryCertificates.splice(idx, 1);
    return res.json({ success: true, message: 'Certificate deleted successfully.' });
  }

  res.status(404).json({ success: false, message: 'Certificate not found.' });
};

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
