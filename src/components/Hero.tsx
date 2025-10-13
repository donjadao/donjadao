import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import logo from 'figma:asset/7ce734f2c2e6165613eedbecbb47049bc56bbf5f.png';
import RippleLogo from '../components/RippleLogo';
// <RippleLogo />
//<img src={logo} alt="Logo" className="h-48 w-auto" />
export function Hero() {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-8">
            <RippleLogo />
          </div>
          <h1 className="mb-4 text-white">
            Hi, I'm <span className="text-primary">Don Dao</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/70">
            A passionate UI/UX Designer & Visual Artist crafting beautiful, intuitive digital experiences 
            and creating compelling visual stories through design and art.
          </p>
         <h2 className="text-white font-bold text-lg">
            B.S. Information Science & Technology, May 2026
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button onClick={scrollToProjects}>
            View My Work
          </Button>
          <Button variant="outline" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/donjadao"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
            style={{ color: '#7484bc' }}
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/donjadao"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
            style={{ color: '#7484bc' }}
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:ding.don908@gmail.com"
            className="transition-colors hover:text-primary"
            style={{ color: '#7484bc' }}
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>

        <button
          onClick={scrollToProjects}
          className="mt-16 transition-colors animate-bounce hover:text-primary"
          style={{ color: '#e8a5ad' }}
        >
          <ArrowDown className="h-8 w-8 mx-auto" />
        </button>
      </div>
    </section>
  );
}
