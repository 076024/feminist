import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart } from "lucide-react";

const timeline = [
  { year: "1848", event: "Seneca Falls Convention — the first women's rights convention in the U.S." },
  { year: "1893", event: "New Zealand becomes the first country to grant women the right to vote." },
  { year: "1920", event: "The 19th Amendment grants women suffrage in the United States." },
  { year: "1963", event: "Betty Friedan publishes 'The Feminine Mystique,' sparking second-wave feminism." },
  { year: "1979", event: "UN adopts CEDAW — the international bill of rights for women." },
  { year: "2017", event: "The #MeToo movement goes viral, exposing widespread sexual harassment." },
  { year: "Today", event: "The fight continues for equal pay, reproductive rights, and ending gender-based violence." },
];

const values = [
  { icon: Target, title: "Our Mission", description: "To create a world where every person, regardless of gender, has equal rights, opportunities, and freedom from violence and oppression." },
  { icon: Eye, title: "Our Vision", description: "A society where gender equality is not aspirational but fundamental — embedded in laws, institutions, and everyday life." },
  { icon: Heart, title: "Our Values", description: "Intersectionality, courage, compassion, solidarity, transparency, and an unwavering commitment to justice for all." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container max-w-3xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">About Feminism</h1>
          <p className="text-lg text-muted-foreground">
            Feminism is the belief in and advocacy for the political, economic, and social equality of all genders. It is not about superiority — it's about justice.
          </p>
        </div>
      </section>

      {/* What is Feminism */}
      <section className="py-16">
        <div className="container max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold text-center">What is Feminism?</h2>
          <div className="prose prose-lg mx-auto text-muted-foreground space-y-4">
            <p>
              At its core, feminism is about equality. It challenges the systems and structures that have historically denied women their rights, their safety, and their autonomy. Feminism recognizes that gender-based oppression intersects with race, class, sexuality, disability, and other identities.
            </p>
            <p>
              From the suffragettes who fought for the vote to modern activists challenging workplace harassment, feminism has always been about expanding freedom and dignity for everyone. It benefits not just women, but all people, by dismantling harmful stereotypes and creating fairer societies.
            </p>
            <p>
              Feminism is not a single movement — it encompasses diverse perspectives, from liberal and radical feminism to intersectional, ecofeminist, and postcolonial frameworks. What unites them is a shared commitment to ending gender-based discrimination and violence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="border-none shadow-md">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-10">A Brief History</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-12">
                  <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  <p className="font-heading font-bold text-primary">{item.year}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
