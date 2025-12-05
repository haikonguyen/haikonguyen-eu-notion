'use client';

import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

interface ContactOrStoryButtonProps {
  showReadStory?: boolean;
}

export function ContactOrStoryButton({
  showReadStory,
}: ContactOrStoryButtonProps) {
  const router = useRouter();

  if (showReadStory) {
    return (
      <Button variant="outlined" onClick={() => router.push('/about')}>
        Read my story
      </Button>
    );
  }

  return (
    <section>
      <Button variant="contained" onClick={() => router.push('/contact')}>
        Contact Me
      </Button>
    </section>
  );
}
