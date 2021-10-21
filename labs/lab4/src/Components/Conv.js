import React from 'react'
import './Conv.css'
import { MessageForm } from './MessageForm'
import { Messages } from './Messages'
import {useState} from 'react';

export const Conv = ({
    channel = {
      name: 'Fake channel'
    }
  }) => {

   
    return (
        <div className='conv'>
            <Messages />
            
                    </div>
    ) 
}
