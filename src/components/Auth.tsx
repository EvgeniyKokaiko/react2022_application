import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {Requests} from "../redux/Requests";
import {currentUser} from "../business/CurrentUser";

type AuthProps = {} & any
type AuthData = {
    userName: string,
    password: string;
};

const Auth: React.FC<AuthProps> = (props: AuthProps) => {

    const [getState, setState] = useState<AuthData>({
        password: "",
        userName: ""
    })
    const history = useHistory();

    const authorizeUser = () => {
        const {userName, password} = getState
        Requests.authorize(userName, password).then((el) => {
            if (el.statusCode === 200) {
                const data = el.data;
                currentUser.updateUser(data).then((el) => {
                    props.updateHeader.current.useUpdate()
                    history.push('/')
                });
            } else if (!el || el.statusCode === 0) {
                return;
            }
        })
    }


    const onChangePassword = (e: any) => {
        setState({...getState, password: e.target.value})
    }

    const onChangeUsername = (e: any) => {
        setState({...getState, userName: e.target.value})
    }



    return (
        <div className="auth_main_block">
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                            <div className="content title_black">
                                Увійти у вже існуючий обліковий запис
                            </div>
                    </h2>
                    <div className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input value={getState.userName} onChange={onChangeUsername} type="text" name="email" placeholder="Ваше імя користувача" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input value={getState.password} onChange={onChangePassword} type="password" name="password" placeholder="Пароль" />
                                </div>
                            </div>
                            <div onClick={authorizeUser} className="ui fluid large teal submit button">Увійти</div>
                        </div>

                        <div className="ui error message"></div>
                    </div>

                    <div className="ui message">
                        Новенький? <Link to="/register">Зареєструватись</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;