import { useState } from "react";

import Message from "./components/Message";
import Input from "./components/Input";
import History from "./components/History";
import Clear from "./components/Clear";

import "./App.css";
// https://jsfiddle.net/8dk4wthr/1/
export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  // If OPENAI_API_KEY is set, use Open AI API instead of TWH API
  const openAI = process.env.REACT_APP_OPENAI_API_KEY ? true : false;

  const handleSubmit = async () => {
    const userInput = {
      role: "user",
      content: input
    };

    setInput("");
    setMessages([...messages, userInput]);
    setMessages([...messages, 
      {
        "role": "assistant",
        "content": "McGraw Center for Conservation Biology Library\n9:00am - 5:00pm\n1.  mountains, / Milne\n    Z-L 722\n\nWidener Library\n9:00am - 5:00pm\n1.  mountains; a play in one act. The mountains; a drama in three acts and a prologue. / Wolfe\n    ALA 7804.66\n2.  Mountains. / Auden\n    23531.17.280\n3.  mountains / White\n    US 38239.04.10\n4.  mountains / White\n    F 2737.2\n\nCabot Science Library\n9:00am - 5:00pm\n1.  Contrasts of the Appalachian mountains : a lecture delivered in the National Museum, Washington, D.C., March 25, 1882 / Chickering\n    Sci Files"
      }]);

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

    console.log(apiUrl);
    console.log(headers);
    console.log(postBody);

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
      }).catch((err) => {
        console.error(err);
      });

  };

  const clear = () => {
    setMessages([]);
    setHistory([]);
  };

  return (
    <div className="app">

      <header>
        menu bar
      </header>

      <main>
          <div className="sidebar">Left sidebar</div>
          <div className="content">
          Main content
          <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <div className="input">
            <input type="text" />
          </div>
          </div>
          <div className="sidebar">Right sidebar</div>
      </main>
      <footer>
        footer content
      </footer>
    </div>

  );
}
