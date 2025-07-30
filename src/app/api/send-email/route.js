import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Functia se numeste POST, pentru ca formularul face o cerere de tip POST
export async function POST(req) {
  try {
    // Citim datele trimise de formular
    const body = await req.json();
    const { nume, company_name, email, phone, activity_field, project_details, package: selectedPackage } = body;

    // Configurare transporter pentru serverul mail.digitura.ro
    // Configurare transporter pentru serverul Zoho Mail
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST, // Folosim noul host de la Zoho
    port: process.env.EMAIL_SERVER_PORT, // Folosim noul port de la Zoho
    secure: true, // true pentru portul 465 (SSL)
        auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

    const mailOptions = {
      from: `"Formular Site" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Solicitare nouă de la ${nume} (${company_name})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Solicitare nouă de pe site</h2>
          <p>Ai primit o nouă completare a formularului de contact:</p>
          <hr>
          <h3>Pachet Ales:</h3>
          <p style="font-weight: bold;">${selectedPackage}</p>
          <h3>Detalii Client:</h3>
          <ul>
            <li><strong>Nume:</strong> ${nume}</li>
            <li><strong>Companie:</strong> ${company_name}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            <li><strong>Telefon:</strong> ${phone || 'Nu a fost furnizat'}</li>
          </ul>
          <h3>Detalii Proiect:</h3>
          <p><strong>Domeniu de activitate:</strong> ${activity_field}</p>
          <p><strong>Descriere:</strong></p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${project_details}</div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    // Returnam un raspuns JSON de succes
    return NextResponse.json({ message: 'Email trimis cu succes!' });

  } catch (error) {
    console.error('API Error:', error);
    // Returnam un raspuns JSON de eroare
    return NextResponse.json({ message: 'Trimiterea email-ului a eșuat.' }, { status: 500 });
  }
}