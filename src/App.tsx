import React from 'react';
import { useState } from 'react';
import Messages from './components/Messages';
import { MessageType } from './types/Message';
import { HistoryType } from './types/History';
import { HeadersType } from './types/Headers';
import Input from './components/Input';
//import History from "./components/History";
//import Clear from "./components/Clear";
import './App.scss';

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);
  // If OPENAI_API_KEY is set, use Open AI API instead of TWH API
  const openAI = process.env.REACT_APP_OPENAI_API_KEY ? true : false;

  const handleSubmit = async () => {
    const userInput: MessageType = {
      role: "user",
      content: input
    };

    setInput("");
    setMessages([...messages, userInput]);
    setLoading(loading => true);

    let headers: HeadersType = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    let apiUrl, postBody;

    // POST body for sending to TWH API
    postBody = JSON.stringify({
      conversationHistory: history,
      userQuestion: userInput.content
    });
    apiUrl = process.env.REACT_APP_TWH_API_URL || "http://twhapi:80/chat/";

    if (openAI) {
      apiUrl = "https://api.openai.com/v1/chat/completions";
      headers.Authorization = `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`;
      // POST body for sending to Open AI API
      postBody = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [...messages, userInput]
      })
    }

    await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: postBody
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        let answer: string;
        if (openAI) {
          answer = data.choices[0].message.content;
        } else {
          answer = data.message.content;
        }
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: answer
          }
        ]);
        setHistory((history) => [...history, { "user": input, "assistant": answer } as HistoryType]);
        setInput("");
        setLoading(loading => false);
      }).catch((err) => {
        console.error(err);
        setServerError(serverError => true);
        setLoading(loading => false);
      });

  };

  /*
  const clear = () => {
    setMessages([]);
    setHistory([]);
  };
  */

  return (
    <div className="app">
      <header>
        <h1>Talk With HOLLIS (alpha release)</h1>
        <h3>Find books on the shelf at multiple library locations</h3>
      </header>
      <main>
          <div className="sidebar">&nbsp;</div>
          <div className="content">
            <Messages
              messages={messages}
              loading={loading}
              serverError={serverError}
            />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onClick={input ? handleSubmit : undefined}
              disabled={loading || serverError}
            />
          </div>
          <div className="sidebar">&nbsp;</div>
      </main>
      <footer>
        <div>
        Please note: Data may be several years old.
        </div>
        <div>
          &copy; Harvard Library
        </div>
      </footer>
    </div>
  );
}
