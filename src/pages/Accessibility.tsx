import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

const Accessibility = () => (
  <Layout>
    <SEO title="Accessibility Statement" description="Our commitment to making Feminist accessible to everyone." />
    <article className="container max-w-3xl py-16 prose prose-stone">
      <h1 className="font-heading text-4xl font-bold mb-2">Accessibility Statement</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <p className="mt-6">We strive to make Feminist usable by everyone, regardless of ability or technology. We aim to conform to <strong>WCAG 2.1 Level AA</strong>.</p>

      <h2 className="font-heading mt-6">What we do</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Semantic HTML and ARIA labels for screen readers</li>
        <li>Keyboard navigation across all interactive elements</li>
        <li>Sufficient colour contrast and resizable text</li>
        <li>Descriptive alt text on meaningful images</li>
      </ul>

      <h2 className="font-heading mt-6">Found a barrier?</h2>
      <p>If anything on this site is hard to use, email <a href="mailto:Suwilanjinachilindi033@gmail.com" className="text-primary underline">Suwilanjinachilindi033@gmail.com</a> and we will respond within 5 working days.</p>
    </article>
  </Layout>
);

export default Accessibility;