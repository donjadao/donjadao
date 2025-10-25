import { Users, Heart, Award, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

import FSA from './src/assets/FSA.png';
import SASE from './src/assets/SASE.png';
import AACS from './src/assets/AACS.png';
import KSA from './src/assets/KSA.png';
import TNTT from './src/assets/TNTT.png';
import UX from './src/assets/UX.png';

const leadershipRoles = [
  {
    id: 1,
    organization: 'User Experience Design Club',
    role: 'Vice President External, Director of Education, Creative Director',
    type: 'Club',
    period: '2023 - Present',
    description: 'Founded and led a student organization in 2023, designing branding, managing communications, and creating UX-informed leadership workshops.',
    icon: Heart,
    color: '#d03674',
    image: UX,
  },
  {
    id: 2,
    organization: 'Society of Asian Scientist and Engineers (SASE)',
    role: 'Graphic Designer',
    type: 'Club',
    period: '2022 - 2023',
    description: 'Led a team of 50+ members, organized workshops, design challenges, and community events to foster creativity and collaboration.',
    icon: Users,
    color: '#7484bc',
    image: SASE,
  },
  {
    id: 3,
    organization: 'Vietnamese Eucharistic Youth Movement',
    role: 'Search Division Section Leader',
    type: 'Philanthropy',
    period: '2021 - Present',
    description: 'Led youth programming and weekly scheudles, organizing values-based events, designing creative projects, and developing engaging lessons and activities.',
    icon: Award,
    color: '#6c6cac',
    image: TNTT,
  },
  {
    id: 4,
    organization: 'Filipino Student Association',
    role: 'Historian',
    type: 'Club',
    period: '2023 - 2024',
    description: 'Founded a Filipino cultural organization that promoted unity through media outreach, event coordination, marketing design, and photo documentation.',
    icon: Heart,
    color: '#e8a5ad',
    image: FSA,
  },
  {
    id: 5,
    organization: 'Korean Student Association',
    role: 'Intern Coordinator, Graphic Designer',
    type: 'Club',
    period: '2023 - Present',
    description: 'Serve as Graphic Designer and Intern Coordinator for the Korean Student Association, leading cultural event planning, designing visual assets and merchandise, and mentoring interns to sustain future leadership.',
    icon: Users,
    color: '#e8a5ad',
    image: KSA,
  },
  {
    id: 6,
    organization: 'Asian Americans in Creative Spaces',
    role: 'Mentor',
    type: 'Club',
    period: '2025 - Present',
    description: 'Serving as a mentor for underclassmen students to help them find the tools and confidence to be successful!',
    icon: Award,
    color: '#e8a5ad',
    image: AACS,
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">Leadership & Involvement</h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Organizations and initiatives where I've contributed my time and skills to make a positive impact
            in the design community and beyond. My main goal in life is to help and better the lives of the people around me and community based innitiatives like this allow me to directly do that. These organization have helped be blossom into the social butterly I am today. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadershipRoles.map((role) => (
            <Card key={role.id} className="group hover:shadow-lg transition-all duration-300 border-white/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${role.color}20` }}
                      >
                        <role.icon 
                          className="h-5 w-5" 
                          style={{ color: role.color }}
                        />
                      </div>
                      <Badge 
                        variant="secondary"
                        style={{ 
                          backgroundColor: `${role.color}20`,
                          color: role.color,
                          borderColor: `${role.color}40`
                        }}
                      >
                        {role.type}
                      </Badge>
                    </div>
                    <CardTitle className="mb-2">{role.organization}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span style={{ color: role.color }}>{role.role}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3 text-white/60">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{role.period}</span>
                </div>
                <p className="text-white/70 mb-4">{role.description}</p>
                <div className="relative overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={role.image}
                    alt={role.organization}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
