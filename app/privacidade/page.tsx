export default function PrivacyPage() {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground">
          We value your privacy. This application only stores the data required for your account and billing management.
        </p>
        <p>
          We do not sell your data, and your content is never reused, shared, or used for training AI models.
        </p>
        <p>
          All API requests are made securely. If you have questions or concerns about how your data is used, reach out to us at{' '}
          <a href="mailto:hey@writefluxai.com" className="underline">hey@writefluxai.com</a>.
        </p>
      </div>
    );
  }
  