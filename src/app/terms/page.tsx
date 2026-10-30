import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms governing the use of the Samridhi Ayurved & Nutraceutical website, including the limits of the information published here.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms & Conditions"
      updated="Draft — pending final client approval"
      intro="These terms govern the use of this website. By browsing it you accept them. They are a working draft prepared for review and approval by the company before launch."
      path="/terms"
    >
      <h2>About this website</h2>
      <p>
        This website presents {site.name} and its product catalogue for general
        information and enquiry purposes. It is not an online pharmacy and does not
        process product orders or payments.
      </p>

      <h2>Not medical advice</h2>
      <p>
        Content on this website — including product descriptions, listed
        ingredients and answers to frequently asked questions — is general
        information only. It is not a substitute for professional medical advice,
        diagnosis or treatment. Always read the physical product label and consult
        a registered medical practitioner or qualified Ayurvedic physician,
        especially if you are pregnant, nursing, managing a medical condition or
        taking other medication.
      </p>

      <h2>Accuracy and completeness</h2>
      <p>
        Product information is published only where corroborated by cited public
        sources, and records still being confirmed are marked as under review.
        Nevertheless, errors and omissions can occur, and formulations, pack sizes
        and availability may change without notice. The physical product label
        prevails over this website in any discrepancy.
      </p>

      <h2>No published prices or offers</h2>
      <p>
        Prices, trade margins, minimum order quantities and distribution terms are
        not published on this website. Enquiries submitted through the forms are
        requests for information, not orders, and do not create any contractual
        obligation on either side.
      </p>

      <h2>Acceptable use of the forms</h2>
      <ul>
        <li>Provide accurate information and do not impersonate others.</li>
        <li>Do not submit spam, unlawful content or automated bulk submissions.</li>
        <li>Do not attempt to disrupt, probe or gain unauthorised access to the website.</li>
      </ul>
      <p>Abusive or automated submissions may be blocked and discarded.</p>

      <h2>Intellectual property</h2>
      <p>
        The Samridhi name and device mark are the subject of trade mark registration
        № {site.trademark.number} (Class 5). Text, imagery and design on this
        website may not be reproduced for commercial use without written permission.
        Public-source citations on product pages remain the property of their
        respective platforms.
      </p>

      <h2>Third-party links</h2>
      <p>
        This website links to third-party platforms (for example marketplace and
        trade-directory listings) for verification purposes. The company is not
        responsible for the content, accuracy or privacy practices of those
        platforms.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by applicable law, the company is not
        liable for any loss arising from use of, or reliance on, this website or
        from the unavailability of any product. Nothing in these terms excludes
        liability that cannot be excluded by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Courts at Saharanpur, Uttar
        Pradesh, shall have jurisdiction over disputes relating to this website, to
        the extent permitted by law.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may be updated as the website and business evolve. Continued
        use of the website after an update constitutes acceptance of the revised
        terms.
      </p>
    </LegalShell>
  );
}
