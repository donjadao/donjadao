import { ArrowLeft, ExternalLink, Github, Calendar, Users, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  link?: string;
  github?: string;
};

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  // Extended project details (you can customize these for each project)
  const projectDetails = {
    overview: project.description,
    challenge: 'This section describes the main challenge or problem that needed to be solved. You can customize this for each project to provide detailed context about the user pain points and business requirements.',
    solution: 'This section explains the design solution and approach taken. Include details about your design process, user research findings, wireframes, prototyping, and how you arrived at the final solution.',
    impact: 'Highlight the results and impact of your design work. Include metrics like improved conversion rates, user satisfaction scores, reduced task completion time, or other relevant KPIs.',
    role: 'Lead UI/UX Designer',
    timeline: '3 months',
    team: '4 designers, 6 developers',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2a2d45' }}>
      {/* Back Button */}
      <div className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10" style={{ backgroundColor: 'rgba(42, 45, 69, 0.9)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>

      {/* Project Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="mb-4 text-white">{project.title}</h1>
          <p className="text-xl text-white/70 mb-6">{project.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" style={{ backgroundColor: '#7484bc30', color: '#7484bc' }}>
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.link && (
              <Button asChild style={{ backgroundColor: '#d03674' }} className="hover:opacity-90">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Project
                </a>
              </Button>
            )}
            {project.github && (
              <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative overflow-hidden rounded-lg mb-12">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* Project Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#7484bc20' }}>
                  <Users className="h-5 w-5" style={{ color: '#7484bc' }} />
                </div>
                <h3 className="text-white">Role</h3>
              </div>
              <p className="text-white/70">{projectDetails.role}</p>
            </CardContent>
          </Card>

          <Card className="border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#6c6cac20' }}>
                  <Calendar className="h-5 w-5" style={{ color: '#6c6cac' }} />
                </div>
                <h3 className="text-white">Timeline</h3>
              </div>
              <p className="text-white/70">{projectDetails.timeline}</p>
            </CardContent>
          </Card>

          <Card className="border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#d0367420' }}>
                  <Target className="h-5 w-5" style={{ color: '#d03674' }} />
                </div>
                <h3 className="text-white">Team</h3>
              </div>
              <p className="text-white/70">{projectDetails.team}</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Details */}
        <div className="space-y-12">
          {/* Overview */}
          <div>
            <h2 className="mb-4 text-white" style={{ color: '#e8a5ad' }}>Overview</h2>
            <p className="text-white/70 text-lg leading-relaxed">{projectDetails.overview}</p>
          </div>

          {/* Challenge */}
          <div>
            <h2 className="mb-4 text-white" style={{ color: '#7484bc' }}>The Challenge</h2>
            <p className="text-white/70 text-lg leading-relaxed">{projectDetails.challenge}</p>
          </div>

          {/* Solution */}
          <div>
            <h2 className="mb-4 text-white" style={{ color: '#6c6cac' }}>The Solution</h2>
            <p className="text-white/70 text-lg leading-relaxed">{projectDetails.solution}</p>
          </div>

          {/* Additional Images Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-lg">
              <ImageWithFallback
                src={project.image}
                alt={`${project.title} - Detail 1`}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <ImageWithFallback
                src={project.image}
                alt={`${project.title} - Detail 2`}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Impact */}
          <div>
            <h2 className="mb-4 text-white" style={{ color: '#d03674' }}>Impact & Results</h2>
            <p className="text-white/70 text-lg leading-relaxed">{projectDetails.impact}</p>
          </div>
        </div>

        {/* Back to Projects Button */}
        <div className="mt-16 text-center">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
