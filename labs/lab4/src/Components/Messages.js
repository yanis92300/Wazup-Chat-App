import './Messages.css'
import './Conv'
import './MessageForm'

import React from 'react'
import {useState} from 'react';
import { SendBox } from './SendBox';

var counter = 0

export const Messages = () => {
    const addMessage = (message) => {
      // Alternate message between users
        if(counter%2 == 0){
          message.author = 'Sergei'
          counter++
        }
        else{
          message.author = 'David'
          counter++
        }
        setMessages([
          ...messages,
          message
        ]) 
      }

    
    const [messages, setMessages] = useState([{
        author: 'sergei',
        creation: 1602831101929,
        content: `
        
       yooooo
        `,
      },{
        author: 'david',
        creation: 1602832138892,
        content: `
        
        yeahh
        `,
      }])

    
    return (
        <div className='messages'>
            <nav>
              <ul className='list'>
                { messages.map( (message, i) => (
                    <li key={i} className='li'>
                      <p>
                        <span>{message.author}</span>
                        {' '}
                        <span>{(new Date(message.creation)).toString()}</span>
                      </p>
                      <div>
                        {
                          message.content
                          .split(/(\n +\n)/)
                          .filter( el => el.trim() )
                          .map( el => <p>{el}</p>)
                        }
                      </div>
                    </li>
                  ))
                }
              </ul>
            </nav>

            <div className='form'>
            < SendBox addMessage={addMessage} />
        </div>
        </div>
    )
}



