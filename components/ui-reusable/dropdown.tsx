'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState('de'); // Default to 'de'

  useEffect(() => {
    // Load saved locale from localStorage on mount
    const savedLocale = localStorage.getItem('locale') || 'de';
    setLocale(savedLocale);
  }, []);

  const changeLanguage = (newLocale: string) => {
    // Save the selected locale to localStorage
    localStorage.setItem('locale', newLocale);
    // Set a cookie for the server
    document.cookie = `locale=${newLocale}; path=/`;
    setLocale(newLocale);
    // Reload the page to apply the new locale
    router.refresh();
  };

  return (
    <select
      value={locale}
      onChange={(e) => changeLanguage(e.target.value)}
      className="p-1 border rounded bg-slate-900 text-white" // Tailwind styles for a basic dropdown
    >
      <option value="en">EN</option>
      <option value="de">DE</option>
    </select>
  );
}
