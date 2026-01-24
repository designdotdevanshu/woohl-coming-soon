import { CustomerHeroSection } from "@/components/customer/hero";
import { WhyWoohlSection } from "@/components/customer/why-woohl";
import { CustomerHowItWorks } from "@/components/customer/how-it-works";
import { JoinIfYouAreSection } from "@/components/customer/join-if-you-are";
import { CustomerFAQSection } from "@/components/customer/faq";
import { CustomerFinalCTASection } from "@/components/customer/final-cta";

const CustomerWaitlistPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <CustomerHeroSection />
      <WhyWoohlSection />
      <CustomerHowItWorks />
      <JoinIfYouAreSection />
      <CustomerFAQSection />
      <CustomerFinalCTASection />
    </div>
  );
};

export default CustomerWaitlistPage;
