export default function TermsPage() {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-muted-foreground">
          By using this application, you agree to follow these terms of service.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Do not use this tool for illegal, harmful, or unethical purposes.</li>
          <li>Generated content is your responsibility. We are not liable for how it&apos;s used.</li>
          <li>We may update or modify tools, pricing, or features at any time.</li>
          <li>Subscription plans renew automatically unless canceled before the end of the billing period.</li>
        </ul>
        <p>
          If you have questions about these terms, please contact us at{' '}
          <a href="mailto:hey@writefluxai.com" className="underline">hey@writefluxai.com</a>.
        </p>
      </div>
    );
  }
  