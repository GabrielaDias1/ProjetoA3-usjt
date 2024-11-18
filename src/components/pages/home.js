import "../../assents/styles/ingredientes.css";
import "../../assents/styles/global.css";

import React, { useState } from "react";
import { carboidratos, proteinas, legumes, peso, objetivo } from "../../arrays/arrays.js";
import Banner from '../../assents/imagens/plano_fundo.jpeg';
import { useNavigate } from "react-router-dom";
import Header from "./header.js";
import Footer from "./footer.js";


function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carboidratos: "",
    proteinas: "",
    legumes: "",
    quantidadeCabroidatos: "", 
    quantidadeProteinas: "", 
    quantidadeLegumes: "", 
    peso: "",
    altura: "",
    objetivo: ""
   })

   function handleChange (key,value) {
    setFormData({
      ...formData,
      [key]: value
    })
    console.log(value)
   }
 
   async function getApiGemani() { 
      try {
        const response = await fetch('http://localhost:5000/api/calculo-nutricional', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) { 
          const data = await response.json();
          console.log('Resposta do servidor:', data);
  
          localStorage.setItem('dados', JSON.stringify(data));
          navigate('/response'); 
        } else {
          console.error('Erro ao enviar dados:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
  }

  return (
    <>
      <Header />
      <div className="banner">
        <img id="img_baner" src={Banner} alt="Banner Principal" />
        <div className="select-container">
          <div className="ingredientes">
            <div className="titulo">
              <label htmlFor="lb_faca_calculo">Faça o cálculo nutricional da sua refeição</label>
            </div>
            <div className="select-group">
              <label htmlFor="sl_carboidratos">Carboidratos:</label>
              <select id="sl_carboidratos" onChange={ (e) => handleChange("carboidratos",e.target.value)}>
                {carboidratos.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label htmlFor="sl_peso_carboidratos">Quantidade</label>
              <select id="sl_peso_carboidratos" onChange={ (e) => handleChange("quantidadeCabroidatos",e.target.value)}>
                {peso.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-group">
              <label htmlFor="sl_proteinas">Proteínas:</label>
              <select id="sl_proteinas" onChange={ (e) => handleChange("proteinas",e.target.value)}>
                {proteinas.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label htmlFor="sl_peso_proteinas">Quantidade</label>
              <select id="sl_peso_proteinas" onChange={ (e) => handleChange("quantidadeProteinas",e.target.value)}>
                {peso.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-group">
              <label htmlFor="sl_legumes">Legumes:</label>
              <select id="sl_legumes" onChange={ (e) => handleChange("legumes",e.target.value)}>
                {legumes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label htmlFor="sl_peso_legumes">Quantidade</label>
              <select id="sl_peso_legumes" onChange={ (e) => handleChange("quantidadeLegumes",e.target.value)}>
                {peso.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-usuario">
              <label htmlFor="sl_peso_usuario">Seu Peso:</label>
              <input id="sl_peso_usuario" onChange={ (e) => handleChange("peso",e.target.value)}/>
              <label htmlFor="sl_altura_usuario">Sua Altura:</label>
              <input id="sl_altura_usuario" onChange={ (e) => handleChange("altura",e.target.value)}/>
            </div>

            <div className="select-objetivo">
              <label htmlFor="sl_objetivo_dieta">Seu objetivo:</label>
              <select id="sl_objetivo_dieta" onChange={ (e) => handleChange("objetivo",e.target.value)}>
                {objetivo.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button id="button" onClick={getApiGemani}>Clique Aqui</button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
