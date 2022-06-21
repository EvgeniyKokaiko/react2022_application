import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {Requests} from "../redux/Requests";
import {currentUser} from "../business/CurrentUser";

type AuthProps = {} & any;
type RegisterState = {
    userName: string,
    password: string;
    description: string;
};

const Register: React.FC<AuthProps> = (props: AuthProps) => {
    const [getState, setState] = useState<RegisterState>({
        password: "",
        description: "",
        userName: ""
    })
    const history = useHistory();

    const registerUser = () => {
        const {userName, description, password} = getState
        Requests.register(userName, password, description).then((el) => {
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

    const onChangeDescription = (e: any) => {
        setState({...getState, description: e.target.value})
    }

    return (
        <div className="auth_main_block">
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                        <div className="content title_black">
                            Створіть новий обліковий запис
                        </div>
                    </h2>
                    <div className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input onChange={onChangeUsername} type="text" name="email" placeholder="Ваше імя користувача" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input onChange={onChangePassword} type="password" name="password" placeholder="Пароль" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <input onChange={onChangeDescription} name="password" placeholder="Про вас" />
                                </div>
                            </div>
                            <div onClick={registerUser} className="ui fluid large teal submit button">Зареєструватись</div>
                        </div>

                        <div className="ui error message"></div>
                    </div>

                    <div className="ui message">
                        Вже є обліковий запис? <Link to="/auth">Увійти</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;