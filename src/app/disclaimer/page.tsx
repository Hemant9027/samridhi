import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "Important disclaimer: the information on this website is general product information, not medical advice, diagnosis or treatment.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalShell
      title="Disclaimer"
      updated="Current"
      intro="Please read this page carefully. It explains what the information on this website is — and, just as importantly, what it is not."
      path="/disclaimer"
    >
      <h2>General information, not healthcare</h2>
      <p>
        All content on this website — including product descriptions, listed
        ingredients, and frequently asked questions — is provided for general
        informational purposes only. It is not medical advice and is not intended
        to diagnose, treat, cure or prevent any disease.
      </p>

      <h2>The product label governs</h2>
      <p>
        The authoritative source for any product&rsquo;s composition, directions
        for use, dosage, warnings and storage guidance is the physical label and
        leaflet supplied with the pack. If anything on this website differs from
        the label, the label prevails.
      </p>

      <h2>Consult a qualified practitioner</h2>
      <p>
        Before using any product mentioned here, consult a registered medical
        practitioner or qualified Ayurvedic physician — particularly if you are
        pregnant or nursing, giving the product to a child, managing a chronic
        condition, or taking other medication. Do not discontinue prescribed
        treatment on the basis of anything published on this website.
      </p>

      <h2>No verification of safety or efficacy</h2>
      <p>
        This website does not claim to have independently verified the safety or
        efficacy of every product shown. Product records marked
        &ldquo;listing verified&rdquo; only confirm that a cited public listing
        documents the stated attributes; records marked &ldquo;under review&rdquo;
        are still being confirmed with the company.
      </p>

      <h2>No warranties on availability</h2>
      <p>
        Marketplace and trade-directory listings do not guarantee that any product
        is currently manufactured or in stock. Confirm availability directly with
        the company before making plans that depend on it.
      </p>

      <h2>Imagery</h2>
      <p>
        Product and botanical photographs on this website are illustrative. Actual
        packs and labels may differ from the imagery shown.
      </p>
    </LegalShell>
  );
}
