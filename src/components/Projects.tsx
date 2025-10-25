import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Project } from './ProjectDetail';

import matchaThumb from '../assets/Matcha_Infographic.png';
import bookstorePic from '../assets/bookstore_pic.png';
import cookbookpic from '../assets/College Cookbook.png';


const projects = [
  {
    id: 1,
    title: 'Matcha Volatility Chart',
    description: 'Created an interactive data visualization highlighting sustainability and economic issues in the matcha industry.',
    image: matchaThumb,
    tags: ['Information Visualization', 'Data Analysis'],
    category: 'web',
    link: '#',
    //github: '#',
    // ADD THESE FIELDS:
    role: 'Information Designer & Data Analyst',
    timeline: '4 weeks',
    team: 'Solo project',
    challenge: 'The matcha industry faces complex sustainability challenges including price volatility, environmental impact, and supply chain transparency. Most consumers are unaware of these issues, and existing data is scattered across multiple sources making it difficult to understand the full picture.',
    solution: 'I created an interactive data visualization that synthesizes multiple data sources into a cohesive narrative. The design uses a scrollytelling approach to guide users through key findings, with interactive charts that allow deeper exploration of pricing trends, production regions, and sustainability metrics. Color coding and visual metaphors help make complex economic data more accessible.',
    impact: 'The visualization was featured on Behance and shared by sustainability organizations, reaching over 5,000 views in the first month. It successfully raised awareness about matcha industry challenges and was used as an educational resource by environmental advocacy groups.',
    // additionalImages: ['url1', 'url2'], // Optional: add more project screenshots
  },
  {
    id: 2,
    title: 'Online Book Store',
    description: 'Intuitive webdesign focused on helping users buy books and be introduced to new ones .',
    image: bookstorePic,
    tags: ['Web UX', 'User Flow', 'Interaction Design'],
    category: 'web',
    link: '#',
    //github: '#',
  },
  {
    id: 3,
    title: 'Greek Life Yelp',
    description: 'Work in Progres. A centralized hub to learn about a universities Greek life communities.',
    image: 'https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGVzaWduJTIwd2lyZWZyYW1lfGVufDF8fHx8MTc2MDA3MTczMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Dashboard', 'UX Design', 'Web App', 'UX Research'],
    category: 'web',
    link: '#',
    //github: '#',
  },
  {
    id: 4,
    title: 'College Student Cook Book',
    description: 'Digital Collection focused on the needs of college students such as cost, ingredients, time, and cookware needed.',
    image: cookbookpic,
    tags: ['UX Research', 'Omeka', 'Digital Collection'],
    category: 'web',
    link: 'https://donjadao.oucreate.com',
  },
];

interface ProjectsProps {
  onProjectClick?: (project: Project) => void;
}

export function Projects({ onProjectClick }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">Featured Projects</h2>
          <p className="max-w-2xl mx-auto text-white/70">
            A collection of UI/UX design projects showcasing my approach to solving complex user problems 
            with clean, intuitive interfaces.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="web">Web</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={onProjectClick} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="web">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.category === 'web')
                .map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={onProjectClick} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="mobile">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.category === 'mobile')
                .map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={onProjectClick} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="other">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.category === 'other')
                .map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={onProjectClick} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div 
        className="relative overflow-hidden aspect-video cursor-pointer"
        onClick={() => onClick?.(project)}
      >
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle 
          className="cursor-pointer hover:text-primary transition-colors"
          onClick={() => onClick?.(project)}
        >
          {project.title}
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onClick?.(project)}
        >
          View Details
        </Button>
        {project.github && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
