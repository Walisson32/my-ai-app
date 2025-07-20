#!/bin/bash

echo "=== Script de Build APK - IA Assistant ==="
echo ""

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale o npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm encontrados"

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

echo "✅ Dependências verificadas"

# Verificar se EAS CLI está instalado
if ! command -v eas &> /dev/null; then
    echo "📱 Instalando EAS CLI..."
    npm install -g eas-cli
fi

echo "✅ EAS CLI verificado"

# Função para build com EAS (requer login)
build_with_eas() {
    echo ""
    echo "🔨 Iniciando build com EAS..."
    echo "⚠️  Você precisará fazer login no Expo"
    echo ""
    
    # Verificar se está logado
    if ! eas whoami &> /dev/null; then
        echo "🔐 Fazendo login no Expo..."
        eas login
    fi
    
    # Configurar build se necessário
    if [ ! -f "eas.json" ]; then
        echo "⚙️  Configurando build..."
        eas build:configure
    fi
    
    # Executar build
    echo "🚀 Gerando APK..."
    eas build --platform android --profile preview
    
    echo ""
    echo "✅ Build iniciado! Verifique o progresso em:"
    echo "   https://expo.dev/accounts/$(eas whoami)/projects/ia-assistant/builds"
}

# Função para build local (requer Android SDK)
build_local() {
    echo ""
    echo "🔨 Preparando build local..."
    echo "⚠️  Este método requer Android Studio e SDK configurados"
    echo ""
    
    # Verificar se já foi ejetado
    if [ ! -d "android" ]; then
        echo "📱 Ejetando do Expo (irreversível)..."
        read -p "Tem certeza? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            expo eject
        else
            echo "❌ Build cancelado"
            exit 1
        fi
    fi
    
    # Build Android
    echo "🔨 Compilando APK..."
    cd android
    ./gradlew assembleRelease
    
    echo ""
    echo "✅ APK gerado em: android/app/build/outputs/apk/release/"
}

# Menu de opções
echo ""
echo "Escolha o método de build:"
echo "1) EAS Build (Recomendado - requer conta Expo)"
echo "2) Build Local (Requer Android Studio)"
echo "3) Apenas exportar bundle"
echo "4) Sair"
echo ""

read -p "Opção (1-4): " choice

case $choice in
    1)
        build_with_eas
        ;;
    2)
        build_local
        ;;
    3)
        echo "📦 Exportando bundle..."
        npx expo export --platform android
        echo "✅ Bundle exportado para: dist/"
        ;;
    4)
        echo "👋 Saindo..."
        exit 0
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo ""
echo "🎉 Processo concluído!"
echo ""
echo "📱 Para instalar o APK:"
echo "   1. Transfira o arquivo .apk para seu dispositivo Android"
echo "   2. Habilite 'Fontes desconhecidas' nas configurações"
echo "   3. Toque no arquivo APK para instalar"
echo ""
echo "⚙️  Para configurar a IA:"
echo "   1. Abra o app"
echo "   2. Vá em Configurações"
echo "   3. Cole sua chave da API OpenAI"
echo "   4. Salve as configurações"
echo ""
echo "🚀 Aproveite sua IA Assistant!"

