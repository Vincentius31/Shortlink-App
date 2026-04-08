import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'Welcome | ShortLink',
      '/login': 'Sign In | ShortLink',
      '/register': 'Create Account | ShortLink',
      '/dashboard': 'Dashboard | ShortLink',
      '/profile': 'My Profile | ShortLink',
      '/create-link': 'New Link | ShortLink',
    };

    const currentTitle = titles[location.pathname] || 'ShortLink';
    
    document.title = currentTitle;
  }, [location]);

  return null;
};

export default TitleUpdater;