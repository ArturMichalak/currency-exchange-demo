import { Header } from '@/components';
import { CurrencyConverter } from '@/fragments';

export default function App() {
  return (
    <main className="bg-scenery min-h-screen flex items-center justify-center flex-col gap-4">
      <Header
        header="Currency Converter"
        paragraph="Check live exchange rates and convert between currencies."
      />
      <CurrencyConverter fetchUrl={process.env.API_URL!} />
    </main>
  );
}
