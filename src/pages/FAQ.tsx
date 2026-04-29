import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is the help I request confidential?",
    a: "Yes. Help requests can be submitted anonymously. Phone numbers are optional and only visible to a small admin team for follow-up.",
  },
  {
    q: "How quickly will someone respond to my help request?",
    a: "We aim to respond within 24–48 hours. If your situation is urgent, please call the GBV helpline on 933 or the Police on 991.",
  },
  {
    q: "How can I volunteer?",
    a: "Visit our Community page and fill in the volunteer form. We'll reach out with current opportunities that match your interests.",
  },
  {
    q: "Can I attend events if I'm not a member?",
    a: "Yes. Our events are open to everyone. RSVP via the Events page so we can plan capacity.",
  },
  {
    q: "How are my donations or signatures used?",
    a: "Petition signatures are delivered to relevant policymakers. We don't currently process online donations — contact us to discuss other ways to support.",
  },
  {
    q: "How do I leave the site quickly if I'm in danger?",
    a: "Click the 'Quick Exit' button at the bottom-right of any page, or press Esc three times in a row. You'll be redirected to a neutral site.",
  },
  {
    q: "Can I delete my data?",
    a: "Absolutely. Email Suwilanjinachilindi033@gmail.com and we'll remove your records within 30 days.",
  },
];

const FAQ = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <Layout>
      <SEO title="Frequently Asked Questions" description="Answers to common questions about Feminist's services, safety, volunteering, and events." jsonLd={jsonLd} />
      <section className="container max-w-3xl py-16">
        <h1 className="font-heading text-4xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">Quick answers to the things people ask most often.</p>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-heading">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Layout>
  );
};

export default FAQ;