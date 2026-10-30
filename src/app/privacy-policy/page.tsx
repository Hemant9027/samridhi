import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How this website collects, uses, stores and protects personal data submitted through its enquiry forms.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      updated="Draft — pending final client approval"
      intro="This policy describes what personal data this website collects, why it is collected, how it is stored, and the choices available to you. It is a working draft prepared for review and approval by the company before launch."
      path="/privacy-policy"
    >
      <h2>Who is responsible for your data</h2>
      <p>
        This website is operated for {site.name}, {site.address.lines.join(", ")},{" "}
        {site.address.city}, {site.address.state} {site.address.postalCode}, India.
        For any privacy question or request, use the{" "}
        <a href="/contact">contact form</a>.
      </p>

      <h2>What data this website collects</h2>
      <h3>Information you choose to submit</h3>
      <p>The enquiry forms on this website ask for:</p>
      <ul>
        <li>
          <strong>Contact form:</strong> name, email address, phone number, enquiry
          type and message.
        </li>
        <li>
          <strong>Distributor enquiry form:</strong> name, business name, email
          address, phone number, city, state, business type, product interests and an
          optional message.
        </li>
      </ul>
      <p>
        Submitting either form requires your explicit consent via a checkbox. Please
        do not include medical or other sensitive personal information in the message
        fields.
      </p>

      <h3>Technical information</h3>
      <ul>
        <li>
          The IP address from which a form is submitted is processed for abuse
          prevention and stored only as a one-way cryptographic hash.
        </li>
        <li>
          Standard server logs (pages requested, timestamps, browser type) may be
          kept by the hosting provider for security and reliability.
        </li>
        <li>
          This website does not use advertising trackers or analytics cookies at this
          time.
        </li>
      </ul>

      <h2>Why the data is processed</h2>
      <ul>
        <li>To review and respond to your enquiry.</li>
        <li>
          To evaluate trade and distribution requests and contact you about them.
        </li>
        <li>To protect the website from spam and abuse.</li>
        <li>To meet legal or regulatory obligations, where they apply.</li>
      </ul>
      <p>
        Enquiry data is not sold, rented or shared with third parties for their
        marketing purposes.
      </p>

      <h2>How enquiries are stored</h2>
      <p>
        Submissions are stored in a database accessible to the website operators. If
        e-mail notifications are configured, a copy of your enquiry is also sent to
        the company&rsquo;s designated mailbox. Records are kept for as long as
        needed to handle the enquiry and for a reasonable period afterwards for
        record-keeping, after which they are deleted or anonymised.
      </p>

      <h2>Security</h2>
      <p>
        The website uses transport encryption (HTTPS), server-side validation,
        rate limiting and spam filtering. No website can guarantee absolute
        security, but reasonable technical and organisational measures are applied
        to protect submissions against unauthorised access.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on the law applicable to you — including the Digital Personal Data
        Protection framework in India — you may request access to, correction of, or
        deletion of your personal data, or withdraw consent for future processing.
        Send such requests through the <a href="/contact">contact form</a> with the
        subject “Privacy request”. Identity may need to be verified before a request
        is actioned.
      </p>

      <h2>Children</h2>
      <p>
        This website and its products information are intended for adults. It does
        not knowingly collect personal data from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        The policy may be updated as the website evolves — for example if analytics
        or additional services are introduced. The “last updated” line above will
        reflect material changes.
      </p>
    </LegalShell>
  );
}
