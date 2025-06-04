// MusicData.tsx
import { useState } from 'react';
import { AudioMackComponent } from '../components/audioMack';
import { NewsletterForm } from '../components/Newsletter';
import { securedMusicPlatforms, albums } from '../components/data/musicData';
import { SecurityModal } from '../components/SecurityModal';
import { AlbumRelease } from '../components/AlbumRelease';
import { StreamingPlatforms } from '../components/StreamingPlatform';
import { MusicIntro } from '../components/musicIntro';

export const MusicData = () => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    setRedirectUrl(url);
    setIsModalOpen(true);
  };

  const handleRedirect = () => {
    if (redirectUrl) {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen relative">
      <SecurityModal 
        isOpen={isModalOpen}
        redirectUrl={redirectUrl}
        onClose={() => setIsModalOpen(false)}
        onRedirect={handleRedirect}
      />

      <MusicIntro 
        title="Music"
        description="Experience the inspirational sound of ClaudyGod's gospel music – with a unique blend of American Gospel and Afro-gospel."
      />

      <StreamingPlatforms 
        platforms={securedMusicPlatforms}
        onLinkClick={handleLinkClick}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="bg-purple-900 p-10 text-white max-md:text-sm md:text-5xl roboto-condensed mb-12 text-center rounded-lg">
            Latest Release: You Are Our Everything
          </h2>
          <div className="space-y-10">
            {albums.map((album) => (
              <AlbumRelease 
                key={album.id}
                album={album}
                platforms={securedMusicPlatforms}
                onLinkClick={handleLinkClick}
              />
            ))}
          </div>
        </div>
      </section>

      <AudioMackComponent />
      <NewsletterForm />
    </div>
  );
};