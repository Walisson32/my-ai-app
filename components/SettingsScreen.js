import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const [apiKey, setApiKey] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('appSettings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setApiKey(parsedSettings.apiKey || '');
        setDarkMode(parsedSettings.darkMode || false);
        setVoiceEnabled(parsedSettings.voiceEnabled !== false);
        setAutoSave(parsedSettings.autoSave !== false);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        apiKey,
        darkMode,
        voiceEnabled,
        autoSave,
      };
      
      await AsyncStorage.setItem('appSettings', JSON.stringify(settings));
      
      // Atualizar o serviço de IA com a nova chave
      if (apiKey) {
        const AIService = require('../services/AIService').default;
        AIService.setApiKey(apiKey);
      }
      
      Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
      console.error('Erro ao salvar configurações:', error);
    }
  };

  const clearData = () => {
    Alert.alert(
      'Limpar Dados',
      'Isso irá apagar todas as mensagens e configurações. Tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['chatMessages', 'appSettings']);
              setApiKey('');
              setDarkMode(false);
              setVoiceEnabled(true);
              setAutoSave(true);
              Alert.alert('Sucesso', 'Dados limpos com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível limpar os dados');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, darkMode && styles.darkText]}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, darkMode && styles.darkText]}>Configurações</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* API Configuration */}
        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Configuração da API
          </Text>
          <Text style={[styles.sectionDescription, darkMode && styles.darkSecondaryText]}>
            Configure sua chave da API OpenAI para respostas mais inteligentes
          </Text>
          <TextInput
            style={[styles.input, darkMode && styles.darkInput]}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Cole sua chave da API aqui..."
            placeholderTextColor={darkMode ? "#666" : "#999"}
            secureTextEntry
            multiline={false}
          />
          <Text style={[styles.helpText, darkMode && styles.darkSecondaryText]}>
            Obtenha sua chave em: https://platform.openai.com/api-keys
          </Text>
        </View>

        {/* App Settings */}
        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Configurações do App
          </Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, darkMode && styles.darkText]}>
                Modo Escuro
              </Text>
              <Text style={[styles.settingDescription, darkMode && styles.darkSecondaryText]}>
                Ativar tema escuro
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#767577", true: "#2196F3" }}
              thumbColor={darkMode ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, darkMode && styles.darkText]}>
                Comandos de Voz
              </Text>
              <Text style={[styles.settingDescription, darkMode && styles.darkSecondaryText]}>
                Habilitar entrada por voz
              </Text>
            </View>
            <Switch
              value={voiceEnabled}
              onValueChange={setVoiceEnabled}
              trackColor={{ false: "#767577", true: "#2196F3" }}
              thumbColor={voiceEnabled ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, darkMode && styles.darkText]}>
                Salvamento Automático
              </Text>
              <Text style={[styles.settingDescription, darkMode && styles.darkSecondaryText]}>
                Salvar conversas automaticamente
              </Text>
            </View>
            <Switch
              value={autoSave}
              onValueChange={setAutoSave}
              trackColor={{ false: "#767577", true: "#2196F3" }}
              thumbColor={autoSave ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Actions */}
        <View style={[styles.section, darkMode && styles.darkSection]}>
          <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
            <Text style={styles.saveButtonText}>Salvar Configurações</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.clearButton} onPress={clearData}>
            <Text style={styles.clearButtonText}>Limpar Todos os Dados</Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Sobre o App
          </Text>
          <Text style={[styles.infoText, darkMode && styles.darkSecondaryText]}>
            IA Assistant v1.0.0{'\n'}
            Desenvolvido para Android{'\n'}
            Suporte a chat inteligente e comandos de voz
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight || 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  darkHeader: {
    backgroundColor: '#1e1e1e',
  },
  backButton: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: '#ffffff',
  },
  darkSecondaryText: {
    color: '#b3b3b3',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 20,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  darkSection: {
    backgroundColor: '#1e1e1e',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  darkInput: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
    color: '#ffffff',
  },
  helpText: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});

