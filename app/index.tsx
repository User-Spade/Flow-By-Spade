import React, { useState, useCallback } from 'react';
import {
  View as RNView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TECHNIQUES, CONNECTIONS } from '../src/constants';
import { Technique, BeltRank, AISuggestion } from '../src/types';
import { WebGraph } from '../src/components/WebGraph';
import { AIPanel } from '../src/components/AIPanel';
import { suggestMoves, analyzePath } from '../src/services/geminiService';
import { MapIcon, BookOpenIcon, BrainIcon } from '../src/components/IconComponents';

type View = 'web' | 'library';

const TechniqueLibrary = ({
  techniques,
  onSelectTechnique,
}: {
  techniques: Technique[];
  onSelectTechnique: (technique: Technique) => void;
}) => (
  <ScrollView style={styles.library} contentContainerStyle={styles.libraryContent}>
    <Text style={styles.libraryTitle}>Technique Library</Text>
    {techniques.map((tech) => (
      <TouchableOpacity
        key={tech.id}
        onPress={() => onSelectTechnique(tech)}
        style={styles.libraryCard}
        activeOpacity={0.7}
      >
        <Text style={styles.libraryCardName}>{tech.name}</Text>
        <Text style={styles.libraryCardCategory}>{tech.category}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default function Index() {
  const [activeView, setActiveView] = useState<View>('web');
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [currentPath, setCurrentPath] = useState<Technique[]>([]);
  const [beltRank, setBeltRank] = useState<BeltRank>(BeltRank.WHITE);

  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  const [aiError, setAIError] = useState<string | null>(null);

  const handleSelectTechnique = useCallback((technique: Technique) => {
    setSelectedTechnique(technique);
    setSuggestions([]);
    setAnalysis('');
  }, []);

  const handleCloseAIPanel = useCallback(() => {
    setSelectedTechnique(null);
  }, []);

  const handleAddToPath = useCallback(
    (technique: Technique) => {
      if (!currentPath.some((t) => t.id === technique.id)) {
        setCurrentPath((prevPath) => [...prevPath, technique]);
      }
    },
    [currentPath]
  );

  const handleClearPath = useCallback(() => {
    setCurrentPath([]);
  }, []);

  const handleGetSuggestions = useCallback(async (technique: Technique, rank: BeltRank) => {
    setIsAILoading(true);
    setAIError(null);
    setAnalysis('');
    try {
      const result = await suggestMoves(technique, rank);
      setSuggestions(result);
    } catch (e: any) {
      setAIError(e.message || 'An unknown error occurred.');
      setSuggestions([]);
    } finally {
      setIsAILoading(false);
    }
  }, []);

  const handleAnalyzePath = useCallback(async (path: Technique[], rank: BeltRank) => {
    setIsAILoading(true);
    setAIError(null);
    setSuggestions([]);
    try {
      const result = await analyzePath(path, rank);
      setAnalysis(result || '');
    } catch (e: any) {
      setAIError(e.message || 'An unknown error occurred.');
      setAnalysis('');
    } finally {
      setIsAILoading(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <RNView style={styles.header}>
        <RNView style={styles.headerTitle}>
          <BrainIcon size={32} color="#22d3ee" />
          <Text style={[styles.headerText, { marginLeft: 8 }]}>Webs by Spade</Text>
        </RNView>
        <RNView style={styles.nav}>
          <TouchableOpacity
            onPress={() => setActiveView('web')}
            style={[styles.navButton, activeView === 'web' && styles.navButtonActive]}
            activeOpacity={0.7}
          >
            <MapIcon size={16} color={activeView === 'web' ? '#fff' : '#d1d5db'} />
            <Text
              style={[
                styles.navButtonText,
                activeView === 'web' && styles.navButtonTextActive,
                { marginLeft: 8 },
              ]}
            >
              Web
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveView('library')}
            style={[styles.navButton, activeView === 'library' && styles.navButtonActive]}
            activeOpacity={0.7}
          >
            <BookOpenIcon size={16} color={activeView === 'library' ? '#fff' : '#d1d5db'} />
            <Text
              style={[
                styles.navButtonText,
                activeView === 'library' && styles.navButtonTextActive,
                { marginLeft: 8 },
              ]}
            >
              Library
            </Text>
          </TouchableOpacity>
        </RNView>
      </RNView>

      {/* Main Content */}
      <RNView style={styles.main}>
        {activeView === 'web' ? (
          <WebGraph
            techniques={TECHNIQUES}
            connections={CONNECTIONS}
            selectedTechnique={selectedTechnique}
            currentPath={currentPath}
            onSelectTechnique={handleSelectTechnique}
          />
        ) : (
          <TechniqueLibrary techniques={TECHNIQUES} onSelectTechnique={handleSelectTechnique} />
        )}
      </RNView>

      {/* AI Panel Modal */}
      <Modal
        visible={selectedTechnique !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseAIPanel}
      >
        <AIPanel
          selectedTechnique={selectedTechnique}
          currentPath={currentPath}
          beltRank={beltRank}
          suggestions={suggestions}
          analysis={analysis}
          isLoading={isAILoading}
          error={aiError}
          onClose={handleCloseAIPanel}
          onAddToPath={handleAddToPath}
          onGetSuggestions={handleGetSuggestions}
          onAnalyzePath={handleAnalyzePath}
          onSetBeltRank={setBeltRank}
          onClearPath={handleClearPath}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  nav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    borderRadius: 8,
    padding: 4,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  navButtonActive: {
    backgroundColor: '#0891b2',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d1d5db',
  },
  navButtonTextActive: {
    color: '#fff',
  },
  main: {
    flex: 1,
  },
  library: {
    flex: 1,
    padding: 16,
  },
  libraryContent: {
    paddingBottom: 16,
  },
  libraryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  libraryCard: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  libraryCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22d3ee',
  },
  libraryCardCategory: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
});
