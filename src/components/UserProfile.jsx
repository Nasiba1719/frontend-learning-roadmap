import Avatar from "./Avatar";

export default function UserProfile({ user, onChangeAvatar }) {
  const { name, email, avatarUrl } = user;

  return (
    <div className="profile">
      <Avatar src={avatarUrl} alt={name} onChange={onChangeAvatar} />
      <div className="info">
        <h3>{name}</h3>
        <p>{email}</p>
      </div>
    </div>
  );
}
