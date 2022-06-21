export enum ActionTypes {
  Register = "REGISTER_USER",
  Authorize = "AUTHORIZE",
  PostsMapping = "POST_MAPPING",
  PostDetails = "GET_POST_DETAILS",
  AddPost = "ADD_NEW_POST",
  RemovePost = "REMOVE_POST",
  RemovePostChunk = "REMOVE_POST_CHUNK",
  AddComment = "ADD_COMMENT",
  RemoveComment = "REMOVE_COMMENT",
  UpdateComment = "UPDATE_COMMENTS",
  GetComments = "GET_ALL_COMMENTS",
}


export interface PostsMapping {
  id: number,
  userToken: string,
  post_hash: string,
  title: string,
  createdAt: string,
  updatedAt: string
}

export interface UserData {
  id: number;
  userName: string;
  password?: string;
  description: string;
  userToken: string;
  isAdmin: boolean;
  updatedAt: string;
  createdAt: string;
  timeToLive: number;
}


export interface CommentData {
  id: 4;
  post_hash: string;
  text: string;
  userToken: string;
  comment_hash: string;
  userName: string;
  updatedAt: string;
  createdAt: string;
}


export interface PostChunk {
  content: string;
  createdAt: string;
  id: number;
  image: string;
  post_chunk_hash: string;
  post_hash: string;
  title: string;
  updatedAt: string;
  userToken: string;
}