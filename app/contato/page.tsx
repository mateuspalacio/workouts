export default function ContactPage() {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-6 text-center">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground">
          Have questions, feedback, or support issues? We&apos;re here to help.
        </p>
        <p>
          Email us anytime at{' '}
          <a href="mailto:hey@elevioapp.com" className="underline font-medium">hey@elevioapp.com</a>
        </p>
      </div>
    );
  }
  