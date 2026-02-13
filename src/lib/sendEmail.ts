import EmailTemplate from '@/features/auth/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface options {
    to : string;
    subject : string,
    resetPasswordLink : string
 }

export const sendEmail = async ({to,subject,resetPasswordLink} : options) => {
    try {
        const { error } = await resend.emails.send({
          from: 'Dev Forum <onboarding@resend.dev>',
          to,
          subject,
          react: EmailTemplate({ resetPasswordLink}),
        });
    
        if (error) {
          throw new Error(error.message)
        }
    
      } catch (error) {
        return Response.json({ error }, { status: 500 });
      }
}