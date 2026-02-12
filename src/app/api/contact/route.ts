import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactPayload = {
    name: string;
    email: string;
    subject?: string;
    phone?: string;
    course?: string;
    message?: string;
};

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as ContactPayload;
        const { name, email, subject, phone, course, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.CONTACT_SMTP_HOST || 'smtp.hostinger.com',
            port: Number(process.env.CONTACT_SMTP_PORT || 465),
            secure: true,
            auth: {
                user: process.env.CONTACT_SMTP_USER || 'info@prepfrenchclass.com',
                pass: process.env.CONTACT_SMTP_PASS || 'PrepFrench_2026',
            },
        });

        const mailSubject = subject?.trim() ? `Contact: ${subject.trim()}` : 'Contact: Course Inquiry';
        const textBody = [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || 'N/A'}`,
            `Course: ${course || 'N/A'}`,
            '',
            message || '',
        ].join('\n');

        await transporter.sendMail({
            from: 'Prep French Classes <info@prepfrenchclass.com>',
            to: 'kxzurr1101@gmail.com',
            replyTo: email,
            subject: mailSubject,
            text: textBody,
            html: textBody.replace(/\n/g, '<br />'),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact email failed:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send message.' },
            { status: 500 }
        );
    }
}
