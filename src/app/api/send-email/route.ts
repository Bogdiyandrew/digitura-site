import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface RequestBody {
  formType: 'contact' | 'audit';
  nume: string;
  email: string;
  company_name?: string;
  phone?: string;
  project_details?: string;
  package?: string;
  billing?: string;
  website?: string;
  goals?: string;
}

// Folosim o variabilă globală (în afara funcției) pentru a refolosi conexiunea 
// între cereri (face trimiterea INSTANTĂ după primul mail)
const transporter = nodemailer.createTransport({
  pool: true, // <-- SETARE NOUĂ PENTRU VITEZĂ MAXIMĂ
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true, 
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  connectionTimeout: 10000,
});

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const {
      formType,
      nume,
      email,
      company_name,
      phone,
      project_details,
      package: selectedPackage,
      billing,
      website,
      goals
    } = body;

    if (!nume || !email) {
      return NextResponse.json({ message: 'Numele și email-ul sunt obligatorii.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Adresa de email este invalidă.' }, { status: 400 });
    }

    if (formType === 'contact') {
      if (!project_details || !selectedPackage) {
        return NextResponse.json({ message: 'Detaliile proiectului și pachetul sunt obligatorii pentru contact.' }, { status: 400 });
      }
    } else if (formType === 'audit') {
      if (!website) {
        return NextResponse.json({ message: 'Website-ul este obligatoriu pentru audit.' }, { status: 400 });
      }
    } else {
        return NextResponse.json({ message: 'Tip formular invalid.' }, { status: 400 });
    }

    let emailSubject = '';
    let emailHtml = '';

    if (formType === 'contact') {
      emailSubject = `Solicitare nouă proiect: ${selectedPackage} - ${company_name || nume}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center;"><h2 style="color: #2dd4bf; margin: 0;">Solicitare Nouă Proiect</h2></div>
          <div style="padding: 20px;">
            <div style="background-color: #f0fdfa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #ccfbf1;">
              <h3 style="color: #0f766e; margin-top: 0; font-size: 16px;">Configurație Aleasă:</h3>
              <p style="margin: 5px 0;"><strong>Pachet:</strong> <span style="color: #0d9488;">${selectedPackage}</span></p>
              <p style="margin: 5px 0;"><strong>Tip Plată:</strong> ${billing || 'Nespecificat'}</p>
            </div>
            <h3 style="color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Detalii Client</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; width: 120px;">Nume:</td><td style="padding: 8px 0; font-weight: bold;">${nume}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Companie:</td><td style="padding: 8px 0;">${company_name || 'Nespecificat'}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Telefon:</td><td style="padding: 8px 0;">${phone || 'Nu a fost furnizat'}</td></tr>
            </table>
            <h3 style="color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 25px;">Mesaj Proiect</h3>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; color: #334155; font-style: italic; border-left: 4px solid #2dd4bf;">
              ${project_details!.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      `;
    } else if (formType === 'audit') {
      emailSubject = `Cerere Audit Gratuit: ${website} - ${nume}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center;"><h2 style="color: #3b82f6; margin: 0;">Cerere Nouă Audit Gratuit</h2></div>
          <div style="padding: 20px;">
            <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #dbeafe;">
              <h3 style="color: #1d4ed8; margin-top: 0; font-size: 16px;">Website de auditat:</h3>
              <p style="margin: 5px 0; font-size: 18px;"><strong><a href="${website}" style="color: #2563eb;" target="_blank">${website}</a></strong></p>
            </div>
            <h3 style="color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Detalii Solicitant</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; width: 120px;">Nume:</td><td style="padding: 8px 0; font-weight: bold;">${nume}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></td></tr>
            </table>
            <h3 style="color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 25px;">Obiective / Ce dorește să îmbunătățească</h3>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; color: #334155; font-style: italic; border-left: 4px solid #3b82f6;">
              ${goals ? goals.replace(/\n/g, '<br>') : 'Nu a specificat detalii suplimentare.'}
            </div>
          </div>
        </div>
      `;
    }

    const mailOptions = {
      from: `"Formular Site Digitura" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      subject: emailSubject,
      html: emailHtml,
    };

    // Am șters `await transporter.verify();` de aici pentru viteză
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