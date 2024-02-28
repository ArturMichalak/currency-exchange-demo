import { Header } from '@/components';
import { CurrencyConverter } from '@/fragments';
import classNames from 'classnames';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: '500' });
const mainClasses = classNames(roboto.className, 'bg-scenery min-h-screen flex items-center justify-center flex-col gap-4');

export default function App() {
  return (
    <main className={mainClasses}>
      <Header
        header="Currency Converter"
        paragraph="Check live exchange rates and convert between currencies."
      />
      <CurrencyConverter fetchUrl={process.env.API_URL!} />
    </main>
  );
}
