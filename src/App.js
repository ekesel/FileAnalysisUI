import './App.css';
import NavBar from './ui-components/NavBar';
import React from 'react';
import DragDropFile from './ui-components/DragDropFile';
import ChatUi from './ui-components/ChatUi';

function App() {
  const [fileItems, setFileItems] = React.useState([]);

  return (
    <React.Fragment>
      <NavBar />
      <div className='leftUI'>
        <DragDropFile fileItems={fileItems} setFileItems={setFileItems} />
      </div>
      <div className='rightUI'>
        <div className='welcomeText'>
          <div><div class="first">Welcome Back! 👋</div></div>
          <div><div class="second">Together again! 😍</div></div>
          <div><div class="third">Missed You! 🙂</div></div>
        </div>
        <ChatUi fileCount={fileItems.length} />
      </div>
    </React.Fragment>
  );
}

export default App;
