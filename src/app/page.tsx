import { redirect } from 'next/navigation';

// Root redirects to /fr — next-intl middleware handles locale detection
export default function RootPage() {
  redirect('/fr');
}
