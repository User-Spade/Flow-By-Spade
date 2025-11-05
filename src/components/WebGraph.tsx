import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Technique, Connection, TechniqueCategory } from '../types';
import Svg, { Line, Defs, Marker, Polygon } from 'react-native-svg';

interface WebGraphProps {
  techniques: Technique[];
  connections: Connection[];
  selectedTechnique: Technique | null;
  currentPath: Technique[];
  onSelectTechnique: (technique: Technique) => void;
}

const getCategoryColor = (category: TechniqueCategory) => {
  switch (category) {
    case TechniqueCategory.POSITION:
      return { bg: '#0ea5e9', border: '#38bdf8' };
    case TechniqueCategory.SUBMISSION:
      return { bg: '#ef4444', border: '#f87171' };
    case TechniqueCategory.SWEEP:
      return { bg: '#22c55e', border: '#4ade80' };
    case TechniqueCategory.ESCAPE:
      return { bg: '#eab308', border: '#facc15' };
    case TechniqueCategory.TRANSITION:
      return { bg: '#a855f7', border: '#c084fc' };
    default:
      return { bg: '#6b7280', border: '#9ca3af' };
  }
};

export const WebGraph: React.FC<WebGraphProps> = ({
  techniques,
  connections,
  selectedTechnique,
  currentPath,
  onSelectTechnique,
}) => {
  // Group techniques by position group
  const groups = techniques.reduce((acc, tech) => {
    if (!acc[tech.positionGroup]) {
      acc[tech.positionGroup] = [];
    }
    acc[tech.positionGroup].push(tech);
    return acc;
  }, {} as Record<string, Technique[]>);

  const pathIds = new Set(currentPath.map(p => p.id));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {Object.entries(groups).map(([groupName, groupTechs]) => (
        <View key={groupName} style={styles.group}>
          <Text style={styles.groupTitle}>{groupName}</Text>
          <View style={styles.groupContent}>
            {groupTechs.map((tech) => {
              const colors = getCategoryColor(tech.category);
              const isSelected = selectedTechnique?.id === tech.id;
              const isInPath = pathIds.has(tech.id);

              return (
                <TouchableOpacity
                  key={tech.id}
                  style={[
                    styles.techniqueNode,
                    { backgroundColor: colors.bg, borderColor: colors.border },
                    isSelected && styles.selectedNode,
                    isInPath && styles.pathNode,
                  ]}
                  onPress={() => onSelectTechnique(tech)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.techniqueName}>{tech.name}</Text>
                  <Text style={styles.techniqueCategory}>{tech.category}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
      
      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Categories:</Text>
        <View style={styles.legendItems}>
          {Object.values(TechniqueCategory).map((category) => {
            const colors = getCategoryColor(category);
            return (
              <View key={category} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendBox,
                    { backgroundColor: colors.bg, borderColor: colors.border },
                  ]}
                />
                <Text style={styles.legendText}>{category}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  contentContainer: {
    padding: 16,
  },
  group: {
    marginBottom: 32,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7dd3fc',
    marginBottom: 16,
    textAlign: 'center',
  },
  groupContent: {
    marginBottom: 16,
  },
  techniqueNode: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedNode: {
    borderWidth: 4,
    borderColor: '#22d3ee',
    transform: [{ scale: 1.05 }],
  },
  pathNode: {
    borderWidth: 4,
    borderColor: '#fbbf24',
  },
  techniqueName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  techniqueCategory: {
    fontSize: 12,
    color: '#e5e7eb',
    marginTop: 4,
    textAlign: 'center',
  },
  legend: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  legendItems: {
    marginTop: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: '#d1d5db',
  },
});
