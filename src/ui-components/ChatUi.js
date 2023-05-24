import React from 'react'
import LeftBubble from './LeftBubble'

const ChatUi = (props) => {
    let bubbles = [];
    for (var i = 0; i < props.fileCount; i++) {
        bubbles.push(<LeftBubble
            msg={"Let me check this for you!"}
        />);
    }
    console.log(bubbles);
    return (
        <div>
            <div className='chatContainer'>
                <LeftBubble
                    msg={"Welcome to Scavenger! I’m happy to assist you on your business problems. Just upload your datasets! 😇"}
                />
                {bubbles}
            </div>
        </div>
    )
}

export default ChatUi