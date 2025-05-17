import { BookDashed, Clipboard, Crown, Heart, HelpCircle, Home } from "lucide-react";

export const links = [
  { name: 'Início', href: '/', icon: Home, isAdmin: false },
  { name: 'Depoimentos', href: '/depoimentos', icon: Heart, isAdmin: false },
  { name: 'Painel de Treinos', href: '/dashboard', icon: BookDashed, isAdmin: false },
  { name: 'Suporte', href: '/suporte', icon: HelpCircle, isAdmin: false },
  { name: 'Templates', href: '/admin/templates', icon: Clipboard, isAdmin: true},
  { name: 'Adicionar Treinos', href: '/admin', icon: Crown, isAdmin: true},
  { name: 'Gerenciar Treinos', href: '/admin/manage', icon: Crown, isAdmin: true},
];
