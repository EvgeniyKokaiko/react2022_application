import React, { ChangeEvent, useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import CommentImg from "./../assets/christian.jpg";
import { useDispatch, useSelector } from "react-redux";
import { dateParser } from "../utils";
import {api} from "../redux/actions/actions";
import {CommentData, PostChunk, PostsMapping} from "../redux/types";
import {currentUser} from "../business/CurrentUser";
import {ReducerImplementation} from "../redux/reducers/reducers";
import CommentItem from "./items/CommentItem";
import {brotliCompress} from "zlib";

interface itemDetailState {
  commentText: string;
}
interface itemDetailNav {
  post_hash: string;
}

type itemDetailProps = {} & RouteComponentProps;


const ItemDetail: React.FC<itemDetailProps> = (props: itemDetailProps): JSX.Element => {
  const date = dateParser(new Date());
  const params = useParams<itemDetailNav>();
  const commentData = useSelector<ReducerImplementation, CommentData[]>(state => state.CommentsReducer)
  const postData = useSelector<ReducerImplementation, PostChunk[]>(state => state.PostChunksReducer)
  const [getState, setState] = useState<itemDetailState>({
    commentText: '',
  });
  const dispatch = useDispatch()
  // const [data, setData]: [Item, Function] = useState({
  //   photo: "",
  //   name: "",
  //   description: "",
  //   quantity: 0,
  //   color: "",
  //   weight: "",
  //   id: 0,
  //   size: { width: 0, height: 0, depth: 0 },
  //   comments: [],
  // });

  const setText = (text: string) => {
    setState({...getState, commentText: text})
  }

  const onCommentAdd = () => {
    dispatch(api.addComment(currentUser.userData.userToken, getState.commentText, params.post_hash))
    setText("");
  }


  const RenderComments = () => {
    if (!commentData || commentData.length === 0) {
      return (
      <div className="empty_view_comments">
        <div className="ui icon header">
          <i className="search icon"></i>
          Тут ще немає коментаря. Ви можете стати першим!
        </div>
      </div>
      )
    }
    return commentData.map((el) => {
      return <CommentItem key={el.comment_hash} getText={getState.commentText} setText={setText} {...el}  />
    });
    return null;
  };


  const renderChunks = () => {
    return postData.map((el, index) => {
      const imgSource = currentUser._DEVELOPMENT_ ? `http://localhost:8080/storage/posts/${el.post_hash}/${el.image}` : `http://ec2-3-72-233-128.eu-central-1.compute.amazonaws.com:8080/storage/posts/${el.post_hash}/${el.image}`
      return (
          <div key={index}>
            {index === 0 && <h1 style={{textAlign: 'center'}}>{el.title}</h1>}
            {el.image ? <img className="ui centered medium image" src={imgSource} /> :<br/>}
            <p className="post_text" style={el.content?.includes("\n") ? {whiteSpace: "pre-wrap", textAlign: 'center'} : {}}>{el.content}</p>
            <br/>
            <br/>
          </div>
      )
    })
  }

  useEffect(() => {
    if (params.post_hash) {
      dispatch(api.getPostDetails(params.post_hash))
    }
  }, [])

  useEffect(() => {
    if (params.post_hash) {
      dispatch(api.getComments(params.post_hash))
    }
      }
  , [])

  return (
    <div className="item_block">
      <div className="item_container">
        <div className="ui segment">
          <div className="ui items">
            <div className="ui segment">
              {renderChunks()}
            </div>
          </div>
        </div>
        <div className="bottom_padding">
        <div className="ui segment">
          {currentUser.userData.userToken !== "" && <div>
            <div className="ui fluid icon input">
              <input
                type="text"
                placeholder="Text..."
                value={getState.commentText}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setState({...getState, commentText: e.target.value})
                }
              />
            </div>
            <br />
            <button
              onClick={onCommentAdd}
              className="ui right floated green button"
            >
              Додати коментарь
            </button>
            <br />
            <br />
          </div>}
          <div className="ui comments comments_field">
            <h3 className="ui dividing header">Comments</h3>
            {RenderComments()}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ItemDetail;