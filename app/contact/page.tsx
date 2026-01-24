import { redirect } from "next/navigation";

const MAIL_FORMAT = {
  to: "tanishk@woohl.com",
  subject: "Seller Query - Woohl",
  body: "Hi Woohl Team,\n\nI have a query regarding your platform. Please find my details and question below:\n\nName:  \nBrand Name (if any):  \nQuery:  \n\nThanks,\n[Your Name]",
};

const MAIL = `mailto:${MAIL_FORMAT.to}?subject=${encodeURIComponent(MAIL_FORMAT.subject)}&body=${encodeURIComponent(MAIL_FORMAT.body)}`;

const ContactPage = () => redirect(MAIL);

export default ContactPage;
