import React from 'react';
import { Hero } from '../components/HomepageHero';
import LatestRelease from '../components/latestRelease';
// import { FeaturedVideos } from '../components/Featuredvideos';
import { ShopPreview } from '../components/ShopPreview';
import { NewsletterForm } from '../components/Newsletter';



export const Home = () => {
  return (
    <div>
      <Hero />
      <LatestRelease />
      <ShopPreview />
      {/* <FeaturedVideos /> */}
      <hr className="border-1 border-purple-900 shadow-lg shadow-purple-200/50" />
          <NewsletterForm />
      </div>
  );
}


