import { useState } from "react";

import Messages from "./components/Messages";
import Input from "./components/Input";
//import History from "./components/History";
//import Clear from "./components/Clear";

import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  // If OPENAI_API_KEY is set, use Open AI API instead of TWH API
  const openAI = process.env.REACT_APP_OPENAI_API_KEY ? true : false;
  console.log(`loading ${loading}`);
  const handleSubmit = async () => {
    const userInput = {
      role: "user",
      content: input
    };

    setInput("");
    setMessages([...messages, userInput]);
    setLoading(loading => true);

    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
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
        let answer;
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
        setHistory((history) => [...history, { "user": input, "assistant": answer }]);
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
        <h3>Data may be several years old</h3>
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
        &copy; Harvard Library
      </footer>
    </div>
  );
}