import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Webs by Spade</Text>
        <Text style={styles.subtitle}>Your fresh start begins here</Text>
        
        <View style={styles.info}>
          <Text style={styles.infoText}>✨ Clean slate ready for your ideas</Text>
          <Text style={styles.infoText}>📱 iOS & Android compatible</Text>
          <Text style={styles.infoText}>🚀 Expo powered</Text>
          <Text style={styles.infoText}>🔧 TypeScript enabled</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 40,
  },
  info: {
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 12,
    textAlign: 'left',
  },
});
