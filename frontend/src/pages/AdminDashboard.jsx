import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Award,
  Mail,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Eye,
  LogOut,
  Sparkles,
  ArrowLeft,
  X,
  Save,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import api, {
  fetchProjects,
  fetchSkills,
  fetchCertificates,
} from '../services/api';

const AdminDashboard = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Modal State for Add / Edit
  const [modalType, setModalType] = useState(null); // 'project', 'skill', 'certificate'
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    loadDashboardData();
  }, [isAuthenticated, navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [projData, skillData, certData] = await Promise.all([
        fetchProjects(),
        fetchSkills(),
        fetchCertificates(),
      ]);

      setProjects(projData || []);
      setSkills(skillData || []);
      setCertificates(certData || []);

      // Fetch messages via api client
      try {
        const msgRes = await api.get('/messages');
        setMessages(msgRes.data?.data || []);
      } catch (err) {
        // Fallback sample messages if backend offline
        setMessages([
          {
            _id: 'msg_1',
            name: 'Sarah Jenkins',
            email: 'sarah.j@techinnovations.io',
            subject: 'Full Stack Project Collaboration Inquiry',
            message: 'Hi Alex! Loved your CloudPulse project. We are looking for a lead MERN stack developer to build a new SaaS product.',
            read: false,
            createdAt: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error('Failed loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generic Form Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Open Add Modal
  const openAddModal = (type) => {
    setModalType(type);
    setEditItem(null);
    if (type === 'project') {
      setFormData({
        title: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=900',
        category: 'Full Stack',
        technologies: 'React, Node.js, Express, MongoDB, Tailwind CSS',
        githubLink: 'https://github.com/example/my-project',
        liveDemoLink: 'https://demo.example.com',
        featured: true,
      });
    } else if (type === 'skill') {
      setFormData({
        name: '',
        category: 'Frontend',
        proficiency: 90,
        iconName: 'Code',
        featured: true,
      });
    } else if (type === 'certificate') {
      setFormData({
        title: '',
        issuer: '',
        issueDate: 'July 2024',
        credentialId: '',
        credentialUrl: '',
        image: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=800',
        description: '',
      });
    }
  };

  // Open Edit Modal
  const openEditModal = (type, item) => {
    setModalType(type);
    setEditItem(item);
    if (type === 'project') {
      setFormData({
        title: item.title,
        description: item.description,
        image: item.image,
        category: item.category,
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies,
        githubLink: item.githubLink,
        liveDemoLink: item.liveDemoLink,
        featured: item.featured,
      });
    } else if (type === 'skill') {
      setFormData({
        name: item.name,
        category: item.category,
        proficiency: item.proficiency,
        iconName: item.iconName || 'Code',
        featured: item.featured,
      });
    } else if (type === 'certificate') {
      setFormData({
        title: item.title,
        issuer: item.issuer,
        issueDate: item.issueDate,
        credentialId: item.credentialId || '',
        credentialUrl: item.credentialUrl || '',
        image: item.image,
        description: item.description || '',
      });
    }
  };

  // Submit Save
  const handleSaveModal = async (e) => {
    e.preventDefault();

    try {
      if (modalType === 'project') {
        const payload = {
          ...formData,
          technologies: typeof formData.technologies === 'string'
            ? formData.technologies.split(',').map((t) => t.trim())
            : formData.technologies,
        };

        if (editItem) {
          await api.put(`/projects/${editItem._id}`, payload);
          setToast({ message: 'Project updated successfully!', type: 'success' });
        } else {
          await api.post('/projects', payload);
          setToast({ message: 'New Project added successfully!', type: 'success' });
        }
      } else if (modalType === 'skill') {
        if (editItem) {
          await api.put(`/skills/${editItem._id}`, formData);
          setToast({ message: 'Skill updated successfully!', type: 'success' });
        } else {
          await api.post('/skills', formData);
          setToast({ message: 'New Skill added successfully!', type: 'success' });
        }
      } else if (modalType === 'certificate') {
        if (editItem) {
          await api.put(`/certificates/${editItem._id}`, formData);
          setToast({ message: 'Certificate updated successfully!', type: 'success' });
        } else {
          await api.post('/certificates', formData);
          setToast({ message: 'New Certificate added successfully!', type: 'success' });
        }
      }

      setModalType(null);
      loadDashboardData();
    } catch (err) {
      setToast({ message: err.message || 'Operation failed.', type: 'error' });
    }
  };

  // Delete Action
  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      await api.delete(`/${type}s/${id}`);
      setToast({ message: `${type} deleted successfully!`, type: 'success' });
      loadDashboardData();
    } catch (err) {
      setToast({ message: 'Failed to delete item.', type: 'error' });
    }
  };

  // Toggle Read Message
  const toggleRead = async (id) => {
    try {
      await api.patch(`/messages/${id}/read`);
      loadDashboardData();
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: !m.read } : m))
      );
    }
  };

  if (!isAuthenticated) return null;

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 relative">
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Admin Management Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Welcome, <span className="text-gradient">{user?.name || 'Admin'}</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              View Public Site
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 glass-card p-2 rounded-2xl border border-white/10">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'projects', label: `Projects (${projects.length})`, icon: FolderGit2 },
            { id: 'skills', label: `Skills (${skills.length})`, icon: Cpu },
            { id: 'certificates', label: `Certificates (${certificates.length})`, icon: Award },
            { id: 'messages', label: `Inbox (${messages.length})`, icon: Mail, badge: unreadMessagesCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview Analytics */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Projects', value: projects.length, icon: FolderGit2, color: 'text-cyan-400' },
                { label: 'Skills Catalog', value: skills.length, icon: Cpu, color: 'text-purple-400' },
                { label: 'Certificates', value: certificates.length, icon: Award, color: 'text-indigo-400' },
                { label: 'Unread Messages', value: unreadMessagesCount, icon: Mail, color: 'text-rose-400' },
              ].map((card, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">{card.value}</div>
                    <div className="text-xs font-mono text-gray-400 mt-1">{card.label}</div>
                  </div>
                  <div className={`p-3 rounded-2xl bg-white/5 ${card.color}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Panel */}
            <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-xl font-bold text-white">Quick Content Controls</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => openAddModal('project')}
                  className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add New Project
                </button>
                <button
                  onClick={() => openAddModal('skill')}
                  className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add New Skill
                </button>
                <button
                  onClick={() => openAddModal('certificate')}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add New Certificate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">All Projects</h2>
              <button
                onClick={() => openAddModal('project')}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-gray-900/80 text-xs font-mono uppercase text-gray-400 border-b border-gray-800">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Technologies</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {projects.map((proj) => (
                      <tr key={proj._id} className="hover:bg-white/5">
                        <td className="p-4 font-bold text-white flex items-center gap-3">
                          <img src={proj.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <span>{proj.title}</span>
                        </td>
                        <td className="p-4 font-mono text-xs text-cyan-400">{proj.category}</td>
                        <td className="p-4 text-xs font-mono max-w-xs truncate">
                          {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openEditModal('project', proj)}
                            className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('project', proj._id)}
                            className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Manage Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">All Skills</h2>
              <button
                onClick={() => openAddModal('skill')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-gray-900/80 text-xs font-mono uppercase text-gray-400 border-b border-gray-800">
                    <tr>
                      <th className="p-4">Skill Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Proficiency</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {skills.map((s) => (
                      <tr key={s._id} className="hover:bg-white/5">
                        <td className="p-4 font-bold text-white">{s.name}</td>
                        <td className="p-4 font-mono text-xs text-purple-400">{s.category}</td>
                        <td className="p-4 font-mono text-xs">{s.proficiency}%</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openEditModal('skill', s)}
                            className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('skill', s._id)}
                            className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Manage Certificates */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">All Certificates</h2>
              <button
                onClick={() => openAddModal('certificate')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Certificate
              </button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-gray-900/80 text-xs font-mono uppercase text-gray-400 border-b border-gray-800">
                    <tr>
                      <th className="p-4">Certificate Title</th>
                      <th className="p-4">Issuer</th>
                      <th className="p-4">Issue Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {certificates.map((c) => (
                      <tr key={c._id} className="hover:bg-white/5">
                        <td className="p-4 font-bold text-white">{c.title}</td>
                        <td className="p-4 font-mono text-xs text-indigo-400">{c.issuer}</td>
                        <td className="p-4 font-mono text-xs">{c.issueDate}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openEditModal('certificate', c)}
                            className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('certificate', c._id)}
                            className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Contact Messages */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Contact Messages Inbox</h2>

            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`glass-card p-6 rounded-2xl border transition-all ${
                    !msg.read ? 'border-cyan-500/50 bg-cyan-950/20' : 'border-white/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <div>
                      <span className="font-bold text-white text-base">{msg.name}</span>
                      <span className="text-xs text-cyan-400 font-mono ml-2">({msg.email})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleRead(msg._id)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono ${
                          msg.read
                            ? 'bg-gray-800 text-gray-400'
                            : 'bg-cyan-500 text-white font-bold'
                        }`}
                      >
                        {msg.read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={() => handleDelete('message', msg._id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs font-mono font-bold text-cyan-300 mb-1">
                    Subject: {msg.subject}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed bg-black/40 p-4 rounded-xl">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* CRUD Add / Edit Modal Popup */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl glass-card p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
              {editItem ? `Edit ${modalType}` : `Add New ${modalType}`}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {modalType === 'project' && (
                <>
                  <input
                    type="text"
                    name="title"
                    placeholder="Project Title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                  <select
                    name="category"
                    value={formData.category || 'Full Stack'}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white bg-gray-900"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                  <textarea
                    name="description"
                    placeholder="Short Description"
                    rows="3"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                  <input
                    type="text"
                    name="technologies"
                    placeholder="Technologies (comma separated: React, Node.js)"
                    value={formData.technologies || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                  <input
                    type="text"
                    name="githubLink"
                    placeholder="GitHub Repo URL"
                    value={formData.githubLink || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                  <input
                    type="text"
                    name="liveDemoLink"
                    placeholder="Live Demo URL"
                    value={formData.liveDemoLink || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                </>
              )}

              {modalType === 'skill' && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Skill Name (e.g. React)"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                  <select
                    name="category"
                    value={formData.category || 'Frontend'}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white bg-gray-900"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Tools">Tools</option>
                  </select>
                  <div>
                    <label className="text-xs font-mono text-gray-400">
                      Proficiency Level: {formData.proficiency || 90}%
                    </label>
                    <input
                      type="range"
                      name="proficiency"
                      min="1"
                      max="100"
                      value={formData.proficiency || 90}
                      onChange={handleInputChange}
                      className="w-full accent-cyan-400 mt-2"
                    />
                  </div>
                </>
              )}

              {modalType === 'certificate' && (
                <>
                  <input
                    type="text"
                    name="title"
                    placeholder="Certificate Title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                  <input
                    type="text"
                    name="issuer"
                    placeholder="Issuer (e.g. MongoDB / AWS)"
                    value={formData.issuer || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                  <input
                    type="text"
                    name="issueDate"
                    placeholder="Issue Date (e.g. August 2023)"
                    value={formData.issueDate || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                  <input
                    type="text"
                    name="image"
                    placeholder="Certificate Image URL"
                    value={formData.image || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                </>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Save className="w-4 h-4" /> Save {modalType}
              </button>
            </form>
          </div>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default AdminDashboard;
