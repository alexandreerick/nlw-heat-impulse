import { useEffect, useState } from 'react';
import { api } from '../../services/api';

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

export const MessageList: React.FC = () => {
  const [lastMessages, setLastMessages] = useState<ILastMessages[]>([]);

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