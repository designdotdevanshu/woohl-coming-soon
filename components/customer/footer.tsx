import { Mail, MapPin } from "lucide-react";
import { JoinEarlyAccessButton } from "./header";

const quickLinks = [
  { text: "Why Woohl", href: "/#why-woohl" },
  { text: "How It Works", href: "/#how-it-works" },
  { text: "FAQs", href: "/#faq" },
];

const contactInfo = [
  { icon: Mail, text: "tanishk@woohl.com", link: "mailto:tanishk@woohl.com" },
  {
    icon: MapPin,
    text: "Delhi, India",
    isAddress: true,
    link: "https://www.google.com/maps/place/Delhi,+India",
  },
];

export function CustomerFooter() {
  return (
    <footer className="w-full place-self-end rounded-t-xl bg-secondary dark:bg-secondary/20">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[40%_30%_30%]">
          <div>
            <div className="flex justify-center gap-2 text-primary sm:justify-start">
              <span className="text-primary text-2xl md:text-4xl font-audiowide">Woohl</span>
            </div>

            <p className="mt-2 max-w-md text-center capitalize leading-relaxed text-foreground/50 sm:text-left">Empowering India&apos;s next big brands</p>

            <JoinEarlyAccessButton className="mt-8" />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Quick Links</p>

              <ul className="mt-8 space-y-4 text-sm">
                {quickLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a href={href} className="text-secondary-foreground/70 transition">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Contact Us</p>

              <ul className="mt-8 space-y-4 text-sm">
                {contactInfo.map(({ icon: Icon, text, link, isAddress }) => (
                  <li key={text}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 sm:justify-start">
                      <Icon className="size-5 shrink-0 text-primary" />
                      {isAddress ? <address className="not-italic text-secondary-foreground/70 transition">{text}</address> : <span className="text-secondary-foreground/70 transition">{text}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Woohl. All rights reserved.</p>

            {/* <ul className="mt-4 flex flex-wrap justify-center gap-4 text-xs sm:mt-0 lg:justify-end">
              <li>
                <a href="#" className="text-gray-500 transition hover:opacity-75">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 transition hover:opacity-75">
                  Privacy Policy
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
