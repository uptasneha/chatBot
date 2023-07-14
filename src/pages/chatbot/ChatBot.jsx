import './chatbot.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer,ChatContainer,MessageList,Message,MessageInput,TypingIndicator} from '@chatscope/chat-ui-kit-react'
import { useState } from 'react';

const API_KEY= process.env.REACT_APP_OPENAI;
// console.log("APIK ", API_KEY);
const systemMessage={
  role :"system",
  content:"Explain all concepts for a programmer or coder"
 }
function App() {
  const[typing,setTyping] = useState(false);
  const[messages,setMessages]=useState([
    {
        message:"Hello, I am Chattu!",
        sender:"Chattu"

  }])   //[]

  const handleSend = async(message)=>{
    const newMessage = {
      message:message,
      sender:"user",
      direction:"outgoing"
    }

    const newMessages=[...messages,newMessage]; //all the old messages,+ the new message

    //update our message state
    setMessages(newMessages);

    setTyping(true);

    // process message to chat gpt(send it over and see the response)
    await processMessageToChatGPT(newMessages);
  }

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });
  
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages,
      ],
      max_tokens: 50, // Limit the response to 50 tokens (approximately 50 words)
      stop: ['\n'] // Stop the generation at a new line character to prevent long responses
    };
  
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    })
      .then((data) => data.json())
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "Chattu"
          }
        ]);
        setTyping(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setTyping(false);
      });
  }
  

  return (
    <div className="App">
      <div style={{position:"relative",height:"70vh",width:"600px"}}></div>
      <MainContainer>
        <ChatContainer>
          <MessageList
          scrollBehavior='smooth' 
          typingIndicator={typing? <TypingIndicator content="CodeBot is typing..."/> :null}>
           {messages.map((message,i)=>{
            return <Message key={i} model={message}/>
           })}
          </MessageList>
          <MessageInput placeholder='Type message here' onSend={handleSend}/>
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default App;
