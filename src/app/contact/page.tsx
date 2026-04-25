import { ContactForm, BookingForm } from '@features/contact';
import Container from '@components/layout/container/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Booking | Haiko Nguyen',
};

export default function ContactPage() {
  return (
    <main className="pt-24 pb-20">
      <Container>
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Whether you want to collaborate on a React project, book a photography session, or just say hi—I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <ContactForm />
          </div>
          
          <div className="space-y-8">
            <BookingForm />
            
            {/* Additional Contact Info Card */}
            <div className="bg-white/5 rounded-3xl border border-white/10 p-8">
              <h3 className="text-lg font-bold mb-4">Direct Channels</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">@</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</p>
                    <p className="font-medium">haiko@haikonguyen.eu</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    in
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">LinkedIn</p>
                    <p className="font-medium">haikonguyen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
