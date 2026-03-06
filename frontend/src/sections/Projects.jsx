import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'GreenPath Login System',
      desc: 'A robust authentication system utilizing a custom MySQL schema, complete with secure routing and data handling.',
      tech: ['Node.js', 'Express', 'MySQL', 'Nodemailer'],
      github: 'https://github.com/VanithaLakshminN/GreenPath'
    },
    {
      title: 'Developer Portfolio',
      desc: 'A modern, fully responsive personal portfolio featuring smooth scroll animations and a connected contact database.',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/VanithaLakshminN/MyPortfolio'
    }
  ];

  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl font-bold mb-10"><span className="text-accent">03.</span> Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} className="bg-slate-800 p-6 rounded border border-slate-700 hover:border-accent transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{proj.title}</h3>
              <a href={proj.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-accent"><FaGithub size={24}/></a>
            </div>
            <p className="text-slate-400 mb-4">{proj.desc}</p>
            <div className="flex flex-wrap gap-2">
              {proj.tech.map((t, j) => <span key={j} className="text-xs bg-darkBg text-accent px-2 py-1 rounded">{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default Projects;