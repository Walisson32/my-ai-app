// Serviço para integração com APIs de IA
class AIService {
  constructor() {
    this.apiKey = 'YOUR_API_KEY_HERE'; // Substitua pela sua chave de API
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async sendMessage(message, conversationHistory = []) {
    try {
      // Preparar o contexto da conversa
      const messages = [
        {
          role: 'system',
          content: 'Você é uma assistente de IA útil, amigável e inteligente. Responda sempre em português brasileiro de forma clara e concisa.'
        },
        ...conversationHistory.slice(-10).map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        })),
        {
          role: 'user',
          content: message
        }
      ];

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;

    } catch (error) {
      console.error('Erro na API de IA:', error);
      
      // Fallback para respostas locais em caso de erro
      return this.getLocalResponse(message);
    }
  }

  getLocalResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Respostas inteligentes baseadas em padrões
    const patterns = [
      {
        keywords: ['oi', 'olá', 'hello', 'hi'],
        responses: [
          'Olá! Como posso ajudá-lo hoje?',
          'Oi! Em que posso ser útil?',
          'Olá! Estou aqui para ajudar!'
        ]
      },
      {
        keywords: ['como você está', 'tudo bem', 'como vai'],
        responses: [
          'Estou funcionando perfeitamente! E você, como está?',
          'Tudo ótimo por aqui! Como posso ajudá-lo?',
          'Estou bem e pronto para ajudar!'
        ]
      },
      {
        keywords: ['obrigado', 'obrigada', 'valeu', 'thanks'],
        responses: [
          'De nada! Fico feliz em ajudar!',
          'Por nada! Estou sempre aqui quando precisar!',
          'Foi um prazer ajudar!'
        ]
      },
      {
        keywords: ['tchau', 'bye', 'até logo', 'adeus'],
        responses: [
          'Até logo! Foi um prazer conversar!',
          'Tchau! Volte sempre que precisar!',
          'Até mais! Estarei aqui quando precisar!'
        ]
      },
      {
        keywords: ['nome', 'quem é você', 'who are you'],
        responses: [
          'Eu sou sua assistente de IA pessoal!',
          'Sou uma inteligência artificial criada para ajudá-lo!',
          'Meu nome é IA Assistant, sua assistente virtual!'
        ]
      },
      {
        keywords: ['ajuda', 'help', 'socorro'],
        responses: [
          'Claro! Posso ajudar com perguntas, conversas, informações e muito mais. O que você gostaria de saber?',
          'Estou aqui para ajudar! Pode me fazer perguntas sobre diversos assuntos.',
          'Como posso ajudá-lo? Posso conversar sobre vários temas!'
        ]
      }
    ];

    // Procurar por padrões conhecidos
    for (const pattern of patterns) {
      if (pattern.keywords.some(keyword => lowerMessage.includes(keyword))) {
        const randomIndex = Math.floor(Math.random() * pattern.responses.length);
        return pattern.responses[randomIndex];
      }
    }

    // Respostas baseadas no tipo de mensagem
    if (lowerMessage.includes('?')) {
      return `Essa é uma pergunta interessante! Infelizmente, no momento estou funcionando offline e minhas respostas são limitadas. Para respostas mais completas, configure uma chave de API no código. Posso ajudar com algo mais básico?`;
    }

    if (lowerMessage.length > 100) {
      return `Entendi sua mensagem! Como estou funcionando offline, minhas respostas são limitadas. Para conversas mais avançadas, configure uma API de IA no aplicativo. Posso ajudar com algo mais simples?`;
    }

    // Resposta padrão
    const defaultResponses = [
      `Interessante! Você disse: "${message}". Como estou em modo offline, minhas respostas são básicas. Configure uma API para respostas mais inteligentes!`,
      `Entendi! Sobre "${message}" - no momento estou funcionando com respostas pré-programadas. Para conversas mais avançadas, adicione uma chave de API!`,
      `Compreendo sua mensagem sobre "${message}". Estou funcionando offline no momento. Para respostas mais elaboradas, configure uma API de IA!`
    ];

    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[randomIndex];
  }

  // Método para validar se a API está configurada
  isApiConfigured() {
    return this.apiKey && this.apiKey !== 'YOUR_API_KEY_HERE';
  }

  // Método para configurar a chave da API
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }
}

export default new AIService();

