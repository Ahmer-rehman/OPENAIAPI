import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';


function ChatBot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const openai = new OpenAI({ 
        apiKey: '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', 
        dangerouslyAllowBrowser: true
      }); 
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant designed to output JSON.',
          },
          { role: 'user', content: 'Who won the world series in 2020?' },
        ],
        model: 'gpt-3.5-turbo-1106',
        response_format: { type: 'json_object' },
      });
      const botResponse = completion.choices[0].message.content;
      setMessages([...messages, { text: botResponse, sender: 'bot' }]);
    }

    fetchData();
  }, []); 

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      
      <div style={{ marginBottom: '20px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ backgroundColor: message.sender === 'user' ? '#e3f2fd' : '#f0f0f0', padding: '5px 10px', marginBottom: '10px' }}>
            <div>{message.sender === 'user' ? 'User:' : 'Chatbot:'} {message.text}</div>
          </div>
        ))}
      </div>
      <input
        type="text"
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        placeholder="Type a message..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}

export default ChatBot;
