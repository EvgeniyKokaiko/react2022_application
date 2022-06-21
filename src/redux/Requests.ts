import {Dispatch} from "redux";
import {DispatchObj} from "../Interfaces";
import axios from "axios";
import {ActionTypes} from "./types";
import {url} from "./actions/actions";

export class Requests {
    public static async register(userName: string, password: string, description: string) {
        try {
            const body = {
                userName,
                password,
                description
            }
            if (!userName || userName.length < 3) {
                window.confirm('Увага. Ваш нікнейм повинен бути від 3 символів')
                return {
                    statusCode: 0,
                    statusMessage: "",
                    data: null
                };
            }
            if (!password || password.length < 3) {
                window.confirm('Увага. Ваш пароль повинен бути від 3 символів')
                return {
                    statusCode: 0,
                    statusMessage: "",
                    data: null
                };
            }
            const response = await axios.post(`${url}/users/register`, body)
            return response.data;
        } catch (ex) {
            return {
                statusCode: 500,
                statusMessage: "Помилка",
                data: null
            }
        }

    }

    public static async authorize(userName: string, password: string) {
        try {
        const body = {
            userName,
            password,
        }
        if (!userName || userName.length < 3) {
            window.confirm('Увага. Ваш нікнейм повинен бути від 3 символів')
            return {
                statusCode: 0,
                statusMessage: "",
                data: null
            };
        }
        if (!password || password.length < 3) {
            window.confirm('Увага. Ваш пароль повинен бути від 3 символів')
            return {
                statusCode: 0,
                statusMessage: "",
                data: null
            };
        }
        const response = await axios.post(`${url}/users/authorize`, body)
        return response.data;
        } catch (ex) {
            return {
                statusCode: 500,
                statusMessage: "Помилка",
                data: null
            }
        }
    }

    public static  async addPostPipe(formData: FormData) {
        const response = await axios.post(`${url}/posts/add-post-pipe`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if (response.data?.statusCode === 200) {
            return response.data;
        } else {
            window.confirm('Увага. Щось пішло не так!')
        }
    }
}