import React, { useState, useEffect } from 'react';
import './App.css';

const TextAreaWithStats = () => {
  const [text, setText] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  useEffect(() => {
    updateWordAndCharCount();
    highlightReplacedText();
  }, [text, searchText, replaceText]);

  const updateWordAndCharCount = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    setUniqueWordCount(uniqueWords.size);
    const characters = text.replace(/[^\w]/g, '');
    setCharCount(characters.length);
  };

  const handleReplace = () => {
    const regex = new RegExp(searchText, 'gi');
    const updatedText = text.replace(regex, replaceText);
    setText(updatedText);
  };

  const highlightReplacedText = () => {
    if (searchText) {
      const regex = new RegExp(searchText, 'gi');
      const parts = text.split(regex);
      const highlighted = parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && <span className="highlight">{searchText}</span>}
        </span>
      ));
      setHighlightedText(<>{highlighted}</>);
    } else {
      setHighlightedText(text);
    }
  };

  return (
    <div className="container">
      <h1>Real-Time Text Analysis & Replacement</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="10"
        className="textarea"
      />
      <div className="stats">
        <strong>Unique Words:</strong> {uniqueWordCount}
        <br />
        <strong>Character Count (Excl. Spaces & Punctuation):</strong> {charCount}
      </div>
      <div className="replacement-section">
        <input
          type="text"
          placeholder="Search for..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Replace with..."
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          className="input-field"
        />
        <button onClick={handleReplace} className="replace-button">
          Replace All
        </button>
      </div>
      <div className="highlighted-text">
        <h3>Replaced Text:</h3>
        <div className="highlighted-output">
          {highlightedText}
        </div>
      </div>
    </div>
  );
};

export default TextAreaWithStats;
