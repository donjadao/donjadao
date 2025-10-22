import { Users, Heart, Award, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const leadershipRoles = [
  {
    id: 1,
    organization: 'Design Mentorship Program',
    role: 'Lead Mentor',
    type: 'Philanthropy',
    period: '2023 - Present',
    description: 'Mentoring aspiring designers, providing guidance on portfolio development, career advice, and design fundamentals.',
    icon: Heart,
    color: '#d03674',
  },
  {
    id: 2,
    organization: 'University Design Club',
    role: 'President',
    type: 'Club',
    period: '2022 - 2023',
    description: 'Led a team of 50+ members, organized workshops, design challenges, and community events to foster creativity and collaboration.',
    icon: Users,
    color: '#7484bc',
  },
  {
    id: 3,
    organization: 'Code for Good Initiative',
    role: 'UX Lead',
    type: 'Philanthropy',
    period: '2023 - Present',
    description: 'Leading design efforts for non-profit organizations, creating accessible and impactful digital solutions for social causes.',
    icon: Award,
    color: '#6c6cac',
  },
  {
    id: 4,
    organization: 'Women in Tech',
    role: 'Event Coordinator',
    type: 'Club',
    period: '2021 - 2022',
    description: 'Organized networking events and workshops to support women in technology fields and promote diversity in design.',
    icon: Users,
    color: '#e8a5ad',
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
            in the design community and beyond.
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
                <p className="text-white/70">{role.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
