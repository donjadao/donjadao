import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import RippleLogo from '../components/RippleLogo';

export function Hero() {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 text-center"
    >
      <div className="max-w-4xl w-full mx-auto">
        {/* Ripple Logo */}
        <div className="flex justify-center -mb-8">
          <div className="aspect-[2/1] w-full max-w-[300px] overflow-hidden">
             <RippleLogo />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-white font-semibold text-base sm:text-lg md:text-xl mb-2">
          <span className="mr-2">Hi, I'm</span>
          <span className="text-primary">Don Dao</span>
        </h1>


        {/* Subheading */}
        <h2 className="text-white font-semibold text-base sm:text-lg md:text-xl mb-2">
          B.S. Information Science & Technology, May 2026
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-white/70">
          A passionate UI/UX Designer & Visual Artist crafting beautiful, intuitive digital experiences 
          and creating compelling visual stories through design and art.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
          <Button onClick={scrollToProjects}>View My Work</Button>
          <Button variant="outline" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/donjadao"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary text-[#7484bc]"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/donjadao"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary text-[#7484bc]"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:ding.don908@gmail.com"
            className="transition-colors hover:text-primary text-[#7484bc]"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
