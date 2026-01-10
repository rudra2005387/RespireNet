import { useRef } from 'react';
import 'animate.css';
import Hero from './sections/Hero';
import FeaturesGrid from './sections/FeaturesGrid';
import HowItWorks from './sections/HowItWorks';
import LiveUploadSection from './sections/LiveUploadSection';
import SampleResultsPreview from './sections/SampleResultsPreview';
import StatisticsBar from './sections/StatisticsBar';
import SupportedConditionsGrid from './sections/SupportedConditionsGrid';
import FAQAccordion from './sections/FAQAccordion';
import CTASection from './sections/CTASection';

function Home() {
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-black">
      {/* 1. Hero Section */}
      <Hero onLearnMore={scrollToFeatures} />

      {/* 2. Features Grid */}
      <div ref={featuresRef}>
        <FeaturesGrid />
      </div>

      {/* 3. How It Works Timeline */}
      <HowItWorks />

      {/* 4. Live Upload Section */}
      <LiveUploadSection />

      {/* 5. Statistics Bar */}
      <StatisticsBar />

      {/* 6. Sample Results Preview */}
      <SampleResultsPreview />

      {/* 7. Supported Conditions Grid */}
      <SupportedConditionsGrid />

      {/* 8. FAQ Accordion */}
      <FAQAccordion />

      {/* 9. CTA Section */}
      <CTASection />
    </div>
  );
}

export default Home;
