import React, { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, match } from "react-router-dom";
import { Item, MatchProps } from "../Interfaces";
import { Location } from "history";
import {ConstructorBlock} from './items/ConstructorBlock'

interface IProps {}

type referenceBlock = {
    key: string;
    ref: React.RefObject<any>;
}

const New = (props: IProps): JSX.Element => {
  const [isAdded, setAdded]: [number, Function] = useState(0);
  const [isGood, setGood]: [number, Function] = useState(1);
  const [references, setReference] = useState<referenceBlock[]>([]);
  const scrollRef = React.createRef<HTMLDivElement>();


  const AddPostHandler = async () => {
    console.log(references)
      await sendPost();
  };

  const addContainer = () => {
    const item: referenceBlock = {
        key: `${Math.random()}${Date.now()}`,
        ref: React.createRef<any>()
    }
    setReference([...references, item])
      if (scrollRef && scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  }

   const removeBlock = (key: string) => {
      if (key) {
          const items = references.filter((el) => el.key !== key);
          setReference(items)
      }
   }

    const renderList = () => {
      return references.map((el, index) => {
          return <ConstructorBlock index={index} removeBlock={removeBlock} pass={el.key} ref={el.ref} key={el.key} />
      })
    }


    const sendPost = async () => {
      try {
          if (!references || references.length === 0) {
              return;
          }
          const result: Array<Promise<any>> = [];
          const firstChunk = references[0].ref.current;
          if (firstChunk.getState.titleValue.trim().length < 3) {
              window.confirm("Увага! Заголовок обов'язковий!")
              return;
          }
          const responseFirstChunk = await references[0].ref.current?.onChunkSend(null)
          if (responseFirstChunk?.statusCode === 200) {
              const post_hash: string = responseFirstChunk.data.post_hash;
              for (const [index, element] of Object.entries(references)) {
                  if (+index === 0) {
                      continue;
                  }
                  result.push(element.ref.current.onChunkSend(post_hash));
              }
              const responses = await Promise.all(result)

              console.log(responses);
          }
      } catch (ex) {
          console.log(ex);
      }

    }




  return (
    <div className="ui dimmer modals visible active modalWindow">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active modal_body"
      >
        <>
          <div className="header">
           Add New Item
          </div>
          <div ref={scrollRef} className="content">
              {renderList()}
              <button onClick={addContainer} className="ui fluid violet button">
                  Додати блок
              </button>
            {isGood === 0 && isAdded === 0 ? (
              <div className="ui negative message">
                <div className="header">Sorry! Something went wrong :(</div>
                <p>Fix it or refresh page</p>
              </div>
            ) : isGood === 1 && isAdded === 1 ? (
              <div className="ui success message">
                <div className="header">
                  {true === undefined
                    ? "Your post was successfully added!"
                    : "Your post was successfully changed!"}
                </div>
                <p>Now you can return to Home page</p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="actions">
              <button onClick={AddPostHandler} className="positive ui button">
                Додати пост
              </button>
            <Link to="/" className="negative ui button">
              Відміна
            </Link>
          </div>
        </>
      </div>
    </div>
  );
};


export default New
