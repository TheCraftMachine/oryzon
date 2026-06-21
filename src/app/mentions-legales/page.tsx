import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://oryzon-lake.vercel.app";
const LAST_UPDATED = "21 juin 2026";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Oryzon — informations sur l'éditeur, l'hébergeur et la propriété intellectuelle.",
  alternates: { canonical: `${BASE}/mentions-legales` },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F9F7F4]">
      <article className="max-w-3xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-24 md:pb-32">

        <header className="mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-black/40 mb-6">
            <span className="w-1 h-1 rounded-full bg-[#ba873f]" />
            Informations légales
          </span>
          <h1
            className="font-display text-[#111111] mb-5"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Mentions légales
          </h1>
          <p className="text-sm text-black/40">Dernière mise à jour : {LAST_UPDATED}</p>
        </header>

        <div className="space-y-14 md:space-y-16">

          <Section title="1 — Éditeur du site">
            <P>
              Le présent site est édité par <strong>Oryzon</strong>,
              {" "}[forme juridique, ex&nbsp;: SARL au capital de XX&nbsp;XXX&nbsp;€],
              dont le siège social est situé&nbsp;: [adresse complète], 14000 Caen, France.
            </P>
            <Dl
              rows={[
                ["Téléphone", "02 31 348 340"],
                ["Email", "contact@maison-oryzon.fr"],
                ["Site web", "https://oryzon-lake.vercel.app"],
                ["SIRET", "[XXX XXX XXX XXXXX]"],
                ["RCS", "[Caen — XXX XXX XXX]"],
                ["TVA intracommunautaire", "[FR XX XXX XXX XXX]"],
                ["Directeur de la publication", "[Nom Prénom]"],
              ]}
            />
          </Section>

          <Section title="2 — Hébergeur">
            <P>
              Le site est hébergé par <strong>OVH SAS</strong>, société par actions simplifiée au capital
              de 50 000 000&nbsp;€, immatriculée au RCS de Lille Métropole sous le numéro 424 761 419,
              dont le siège social est situé&nbsp;: 2 rue Kellermann, 59100 Roubaix, France.
            </P>
            <P>
              Téléphone&nbsp;: 1007 (depuis la France) — Site web&nbsp;:{" "}
              <a className="underline decoration-[#ba873f]/40 hover:decoration-[#ba873f]" href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer">ovhcloud.com</a>
            </P>
          </Section>

          <Section title="3 — Propriété intellectuelle">
            <P>
              L'ensemble des éléments composant le site (textes, images, photographies, vidéos, logos,
              charte graphique, code source, structure) est la propriété exclusive d'Oryzon ou fait l'objet
              d'une autorisation d'utilisation. Toute reproduction, représentation, modification, publication
              ou adaptation, totale ou partielle, par quelque procédé que ce soit, est interdite sans
              l'autorisation écrite préalable d'Oryzon.
            </P>
            <P>
              Les photographies des réalisations sont publiées avec l'accord des propriétaires. Les visualisations
              3D, rendus et plans présentés à titre illustratif demeurent la propriété de leurs auteurs.
            </P>
          </Section>

          <Section title="4 — Liens hypertextes">
            <P>
              Le site peut contenir des liens vers d'autres sites internet ou ressources externes. Oryzon n'exerce
              aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou aux conséquences
              de leur utilisation.
            </P>
          </Section>

          <Section title="5 — Données personnelles">
            <P>
              Les modalités de collecte et de traitement de vos données personnelles sont décrites dans notre{" "}
              <Link href="/politique-confidentialite" className="underline decoration-[#ba873f]/40 hover:decoration-[#ba873f]">
                politique de confidentialité
              </Link>.
            </P>
          </Section>

          <Section title="6 — Cookies">
            <P>
              Ce site ne dépose <strong>aucun cookie</strong> sur votre terminal. Aucun outil de mesure
              d'audience, de tracking ou de publicité n'y est intégré.
            </P>
          </Section>

          <Section title="7 — Crédits">
            <P>
              Conception et développement du site&nbsp;: [Nom de l'agence ou du prestataire].
              Photographies&nbsp;: équipe Oryzon et propriétaires des projets.
            </P>
          </Section>

          <Section title="8 — Loi applicable et juridiction">
            <P>
              Les présentes mentions légales sont régies par le droit français. En cas de litige relatif à leur
              interprétation ou à leur exécution, et à défaut d'accord amiable, les tribunaux français seront
              seuls compétents.
            </P>
          </Section>

        </div>

        <footer className="mt-20 pt-10 border-t border-black/8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black/80 transition-colors duration-200"
          >
            <span>←</span>
            <span>Retour à l'accueil</span>
          </Link>
        </footer>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="font-display text-[#111111] mb-5"
        style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-[15px] md:text-base text-black/65 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function Dl({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-6 gap-y-3 pt-2 text-[15px]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-black/40 text-xs uppercase tracking-[0.15em] sm:pt-0.5">{k}</dt>
          <dd className="text-black/70">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
