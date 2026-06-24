// flagcdn.com valid widths: 20, 40, 80, 160 only
export default function Flag({ iso2, size = 'md', className = '' }) {
  if (!iso2) return null;
  const sizes = { sm: 20, md: 40, lg: 80, xl: 160 };
  const w = sizes[size] ?? 40;
  return (
    <img
      src={`https://flagcdn.com/w${w}/${iso2.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w${w * 2}/${iso2.toLowerCase()}.png 2x`}
      width={w}
      alt=""
      className={`rounded-sm object-cover inline-block ${className}`}
      style={{ aspectRatio: '4/3', height: 'auto' }}
      onError={e => { e.target.style.display = 'none'; }}
    />
  );
}
