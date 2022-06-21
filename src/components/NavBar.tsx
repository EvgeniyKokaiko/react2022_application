import React, {forwardRef, useImperativeHandle, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {currentUser} from "../business/CurrentUser";
import icon from "./../assets/christian.jpg"
import logo from './../assets/logo.png';
type NavBarProps = {};

const NavBar = forwardRef((props:NavBarProps, ref) => {
    const [getState, setState] = useState<number>(0);
    const UseUpdate = () => {
        setState((prev) => prev + 1)
    }
    const history = useHistory();
    console.log('updated');

    useImperativeHandle(ref,() => ({
        useUpdate: UseUpdate,
    }))

    const onLogoutPress = () => {
        currentUser.logOut().then();
        UseUpdate();
        history.push('/auth')
    }

  return (
    <div className="nav_container">
        <img className="logo_image" src={logo} alt="Logo_PNG" />
        <Link to="/" className="ui blue button">
        Головна
      </Link>
        <>
            {currentUser.userData.isAdmin && <Link to="/new" className="ui violet button">
                Додати новий пост
            </Link>}
            {currentUser.userData.userToken === '' ? <Link to="/auth" className="ui violet button">
                Увійти / Зареєструватись
            </Link> :
                <>
                    <div className="ui blue image label user_label">
                        <img src={icon} />
                            {currentUser.userData.userName}
                            <div className="detail">Admin: {currentUser.userData.isAdmin ? "Yes" : "No"}</div>
                            <button onClick={onLogoutPress} className="ui red button logout_button">Log Out</button>
                    </div>
                </>
            }
        </>
    </div>
  );
});

export default NavBar;
