const Profile = require('../models/Profile');
const { initialProfile } = require('../seed/seedData');

let memoryProfile = { ...initialProfile };

// @desc    Get profile details
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
  if (Profile.db && Profile.db.readyState === 1) {
    try {
      let profile = await Profile.findOne({});
      if (!profile) {
        profile = await Profile.create(initialProfile);
      }
      return res.json({ success: true, data: profile });
    } catch (err) {
      console.warn('DB error fetching profile:', err.message);
    }
  }

  return res.json({ success: true, data: memoryProfile });
};

// @desc    Update profile details
// @route   PUT /api/profile
// @access  Private/Admin
const updateProfile = async (req, res) => {
  if (Profile.db && Profile.db.readyState === 1) {
    try {
      let profile = await Profile.findOne({});
      if (!profile) {
        profile = new Profile(req.body);
      } else {
        Object.assign(profile, req.body);
      }
      const updated = await profile.save();
      return res.json({ success: true, data: updated });
    } catch (err) {
      console.warn('DB error updating profile:', err.message);
    }
  }

  memoryProfile = { ...memoryProfile, ...req.body };
  return res.json({ success: true, data: memoryProfile });
};

module.exports = {
  getProfile,
  updateProfile,
};
