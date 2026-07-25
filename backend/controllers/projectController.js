const Project = require('../models/Project');
const { initialProjects } = require('../seed/seedData');

let memoryProjects = [...initialProjects.map((p, idx) => ({ ...p, _id: `proj_${idx + 1}`, createdAt: new Date() }))];

// @desc    Get all projects (with filtering and search)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  const { category, search } = req.query;

  if (Project.db && Project.db.readyState === 1) {
    try {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { technologies: { $regex: search, $options: 'i' } },
        ];
      }
      const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
      return res.json({ success: true, count: projects.length, data: projects });
    } catch (err) {
      console.warn('DB error fetching projects, using fallback memory:', err.message);
    }
  }

  // Fallback filtering on memoryProjects
  let filtered = [...memoryProjects];
  if (category && category !== 'All') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }

  return res.json({ success: true, count: filtered.length, data: filtered });
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  const { id } = req.params;

  if (Project.db && Project.db.readyState === 1) {
    try {
      const project = await Project.findById(id);
      if (project) return res.json({ success: true, data: project });
    } catch (err) {
      // ignore
    }
  }

  const proj = memoryProjects.find((p) => p._id === id);
  if (proj) return res.json({ success: true, data: proj });

  res.status(404).json({ success: false, message: 'Project not found.' });
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  const { title, description, fullDescription, image, category, technologies, githubLink, liveDemoLink, featured, order } = req.body;

  if (!title || !description || !image || !githubLink || !liveDemoLink) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
  }

  const newProjData = {
    title,
    description,
    fullDescription: fullDescription || description,
    image,
    category: category || 'Full Stack',
    technologies: Array.isArray(technologies) ? technologies : (technologies || '').split(',').map((t) => t.trim()),
    githubLink,
    liveDemoLink,
    featured: featured || false,
    order: Number(order) || memoryProjects.length + 1,
  };

  if (Project.db && Project.db.readyState === 1) {
    try {
      const created = await Project.create(newProjData);
      return res.status(201).json({ success: true, data: created });
    } catch (err) {
      console.warn('DB error creating project:', err.message);
    }
  }

  const createdMock = {
    ...newProjData,
    _id: `proj_${Date.now()}`,
    createdAt: new Date(),
  };
  memoryProjects.unshift(createdMock);
  return res.status(201).json({ success: true, data: createdMock });
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  const { id } = req.params;

  if (Project.db && Project.db.readyState === 1) {
    try {
      const project = await Project.findById(id);
      if (project) {
        Object.assign(project, req.body);
        if (req.body.technologies && typeof req.body.technologies === 'string') {
          project.technologies = req.body.technologies.split(',').map((t) => t.trim());
        }
        const updated = await project.save();
        return res.json({ success: true, data: updated });
      }
    } catch (err) {
      console.warn('DB error updating project:', err.message);
    }
  }

  const index = memoryProjects.findIndex((p) => p._id === id);
  if (index !== -1) {
    let techs = req.body.technologies;
    if (typeof techs === 'string') {
      techs = techs.split(',').map((t) => t.trim());
    }
    memoryProjects[index] = { ...memoryProjects[index], ...req.body, technologies: techs || memoryProjects[index].technologies };
    return res.json({ success: true, data: memoryProjects[index] });
  }

  res.status(404).json({ success: false, message: 'Project not found.' });
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (Project.db && Project.db.readyState === 1) {
    try {
      const project = await Project.findById(id);
      if (project) {
        await project.deleteOne();
        return res.json({ success: true, message: 'Project removed successfully.' });
      }
    } catch (err) {
      console.warn('DB error deleting project:', err.message);
    }
  }

  const index = memoryProjects.findIndex((p) => p._id === id);
  if (index !== -1) {
    memoryProjects.splice(index, 1);
    return res.json({ success: true, message: 'Project removed successfully.' });
  }

  res.status(404).json({ success: false, message: 'Project not found.' });
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
