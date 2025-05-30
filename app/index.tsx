import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import analyzeSentiment, { SentimentAnalysis } from './services/sentimentAnalysis';

function EmofindUI() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      const result = await analyzeSentiment(text);
      setAnalysis(result);
    } catch (err: any) {
      console.log(err);
      setError('No se pudo analizar el texto. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
      {/* Logo */}
      <Image
        source={require('@/assets/images/grey-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* TextInput */}
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Ingrese su texto aquí para analizar su sentimiento…"
          multiline
          numberOfLines={5}
          style={styles.textInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={handleAnalyze}
        style={[styles.button, (!text || isLoading) && styles.buttonDisabled]}
        disabled={!text || isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Analizando...' : 'Analizar Sentimiento'}
        </Text>
      </TouchableOpacity>

      {/* Analysis Results */}
      {analysis && (
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>Resultado del Análisis</Text>
          
          <View style={styles.analysisCard}>
            <View style={styles.analysisSection}>
              <Text style={styles.analysisLabel}>Emoción detectada</Text>
              <Text style={styles.analysisValue}>{analysis.emotion}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.analysisSection}>
              <Text style={styles.analysisLabel}>Diagnóstico</Text>
              <Text style={styles.analysisValue}>{analysis.diagnosis}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.analysisSection}>
              <Text style={styles.analysisLabel}>Recomendación</Text>
              <Text style={styles.analysisValue}>{analysis.recommendation}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f7fa',
  },
  logo: {
    width: '100%',
    height: 80,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e1e4e8',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    minHeight: 120,
    color: '#2d3748',
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#4a90e2',
    marginBottom: 10,
    shadowColor: '#4a90e2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
    backgroundColor: '#a0aec0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  analysisContainer: {
    marginTop: 8,
  },
  analysisTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2d3748',
    textAlign: 'center',
  },
  analysisCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analysisSection: {
    marginBottom: 10,
  },
  analysisLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  analysisValue: {
    fontSize: 16,
    color: '#2d3748',
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 14,
  },
  errorContainer: {
    marginTop: 16,
    backgroundColor: '#fff5f5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#feb2b2',
  },
  errorText: {
    color: '#c53030',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default EmofindUI;
