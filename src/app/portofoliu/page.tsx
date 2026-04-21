import type { Metadata } from 'next';
import PortofoliuClient from './PortofoliuClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Portofoliu - Digitura',
  },
  description: 'Paginǎ în dezvoltare',
};

export default function PortofoliuPage() {
  return <PortofoliuClient />;
}