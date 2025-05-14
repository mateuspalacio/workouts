import { BookDashed, Clipboard, Crown, HelpCircle, Home } from "lucide-react";

export const links = [
  { name: 'Início', href: '/', icon: Home, isAdmin: false },
  { name: 'Painel de Treinos', href: '/dashboard', icon: BookDashed, isAdmin: false },
  { name: 'Suporte', href: '/suporte', icon: HelpCircle, isAdmin: false },
  { name: 'Templates', href: '/admin/templates', icon: Clipboard, isAdmin: true},
  { name: 'Adicionar Treinos', href: '/admin', icon: Crown, isAdmin: true},
  { name: 'Gerenciar Treinos', href: '/admin/manage', icon: Crown, isAdmin: true},
];


export const tools = [
  {
    name: 'Meta Description Generator',
    description: 'Create SEO-optimized meta titles and descriptions for your pages.',
    href: '/meta-description',
    image: '/placeholder-meta.png',
  },
  {
    name: 'Blog Outline Generator',
    description: 'Generate full blog outlines with intros, H2s/H3s, and conclusions.',
    href: '/blog-outline',
    image: '/placeholder-blog.png',
  },
  {
    name: 'Product Description Writer',
    description: 'Write persuasive product descriptions based on features and tone.',
    href: '/product-description',
    image: '/placeholder-product.png',
  },
  {
    name: 'Text Rewriter',
    description: 'Improve and rephrase any text for clarity, tone, or SEO.',
    href: '/text-rewriter',
    image: '/placeholder-rewrite.png',
  },
  {
    name: 'Headline Generator',
    description: 'Generate attention-grabbing headlines for blogs, ads, and pages.',
    href: '/headline-generator',
    image: '/placeholder-headline.png',
  },
  {
    name: 'Keyword Cluster Generator',
    description: 'Group related keywords for SEO and content strategy.',
    href: '/keyword-cluster',
    image: '/placeholder-keywords.png',
  },
  {
    name: 'FAQs Generator',
    description: 'Auto-generate FAQs with answers for product or topic pages.',
    href: '/faqs-generator',
    image: '/placeholder-faqs.png',
  },
  {
    name: 'Essay Writer',
    description: 'Generate full-length essays with structure and tone options.',
    href: '/essay-writer',
    image: '/placeholder-essay.png',
  },
  {
  name: 'Cover Letter Generator',
  description: 'Write tailored cover letters for any job in seconds.',
  href: '/cover-letter',
  image: '/placeholder-coverletter.png'
}
];