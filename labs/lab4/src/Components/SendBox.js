import './SendBox.css'
import './Messages'
import './MessageForm'

export const SendBox = ({
    addMessage
  }) => {
    
    const onSubmit = (e) => {
      console.log("on click")
      e.preventDefault()
      const data = new FormData(e.target)
      addMessage({
        content: data.get('content'),
        author: 'david',
        creation: Date.now(),
      })
      e.target.elements.content.value = ''
    } 

       return (
        
        <form onSubmit={onSubmit} >
            
                     <input className='content' type='text' name="content" />
  
                     <button class="button">Send</button>

                  <label></label>

        </form>
    )
}





