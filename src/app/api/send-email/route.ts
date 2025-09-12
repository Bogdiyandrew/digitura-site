// src/app/api/send-email/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Definim o interfață pentru datele pe care le așteptăm de la formular
interface RequestBody {
  nume: string;
  company_name: string;
  email: string;
  phone?: string; // Opțional
  activity_field: string;
  project_details: string;
  package: string;
}

// Handler-ul pentru metoda POST, acum cu tipuri TypeScript
export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const {
      nume,
      company_name,
      email,
      phone,
      activity_field,
      project_details,
      package: selectedPackage
    } = body;

    // --- VALIDARE PE SERVER ---
    if (!nume || !company_name || !email || !activity_field || !project_details || !selectedPackage) {
      return NextResponse.json({ message: 'Toate câmpurile obligatorii trebuie completate.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Adresa de email este invalidă.' }, { status: 400 });
    }

    // Configurare transporter folosind variabilele de mediu
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT), // Convertim portul la număr
      secure: true, // true pentru portul 465 (SSL)
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    const mailOptions = {
      from: `"Formular Site Digitura" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Solicitare nouă de la ${nume} (${company_name})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0d9488;">Solicitare nouă de pe site-ul Digitura</h2>
          <p>Ai primit o nouă completare a formularului de contact:</p>
          <hr style="border: none; border-top: 1px solid #ddd;" />
          <h3 style="color: #0d9488;">Pachet Ales:</h3>
          <p style="font-weight: bold; font-size: 1.1em;">${selectedPackage}</p>
          <h3 style="color: #0d9488;">Detalii Client:</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="padding-bottom: 8px;"><strong>Nume:</strong> ${nume}</li>
            <li style="padding-bottom: 8px;"><strong>Companie:</strong> ${company_name}</li>
            <li style="padding-bottom: 8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></li>
            <li style="padding-bottom: 8px;"><strong>Telefon:</strong> ${phone || 'Nu a fost furnizat'}</li>
          </ul>
          <h3 style="color: #0d9488;">Detalii Proiect:</h3>
          <p><strong>Domeniu de activitate:</strong> ${activity_field}</p>
          <p><strong>Descriere:</strong></p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; border-left: 4px solid #0d9488;">
            <p style="margin: 0;">${project_details.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
    };

    // Verificăm conexiunea cu serverul de email înainte de a trimite
    await transporter.verify();

    // Trimitem email-ul
    await transporter.sendMail(mailOptions);

    // Returnăm un răspuns JSON de succes
    return NextResponse.json({ message: 'Email trimis cu succes!' }, { status: 200 });

  } catch (error) {
    console.error('[API_ERROR]', error);
    // Returnăm un răspuns de eroare mai specific
    return NextResponse.json({ message: 'Serviciul de email a întâmpinat o problemă. Vă rugăm să încercați mai târziu sau să ne contactați direct.' }, { status: 500 });
  }
}