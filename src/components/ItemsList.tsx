import React, { ChangeEvent, useEffect, useState } from "react";
import { Item } from "../Interfaces";
import {connect, useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import {api} from "../redux/actions/actions";
import {PostsMapping} from "../redux/types";
import {currentUser} from "../business/CurrentUser";

interface IProps {}

const ItemsList = (props: IProps): JSX.Element => {
  const apiData: PostsMapping[] = useSelector<any>(state => state.PostMappingReducer as PostsMapping[]) as any
  const [filter, setFilter]: [PostsMapping[], Function] = useState([]);
  const [searched, setSearched]: [string, Function] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setFilter([]);
    if (apiData) {
      const Filter: PostsMapping[] = apiData.filter((el) => {
        return (
          el.title.toLowerCase().includes(String(searched.toLowerCase()))
        );
      });
      setFilter(Filter);
    }
  }, [searched, apiData]);

  const renderCondition = () => {
    if (searched === "" || searched === " ") {
      return apiData;
    } else {
      return filter;
    }
  };

  const onPostRemovePost = (post_hash: string) => {
    dispatch(api.removePost(post_hash, currentUser.userData.userToken))
  }

  useEffect(() => {
    dispatch(api.getPostsMapping())
  }, []);

  const RenderList = () => {
    if (!apiData && (apiData as any[]).length === 0) {
      return <div>
        <span>Empty</span>
      </div>
    }
    return renderCondition().map((el) => {
      return (
        <React.Fragment key={el.post_hash}>
          <div className="ui card">
            <div className="content">
              <span className="header">{el?.title}</span>
              <div className="meta">
                <span className="date">Created: {el.createdAt}</span>
              </div>
            </div>
            <div className="extra content">
              <Link
                to={{
                  pathname: `/items/${el?.post_hash}`,
                  state: el,
                }}
                style={{ width: "100%" }}
                className="ui inverted green button"
              >
                Подивитись детальну інформацію
              </Link>
              <br />
              <br />
              {/*<Link*/}
              {/*  to={{ pathname: `/change/${el?.id}`, state: el }}*/}
              {/*  style={{ width: "100%" }}*/}
              {/*  className="ui inverted orange button"*/}
              {/*>*/}
              {/*  Змінити*/}
              {/*</Link>*/}
              {/*<br />*/}
              {/*<br />*/}
              {currentUser.userData.isAdmin && <button
                style={{ width: "100%" }}
                onClick={() => onPostRemovePost(el.post_hash)}
                className="ui inverted red button"
              >
                Видалити
              </button>}
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  return (
    <div>
        <>
          <div className="ui fluid input search_input">
            <input
              value={searched}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearched(e.target.value)
              }
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="items_container">{RenderList()}</div>
        </>
      )
    </div>
  );
};


export default ItemsList;

