import styles from './styles.module.scss';

import logo from '../../assets/logo.svg';

export const MessageList: React.FC = () => {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logo} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>Não vejo a hora de começar esse evento maravilhoso que ensina muito conteúdo de qualidade para os desenvolvedores. Pra cima ROCKET!</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/alexandreerick.png" alt="Erick Alexandre" />
            </div>
            <span>Erick Alexandre</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>Não vejo a hora de começar esse evento maravilhoso que ensina muito conteúdo de qualidade para os desenvolvedores. Pra cima ROCKET!</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/alexandreerick.png" alt="Erick Alexandre" />
            </div>
            <span>Erick Alexandre</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>Não vejo a hora de começar esse evento maravilhoso que ensina muito conteúdo de qualidade para os desenvolvedores. Pra cima ROCKET!</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/alexandreerick.png" alt="Erick Alexandre" />
            </div>
            <span>Erick Alexandre</span>
          </div>
        </li>
      </ul>
    </div>
  )
}