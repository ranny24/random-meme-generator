import axios from 'axios';
import React, { useState } from 'react';

const MemeGenerator = () => {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeUrl, setMemeUrl] = useState(
    'https://api.memegen.link/images/doge.png',
  );

  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleMemeTemplateChange = (event) => {
    const templateName = event.target.value;
    const templateURL = `https://api.memegen.link/images/${templateName}.png`;
    setMemeUrl(templateURL);
  };

  const handleDownload = async () => {
    await axios({
      url: memeUrl,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'meme.png');
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleGenerate = () => {
    const templateName = document.getElementById('meme-template').value;
    const top = encodeURIComponent(topText);
    const bottom = encodeURIComponent(bottomText);
    const memeURL = `https://api.memegen.link/images/${templateName}/${top}/${bottom}.png`;
    setMemeUrl(memeURL);
  };

  return (
    <div>
      <h1>Meme Generator</h1>
      <div>
        <label htmlFor="top-text">Top Text</label>
        <input
          type="text"
          id="top-text"
          value={topText}
          onChange={handleTopTextChange}
        />
      </div>
      <div>
        <label htmlFor="bottom-text">Bottom Text</label>
        <input
          type="text"
          id="bottom-text"
          value={bottomText}
          onChange={handleBottomTextChange}
        />
      </div>
      <div>
        <label htmlFor="meme-template">Meme template</label>
        <select id="meme-template" onChange={handleMemeTemplateChange}>
          <option value="doge">Doge</option>
          <option value="bender">Bender</option>
          <option value="philosoraptor">Philosoraptor</option>
          <option value="drake">Drake</option>
          <option value="kermit">Kermit</option>
          <option key="morpheus" value="morpheus">
            Morpheus
          </option>
          <option key="sleeping-shaq" value="sleeping-shaq">
            Sleeping Shaq
          </option>
        </select>
      </div>
      <div>
        <img src={memeUrl} alt="Meme" data-test-id="meme-image" />
      </div>
      <div>
        <button onClick={handleGenerate}>Generate</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default MemeGenerator;
