import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeArticle } from '../../store/blogs';
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
} from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faShareNodes,
  faEnvelope,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

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

  const shareOnTwitter = () => {
    const text = `Check out this article: ${post.title}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `Check out this article: ${post.title}`;
    const body = `I thought you might be interested in this article: ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: colorScheme.text }}
    >
      {/* Close button (top right) */}
      <div className="absolute top-4 right-4 z-60">
        <CustomButton
          variant="icon"
          onClick={() => dispatch(closeArticle())}
          aria-label="Close article"
          className="p-2 rounded-full"
          style={{ backgroundColor: colorScheme.background + '40' }}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="h-5 w-5"
            style={{ color: colorScheme.background }}
          />
        </CustomButton>
      </div>

      <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <CustomButton
            variant="primary"
            onClick={() => dispatch(closeArticle())}
            className="inline-flex items-center"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="h-4 w-4 mr-2"
              style={{ color: colorScheme.text }}
            />
            <SemiBoldText fontSize="0.8rem" style={{ color: colorScheme.text }}>
              Back
            </SemiBoldText>
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
            <RegularText color={colorScheme.background} className="mr-4">
              {post.date}
            </RegularText>

            <CustomButton
              variant="background"
              onClick={handleShare}
              className="inline-flex items-center"
            >
              <FontAwesomeIcon
                icon={faShareNodes}
                className="h-4 w-4 mr-2"
                style={{ color: colorScheme.text }}
              />
              <SemiBoldText style={{ color: colorScheme.text }}>
                Share
              </SemiBoldText>
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
          className="prose prose-lg max-w-none mb-12"
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
            color={colorScheme.background}
          >
            Share this article
          </SemiBoldText>

          <div className="flex space-x-4">
            <CustomButton
              variant="icon"
              onClick={shareOnTwitter}
              aria-label="Share on Twitter"
              className="p-3 rounded-full"
              style={{ backgroundColor: colorScheme.background + '20' }}
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="h-5 w-5"
                style={{ color: colorScheme.background }}
              />
            </CustomButton>

            <CustomButton
              variant="icon"
              onClick={shareOnFacebook}
              aria-label="Share on Facebook"
              className="p-3 rounded-full"
              style={{ backgroundColor: colorScheme.background + '20' }}
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="h-5 w-5"
                style={{ color: colorScheme.background }}
              />
            </CustomButton>

            <CustomButton
              variant="icon"
              onClick={shareOnLinkedIn}
              aria-label="Share on LinkedIn"
              className="p-3 rounded-full"
              style={{ backgroundColor: colorScheme.background + '20' }}
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="h-5 w-5"
                style={{ color: colorScheme.background }}
              />
            </CustomButton>

            <CustomButton
              variant="icon"
              onClick={shareViaEmail}
              aria-label="Share via Email"
              className="p-3 rounded-full"
              style={{ backgroundColor: colorScheme.background + '20' }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="h-5 w-5"
                style={{ color: colorScheme.background }}
              />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
