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

    console.log(`handleSubmit ${messages} ${userInput}`);
    console.log(`messages`);
    console.log(messages);
    console.log(`userInput`);
    console.log(userInput);

    const postMessages = [...messages, userInput];
    console.log(`postMessages`);
    console.log(postMessages);

    let postBody = {
      conversationHistory: history,
      userQuestion: userInput.content
    }

    console.log(`postBody`);
    console.log(postBody);

    //postBody.user_question = input;


    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: postMessages
      })
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        const answer = data.choices[0].message.content;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: answer
          }
        ]);
        setHistory((history) => [...history, { "user": input, "assistant": answer }]);
        setInput("");
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
