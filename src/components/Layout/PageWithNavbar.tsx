// components/layout/PageWithNavbar.tsx
import { Navbar } from '../navbar/Navbar';

export const PageWithNavbar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <Navbar isInsideHero={false} />
      {children}
    </div>
  );
};
