import { useState } from "react";

import Message from "./components/Message";
import Input from "./components/Input";
import History from "./components/History";
import Clear from "./components/Clear";

import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    const userInput = {
      role: "user",
      content: input
    };

    setMessages([...messages, userInput]);

    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    let apiUrl, postBody;

    // POST body for sending to TWH API
    postBody = JSON.stringify({
      //conversationHistory: history,
      userQuestion: userInput.content
    });
    apiUrl = process.env.REACT_APP_TWH_API_URL || "http://twhapi:80/chat/";

    // If OPENAI_API_KEY is set, use Open AI API
    if (process.env.REACT_APP_OPENAI_API_KEY) {
      apiUrl = "https://api.openai.com/v1/chat/completions";
      headers.Authorization = `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`;
      // POST body for sending to Open AI API
      postBody = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [...messages, userInput]
      })
    }

    console.log(apiUrl);
    console.log(headers);
    console.log(postBody);

    await fetch(apiUrl, {
      method: "POST",
      //headers: headers,
      body: postBody
    })
      //.then((data) => data.json())
      .then((data) => {
        console.log(data);
        /*const answer = data.choices[0].message.content;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: answer
          }
        ]);
        setHistory((history) => [...history, { "user": input, "assistant": answer }]);
        setInput("");*/
      }).catch((err) => {
        console.error(err);
      });

  };

  const clear = () => {
    setMessages([]);
    setHistory([]);
  };

  return (
    <div className="App">
      <div className="Column">
        <div className="Content">
        {messages.map((el, i) => {
            return <Message key={i} role={el.role} content={el.content} />;
          })}
        </div>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={input ? handleSubmit : undefined}
        />
      </div>
      <div className="Column">
        <div className="Content">
          {history.map((el, i) => {
            return (
              <History
                key={i}
                question={el["user"]}
                onClick={() =>
                  setMessages([
                    { role: "user", content: history[i]["user"] },
                    { role: "assistant", content: history[i]["assistant"] }
                  ])
                }
              />
            );
          })}
        </div>
        <Clear onClick={clear} />
      </div>
    </div>
  );
}
