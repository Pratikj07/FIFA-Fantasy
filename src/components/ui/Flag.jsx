// Uses flagcdn.com — real flag images, work on all platforms including Windows
export default function Flag({ iso2, size = 'md', className = '' }) {
  if (!iso2) return null;
  const sizes = { sm: 24, md: 40, lg: 56, xl: 72 };
  const w = sizes[size] || 40;
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
