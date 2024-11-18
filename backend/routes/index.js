const express = require('express');
const { connection } = require('../db/db'); 
const router = express.Router();
const { calcularNutricional } = require('../services/geminiService');


router.get('/', (req, res) => {
    const endpoint = '/';  
    const timestamp = new Date();  
    const resposta = 'Hello World!';  


    connection.query(
        'INSERT INTO dados_coresync (endpoint, data_recbida) VALUES (?, ?, ?)', 
        [endpoint, timestamp.toISOString().slice(0, 19).replace('T', ' '), resposta],
        (err, results) => {
            if (err) {
                console.error('Erro ao salvar a chamada do endpoint na base de dados:', err);
                return res.status(500).json({ message: 'Erro ao salvar a chamada do endpoint na base de dados.' });
            }

            
            return res.json({ message: 'Hello, World!' });
        }
    );
});



router.get('/consultar', async (req, res) => {
    const endpoint = '/consultar';
    const timestamp = new Date();

    try {
        
        connection.query(
            'INSERT INTO dados_coresync (endpoint, data_recbida) VALUES (?, ?)', 
            [endpoint, timestamp.toISOString().slice(0, 19).replace('T', ' ')],
            (err, results) => {
                if (err) {
                    console.error('Erro ao executar a consulta:', err);
                    return res.status(500).send('Erro ao consultar dados');
                }
                res.json({
                    message: 'Consulta realizada com sucesso!',
                    results
                });
            }
        );
    } catch (err) {
        console.error('Erro ao consultar dados:', err);
        res.status(500).send('Erro ao consultar dados');
    } master
  }

  return macronutrientes;
}


function generateRecommendations(objetivo) {
  let recommendations = {
    dieta: [],
    treinamento: [],
    outros: []
  };

  if (objetivo === 'Ganho de massa') {
    recommendations.dieta.push('Aumentar o consumo calórico para promover o ganho de massa muscular.');
    recommendations.dieta.push('Consumir cerca de 1,6-2,2 gramas de proteína por quilo de peso corporal por dia.');
    recommendations.dieta.push('Priorizar carboidratos complexos como arroz integral, batata doce e pão integral.');
    recommendations.dieta.push('Consumir gorduras saudáveis como azeite de oliva, abacate e oleaginosas.');

    recommendations.treinamento.push('Priorizar exercícios compostos como agachamento, supino e levantamento terra.');
    recommendations.treinamento.push('Treinar com pesos desafiadores e número de repetições que possibilitem alcançar a fadiga muscular.');
    recommendations.treinamento.push('Treinar 3-4 vezes por semana, com pelo menos um dia de descanso entre as sessões.');

    recommendations.outros.push('Dormir pelo menos 7-8 horas por noite para permitir a recuperação muscular.');
    recommendations.outros.push('Beber bastante água ao longo do dia, especialmente após os treinos.');
    recommendations.outros.push('A suplementação de proteínas, como whey protein, pode ser útil, mas não essencial para todos.');
  }

  

  return recommendations;
}


router.post('/calculo-nutricional', async (req, res) => {
  console.log('Dados recebidos:', req.body);  

  const { peso, altura, objetivo, proteinas, carboidratos, legumes,quantidadeCabroidatos,quantidadeProteinas,quantidadeLegumes } = req.body;

 
  if (!peso || !altura  || !objetivo  || !proteinas || !carboidratos || !legumes) {
    return res.status(400).json({ error: 'Todos os dados são obrigatórios' });
  }

  const { GEMINI_API_KEY: apiKey, GEMINI_API_URL: endpointGemini } = process.env;

});
 main

router.post('/calcular', async (req, res) => {
    const { contents } = req.body;

    
 master
    const dadosNutricionais = {
      peso,
      altura,
      objetivo,
      proteinas,
      carboidratos,
      legumes,
      quantidadeCabroidatos,
      quantidadeProteinas,
      quantidadeLegumes
    };

   
    const response = await axios.post(
      `${endpointGemini}?key=${apiKey}`,  
      { contents: [{ parts: [{ text: JSON.stringify(dadosNutricionais) }] }] }, 
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('Resposta completa da API Gemini:', JSON.stringify(response.data, null, 2));

    if (!contents || !Array.isArray(contents) || contents.length === 0) {
        return res.status(400).json({ message: 'Conteúdo inválido ou não fornecido.' });
    }
 main

    
    const dados = {
        contents: contents.map(content => {
            if (!content.parts || !Array.isArray(content.parts)) {
                return res.status(400).json({ message: 'Formato de partes inválido.' });
            }
            return {
                parts: content.parts.map(part => ({
                    text: part.text || ""  
                }))
            };
        })
    };

 master
    
    if (geminiData.candidates && geminiData.candidates.length > 0) {
      const analysisText = geminiData.candidates[0].content.parts[0].text;

  
      const linhas = analysisText.split('\n');

      const recomendacoes = linhas.filter(linha => /^\d+\.\s/.test(linha));
      
      const textoRecomendado = linhas.map(text => {
        const textoLimpo = text.replace(/^\d+\.\s/, '');
      
        if (textoLimpo.trim() !== '' || textoLimpo.trim() != null || textoLimpo.trim() != undefined ) {
          return {
            texto: textoLimpo
          };
        }
      });
  

      if (analysisText) {
        return res.json({
         text: textoRecomendado,
        recomendacoes: recomendacoes
        });
      } else {
        return res.status(500).json({ error: 'Não foi possível extrair dados nutricionais completos, valores aproximados podem ser fornecidos.' });
      }
    } else {
      return res.status(500).json({ error: 'Resposta incompleta da API Gemini' });

    try {
        
        const resultados = await calcularNutricional(dados);

        
        const textoNutricional = resultados.candidates
            .map(candidate => candidate.content.parts.map(part => part.text).join(" "))  
            .join(" ");  

        
        const textoLimpo = textoNutricional.replace(/\n/g, " ");  

        
        const timestamp = new Date();
        const endpoint = '/calcular'; 

        
        connection.query(
            'INSERT INTO dados_coresync (endpoint, data_recbida, resposta) VALUES (?, ?, ?)', 
            [
                endpoint, 
                timestamp.toISOString().slice(0, 19).replace('T', ' '),  
                textoLimpo  
            ],
            (err, results) => {
                if (err) {
                    console.error('Erro ao salvar a resposta no banco de dados:', err);
                    return res.status(500).json({ message: 'Erro ao salvar a resposta no banco de dados.' });
                }

                
                return res.json({
                    message: 'Cálculo realizado com sucesso!',
                    textoNutricional: textoLimpo, 
                    bancoResultados: results 
                });
            }
        );
    } catch (error) {
        console.error('Erro ao calcular os dados nutricionais:', error);
        return res.status(500).json({ message: 'Erro ao calcular os dados nutricionais.' });
main
    }
});

module.exports = router;
