"use client";

import { motion } from "motion/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TocDialog } from "@/components/ui/toc-dialog";


export const TocCheckbox = () => {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-start gap-3">
      <Checkbox required id="terms" className="cursor-pointer" />
      <div className="grid gap-2">
        <Label htmlFor="terms" className="cursor-pointer">
          Agree to Terms and Privacy Policy
        </Label>
        <p className="text-muted-foreground text-sm">
          By checking this box, you accept our {" "}
          <TocDialog title="Terms and Conditions" trigger="Terms & Conditions">
            <div className="space-y-1">
              <p>
                <strong>Effective Date</strong>
              </p>
              <p>02-07-2025</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Welcome to Woohl!</strong>
              </p>
              <p>
                These Terms and Conditions (&quot;Terms&quot;) govern your participation in the seller pre-registration process for our upcoming e-commerce platform. By submitting the pre-registration form, you agree to these Terms, forming
                a legally binding agreement between you (&quot;Seller&quot;) and Woohl Technologies Pvt. Ltd. (&quot;Woohl&quot;, &quot;we&quot;, &quot;us&quot;).
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>1. Purpose of Pre-Registration</strong>
              </p>
              <p>
                Pre-registration allows interested sellers to express intent to join our platform, understand onboarding steps, and potentially gain early access. This process is non-binding and does not guarantee selection or partnership.
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>2. Eligibility Criteria</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Be 18+ or an authorized representative of a business</li>
                <li>Have or plan to have a registered business</li>
                <li>Sell physical consumer goods</li>
                <li>Engage in legal business activities</li>
                <li>Provide accurate information</li>
              </ul>
              <p>Woohl reserves the right to verify eligibility and request documentation at any stage.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>3. Nature of Pre-Registration</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Does not guarantee approval or onboarding</li>
                <li>Does not grant exclusivity or partnership</li>
                <li>Final decisions are at Woohl&apos;s sole discretion</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>
                <strong>4. Information Accuracy & Obligations</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Provide true, current information</li>
                <li>Update details as they change</li>
                <li>No impersonation or misrepresentation</li>
              </ul>
              <p>Violations may result in disqualification or removal.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>5. Communication Consent</strong>
              </p>
              <p>By registering, you agree to receive updates via:</p>
              <ul className="list-disc pl-6">
                <li>Email</li>
                <li>SMS/Phone</li>
                <li>WhatsApp</li>
                <li>Platform notifications (once live)</li>
              </ul>
              <p>
                You may opt out by contacting: <strong>tanishk@woohl.com</strong>
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>6. Confidentiality & Non-Disclosure</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Do not share internal materials or private information</li>
                <li>Report any breaches immediately</li>
                <li>Obligations remain post pre-registration</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>
                <strong>7. Intellectual Property</strong>
              </p>
              <p>All Woohl branding, content, software, and trademarks are protected. You may not reproduce, distribute, or use them without written permission.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>8. Data Privacy</strong>
              </p>
              <p>By submitting the form, you agree to our data practices, which include:</p>
              <ul className="list-disc pl-6">
                <li>Evaluating applications and improving services</li>
                <li>Internal operational analysis</li>
                <li>Data retention until onboarding ends or as required by law</li>
              </ul>
              <p>
                We never sell your data. See our <strong>Privacy Policy</strong> for full details.
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>9. Fees & Costs</strong>
              </p>
              <p>Pre-registration is free. No fees or commissions are charged during this phase. Any future costs will be clearly communicated during onboarding.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>10. Modifications to Terms</strong>
              </p>
              <p>Woohl may update these Terms at any time. Revisions are effective upon posting on our website. You are responsible for reviewing the Terms periodically.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>11. Termination</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>We may remove or disqualify you without notice</li>
                <li>Onboarding may be withheld if false information is found</li>
                <li>Communications may be suspended for policy violations</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>
                <strong>12. Limitation of Liability</strong>
              </p>
              <p>Woohl is not liable for:</p>
              <ul className="list-disc pl-6">
                <li>Denial of onboarding</li>
                <li>Delays in launch</li>
                <li>Technical or data issues</li>
              </ul>
              <p>All warranties are disclaimed to the fullest extent permitted by law.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>13. Indemnification</strong>
              </p>
              <p>You agree to indemnify and hold harmless Woohl, its affiliates, and employees from claims, damages, or costs arising from:</p>
              <ul className="list-disc pl-6">
                <li>Your participation in pre-registration</li>
                <li>Violation of these Terms</li>
                <li>Disputes over submitted information</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>
                <strong>14. Governing Law & Dispute Resolution</strong>
              </p>
              <p>These Terms are governed by Indian law. Disputes will be:</p>
              <ul className="list-disc pl-6">
                <li>First resolved amicably</li>
                <li>Then referred to binding arbitration under the Arbitration and Conciliation Act, 1996</li>
                <li>Arbitration venue: New Delhi, India</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Contact Information</strong>
              </p>
              <p>
                For questions or concerns, contact us at: <strong>tanishk@woohl.com</strong>
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Final Acknowledgement</strong>
              </p>
              <p>By submitting the pre-registration form, you confirm that you have read, understood, and agreed to these Terms and Conditions.</p>
            </div>
          </TocDialog>{" "}
          and{" "}
          <TocDialog title="Privacy Policy" trigger="Privacy Policy">
            <div className="space-y-1">
              <p>
                <strong>Effective Date</strong>
              </p>
              <p>2nd July 2025</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Last Updated</strong>
              </p>
              <p>2nd July 2025</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Acceptance of Privacy Policy</strong>
              </p>
              <p>By submitting your information via the seller pre-registration form, you acknowledge that you have read, understood, and agreed to this Privacy Policy.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Information We Collect</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Business Information:</strong> Business name, product categories, website URL, Instagram handle
                </li>
                <li>
                  <strong>Personal Information:</strong> Full name, role/designation
                </li>
                <li>
                  <strong>Contact Information:</strong> Phone number or email address
                </li>
                <li>
                  <strong>Location Information:</strong> City and state
                </li>
                <li>
                  <strong>Technical Information:</strong> IP address, device/browser info, date & time of form submission
                </li>
                <li>
                  <strong>Optional Information:</strong> Voluntary comments or details shared during interaction
                </li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Use of Information</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>To evaluate your brand&apos;s eligibility for onboarding</li>
                <li>To send updates regarding registration, platform launch, or onboarding</li>
                <li>To improve platform strategy based on seller interest</li>
                <li>To ensure secure, spam-free submissions</li>
                <li>To perform internal analytics and insights</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Legal Basis for Processing</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Your explicit consent upon form submission</li>
                <li>Woohl&apos;s legitimate interest in onboarding relevant sellers</li>
                <li>Compliance with applicable legal obligations</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Data Sharing and Disclosure</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Internal Teams:</strong> Onboarding, marketing, product development
                </li>
                <li>
                  <strong>Authorized Vendors:</strong> Cloud storage, Shiprocket, Razorpay, CRM and communication tools
                </li>
                <li>
                  <strong>Legal Requirements:</strong> Regulatory or governmental requests as mandated by law
                </li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Data Retention</strong>
              </p>
              <p>
                Your information is retained only as long as necessary to evaluate pre-registration, complete onboarding, and comply with legal obligations. If you opt not to join or request deletion, data is retained for up to 12 months
                unless otherwise required by law.
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Data Security</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>SSL encryption</li>
                <li>Role-based access controls (RBAC)</li>
                <li>Periodic backups</li>
                <li>Secure and encrypted communication protocols</li>
              </ul>
              <p>While we take reasonable precautions, no system is entirely immune to breaches. You accept this risk when submitting your data.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Your Rights</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Right to access your data</li>
                <li>Right to request correction or updates</li>
                <li>Right to request deletion of your data</li>
                <li>Right to withdraw consent at any time</li>
                <li>Right to lodge complaints with a regulatory authority</li>
              </ul>
              <p>
                To exercise your rights, contact us at <strong>tanishk@woohl.com</strong>.
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Cookies and Tracking</strong>
              </p>
              <p>We may use cookies or similar technologies to monitor form behavior and regional insights. These are not used for advertising. You can manage cookies through your browser settings.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Third-Party Links</strong>
              </p>
              <p>Our pre-registration form may contain links to third-party platforms (e.g., Instagram, Shopify). We are not responsible for their privacy practices. Please read their policies before sharing information.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Children&apos;s Privacy</strong>
              </p>
              <p>Our platform is not intended for individuals under 18. If you believe a minor has submitted data, please contact us for immediate removal.</p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Policy Modifications</strong>
              </p>
              <p>
                This Privacy Policy may be updated periodically. The &quot;Last Updated&quot; date will reflect the latest changes. Significant updates will be communicated via email or the same method through which you submitted your data.
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Contact Us</strong>
              </p>
              <p>
                For any questions, concerns, or data-related requests, please email us at <strong>tanishk@woohl.com</strong>.
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Final Acknowledgement</strong>
              </p>
              <p>By submitting the seller pre-registration form, you confirm that you have read and accepted the terms outlined in this Privacy Policy.</p>
            </div>
          </TocDialog>
          .
        </p>
      </div>
    </motion.div>
  );
}
