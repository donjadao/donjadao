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
import greeklifehub from '..assets/greeklifehub.png';

const projects = [
  {
    id: 1,
    title: 'Matcha Volatility Chart',
    description: 'Created an interactive data visualization highlighting sustainability and economic issues in the matcha industry.',
    image: matchaThumb,
    tags: ['Information Visualization', 'Data Analysis'],
    category: 'web',
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
    description: 'A web design focused on helping users buy books and be introduced to new ones .',
    image: bookstorePic,
    tags: ['HTML'],
    category: 'web',
    link: '#',
    //github: '#',
  },
  {
    id: 3,
    title: 'Greek Life Hub',
    description: 'A wire frame for a centralized hub to learn about a universitys Greek life communities.',
    image: greeklifehub,
    tags: ['UX Design', 'Web App', 'Wireframe', 'Information Retrieval'],
    category: 'web',
    link: 'https://lucid.app/lucidchart/655b9f29-7677-4e47-a0fa-56fc91591265/edit?viewport_loc=-4969%2C-2786%2C10230%2C4496%2C0_0&invitationId=inv_c8d5d512-38f9-4c4f-baa9-2f0bdc42b04f',
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
  {
  id: 5,
  title: 'Vietnamese Catholic Lunar New Year Wiki',
  description: 'A Wikipedia page covering the differences and importance of how Vietnamese Catholics celebrate Tét',
  image: cookbookpic,
  tags: ['Cultual Heritage Data', 'Wikipedia'],
  category: 'web',
  link: 'https://en.wikipedia.org/wiki/Vietnamese_Catholic_Lunar_New_Year',
  role: 'Creator and Author',
  timeline: '2 weeks',
  team: 'Solo project',
  challenge: 'Information about how Vietnamese Catholics celebrate Tết was scattered, inconsistent, and largely undocumented online, especially in English‑language spaces which are dominated by the global‑north perspective. This lack of representation made it difficult for readers in the diaspora communities to understand how Vietnamese Catholic traditions blend pre‑colonial customs with Catholic liturgy. The absence of a centralized, well‑cited resource reflected a broader archival gap between global north documentation practices and global south cultural knowledge where minority religious practices are often overlooked or flattened.',
  solution: 'Created a new Wikipedia article that documents Vietnamese Catholic Lunar New Year traditions through a cultural heritage lens. This involved: Conducting research across academic, historical, and community sources; Synthesizing information on liturgy, rituals, and cultural adaptations; Highlighting differences between Catholic and non‑Catholic Tết practices; Writing neutral, verifiable content aligned with Wikipedia standards; Adding cross‑links and categories to connect the topic to broader Asian diaspora and religious studies pages.',
  impact: 'Published the first dedicated Wikipedia page on Vietnamese Catholic Tết which fills a major gap in online cultural heritage representation. Increased visibility of diaspora religious practices that are often overshadowed by stronger narratives of Lunar New Year. Provided a reliable, accessible resource for students, researchers, and Vietnamese communities worldwide. Contributed to the preservation of minority cultural knowledge by documenting practices that are rarely archived or formally recorded (this is especially important for myself as it helps to preserve my own culture to pass it down to the next generations.'
  },
  {
  id: 6,
  title: 'SASE Member Database',
  description: 'A Sql project to help the Society of Asian Scientist and Engineers better understand our members',
  image: cookbookpic,
  tags: ['UX Research', 'MySql', 'Databases'],
  category: 'web',
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
