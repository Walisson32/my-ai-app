# IA Assistant - Aplicativo Android

Uma aplicação completa de inteligência artificial para dispositivos Android, desenvolvida com React Native e Expo.

## 🚀 Funcionalidades

- **Chat Inteligente**: Interface de conversação em tempo real com IA
- **Respostas Offline**: Sistema de respostas básicas quando offline
- **Integração com OpenAI**: Suporte para API do ChatGPT (configurável)
- **Histórico Persistente**: Armazenamento local das conversas
- **Interface Moderna**: Design responsivo e intuitivo
- **Configurações Avançadas**: Personalização da experiência do usuário
- **Modo Escuro**: Tema escuro para melhor experiência visual
- **Salvamento Automático**: Backup automático das conversas

## 📱 Capturas de Tela

- Interface principal de chat
- Tela de configurações
- Modo escuro
- Histórico de conversas

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework principal
- **Expo**: Plataforma de desenvolvimento
- **AsyncStorage**: Armazenamento local
- **OpenAI API**: Integração com ChatGPT (opcional)
- **JavaScript ES6+**: Linguagem de programação

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para emulador) ou dispositivo Android

## 🔧 Instalação e Configuração

### 1. Clone o projeto
```bash
git clone <repository-url>
cd my-ai-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure a API (Opcional)
Para respostas mais inteligentes, configure sua chave da OpenAI:

1. Acesse [OpenAI Platform](https://platform.openai.com/api-keys)
2. Crie uma nova chave de API
3. No app, vá em Configurações e cole sua chave
4. Salve as configurações

### 4. Execute o projeto
```bash
# Iniciar o servidor de desenvolvimento
npm start

# Ou executar diretamente no Android
npm run android
```

## 📦 Gerando o APK

### Método 1: Expo Build (Recomendado)
```bash
# Instalar EAS CLI
npm install -g @expo/eas-cli

# Fazer login no Expo
eas login

# Configurar o build
eas build:configure

# Gerar APK
eas build --platform android --profile preview
```

### Método 2: Build Local
```bash
# Ejetar do Expo (cuidado: irreversível)
expo eject

# Gerar APK com Gradle
cd android
./gradlew assembleRelease
```

## 🎯 Como Usar

1. **Primeira Execução**:
   - Abra o app
   - Leia a mensagem de boas-vindas
   - Comece a conversar!

2. **Configurar API** (Opcional):
   - Toque no botão "Configurações"
   - Cole sua chave da OpenAI
   - Salve as configurações
   - Aproveite respostas mais inteligentes!

3. **Funcionalidades Básicas**:
   - Digite mensagens no campo de texto
   - Toque em "Enviar" ou pressione Enter
   - Visualize o histórico de conversas
   - Use "Limpar" para resetar o chat

## 🔒 Privacidade e Segurança

- **Dados Locais**: Todas as conversas são armazenadas localmente no dispositivo
- **API Opcional**: A integração com OpenAI é opcional e configurável
- **Sem Coleta**: O app não coleta dados pessoais
- **Código Aberto**: Todo o código está disponível para auditoria

## 🐛 Solução de Problemas

### App não inicia
- Verifique se o Node.js está instalado
- Execute `npm install` novamente
- Limpe o cache: `expo r -c`

### Erro de API
- Verifique sua chave da OpenAI
- Confirme se há créditos na conta
- Teste a conectividade com a internet

### Build falha
- Atualize o Expo CLI: `npm install -g @expo/eas-cli`
- Verifique as configurações em `app.json`
- Consulte a documentação do Expo

## 📚 Estrutura do Projeto

```
my-ai-app/
├── App.js                 # Componente principal
├── app.json              # Configurações do Expo
├── package.json          # Dependências
├── services/
│   └── AIService.js      # Serviço de IA
├── components/
│   └── SettingsScreen.js # Tela de configurações
├── assets/               # Imagens e ícones
└── README.md            # Documentação
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- **Issues**: Reporte bugs no GitHub
- **Documentação**: Consulte este README
- **Comunidade**: Participe das discussões

## 🔄 Atualizações Futuras

- [ ] Reconhecimento de voz
- [ ] Síntese de fala
- [ ] Temas personalizáveis
- [ ] Backup na nuvem
- [ ] Múltiplas conversas
- [ ] Comandos por voz
- [ ] Integração com outros modelos de IA

---

**Desenvolvido com ❤️ para a comunidade Android**

