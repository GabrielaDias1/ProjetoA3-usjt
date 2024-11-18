const axios = require('axios');
const calcularNutricional = async (dados) => {
    try {
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

        
        const response = await axios.post(url, dados, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;  
    } catch (error) {
        console.error('Erro ao calcular nutricional:', error.response?.data || error.message);
        throw new Error('Erro ao calcular nutricional');
    }
}
;module.exports = { calcularNutricional };
