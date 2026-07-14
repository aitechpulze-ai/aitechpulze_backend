import SEO from '../components/SEO';
import { COMPANY } from '../data/content';

function LegalLayout({ title, path, children }) {
  return (
    <>
      <SEO title={title} path={path} />
      <div style={{ paddingTop: '80px' }}>
        <section className="py-16 hero-gradient grid-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{title}</h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Last updated: January 2025 · AITechPulze · {COMPANY.location}</p>
          </div>
        </section>
        <section className="py-16" style={{ background: '#0d1424' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8 md:p-12 prose prose-invert max-w-none">
              {children}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-black text-white mb-3">{title}</h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: 'rgba(255,255,255,0.65)' }}>{children}</div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" path="/privacy-policy">
      <Section title="1. Information We Collect">
        <p>We collect information you provide directly to us, such as your name, email address, phone number, and project details when you contact us or fill out our quote form.</p>
        <p>We may also collect usage data including IP addresses, browser type, pages visited, and time spent on our website through analytics tools.</p>
      </Section>
      <Section title="2. How We Use Your Information">
        <p>We use the information we collect to respond to your inquiries, provide project quotes, deliver our services, and communicate with you about your projects.</p>
        <p>We do not sell, trade, or rent your personal information to third parties.</p>
      </Section>
      <Section title="3. Data Security">
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
      </Section>
      <Section title="4. Cookies">
        <p>We use cookies and similar tracking technologies to improve your experience on our website. You can control cookie settings through your browser preferences.</p>
      </Section>
      <Section title="5. Third-Party Services">
        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We use Google Analytics for website analytics.</p>
      </Section>
      <Section title="6. Contact Us">
        <p>If you have questions about this Privacy Policy, contact us at <a href={COMPANY.mailto} className="text-blue-400 hover:underline">{COMPANY.email}</a> or call us at {COMPANY.phone}.</p>
      </Section>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout title="Terms & Conditions" path="/terms">
      <Section title="1. Acceptance of Terms">
        <p>By accessing and using AITechPulze's website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
      </Section>
      <Section title="2. Services">
        <p>AITechPulze provides software development, AI solutions, web development, mobile app development, and related technology services. All services are subject to a separate project agreement.</p>
      </Section>
      <Section title="3. Intellectual Property">
        <p>Upon full payment, clients receive ownership of the custom code developed for their project. AITechPulze retains the right to showcase completed projects in our portfolio unless otherwise agreed in writing.</p>
      </Section>
      <Section title="4. Payment Terms">
        <p>Payment terms are specified in individual project agreements. Typically, we require 50% upfront and 50% upon project completion. All prices are in Indian Rupees (INR) unless otherwise stated.</p>
      </Section>
      <Section title="5. Project Delivery">
        <p>Project timelines are estimates and may vary based on scope changes, client feedback delays, or technical complexity. We communicate proactively about any timeline changes.</p>
      </Section>
      <Section title="6. Limitation of Liability">
        <p>AITechPulze's liability is limited to the amount paid for the specific service. We are not liable for indirect, incidental, or consequential damages.</p>
      </Section>
      <Section title="7. Governing Law">
        <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Tamil Nadu, India.</p>
      </Section>
      <Section title="8. Contact">
        <p>For questions about these terms, contact us at <a href={COMPANY.mailto} className="text-blue-400 hover:underline">{COMPANY.email}</a>.</p>
      </Section>
    </LegalLayout>
  );
}

export function RefundPolicy() {
  return (
    <LegalLayout title="Refund Policy" path="/refund-policy">
      <Section title="1. Overview">
        <p>At AITechPulze, we are committed to delivering high-quality software solutions. This refund policy outlines the conditions under which refunds may be issued.</p>
      </Section>
      <Section title="2. Upfront Payment">
        <p>The initial upfront payment (typically 50% of the project cost) is non-refundable once development work has commenced. This covers planning, design, and initial development costs.</p>
      </Section>
      <Section title="3. Milestone-Based Refunds">
        <p>If a project is cancelled before a milestone is completed, a partial refund may be issued based on the work completed up to that point. The refund amount will be determined by mutual agreement.</p>
      </Section>
      <Section title="4. Full Refund Eligibility">
        <p>A full refund of the upfront payment may be issued if: (a) AITechPulze fails to begin work within the agreed timeline, or (b) the project is cancelled within 48 hours of payment before any work has started.</p>
      </Section>
      <Section title="5. No Refund After Delivery">
        <p>No refunds are issued after the final project has been delivered and approved by the client. Post-delivery support is provided as per the agreed support period.</p>
      </Section>
      <Section title="6. Academic Projects">
        <p>For academic projects, refunds are not available once the project has been delivered and the student has submitted it. We provide revisions within the agreed scope.</p>
      </Section>
      <Section title="7. How to Request a Refund">
        <p>To request a refund, contact us at <a href={COMPANY.mailto} className="text-blue-400 hover:underline">{COMPANY.email}</a> or WhatsApp us at {COMPANY.phone} with your project details and reason for the refund request.</p>
      </Section>
      <Section title="8. Processing Time">
        <p>Approved refunds are processed within 7–14 business days to the original payment method.</p>
      </Section>
    </LegalLayout>
  );
}
