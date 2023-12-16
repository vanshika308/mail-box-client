import { EditorState } from 'draft-js';
import React, { Fragment, useState, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './send.css';

const sendMessage = (sender, receiver, subject, message) => {
  const email = localStorage.getItem('email');
  const modifiedEmail = email.replace(/['@','.']/g, '');
  const messageData = {
    sender: sender,
    receiver: receiver,
    subject: subject,
    message: message
  };

  return fetch(`https://mail-box-client-58ba1-default-rtdb.firebaseio.com/${modifiedEmail}/messages.json`, {
    method: 'POST',
    body: JSON.stringify(messageData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const Send = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const subjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };

  const editorHandler = (state) => {
    setEditorState(state);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const sender = localStorage.getItem('email');
    const receiver = email.replace(/['@','.']/g, '');
  
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();

    try {
      const senderResponse = await sendMessage(sender, receiver, subject, plainText);
      const receiverResponse = await sendMessage(sender, receiver, subject, plainText);

      if (senderResponse.ok && receiverResponse.ok) {
        console.log('Mail sent successfully!');
      } else {
        throw new Error('Failed to send mail');
      }
    } catch (error) {
      console.error('Error sending mail:', error);
      alert('Failed to send mail');
    }
  };

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
  );
};

export default Send;
