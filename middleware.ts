// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // protect everything except these:
    '/((?!.*\\..*|_next|api/stripe/webhook).*)',
  ],
};
