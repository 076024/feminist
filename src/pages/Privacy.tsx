import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

const Privacy = () => (
  <Layout>
    <SEO title="Privacy Policy" description="How Feminist collects, uses, and protects your personal information." />
    <article className="container max-w-3xl py-16 prose prose-stone">
      <h1 className="font-heading text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <h2 className="font-heading mt-8">Who we are</h2>
      <p>Feminist is a non-profit advocacy platform. We respect your privacy and aim to collect the minimum information needed to support our community.</p>

      <h2 className="font-heading mt-6">Information we collect</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Forms you submit:</strong> name, email, phone (optional), and the message you provide via help requests, volunteer signup, RSVPs, petitions, contact, or testimonials.</li>
        <li><strong>Anonymous help requests:</strong> may be submitted without identifying details.</li>
        <li><strong>Technical data:</strong> basic browser/device data via standard server logs for security and performance.</li>
      </ul>

      <h2 className="font-heading mt-6">How we use your information</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>To respond to your request or message.</li>
        <li>To coordinate volunteers and event RSVPs.</li>
        <li>To send you updates you have explicitly subscribed to.</li>
      </ul>
      <p>We never sell or rent your data. We share data only with service providers necessary to operate the site (e.g. hosting, email delivery), bound by confidentiality.</p>

      <h2 className="font-heading mt-6">Your rights</h2>
      <p>You can request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:Suwilanjinachilindi033@gmail.com" className="text-primary underline">Suwilanjinachilindi033@gmail.com</a>.</p>

      <h2 className="font-heading mt-6">Safety note</h2>
      <p>If you are in danger, please use the <strong>Quick Exit</strong> button (bottom-right) or press <kbd>Esc</kbd> three times to leave this site immediately.</p>

      <h2 className="font-heading mt-6">Cookies</h2>
      <p>We use only essential cookies required for the site to function. We do not use tracking or advertising cookies.</p>

      <h2 className="font-heading mt-6">Contact</h2>
      <p>For privacy questions: <a href="mailto:Suwilanjinachilindi033@gmail.com" className="text-primary underline">Suwilanjinachilindi033@gmail.com</a></p>
    </article>
  </Layout>
);

export default Privacy;