import { Dispatch } from "redux";
import { DispatchObj, Item, ItemComment } from "../../Interfaces";
import axios from "axios";
import { ActionTypes } from "../types";

class ReduxActions {
    public static PORT: number = 8080;
    constructor(private apiUrl: string) {
    }

    public getPostsMapping = () => async (dispatch: Dispatch<DispatchObj>) => {
        const response = await axios.get(`${this.apiUrl}/posts/posts-mapping`)
        if (response.data?.statusCode === 200) {
            dispatch({type: ActionTypes.PostsMapping, payload: response.data})
        } else {
            window.confirm('Увага. Щось пішло не так!')
        }
    }

    public getPostDetails = (post_hash: string) => async (dispatch: Dispatch<DispatchObj>) => {
        if (post_hash === void 0 || post_hash === null) {
            window.confirm('Увага. Щось пішло не так!')
            return;
        }
        const response = await axios.get(`${this.apiUrl}/posts/posts-chunk/${post_hash}`)
        if (response.data?.statusCode === 200) {
            dispatch({type: ActionTypes.PostDetails, payload: response.data})
        } else {
            window.confirm('Увага. Щось пішло не так!')
        }
    }

    public removePost = (post_hash: string, userToken: string) => async (dispatch: Dispatch<DispatchObj>) => {
        if (userToken === void 0 || userToken === null || post_hash === void 0 || post_hash === null) {
            window.confirm('Увага. Щось пішло не так!')
            return;
        }

        const response = await axios.delete(`${this.apiUrl}/posts/post-mapping/${post_hash}?userToken=${userToken}`);
        if (response.data?.statusCode === 200) {
            dispatch({type: ActionTypes.RemovePost, payload: {...response.data, post_hash}})
        } else {
            window.confirm('Увага. Щось пішло не так!')
        }
    }

    public removePostChunk = (chunk_hash: string, userToken: string) => async (dispatch: Dispatch<DispatchObj>) => {
        if (userToken === void 0 || userToken === null || chunk_hash === void 0 || chunk_hash === null) {
            window.confirm('Увага. Щось пішло не так!')
            return;
        }

        const response = await axios.delete(`${this.apiUrl}/posts/posts-chunk/${chunk_hash}?userToken=${userToken}`);
        if (response.data?.statusCode === 200) {
            dispatch({type: ActionTypes.RemovePostChunk, payload: response.data})
        } else {
            window.confirm('Увага. Щось пішло не так!')
        }
    }


    //Комменти
    public addComment = (userToken: string, text: string, post_hash: string) => async (dispatch: Dispatch<DispatchObj>) => {
        const body = {
            userToken,
            text,
            post_hash,
        }
        if (userToken === void 0 || userToken === null || post_hash === void 0 || post_hash === null) {
            window.confirm('Увага. Щось пішло не так!')
            return;
        }
        if (!text || text.length < 3) {
            window.confirm('Увага. Довжина коментаря не може бути менше ніж 3 символа')
            return;
        }

        const response = await axios.post(`${this.apiUrl}/comments/add-comment`, body)
        if (response.data?.statusCode === 200) {
            dispatch({type: ActionTypes.AddComment, payload: response.data})
        } else {
            window.confirm('Увага. Щось пішло не так!')
        }
    }

    public getComments = (post_hash: string) => async (dispatch: Dispatch<DispatchObj>) => {
        if (post_hash === void 0 || post_hash === null) {
            window.confirm('Увага. Щось пішло не так!')
            return;
        }
        const response = await axios.get(`${this.apiUrl}/comments/get-comments/${post_hash}`)
        console.log(response);
        if (response.data?.statusCode === 200) {
            dispatch({type: ActionTypes.GetComments, payload: response.data})
        } else {
            window.confirm('Увага. Щось пішло не так!')
        }
    }

    public updateComment = (text: string, comment_hash: string, userToken: string) => async (dispatch: Dispatch<DispatchObj>) => {
        const body = {
            userToken,
            text,
            comment_hash,
        }
        if (userToken === void 0 || userToken === null || comment_hash === void 0 || comment_hash === null) {
            window.confirm('Увага. Щось пішло не так!')
            return;
        }
        if (!text || text.length < 3 || text.length > 100) {
            window.confirm('Увага. Довжина коментаря не може бути менше ніж 3 символа і більша ніж 100 символів')
            return;
        }
        const response = await axios.patch(`${this.apiUrl}/comments/update-comments`, body)
        if (response.data?.statusCode === 200) {
            dispatch({type: ActionTypes.UpdateComment, payload: {...response.data, text, comment_hash}})
        } else {
            window.confirm('Увага. Щось пішло не так!')
        }
    }

    public removeComment = (comment_hash: string) => async (dispatch: Dispatch<DispatchObj>) => {
        if (comment_hash === void 0 || comment_hash === null) {
            window.confirm('Увага. Щось пішло не так!')
            return;
        }
        const response = await axios.delete(`${this.apiUrl}/comments/delete-comments?comment_hash=${comment_hash}`)
        if (response.data?.statusCode === 200) {
            console.log(response)
            dispatch({type: ActionTypes.RemoveComment, payload: { ...response.data, comment_hash }})
        } else {
            window.confirm('Увага. Щось пішло не так!')
        }
    }


}
//`http://ec2-3-72-233-128.eu-central-1.compute.amazonaws.com:${ReduxActions.PORT}/api
export const url = `http://localhost:${ReduxActions.PORT}/api`
export const api = new ReduxActions(url)
