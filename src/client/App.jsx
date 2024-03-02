import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import Input from "./components/Input";

function App() {
  const [longLink, setLongLink] = useState("");
  const [shortLink, setShortLink] = useState("");

  function createShortLink() {
    fetch(`/c?longLink=${longLink}`)
    .then((res) => res.json())
    .then(data => {
      var currentURL = window.location.href;
      var url = new URL(currentURL);
      var baseURL = url.origin;

      data.shortLinkId == undefined ? setShortLink("N/A") : setShortLink(`${baseURL}/l/${data.shortLinkId}`)
    }) 
  }

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <div className="card">
        <Input text="Long URL" onInput={setLongLink}></Input>
        <Input text="Shortened URL" value={shortLink} disabled={true}></Input>
        <button onClick={createShortLink}>Shorten</button>
      </div>
    </div>
  );
}

export default App;
