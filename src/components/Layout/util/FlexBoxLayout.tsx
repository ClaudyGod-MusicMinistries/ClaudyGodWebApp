export const FlexLayout: React.FC<{
  children: React.ReactNode;
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: string;
  className?: string;
}> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'start',
  gap = '4',
  className = '',
}) => {
  const flexDirection = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const flexJustify = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const flexAlign = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const flexGap = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div
      className={`flex ${flexDirection[direction]} ${flexJustify[justify]} ${flexAlign[align]} ${flexGap[gap as unknown as keyof typeof flexGap]} ${className}`}
    >
      {children}
    </div>
  );
};
