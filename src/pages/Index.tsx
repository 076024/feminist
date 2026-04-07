import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { ArrowRight, Heart, Shield, Users, Megaphone } from "lucide-react";

const stats = [
  { value: "1 in 3", label: "Women worldwide experience physical or sexual violence" },
  { value: "23%", label: "Global gender pay gap persists today" },
  { value: "26%", label: "Of parliamentary seats held by women globally" },
  { value: "132", label: "Years to close the global gender gap at current pace" },
];

const features = [
  {
    icon: Shield,
    title: "Protection & Support",
    description: "Access resources and confidential help for survivors of violence and discrimination.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a network of advocates fighting for gender equality worldwide.",
  },
  {
    icon: Megaphone,
    title: "Advocacy",
    description: "Participate in campaigns and petitions driving real policy change.",
  },
  {
    icon: Heart,
    title: "Education",
    description: "Learn about women's rights, feminist history, and intersectional justice.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/60 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="container relative py-20 md:py-32 lg:py-40">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              Equality is a Right,
              <br />
              <span className="text-secondary">Not a Privilege</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              We fight for gender equality, protect women from sexual violence, and challenge all forms of oppression. Every voice matters. Every action counts.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link to="/support">Get Help</Link>
              </Button>
              <Button asChild size="lg" className="bg-primary-foreground/15 border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/25 font-semibold">
                <Link to="/community">Join the Movement</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground font-semibold">
                <Link to="/about">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">The Urgency is Real</h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              These numbers tell the story of why this fight matters — and why we need you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center border-none shadow-md bg-card">
                <CardContent className="pt-6">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features / What We Do */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">What We Do</h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Our platform empowers individuals and communities to create lasting change.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="group hover:shadow-lg transition-shadow border-none shadow-md">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Make a Difference?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Whether you need help, want to volunteer, or wish to support our campaigns — there's a place for you here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/community#volunteer">Volunteer Now</Link>
            </Button>
            <Button asChild size="lg" className="bg-primary-foreground/15 border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/25 font-semibold">
              <Link to="/campaigns">View Campaigns</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
