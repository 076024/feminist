import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Globe, Shield, Scale, Heart, Home, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface Resource {
  name: string;
  description: string;
  phone?: string;
  website?: string;
  location?: string;
  tags?: string[];
}

const categories: { title: string; icon: typeof Shield; intro: string; items: Resource[] }[] = [
  {
    title: "Emergency & Crisis Hotlines",
    icon: Shield,
    intro: "Call these numbers if you are in immediate danger or need urgent support.",
    items: [
      { name: "GBV National Helpline", description: "24/7 free helpline for gender-based violence support across Zambia.", phone: "933" },
      { name: "Zambia Police Service", description: "Report crimes, request urgent assistance.", phone: "991" },
      { name: "Childline Zambia", description: "Free 24/7 helpline for children and young people in distress.", phone: "933" },
      { name: "Lifeline Zambia", description: "Emotional support and suicide prevention counselling.", phone: "933" },
    ],
  },
  {
    title: "Safe Houses & Shelters",
    icon: Home,
    intro: "Temporary safe accommodation for survivors of violence.",
    items: [
      { name: "YWCA Zambia Shelter", description: "Emergency shelter, counselling and reintegration support for women and children.", phone: "+260 211 252095", website: "https://ywca.org.zm", location: "Lusaka" },
      { name: "Young Women's Christian Association — Kitwe", description: "Shelter and survivor support on the Copperbelt.", location: "Kitwe" },
      { name: "Women & Law in Southern Africa (WLSA) Safe Space", description: "Referral to vetted safe houses and accompaniment.", phone: "+260 211 290009", location: "Lusaka" },
    ],
  },
  {
    title: "Legal Aid & Justice",
    icon: Scale,
    intro: "Free or low-cost legal advice, representation, and rights education.",
    items: [
      { name: "Legal Aid Board of Zambia", description: "Government-funded legal representation for those who cannot afford a lawyer.", phone: "+260 211 252293", website: "https://lab.gov.zm", location: "Nationwide" },
      { name: "Women in Law and Development in Africa (WiLDAF)", description: "Legal literacy and advocacy on women's rights.", location: "Lusaka" },
      { name: "Victim Support Unit (VSU)", description: "Specialized police unit handling GBV, child abuse and sexual offences. Available at every police station.", phone: "991" },
      { name: "National Prosecution Authority — GBV Desk", description: "Specialized prosecutors for gender-based violence cases.", location: "Nationwide" },
    ],
  },
  {
    title: "Medical & Mental Health",
    icon: Heart,
    intro: "Health services including post-rape care, HIV/PEP, and counselling.",
    items: [
      { name: "One-Stop Centres (UTH, Ndola, Livingstone)", description: "Free integrated medical, psychosocial and legal services for GBV survivors. PEP available within 72 hours.", phone: "+260 211 254131", location: "Major hospitals" },
      { name: "Marie Stopes Zambia", description: "Sexual and reproductive health services, contraception, post-abortion care.", website: "https://mariestopes.org.zm", location: "Nationwide" },
      { name: "Mental Health Users Network of Zambia (MHUNZA)", description: "Peer support and advocacy for mental wellbeing.", location: "Lusaka" },
    ],
  },
  {
    title: "Partner Organizations",
    icon: BookOpen,
    intro: "Allies working alongside us for gender equality.",
    items: [
      { name: "Non-Governmental Gender Organisations Coordinating Council (NGOCC)", description: "Umbrella body of women's rights organisations in Zambia.", website: "https://ngocc.org.zm", location: "Lusaka" },
      { name: "Women for Change", description: "Rural women's empowerment and gender justice.", website: "https://wfc.org.zm" },
      { name: "Panos Institute Southern Africa", description: "Media advocacy on gender, sexual and reproductive health.", website: "https://panos.org.zm" },
    ],
  },
];

const Resources = () => {
  return (
    <Layout>
      <SEO
        title="Resources & Directory — Shelters, Legal Aid & Hotlines"
        description="A directory of shelters, legal aid, hotlines, medical services and partner organizations supporting women in Zambia."
      />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-muted/50 py-16"
      >
        <div className="container max-w-3xl text-center space-y-4">
          <Shield className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Resources & Directory</h1>
          <p className="text-lg text-muted-foreground">
            Trusted shelters, legal aid, medical services and partner organizations. You are not alone.
          </p>
        </div>
      </motion.section>

      <section className="py-12">
        <div className="container max-w-5xl space-y-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <cat.icon className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold">{cat.title}</h2>
              </div>
              <p className="text-muted-foreground">{cat.intro}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((item) => (
                  <Card key={item.name} className="border-none shadow-md">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      {item.location && (
                        <Badge variant="secondary" className="w-fit text-xs gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex flex-wrap gap-3 pt-2 text-sm">
                        {item.phone && (
                          <a
                            href={`tel:${item.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                          >
                            <Phone className="h-4 w-4" /> {item.phone}
                          </a>
                        )}
                        {item.website && (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                          >
                            <Globe className="h-4 w-4" /> Website
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Know an organization that should be listed here? Help us keep this directory current.
              </p>
              <a href="/contact" className="text-primary font-medium hover:underline">
                Suggest a resource →
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
