import React from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext/AuthContext';

export default function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" className="link">
            <span className="logo">Ahlfaadmin</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src={
              user.data.user.profilePic ||
              'https://lh3.googleusercontent.com/22Db05RlfYwHDS9wN7uvQP_WMmTb9guxMNWTtiuw890xmp2JmcKuA9pg7C6QbmeDXdMIeQ=s50'
            }
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
