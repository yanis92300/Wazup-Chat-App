import './MessageForm.css'
import './SendBox'
import { SendBox } from './SendBox'
export const MessageForm = ({
    addMessage
  }) => {
      
    return (

        <div className='form'>
            <SendBox addMessage={addMessage} />
        </div>
    )
}




