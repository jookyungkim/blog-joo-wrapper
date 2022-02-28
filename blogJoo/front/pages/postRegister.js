import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";

import { useDispatch, useSelector } from "react-redux";
import { ADD_POST_REQUEST } from "../reducers/post";
import userInput from "../hooks/useInput";

// import Editor from "../components/editor";

const Editor = dynamic(
  async () => {
    const { default: RQ } = await import("../components/editor");
    return function comp({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const postRegister = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState(null);
  const [title, onChangeTitle] = userInput(null);

  const handleChange = useCallback(
    value => {
      setText(value);
    },
    [text]
  );

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();

      dispatch({
        type: ADD_POST_REQUEST,
        data: { content: text, title }
      });
    },
    [text, title]
  );

  return (
    <>
      <div className="register-container">
        <div className="register-inner">
          <h3>재미있는 코딩 스토리~</h3>
          <form onSubmit={onSubmitForm}>
            <input type="text" className="register-title" value={title || ""} onChange={onChangeTitle} />
            <div className="aditerBox">
              <Editor text={text} handleChange={handleChange} />
            </div>
            <div className="button-group">
              <button className="common-button" type="submit">
                글쓰기
              </button>
              <button className="common-button">취소</button>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .register-container {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          height: 100vh;
        }

        .register-container .register-inner {
          margin: auto;
          width: 900px;
          height: 600px;
          /* border: 1px solid red; */
        }

        .register-container .register-inner h3 {
          font-size: 1.5em;
          margin-bottom: 15px;
        }

        .register-container .register-inner .register-title {
          width: 100%;
          height: 50px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
          padding: 0px;
          box-sizing: border-box;
        }

        .register-container .register-inner .aditerBox {
          /* border: 1px solid #ccc; */
          width: 100%;
          height: 500px;
        }

        .register-container .register-inner .button-group {
          margin-top: 15px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: right;
          -ms-flex-pack: right;
          justify-content: right;
        }

        .register-container .register-inner .button-group button {
          display: inline-block;
        }

        .register-container .register-inner .button-group button:nth-child(1) {
          margin-right: 10px;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .register-container {
            -webkit-box-align: start;
            -ms-flex-align: start;
            align-items: flex-start;
          }
          .register-container .register-inner {
            width: 100%;
            margin: 0;
            height: 100vh;
          }
          .register-container .register-inner h3 {
            margin-top: 15px;
          }

          .register-container .register-inner .register-title {
            /* width: 100%; */
          }

          .register-container .register-inner .aditerBox {
            height: 70%;
          }
          .register-container .register-inner .button-group {
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
          }
          .register-container .register-inner .button-group button {
            margin: 5px 0;
          }
          .register-container .register-inner .button-group button:nth-child(1) {
            margin-right: 0;
          }
        }
      `}</style>
    </>
  );
};

export default postRegister;