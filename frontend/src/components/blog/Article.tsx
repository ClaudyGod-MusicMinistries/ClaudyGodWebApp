import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeArticle } from '../../store/blogs';
import { ExtraBoldText, RegularText, SemiBoldText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons';


interface ArticleDetailProps {
  post: {
    id: string;
    title: string;
    content: string;
    date: string;
    image: string;
  };
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ post }) => {
  const dispatch = useDispatch();
  const { colorScheme } = useTheme();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: 'Check out this article!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      style={{ backgroundColor: colorScheme.text }}
    >
      <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
       <CustomButton
  variant="primary"
  onClick={() => dispatch(closeArticle())}
  className="inline-flex items-baseline" // Changed to items-baseline for perfect alignment
>
 
  <SemiBoldText className="leading-none p-2" fontSize='0.8rem'>
     <FontAwesomeIcon 
    icon={faArrowLeft} 
    className="h-4 w-4 mt-0.5 mr-2" // Slightly smaller icon with top adjustment
    style={{ color: colorScheme.text }}
  /> Back</SemiBoldText> {/* Added leading-none */}
</CustomButton>
        </div>

        {/* Article Header */}
        <div className="mb-10">
          <ExtraBoldText 
            fontSize="2.5rem"
            lineHeight="1.2"
            className="mb-4"
            color={colorScheme.background}
          >
            {post.title}
          </ExtraBoldText>
          
          <div className="flex items-center mb-6">
            <RegularText 
              color={colorScheme.background}
              className="mr-4"
            >
              {post.date}
            </RegularText>
            
            <CustomButton
  variant="background"
  onClick={handleShare}
  className="inline-flex items-center gap-2" // Changed to inline-flex and added gap
>
 
  <SemiBoldText> <FontAwesomeIcon 
    icon={faShareNodes} 
 className="h-4 w-4 mt-0.5 mr-2"
    style={{ color: colorScheme.text }} // Added color from theme
  />Share</SemiBoldText>
</CustomButton>
          </div>
        </div>

        {/* Article Image */}
        <div 
          className="rounded-2xl overflow-hidden mb-10 shadow-lg"
          style={{ borderColor: colorScheme.border }}
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none"
          style={{ color: colorScheme.background }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Social Sharing */}
        <div 
          className="mt-16 pt-8 border-t"
          style={{ borderColor: colorScheme.border }}
        >
          <SemiBoldText 
            fontSize="1.125rem"
            className="mb-4"
            color={colorScheme.text}
          >
            Share this article
          </SemiBoldText>
          
          <div className="flex space-x-4">
            <CustomButton
              variant="icon"
              aria-label="Share on Twitter"
              className="p-2"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </CustomButton>
            
            <CustomButton
              variant="icon"
              aria-label="Share on Facebook"
              className="p-2"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </CustomButton>
            
            <CustomButton
              variant="icon"
              aria-label="Share via Email"
              className="p-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;