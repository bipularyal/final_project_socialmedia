import "./closeFriend.css";

export default function CloseFriend({user}) {
  const PF = 'http://localhost:3001/public/files/';
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
