import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, Link as LinkIcon, Facebook, Twitter, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  image_url: string | null;
  created_at: string;
}

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .eq("published", true)
        .single();
      setPost(data as BlogPost | null);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const loadImageAsDataUrl = (url: string): Promise<{ dataUrl: string; width: number; height: number; format: string }> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        resolve({ dataUrl, width: img.naturalWidth, height: img.naturalHeight, format: "JPEG" });
      };
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = url;
    });

  const handleDownload = async () => {
    if (!post) return;
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 48;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      const titleLines = doc.splitTextToSize(post.title, contentWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 26 + 6;

      // Meta line
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120);
      const meta = `By ${post.author}  \u2022  ${new Date(post.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}  \u2022  ${post.category}`;
      doc.text(meta, margin, y);
      y += 18;
      doc.setDrawColor(220);
      doc.line(margin, y, pageWidth - margin, y);
      y += 16;
      doc.setTextColor(40);

      // Image
      if (post.image_url) {
        try {
          const { dataUrl, width, height, format } = await loadImageAsDataUrl(post.image_url);
          const ratio = height / width;
          const imgWidth = contentWidth;
          const imgHeight = Math.min(imgWidth * ratio, 280);
          if (y + imgHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.addImage(dataUrl, format, margin, y, imgWidth, imgHeight, undefined, "FAST");
          y += imgHeight + 18;
        } catch {
          // skip image if it fails to load
        }
      }

      // Body
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const bodyLines = doc.splitTextToSize(post.content, contentWidth);
      const lineHeight = 16;
      for (const line of bodyLines) {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      }

      // Footer link
      if (y + 24 > pageHeight - margin) { doc.addPage(); y = margin; }
      y += 12;
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text(`Read online: ${shareUrl}`, margin, y);

      const safeName = post.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 60) || "article";
      doc.save(`${safeName}.pdf`);
      toast.success("PDF downloaded");
    } catch {
      toast.error("Could not generate PDF");
    }
  };

  const handleDownloadImage = async () => {
    if (!post?.image_url) return;
    try {
      const res = await fetch(post.image_url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const ext = blob.type.split("/")[1] || "jpg";
      const safeName = post.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 60) || "image";
      a.href = url;
      a.download = `${safeName}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Image downloaded");
    } catch {
      toast.error("Could not download image");
    }
  };

  const shareText = post ? `${post.title} \u2014 ${shareUrl}` : "";

  const handleNativeShare = async () => {
    if (!post) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.title, url: shareUrl });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  };

  const openShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-20 text-center text-muted-foreground">Loading article...</div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container py-20 text-center space-y-4">
          <p className="text-muted-foreground">Article not found.</p>
          <Button asChild variant="outline">
            <Link to="/awareness"><ArrowLeft className="h-4 w-4 mr-2" />Back to Articles</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container max-w-3xl py-12 md:py-20"
      >
        <Link to="/awareness" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Articles
        </Link>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-sm text-muted-foreground">By {post.author}</span>
            <span className="text-sm text-muted-foreground">
              {new Date(post.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{post.title}</h1>
        </div>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full rounded-lg mb-8 object-cover max-h-96"
          />
        )}

        {/* Action toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" /> Download PDF
          </Button>
          {post.image_url && (
            <Button variant="outline" size="sm" onClick={handleDownloadImage}>
              <Download className="h-4 w-4 mr-2" /> Download image
            </Button>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              title="Share on WhatsApp"
              onClick={() => openShare(`https://wa.me/?text=${encodeURIComponent(shareText)}`)}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Share on Facebook"
              onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)}
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Share on X"
              onClick={() => openShare(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`)}
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Copy link" onClick={handleCopyLink}>
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Share" onClick={handleNativeShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-wrap">
          {post.content}
        </div>
      </motion.article>
    </Layout>
  );
};

export default BlogPostPage;
