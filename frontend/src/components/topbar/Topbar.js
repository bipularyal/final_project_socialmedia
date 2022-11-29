import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { Link,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Topbar() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const PF = 'http://localhost:3001/public/files/'
  const handleClick = ()=> {
    navigate('/')
  }
  const handleLogout = ()=>{
    navigate('/login')
  }
  return (
    <HeaderContainer>
      <div className="topbarLeft">
        <span onClick={handleClick} className="logo">Adverfy</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span onClick = {handleClick} className="topbarLink">Timeline</span>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>

    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
overflow: hidden;
display: flex;
position: sticky;
align-items: center;
height: 10vh;
z-index: 999;
top: 0;
    width: 100%;

    color: #fff;
background: linear-gradient(to right, #292E49, #536976, #BBD2C5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

     background-size: 400% 400%;
    
    animation: change 10s ease-in-out infinite;
    @keyframes change {
        0%{
            background-position: 0 50%;
        }
        50%{
            background-position: 100% 50%;
        }
        100%{
            background-position: 0 50%;
        }
    }
    





`;
