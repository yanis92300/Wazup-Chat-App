import './Messages.css'
import './Conv'
import './MessageForm'

import React from 'react'
import {useState} from 'react';
import { SendBox } from './SendBox';

export const Messages = () => {
    const addMessage = (message) => {
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
      },{
        author: 'sergei',
        creation: 1602840139202,
        content: `
       hahahah
        `,
      },{
        author: 'david',
        creation: 1602844139200,
        content: `
       des barres le reuf
        `,
      }])

    
    return (
        <div className='messages'>

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
              ))}
            </ul>

            <div className='form'>
            < SendBox addMessage={addMessage} />
        </div>
        </div>
    )
}



