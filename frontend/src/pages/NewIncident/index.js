import React, { useState} from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api'

export default function NewIncident(){
    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [value, setValue] = useState(0);

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value
        };

        try{
            const response = await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            alert(`Novo incidente cadastrado com ID: ${response.data.id}`);

            history.push('/profile');
        } catch(err){
            alert('Erro no cadastro, tente novamente');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>   

                    <img src={logoImg} alt="Be The Hero"></img>
                    <h1>Cadastrar novo caso</h1>
                    <p>
                    Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size= {16} color="#e02041"></FiArrowLeft>
                        Voltar para Profile
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Titulo do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}></input>
                    <textarea placeholder="Descricao"
                    value={description}
                    onChange={e => setDescription(e.target.value)}></textarea>
                    <input placeholder="Valor em Reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}></input>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}