'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xvgaqqzo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const data = await res.json();

      if (data.ok || data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-md max-w-6xl mx-auto my-12 p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Support</h1>
      <p className="text-muted-foreground mb-8">
        Having trouble? Fill out the form below and we’ll get back to you as soon as possible.
      </p>

      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          Thank you! Your message has been sent.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Your Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              name="subject"
              id="subject"
              required
              placeholder="What's your issue?"
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              name="message"
              id="message"
              rows={5}
              required
              placeholder="Explain the issue or feedback in detail"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      )}
    </div>
  );
}
