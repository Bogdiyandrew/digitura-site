import { Metadata } from 'next';
import TermeniSiConditiiClient from './TermeniSiConditiiClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Termeni și condiții - Digitura'
  },
  description:
    'Citește termenii și condițiile de utilizare pentru site-ul Digitura și serviciile oferite de VOLTARISS S.R.L.',
};

export default function TermeniSiConditiiPage() {
  return <TermeniSiConditiiClient />;
}