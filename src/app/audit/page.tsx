import { Metadata } from 'next';
import AuditClient from './AuditClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Audit gratuit | Digitura'
  },
  description: 'Descoperă ce funcționează și ce poate fi îmbunătățit la site-ul tău. Solicită acum un audit gratuit realizat de Digitura.',
};

export default function AuditGratuitPage() {
  return <AuditClient />;
}