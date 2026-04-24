import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Code2, Camera, Video, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const roles = [
  {
    icon: Code2,
    title: 'Developer',
    description: 'Senior React & Next.js developer crafting performant web applications with modern technologies.',
  },
  {
    icon: Camera,
    title: 'Photographer',
    description: 'Capturing moments and stories through the lens, specializing in travel and lifestyle photography.',
  },
  {
    icon: Video,
    title: 'Vlogger',
    description: 'Sharing tech insights, travel adventures, and behind-the-scenes content on YouTube.',
  },
  {
    icon: Gamepad2,
    title: 'Gamer',
    description: 'Passionate about gaming culture, streaming occasionally, and connecting with the gaming community.',
  },
];

export function AboutSection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate creator wearing multiple hats, combining technical expertise 
            with creative pursuits to build and inspire.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/aboutProfileImg.png"
                alt="Haiko Nguyen"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Hello! Welcome to my corner of the internet. I&apos;m a self-taught developer 
              and photographer based in Europe. My journey into tech started from pure 
              curiosity, and it has evolved into a passion for building beautiful, 
              accessible web experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              When I&apos;m not coding, you&apos;ll find me exploring new places with my camera, 
              creating vlogs about tech and travel, or diving into the latest games. 
              I believe in continuous learning and sharing knowledge with the community.
            </p>

            <Button asChild className="group">
              <Link href="/about">
                Read My Full Story
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {roles.map((role) => (
            <Card 
              key={role.title} 
              className="group bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <role.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
