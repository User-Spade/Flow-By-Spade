import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Technique, BeltRank, AISuggestion } from '../types';
import { BrainIcon, XIcon, PlusIcon, TrashIcon } from './IconComponents';
import { BELT_RANKS } from '../constants';
import { Picker } from '@react-native-picker/picker';

interface AIPanelProps {
  selectedTechnique: Technique | null;
  currentPath: Technique[];
  beltRank: BeltRank;
  suggestions: AISuggestion[];
  analysis: string;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onAddToPath: (technique: Technique) => void;
  onGetSuggestions: (technique: Technique, beltRank: BeltRank) => void;
  onAnalyzePath: (path: Technique[], beltRank: BeltRank) => void;
  onSetBeltRank: (beltRank: BeltRank) => void;
  onClearPath: () => void;
}

export const AIPanel: React.FC<AIPanelProps> = ({
  selectedTechnique,
  currentPath,
  beltRank,
  suggestions,
  analysis,
  isLoading,
  error,
  onClose,
  onAddToPath,
  onGetSuggestions,
  onAnalyzePath,
  onSetBeltRank,
  onClearPath,
}) => {
  if (!selectedTechnique) return null;

  const isTechniqueInPath = currentPath.some(t => t.id === selectedTechnique.id);
  const showPathAnalysis = currentPath.length > 0 && analysis;
  const showSuggestions = suggestions.length > 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <BrainIcon size={24} color="#22d3ee" />
          <Text style={styles.headerText}>AI Assistant</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <XIcon size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Selected Technique */}
        <View style={styles.techniqueCard}>
          <Text style={styles.techniqueName}>{selectedTechnique.name}</Text>
          <Text style={styles.techniqueDescription}>{selectedTechnique.description}</Text>
          {!isTechniqueInPath && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onAddToPath(selectedTechnique)}
            >
              <PlusIcon size={16} color="#fff" />
              <Text style={styles.addButtonText}>Add to Current Path</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Belt Rank Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Your Belt Rank</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={beltRank}
              onValueChange={(value: string) => onSetBeltRank(value as BeltRank)}
              style={styles.pickerInput}
            >
              {BELT_RANKS.map(rank => (
                <Picker.Item key={rank} label={rank} value={rank} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.suggestButton, !selectedTechnique && styles.buttonDisabled]}
            onPress={() => selectedTechnique && onGetSuggestions(selectedTechnique, beltRank)}
            disabled={!selectedTechnique || isLoading}
          >
            <Text style={styles.buttonText}>Suggest Next Moves</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.analyzeButton, currentPath.length < 2 && styles.buttonDisabled]}
            onPress={() => onAnalyzePath(currentPath, beltRank)}
            disabled={currentPath.length < 2 || isLoading}
          >
            <Text style={styles.buttonText}>Analyze Current Path</Text>
          </TouchableOpacity>
        </View>

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#22d3ee" />
          </View>
        )}

        {/* Error */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Suggestions */}
        {showSuggestions && !showPathAnalysis && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Suggested Moves:</Text>
            {suggestions.map((s, i) => (
              <View key={i} style={styles.suggestionCard}>
                <Text style={styles.suggestionName}>{s.name}</Text>
                <Text style={styles.suggestionReasoning}>{s.reasoning}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Path Analysis */}
        {showPathAnalysis && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Path Analysis:</Text>
            <View style={styles.analysisCard}>
              <Text style={styles.analysisText}>{analysis}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Current Path Footer */}
      {currentPath.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.footerHeader}>
            <Text style={styles.footerTitle}>Current Path</Text>
            <TouchableOpacity onPress={onClearPath} style={styles.clearButton}>
              <TrashIcon size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          <Text style={styles.pathText}>
            {currentPath.map(t => t.name).join(' → ')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(31, 41, 55, 0.95)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  techniqueCard: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  techniqueName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#67e8f9',
  },
  techniqueDescription: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d1d5db',
    marginBottom: 4,
  },
  picker: {
    backgroundColor: '#374151',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  pickerInput: {
    color: '#fff',
  },
  actionButtons: {
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  suggestButton: {
    backgroundColor: '#0891b2',
  },
  analyzeButton: {
    backgroundColor: '#7c3aed',
  },
  buttonDisabled: {
    backgroundColor: '#4b5563',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: 'rgba(127, 29, 29, 0.5)',
    borderWidth: 1,
    borderColor: '#991b1b',
    borderRadius: 6,
    padding: 12,
    marginTop: 16,
  },
  errorText: {
    color: '#fca5a5',
  },
  resultsContainer: {
    marginTop: 24,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  suggestionCard: {
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22d3ee',
  },
  suggestionReasoning: {
    fontSize: 14,
    color: '#d1d5db',
    marginTop: 4,
  },
  analysisCard: {
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    borderRadius: 6,
    padding: 12,
  },
  analysisText: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
  },
  footerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  clearButton: {
    padding: 4,
  },
  pathText: {
    fontSize: 12,
    color: '#fbbf24',
    fontFamily: 'monospace',
  },
});
