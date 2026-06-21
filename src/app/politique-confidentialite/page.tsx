import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://oryzon-lake.vercel.app";
const LAST_UPDATED = "21 juin 2026";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité d'Oryzon — comment nous collectons, utilisons et protégeons vos données personnelles, conformément au RGPD.",
  alternates: { canonical: `${BASE}/politique-confidentialite` },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-[100dvh] bg-[#F9F7F4]">
      <article className="max-w-3xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-24 md:pb-32">

        <header className="mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-black/40 mb-6">
            <span className="w-1 h-1 rounded-full bg-[#ba873f]" />
            Vie privée
          </span>
          <h1
            className="font-display text-[#111111] mb-5"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Politique de confidentialité
          </h1>
          <p className="text-sm text-black/40">Dernière mise à jour : {LAST_UPDATED}</p>
        </header>

        <div className="space-y-14 md:space-y-16">

          <Section title="1 — Préambule">
            <P>
              Chez Oryzon, nous attachons une grande importance au respect de votre vie privée.
              Cette politique explique de manière claire et transparente quelles données personnelles
              nous collectons à travers notre site, à quelles fins, sur quelle base juridique,
              à qui nous les communiquons, combien de temps nous les conservons, et quels sont
              vos droits.
            </P>
            <P>
              Cette politique est rédigée dans le respect du Règlement (UE) 2016/679 du 27 avril 2016
              (RGPD) et de la loi française n° 78-17 du 6 janvier 1978 modifiée dite « Informatique et Libertés ».
            </P>
          </Section>

          <Section title="2 — Responsable du traitement">
            <P>
              Le responsable du traitement de vos données personnelles est&nbsp;:
            </P>
            <Dl
              rows={[
                ["Société", "Oryzon"],
                ["Adresse", "[Adresse complète], 14000 Caen, France"],
                ["Téléphone", "02 31 348 340"],
                ["Email", "contact@maison-oryzon.fr"],
              ]}
            />
            <P>
              Pour toute question relative au traitement de vos données ou à l'exercice de vos droits,
              vous pouvez nous contacter à l'adresse&nbsp;: <a className="underline decoration-[#ba873f]/40 hover:decoration-[#ba873f]" href="mailto:contact@maison-oryzon.fr">contact@maison-oryzon.fr</a>.
            </P>
          </Section>

          <Section title="3 — Données collectées et finalités">
            <P>
              La collecte de données personnelles est volontairement réduite au strict nécessaire pour répondre
              à vos demandes.
            </P>

            <h3 className="font-display text-black/85 mt-6 mb-2 text-base">a. Journaux techniques de connexion</h3>
            <P>
              Notre hébergeur conserve automatiquement des journaux de connexion (adresse IP, type de navigateur,
              date et heure de visite, pages consultées) à des fins exclusivement techniques.
            </P>
            <Bullets
              items={[
                ["Finalité", "Sécurité du site, prévention des abus, diagnostic d'incidents."],
                ["Base légale", "Intérêt légitime de l'éditeur à assurer la sécurité du service (art. 6.1.f RGPD)."],
                ["Durée de conservation", "12 mois maximum."],
              ]}
            />

            <h3 className="font-display text-black/85 mt-8 mb-2 text-base">b. Formulaire de contact</h3>
            <P>
              Lorsque vous remplissez le formulaire de la page Contact, nous collectons votre nom, votre adresse
              email, votre numéro de téléphone, le type de projet et le contenu de votre message. Ces informations
              sont reçues sur notre serveur OVH (France), puis transmises pour livraison via le service{" "}
              <strong>Brevo</strong> (société française, serveurs en Union européenne) qui nous les fait parvenir
              par email. Elles ne sont pas stockées sur ce site.
            </P>
            <Bullets
              items={[
                ["Finalité", "Répondre à votre demande et instruire votre projet."],
                ["Base légale", "Mesures précontractuelles prises à votre demande (art. 6.1.b RGPD)."],
                ["Durée de conservation", "3 ans à compter du dernier contact si vous n'êtes pas devenu client ; pendant toute la durée de la relation contractuelle puis 3 ans à des fins de prospection si vous êtes devenu client."],
              ]}
            />

            <h3 className="font-display text-black/85 mt-8 mb-2 text-base">c. Communications directes</h3>
            <P>
              Si vous nous contactez via les liens téléphone ou email affichés sur le site, l'échange a lieu
              directement entre votre application de messagerie ou de téléphonie et la nôtre&nbsp;: aucune
              donnée ne transite par un service tiers. Les coordonnées que vous nous transmettez sont conservées
              dans les mêmes conditions que celles indiquées au paragraphe&nbsp;b.
            </P>
          </Section>

          <Section title="4 — Destinataires des données">
            <P>
              Vos données sont destinées exclusivement à&nbsp;:
            </P>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>L'équipe interne d'Oryzon en charge du traitement de votre demande&nbsp;;</li>
              <li>Notre hébergeur <strong>OVH SAS</strong> (France), pour l'hébergement du site et le traitement des soumissions du formulaire&nbsp;;</li>
              <li>Le service <strong>Brevo</strong> (Sendinblue SAS, France), pour la transmission par email des soumissions du formulaire&nbsp;;</li>
              <li>Notre fournisseur de messagerie <strong>Microsoft Outlook</strong>, pour la réception et le stockage des emails dans notre boîte de réception professionnelle.</li>
            </ul>
            <P>
              Nous ne vendons, ne louons ni ne cédons vos données personnelles à des tiers à des fins commerciales.
            </P>
          </Section>

          <Section title="5 — Hébergement et transferts">
            <P>
              Le site, ses journaux techniques et le traitement des soumissions du formulaire sont hébergés sur
              des serveurs situés en France et en Union européenne (OVH SAS et Brevo). Aucune donnée n'est
              transférée hors de l'Union européenne dans le cadre de la collecte et du transit du formulaire.
            </P>
            <P>
              La réception des emails dans notre boîte professionnelle s'effectue via le service Microsoft Outlook.
              Microsoft Corporation est certifiée au titre du Data Privacy Framework UE-États-Unis, encadrant
              légalement les éventuels transferts de données vers les États-Unis.
            </P>
          </Section>

          <Section title="6 — Sécurité">
            <P>
              Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos
              données contre la perte, l'altération, la divulgation ou l'accès non autorisé&nbsp;: chiffrement
              des échanges via HTTPS, accès restreint aux personnes habilitées, sauvegardes régulières.
            </P>
          </Section>

          <Section title="7 — Vos droits">
            <P>Conformément au RGPD, vous disposez des droits suivants sur vos données&nbsp;:</P>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li><strong>Droit d'accès</strong>&nbsp;: obtenir la confirmation que des données vous concernant sont traitées et en recevoir une copie.</li>
              <li><strong>Droit de rectification</strong>&nbsp;: faire corriger des données inexactes ou incomplètes.</li>
              <li><strong>Droit à l'effacement</strong> (« droit à l'oubli »)&nbsp;: demander la suppression de vos données dans les cas prévus par la loi.</li>
              <li><strong>Droit à la limitation du traitement</strong>&nbsp;: demander la suspension temporaire d'un traitement.</li>
              <li><strong>Droit d'opposition</strong>&nbsp;: vous opposer au traitement pour des raisons tenant à votre situation particulière.</li>
              <li><strong>Droit à la portabilité</strong>&nbsp;: recevoir vos données dans un format structuré et lisible par machine.</li>
              <li><strong>Droit de définir des directives post-mortem</strong> relatives à la conservation, l'effacement et la communication de vos données après votre décès.</li>
            </ul>
            <P>
              Pour exercer ces droits, écrivez-nous à <a className="underline decoration-[#ba873f]/40 hover:decoration-[#ba873f]" href="mailto:contact@maison-oryzon.fr">contact@maison-oryzon.fr</a>{" "}
              en précisant votre demande. Nous y répondrons dans un délai d'un mois à compter de la réception
              (délai pouvant être prolongé de deux mois en cas de demande complexe).
            </P>
            <P>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès
              de la <a className="underline decoration-[#ba873f]/40 hover:decoration-[#ba873f]" href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">Commission Nationale de l'Informatique et des Libertés (CNIL)</a>,
              3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
            </P>
          </Section>

          <Section title="8 — Cookies" id="cookies">
            <P>
              Ce site ne dépose <strong>aucun cookie</strong> sur votre terminal. Aucun outil de mesure
              d'audience, de tracking comportemental ou de publicité n'y est intégré, et aucune préférence
              n'est stockée localement.
            </P>
            <P>
              Si nous devions intégrer à l'avenir un outil susceptible de déposer des cookies non strictement
              nécessaires (mesure d'audience, marketing), cette politique serait mise à jour et votre consentement
              vous serait demandé conformément aux recommandations de la CNIL.
            </P>
          </Section>

          <Section title="9 — Modifications">
            <P>
              Cette politique de confidentialité peut être modifiée à tout moment pour tenir compte d'évolutions
              légales, réglementaires ou techniques. La date de dernière mise à jour figure en haut de page.
              Nous vous invitons à la consulter régulièrement.
            </P>
          </Section>

        </div>

        <footer className="mt-20 pt-10 border-t border-black/8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black/80 transition-colors duration-200"
          >
            <span>←</span>
            <span>Retour à l'accueil</span>
          </Link>
          <Link
            href="/mentions-legales"
            className="text-sm text-black/40 hover:text-black/70 transition-colors duration-200"
          >
            Mentions légales →
          </Link>
        </footer>
      </article>
    </div>
  );
}

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id}>
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

function Bullets({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-2 pt-1">
      {items.map(([k, v]) => (
        <li key={k} className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-x-4 gap-y-1">
          <span className="text-black/40 text-xs uppercase tracking-[0.15em] sm:pt-1">{k}</span>
          <span>{v}</span>
        </li>
      ))}
    </ul>
  );
}
