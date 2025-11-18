export default function Avatar({ src, alt, onChange }) {
  return (
    <div className="avatar">
      <img src={src} alt={alt} />
      <button className="btn" onClick={onChange}>Change avatar</button>
    </div>
  );
}
