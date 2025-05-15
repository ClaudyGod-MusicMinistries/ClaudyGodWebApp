import React from 'react';
import { Hero } from '../components/HomepageHero';
import LatestRelease from '../components/latestRelease';
import { FeaturedVideos } from '../components/Featuredvideos';
import { ShopPreview } from '../components/ShopPreview';
import { NewsletterForm } from '../components/Newsletter';



export const Home = () => {
  return (
    <div>
      <Hero />
      <LatestRelease />
      <ShopPreview />
      <FeaturedVideos />
      <NewsletterForm />
      </div>
  );
}


