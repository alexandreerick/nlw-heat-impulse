import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import io from 'socket.io-client';

import styles from './styles.module.scss';

import logo from '../../assets/logo.svg';

interface ILastMessages {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: ILastMessages[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: ILastMessages) => {
  console.log('CHEGOU MENSAGEM');
  messagesQueue.push(newMessage);
})

export const MessageList: React.FC = () => {
  const [lastMessages, setLastMessages] = useState<ILastMessages[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setLastMessages((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ].filter(Boolean))

        messagesQueue.shift();
      }
    }, 3000)
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get<ILastMessages[]>('last-messages');

      setLastMessages(response.data);

      console.log('RESPONSE', response.data);
    })()
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logo} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {lastMessages && lastMessages.length ? lastMessages.map((message, index) => (
          <li className={styles.message} key={`${message.id}-${index}`}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        )) : null}
      </ul>
    </div>
  )
}