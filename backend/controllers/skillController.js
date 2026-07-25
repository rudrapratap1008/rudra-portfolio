const Skill = require('../models/Skill');
const { initialSkills } = require('../seed/seedData');

let memorySkills = [...initialSkills.map((s, idx) => ({ ...s, _id: `skill_${idx + 1}` }))];

// @desc    Get skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  const { category } = req.query;

  if (Skill.db && Skill.db.readyState === 1) {
    try {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      const skills = await Skill.find(query).sort({ category: 1, proficiency: -1 });
      return res.json({ success: true, count: skills.length, data: skills });
    } catch (err) {
      console.warn('DB error fetching skills:', err.message);
    }
  }

  let filtered = [...memorySkills];
  if (category && category !== 'All') {
    filtered = filtered.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }

  return res.json({ success: true, count: filtered.length, data: filtered });
};

// @desc    Create skill
// @route   POST /api/skills
// @access  Private/Admin
const createSkill = async (req, res) => {
  const { name, category, proficiency, iconName, featured } = req.body;

  if (!name || !category || proficiency === undefined) {
    return res.status(400).json({ success: false, message: 'Name, category, and proficiency are required.' });
  }

  const newSkillData = {
    name,
    category,
    proficiency: Number(proficiency),
    iconName: iconName || 'Code',
    featured: featured !== undefined ? featured : true,
  };

  if (Skill.db && Skill.db.readyState === 1) {
    try {
      const created = await Skill.create(newSkillData);
      return res.status(201).json({ success: true, data: created });
    } catch (err) {
      console.warn('DB error creating skill:', err.message);
    }
  }

  const createdMock = { ...newSkillData, _id: `skill_${Date.now()}` };
  memorySkills.push(createdMock);
  return res.status(201).json({ success: true, data: createdMock });
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
const updateSkill = async (req, res) => {
  const { id } = req.params;

  if (Skill.db && Skill.db.readyState === 1) {
    try {
      const skill = await Skill.findById(id);
      if (skill) {
        Object.assign(skill, req.body);
        const updated = await skill.save();
        return res.json({ success: true, data: updated });
      }
    } catch (err) {
      console.warn('DB error updating skill:', err.message);
    }
  }

  const idx = memorySkills.findIndex((s) => s._id === id);
  if (idx !== -1) {
    memorySkills[idx] = { ...memorySkills[idx], ...req.body };
    return res.json({ success: true, data: memorySkills[idx] });
  }

  res.status(404).json({ success: false, message: 'Skill not found.' });
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
const deleteSkill = async (req, res) => {
  const { id } = req.params;

  if (Skill.db && Skill.db.readyState === 1) {
    try {
      const skill = await Skill.findById(id);
      if (skill) {
        await skill.deleteOne();
        return res.json({ success: true, message: 'Skill deleted successfully.' });
      }
    } catch (err) {
      console.warn('DB error deleting skill:', err.message);
    }
  }

  const idx = memorySkills.findIndex((s) => s._id === id);
  if (idx !== -1) {
    memorySkills.splice(idx, 1);
    return res.json({ success: true, message: 'Skill deleted successfully.' });
  }

  res.status(404).json({ success: false, message: 'Skill not found.' });
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
