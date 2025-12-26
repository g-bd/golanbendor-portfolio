import { redirect } from 'next/navigation';

// Root page redirects to Hebrew by default (primary audience is Israeli)
// Users can switch to English via the language toggle
export default function RootPage() {
  redirect('/he');
}
