import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thanks for reaching out! This is a demo form.');
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">Let's Work Together</h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Have a project in mind? Let's create something amazing together. 
            Feel free to reach out for collaborations or just a friendly chat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#e8a5ad' }}>
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Email</CardTitle>
              <CardDescription>Send me an email anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:ding.don908@gmail.com"
                className="text-primary hover:underline"
              >
                ding.don908@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#e8a5ad' }}>
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Phone</CardTitle>
              <CardDescription>Call me during business hours</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="tel:+15059333337" className="text-primary hover:underline">
                +1 (505) 933-3337
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#e8a5ad' }}>
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Location</CardTitle>
              <CardDescription>Based in</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white">Norman, OK</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>
              Fill out the form below and I'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me more about your project...(the submit button is just for decor)"
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
