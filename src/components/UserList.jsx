import UserItem from "./UserItem";

export default function UserList({ users, onDeleteUser }) {
  if (users.length === 0) {
    return <p className="text-center text-gray-400 mt-4">No users yet...</p>;
  }

  return <ul className="space-y-3">{users.map((user) => (
    <UserItem key={user.id} user={user} onDeleteUser={onDeleteUser} />
  ))}</ul>;
}
