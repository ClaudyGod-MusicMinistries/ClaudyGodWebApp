export const GridLayout: React.FC<{
  children: React.ReactNode;
  cols?: number;
  gap?: string;
  className?: string;
}> = ({ children, cols = 2, gap = '6', className = '' }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gridGap = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
  };

  return (
    <div
      className={`grid ${gridCols[cols as keyof typeof gridCols]} ${gridGap[gap as unknown as keyof typeof gridGap]} ${className}`}
    >
      {children}
    </div>
  );
};
