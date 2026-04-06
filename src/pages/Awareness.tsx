import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categories = ["All", "Sexual Violence", "Women's Rights", "Gender Equality"];

const articles = [
  {
    id: 1,
    title: "Understanding Consent: A Comprehensive Guide",
    excerpt: "Consent is a clear, enthusiastic, and ongoing agreement between all parties involved. Learn what consent looks like, why it matters, and how to communicate boundaries effectively.",
    category: "Sexual Violence",
    date: "March 15, 2024",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "The Gender Pay Gap: Myths vs. Facts",
    excerpt: "Women globally earn approximately 77 cents for every dollar men earn. This article breaks down the real causes of the pay gap and what can be done to close it.",
    category: "Gender Equality",
    date: "March 10, 2024",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Reproductive Rights Around the World",
    excerpt: "Access to reproductive healthcare is a fundamental human right. Explore the current state of reproductive rights globally and the ongoing battles for bodily autonomy.",
    category: "Women's Rights",
    date: "March 5, 2024",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "How to Support a Survivor of Sexual Assault",
    excerpt: "When someone you care about discloses they have experienced sexual violence, your response matters. Here's how to be a compassionate, supportive ally.",
    category: "Sexual Violence",
    date: "February 28, 2024",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Intersectional Feminism: Why It Matters",
    excerpt: "Feminism must account for the overlapping systems of discrimination that women of color, LGBTQ+ women, and disabled women face. Learn about intersectionality.",
    category: "Gender Equality",
    date: "February 20, 2024",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "Women in Leadership: Breaking the Glass Ceiling",
    excerpt: "Despite progress, women remain underrepresented in leadership positions worldwide. Discover the barriers women face and the strategies driving change.",
    category: "Women's Rights",
    date: "February 15, 2024",
    readTime: "5 min read",
  },
];

const Awareness = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchesCategory = selectedCategory === "All" || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <section className="bg-muted/50 py-16">
        <div className="container max-w-3xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Awareness & Education</h1>
          <p className="text-lg text-muted-foreground">
            Knowledge is power. Explore articles on sexual violence awareness, women's rights, and gender equality.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="cursor-pointer text-sm px-4 py-1.5"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-shadow border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                  <p className="text-xs text-muted-foreground mt-4">{article.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Awareness;
