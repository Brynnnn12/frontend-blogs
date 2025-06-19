export default function Avatar({ src, alt }) {
  return (
    <div className="avatar">
      <div className="w-24 rounded-full">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
