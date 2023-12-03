import { EditorState } from 'draft-js';
import React, { Fragment, useState, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './send.css';

const Send = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  const subjectChangeHandler = (e) => {
    setSubject(e.target.value);
  }

  const editorHandler = (state) => {
    setEditorState(state);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const sender = localStorage.getItem('email');
    const receiver = email.replace(/['@','.']/g, '');
  
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();
  
    fetch(`https://mail-box-client-58ba1-default-rtdb.firebaseio.com/${sender}.json`, {
      method: 'POST',
      body: JSON.stringify({
        subject: subject,
        message: plainText
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (!res.ok) {
        alert(res.error.message);
      } else {
        console.log('Sent to sender successfully');
      }
    });
  
    fetch(`https://mail-box-client-58ba1-default-rtdb.firebaseio.com/${receiver}.json`, {
      method: 'POST',
      body: JSON.stringify({
        subject: subject,
        message: plainText
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (!res.ok) {
        alert(res.error.message);
      } else {
        console.log('Sent to receiver successfully');
      }
    });
  }
  

  return (
    <Fragment>
      <div className="main">
        <form className="To" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email">To</label>
            <input type="email" id="email" placeholder="Enter email" value={email} onChange={emailChangeHandler} />
          </div>

          <div className="mb-3">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" value={subject} onChange={subjectChangeHandler} />
          </div>

          <button type="submit">
            Send
          </button>
        </form>

        <div className="editor">
          <Editor
            ref={editorRef}
            editorState={editorState}
            onEditorStateChange={editorHandler}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Send;
