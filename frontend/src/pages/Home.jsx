import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import CertificatesSection from '../components/CertificatesSection';
import GithubStats from '../components/GithubStats';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import {
  fetchProfile,
  fetchProjects,
  fetchSkills,
  fetchCertificates,
  fetchVisitorCount,
  recordVisitor,
} from '../services/api';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [visitorCount, setVisitorCount] = useState(1420);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profData, projData, skillData, certData, vCount] = await Promise.all([
          fetchProfile(),
          fetchProjects(),
          fetchSkills(),
          fetchCertificates(),
          recordVisitor(),
        ]);

        setProfile(profData);
        setProjects(projData);
        setSkills(skillData);
        setCertificates(certData);
        setVisitorCount(vCount);
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 animate-spin flex items-center justify-center p-1">
          <div className="w-full h-full bg-[#0b0f19] rounded-xl" />
        </div>
        <p className="text-sm font-mono text-cyan-400 animate-pulse">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#0b0f19] dark:text-gray-100 relative">
      <Navbar />
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <CertificatesSection certificates={certificates} />
      <GithubStats githubUrl={profile?.githubUrl} />
      <ContactSection profile={profile} />
      <Footer profile={profile} visitorCount={visitorCount} />
      <ScrollToTop />
    </div>
  );
};

export default Home;
