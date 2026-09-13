import HeaderSection from '../../../components/sections/HeaderSection';
import CareAssistantForm from '../../../components/sections/CareAssistantForm';
import ResultsPlaceholder from '../../../components/sections/ResultsPlaceholder';

export default function AICareAssistantPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <HeaderSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <CareAssistantForm />
          <ResultsPlaceholder />
        </div>
      </div>
    </main>
  );
}