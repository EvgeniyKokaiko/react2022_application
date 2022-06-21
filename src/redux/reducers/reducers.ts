import { combineReducers } from "redux";
import { DispatchObj } from "../../Interfaces";
import {ActionTypes, CommentData, PostChunk, PostsMapping} from "../types";


export interface ReducerImplementation {
    PostReducer: any[];
    PostMappingReducer: PostsMapping[];
    CommentsReducer: CommentData[];
    PostChunksReducer: PostChunk[]
}



function PostMappingReducer(state: PostsMapping[] = [], action: DispatchObj) {
    if (action.type === ActionTypes.PostsMapping) {
      return action.payload!.data;
    } if (action.type === ActionTypes.RemovePost) {
        return state.filter((item) => item.post_hash !== (action.payload as any)!.post_hash)
    }
    return state;
}

function PostChunksReducer(state: any = [], action: DispatchObj) {
    if (action.type === ActionTypes.PostDetails) {
        return action.payload!.data;
    }
    return state;
}


function CommentsReducer(state: CommentData[] = [], action: DispatchObj) {
    if (action.type === ActionTypes.GetComments) {
        return action.payload!.data;
    } else if (action.type === ActionTypes.AddComment) {
        return [...state, action.payload!.data]
    } else if (action.type === ActionTypes.RemoveComment) {
        if ((action.payload as any)!.comment_hash) {
            return state.filter((item) => item.comment_hash !== (action.payload as any)!.comment_hash)

        }
    } else if (action.type === ActionTypes.UpdateComment) {
        if ((action.payload as any)!.comment_hash) {
            const item = state.find((el) => el.comment_hash === (action.payload as any)!.comment_hash)
            if (item !== void 0) {
                item.text = (action.payload as any)!.text;
                return [...state]
            }

        }
    }
    return state;
}



export default combineReducers({
  CommentsReducer,
  PostMappingReducer,
  PostChunksReducer
});
