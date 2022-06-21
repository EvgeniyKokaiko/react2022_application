import {UserData} from "../redux/types";


class CurrentUser {
    private _userData: UserData;
    private __DEVELOPMENT__: boolean;
    constructor() {
        this._userData = {
            createdAt: "",
            description: "",
            id: -1,
            isAdmin: false,
            updatedAt: "",
            userName: "",
            userToken: "",
            timeToLive: 0,
        }
        this.__DEVELOPMENT__ = false;
    }
    public saveUser = async () => {
        try {
            const marshaledUser = JSON.stringify(this._userData);
            await localStorage.setItem("userData", marshaledUser);
        } catch (ex) {
            console.log('saveUser ex', ex)
        }

    }

    public get _DEVELOPMENT_(): boolean {
        return this.__DEVELOPMENT__;
    }

    get userData(): UserData {
        return this._userData;
    }

    set userData(value: UserData) {
        this._userData = value;
    }

    public updateUser = async (data: UserData) => {
        try {
            if (data === void 0 || data === null) {
                alert('Увага! Щось пішло не так.');
                return;
            }
            this._userData.userName = data.userName;
            this._userData.createdAt = data.createdAt;
            this._userData.description = data.description;
            this._userData.id = data.id;
            this._userData.isAdmin = data.isAdmin;
            this._userData.updatedAt = data.updatedAt;
            this._userData.userToken = data.userToken;
            this._userData.timeToLive = Date.now() + 8.64e7;
            await this.saveUser();
        } catch (ex) {
            alert(`Увага! Щось пішло не так. Помилка:${ex}`);
            return;
        }



    }

    public logOut = async () => {
        try {
                this._userData.userName = "";
                this._userData.createdAt = "";
                this._userData.description = "";
                this._userData.id = -1;
                this._userData.isAdmin = false;
                this._userData.updatedAt = "";
                this._userData.userToken = "";
                await this.saveUser()
        } catch (ex) {
            console.log('saveUser ex', ex)
        }

    }

    public restore = () => {
        try {
            const data: string | null = localStorage.getItem("userData");
            if (data !== void 0 && data !== null) {
                const parsedData = JSON.parse(data);
                const ttl = parsedData.timeToLive;
                if (ttl && Date.now() < ttl) {
                    this._userData.userName = parsedData.userName;
                    this._userData.createdAt = parsedData.createdAt;
                    this._userData.description = parsedData.description;
                    this._userData.id = parsedData.id;
                    this._userData.isAdmin = parsedData.isAdmin;
                    this._userData.updatedAt = parsedData.updatedAt;
                    this._userData.userToken = parsedData.userToken;
                }
            }
        } catch (ex) {
            console.log('saveUser ex', ex)
        }

    }
}

export const currentUser = new CurrentUser()

//@ts-ignore
window.currentUser = currentUser;