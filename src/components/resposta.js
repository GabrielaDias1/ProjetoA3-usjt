import React, { useState, useEffect } from "react";
import LogoPrincipal from "../assents/imagens/logo_principal.png";
import "../assents/styles/resposta.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Resposta() {
  const [formData, setFormData] = useState({
    text: [],
    recomendacoes: [],
  });

  useEffect(() => {
    const dados = localStorage.getItem("dados");
    setFormData(JSON.parse(dados));
  }, []);

  return (
    <div className="resposta">
      <header className="header-resposta">
        <div>
          <img
            id="img_logo_principal"
            src={LogoPrincipal}
            alt="Logo Principal"
          />
        </div>
      </header>
      <div className="bodyClass">
        {/* Segunda tabela com a mesma estrutura, mas sem duplicação de código */}
        <table className="custom-table">
          <thead>
            <tr>
              <th id="label-info">Resumo Nutricional</th>
            </tr>
          </thead>
          <tbody>
            {formData.text.map((recomendacao) => (
              <tr key={recomendacao.numero}>
                <td>{recomendacao.texto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
