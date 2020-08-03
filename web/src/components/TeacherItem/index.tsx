import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/4104118?s=460&u=76798dbef6919eed70c14223bd75f101b91cb860&v=4" alt="Hitalo" />
                <div>
                    <strong>Hitalo</strong>
                    <span>Química</span>
                </div>
            </header>

            <p>
                Entusiasta em Química
            <br /><br />
            Apaixonado por explodir coisas no laboratório. Mais de 200 mil alunos pelo mundo.
        </p>

            <footer>
                <p>
                    Preço/hora
                <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="whatsapp" />
                Entrar em contato
            </button>
            </footer>
        </article>
    )
}

export default TeacherItem;