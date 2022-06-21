import React, {useState} from 'react';
import CommentImg from "../../assets/christian.jpg";
import {dateParser} from "../../utils";
import {api} from "../../redux/actions/actions";
import {currentUser} from "../../business/CurrentUser";
import {useDispatch} from "react-redux";
import {CommentData} from "../../redux/types";



type CommentItemProps = {
    setText(text: string): void;
    getText: string;
} & CommentData;

type CommentItemState = {
    isUpdate: boolean;
    inputValue: string;
};

const CommentItem: React.FC<CommentItemProps> = ({comment_hash, post_hash, createdAt, userName, userToken, id, text, updatedAt, setText, getText}) => {
    const dispatch = useDispatch();
    const [getState, setState] = useState<CommentItemState>({
        isUpdate: false,
        inputValue: ''
    });


    const onRemoveCommentPress = (comment_hash: string) => {
        dispatch(api.removeComment(comment_hash))
    }

    const onUpdateCommentPress = () => {
        setState({...getState, isUpdate: !getState.isUpdate})
    }

    const onUpdateValueCommentPress = () => {
        dispatch(api.updateComment(getState.inputValue, comment_hash, userToken))
        setState({...getState, isUpdate: !getState.isUpdate})
    }

    return (
        <div key={comment_hash} className="comment">
          <span className="avatar">
            <img src={CommentImg} alt="comment_image" />
          </span>
            <div className="content">
                <span className="author">{userName}</span>
                <div className="metadata">
                    <span className="date">{dateParser(createdAt)}</span>
                </div>
                {getState.isUpdate ?
                    <div className="text">
                        <div className="ui action input">
                            <input value={getState.inputValue} onChange={(e) => setState({...getState, inputValue: e.target.value})} type="text mini" placeholder={text} />
                                <button onClick={onUpdateValueCommentPress} className="ui button">Оновити</button>
                        </div>
                    </div>:
                    <div className="text">{text}</div>}
                {userToken === currentUser.userData.userToken && <div className="actions">
                    <button
                        onClick={() => onRemoveCommentPress(comment_hash)}
                        className="ui red button"
                    >
                        Видалити
                    </button>
                    <button
                        onClick={onUpdateCommentPress}
                        className="ui green button"
                    >
                        Змінити
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default CommentItem;