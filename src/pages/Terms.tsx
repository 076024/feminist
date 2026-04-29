import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

const Terms = () => (
  <Layout>
    <SEO title="Terms of Service" description="Terms governing your use of the Feminist platform." />
    <article className="container max-w-3xl py-16 prose prose-stone">
      <h1 className="font-heading text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <h2 className="font-heading mt-8">Acceptance</h2>
      <p>By accessing Feminist, you agree to these terms. If you don't agree, please don't use the site.</p>

      <h2 className="font-heading mt-6">Use of the platform</h2>
      <p>You agree to use the platform respectfully and lawfully. Hate speech, harassment, threats, and content harmful to women, girls, or marginalised groups are strictly prohibited and will be removed.</p>

      <h2 className="font-heading mt-6">User submissions</h2>
      <p>Testimonials, petition signatures, and other content you submit may be displayed publicly (after moderation where applicable). Do not submit confidential third-party information.</p>

      <h2 className="font-heading mt-6">No professional advice</h2>
      <p>Information on this site is for general support and awareness. It is not legal, medical, or psychological advice. Always consult a qualified professional for individual circumstances.</p>

      <h2 className="font-heading mt-6">Liability</h2>
      <p>Feminist is provided "as is". We are not liable for indirect or consequential damages arising from your use of the platform.</p>

      <h2 className="font-heading mt-6">Changes</h2>
      <p>We may update these terms. Continued use after changes constitutes acceptance.</p>
    </article>
  </Layout>
);

export default Terms;