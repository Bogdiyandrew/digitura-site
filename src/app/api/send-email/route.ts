import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Interfață actualizată pentru a reflecta exact ce trimite Frontend-ul
interface RequestBody {
  nume: string;
  company_name?: string;
  email?: string;
  phone?: string;
  project_details: string;
  package: string;
  billing?: string;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const {
      nume,
      company_name,
      email,
      phone,
      project_details,
      package: selectedPackage,
      billing
    } = body;

    // --- VALIDARE PE SERVER MODIFICATĂ ---
    // Verificăm doar câmpurile care sunt cu adevărat esențiale și trimise de form
    if (!nume || !project_details || !selectedPackage) {
      return NextResponse.json(
        { message: 'Numele, detaliile proiectului și pachetul sunt obligatorii.' }, 
        { status: 400 }
      );
    }

    // Validăm email-ul doar dacă a fost introdus (fiind opțional în frontend)
    if (email && email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ message: 'Adresa de email este invalidă.' }, { status: 400 });
      }
    }

    // Configurare transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true, 
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      connectionTimeout: 10000,
    });

    const mailOptions = {
      from: `"Formular Site Digitura" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Solicitare nouă: ${selectedPackage} - ${company_name || nume}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center;">
            <h2 style="color: #2dd4bf; margin: 0;">Solicitare Nouă Proiect</h2>
          </div>
          
          <div style="padding: 20px;">
            <div style="background-color: #f0fdfa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #ccfbf1;">
              <h3 style="color: #0f766e; margin-top: 0; font-size: 16px;">Configurație Aleasă:</h3>
              <p style="margin: 5px 0;"><strong>Pachet:</strong> <span style="color: #0d9488;">${selectedPackage}</span></p>
              <p style="margin: 5px 0;"><strong>Tip Plată:</strong> ${billing || 'Nespecificat'}</p>
            </div>

            <h3 style="color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Detalii Client</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 120px;">Nume:</td>
                <td style="padding: 8px 0; font-weight: bold;">${nume}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Companie:</td>
                <td style="padding: 8px 0;">${company_name || 'Nespecificat'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0ea5e9;">${email || 'Nu a fost furnizat'}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Telefon:</td>
                <td style="padding: 8px 0;">${phone || 'Nu a fost furnizat'}</td>
              </tr>
            </table>

            <h3 style="color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 25px;">Mesaj Proiect</h3>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; color: #334155; font-style: italic; border-left: 4px solid #2dd4bf;">
              ${project_details.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8;">
            Acest email a fost generat automat de formularul de contact digitura.ro
          </div>
        </div>
      `,
    };

    await transporter.verify();
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email trimis cu succes!' }, { status: 200 });

  } catch (error) {
    console.error('[API_ERROR]', error);
    return NextResponse.json(
      { message: 'Eroare la trimiterea email-ului. Verificați setările SMTP.' }, 
      { status: 500 }
    );
  }
}