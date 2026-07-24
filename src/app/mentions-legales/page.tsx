import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité de TECH&DEV Solutions Numériques.",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-dvh pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-12">Mentions légales</h1>

        <div className="space-y-10 text-sm text-foreground-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Éditeur du site</h2>
            <p>
              Le site <strong className="text-foreground">techanddev.fr</strong> est édité par
              TECH&DEV Solutions Numériques, micro-entreprise immatriculée en France.
            </p>
            <ul className="mt-3 space-y-1">
              <li>Responsable de la publication : TECH&DEV</li>
              <li>Email : <a href="mailto:contact-td.agence@proton.me" className="text-accent hover:underline">contact-td.agence@proton.me</a></li>
              <li>Instagram : <a href="https://instagram.com/td.agence" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">@td.agence</a></li>
              <li>Zone d&apos;activité : Île-de-France</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, logos, design, code) est la propriété
              exclusive de TECH&DEV ou de ses partenaires. Toute reproduction, même partielle,
              est interdite sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Protection des données personnelles (RGPD)</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (UE 2016/679),
              vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité
              de vos données personnelles.
            </p>
            <h3 className="text-base font-medium text-foreground mt-4 mb-2">Données collectées</h3>
            <p>
              Le formulaire de contact collecte : nom, adresse e-mail, type de prestation souhaité
              et message. Ces données sont utilisées uniquement pour répondre à votre demande
              et ne sont jamais transmises à des tiers.
            </p>
            <h3 className="text-base font-medium text-foreground mt-4 mb-2">Durée de conservation</h3>
            <p>
              Les données du formulaire de contact sont conservées 12 mois maximum,
              sauf relation commerciale établie.
            </p>
            <h3 className="text-base font-medium text-foreground mt-4 mb-2">Vos droits</h3>
            <p>
              Vous pouvez exercer vos droits en nous contactant par e-mail.
              Vous disposez également du droit d&apos;introduire une réclamation
              auprès de la CNIL (cnil.fr).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement.
              Aucun cookie publicitaire ou de suivi n&apos;est utilisé. Aucune donnée n&apos;est
              partagée avec des services tiers d&apos;analyse ou de publicité.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Responsabilité</h2>
            <p>
              TECH&DEV s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur ce site.
              Toutefois, TECH&DEV ne peut garantir l&apos;exactitude, la complétude ou l&apos;actualité
              des informations. Les prix et prestations affichés sont donnés à titre indicatif.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français.
              En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <a href="/" className="text-sm text-accent hover:underline">
            &larr; Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </main>
  );
}
