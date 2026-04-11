import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  created_at: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

const Awareness = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts((data as BlogPost[]) ?? []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filtered = posts.filter((a) => {
    const matchesCategory = selectedCategory === "All" || a.category === selectedCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-muted/50 py-16"
      >
        <div className="container max-w-3xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Awareness & Education</h1>
          <p className="text-lg text-muted-foreground">
            Knowledge is power. Explore articles on sexual violence awareness, women's rights, and gender equality.
          </p>
        </div>
      </motion.section>

      <section className="py-12">
        <div className="container">
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

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading articles...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((article, i) => (
                  <motion.div
                    key={article.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                  >
                    <Link to={`/awareness/${article.id}`}>
                      <Card className="group hover:shadow-lg transition-shadow border-none shadow-md h-full cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                            <span className="text-xs text-muted-foreground">By {article.author}</span>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors leading-snug">
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3">{article.content}</p>
                          <p className="text-xs text-muted-foreground mt-4">
                            {new Date(article.created_at).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No articles found. Try a different search or category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Awareness;
