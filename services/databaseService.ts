/**
 * BJJ Database Service
 * 
 * Provides methods to query and access the BJJ technique database.
 * Handles loading, filtering, and transforming database content for the UI.
 */

import { BJJDatabase, Position, Technique, BeltLevel, FoundationMappingIndex, FoundationCategory } from '../data/types/database.types';
import databaseJson from '../data/bjj-database.json';

class DatabaseService {
  private database: BJJDatabase;
  private foundationMapping: FoundationMappingIndex | null = null;

  constructor() {
    this.database = databaseJson as BJJDatabase;
    try {
      // Foundation mapping is now embedded in the database file
      this.foundationMapping = (this.database as any).foundation_mapping || null;
    } catch (e) {
      this.foundationMapping = null;
    }
  }

  /**
   * Get all positions available at or below a specific belt level
   */
  getPositionsByBelt(beltLevel: BeltLevel | null = null): Record<string, Position> {
    if (!beltLevel) {
      return this.database.positions;
    }

    const beltOrder: BeltLevel[] = ['white', 'blue', 'purple', 'brown', 'black'];
    const maxBeltIndex = beltOrder.indexOf(beltLevel);

    const filtered: Record<string, Position> = {};
    
    Object.entries(this.database.positions).forEach(([key, position]) => {
      const positionBeltIndex = beltOrder.indexOf(position.system.min_belt);
      if (positionBeltIndex <= maxBeltIndex) {
        filtered[key] = position;
      }
    });

    return filtered;
  }

  /**
   * FOUNDATION LAYER METHODS
   */
  getFoundations(): { id: FoundationCategory; rank: number; display: string }[] {
    const displayNames: Record<FoundationCategory, string> = {
      rear_mount_top: 'Rear Mount (Top)',
      full_mount_top: 'Full Mount (Top)',
      side_control_top: 'Side Control (Top)',
      knee_on_belly_top: 'Knee-On-Belly (Top)',
      turtle_top: 'Turtle (Top)',
      guard_top: 'Guard (Top)',
      neutral: 'Neutral',
      guard_bottom: 'Guard (Bottom)',
      turtle_bottom: 'Turtle (Bottom)',
      knee_on_belly_bottom: 'Knee-On-Belly (Bottom)',
      side_control_bottom: 'Side Control (Bottom)',
      full_mount_bottom: 'Full Mount (Bottom)',
      rear_mount_bottom: 'Rear Mount (Bottom)'
    };
    if (!this.foundationMapping) return Object.entries(displayNames).map(([id, display], idx) => ({ id: id as FoundationCategory, rank: idx + 1, display }));
    // Gather ranks from mapping (min per foundation)
    const rankMap: Record<string, number> = {};
    Object.values(this.foundationMapping.foundations).forEach(entry => {
      if (rankMap[entry.foundation] == null || entry.rank < rankMap[entry.foundation]) {
        rankMap[entry.foundation] = entry.rank;
      }
    });
    return (Object.keys(displayNames) as FoundationCategory[])
      .map(id => ({ id, rank: rankMap[id] ?? 999, display: displayNames[id] }))
      .sort((a, b) => a.rank - b.rank);
  }

  getFoundationForPosition(positionId: string): FoundationCategory | null {
    if (!this.foundationMapping) return null;
    const entry = this.foundationMapping.foundations[positionId];
    return entry ? entry.foundation : null;
  }

  getPositionsByFoundationAndBelt(foundation: FoundationCategory, beltLevel: BeltLevel | null = null): Record<string, Position> {
    const positionsByBelt = this.getPositionsByBelt(beltLevel);
    const result: Record<string, Position> = {};
    if (!this.foundationMapping) return result;
    Object.entries(positionsByBelt).forEach(([id, pos]) => {
      const entry = this.foundationMapping!.foundations[id];
      if (entry && entry.foundation === foundation) {
        result[id] = pos;
      }
    });
    return result;
  }

  /**
   * Get a single position by ID
   */
  getPosition(positionId: string): Position | null {
    return this.database.positions[positionId] || null;
  }

  /**
   * Get all positions by category
   */
  getPositionsByCategory(category: string, beltLevel: BeltLevel | null = null): Record<string, Position> {
    const positions = this.getPositionsByBelt(beltLevel);
    const filtered: Record<string, Position> = {};

    Object.entries(positions).forEach(([key, position]) => {
      if (position.system.category === category) {
        filtered[key] = position;
      }
    });

    return filtered;
  }

  /**
   * Get all techniques for a specific position
   */
  getTechniquesForPosition(positionId: string, beltLevel: BeltLevel | null = null): Technique[] {
    const position = this.getPosition(positionId);
    if (!position) return [];

    if (!beltLevel) {
      return position.techniques;
    }

    const beltOrder: BeltLevel[] = ['white', 'blue', 'purple', 'brown', 'black'];
    const maxBeltIndex = beltOrder.indexOf(beltLevel);

    return position.techniques.filter(technique => {
      const techniqueBeltIndex = beltOrder.indexOf(technique.min_belt);
      return techniqueBeltIndex <= maxBeltIndex;
    });
  }

  /**
   * Get all global techniques that start from a given position (belt-agnostic)
   * Falls back to the top-level techniques collection in the DB.
   */
  getOutgoingTechniques(positionId: string): any[] {
    const root = (this.database as any).techniques;
    if (!root || typeof root !== 'object') return [];

    const buckets = Object.values(root) as any[];
    const flat = buckets.flatMap((bucket: any) => (Array.isArray(bucket) ? bucket : []));

    return flat.filter((t: any) => {
      if (!t) return false;
      const fromMatch = t.fromPositionId === positionId;
      const hasLabel = typeof t.label === 'string' && t.label.trim().length > 0;
      const hasId = typeof t.id === 'string' && t.id.trim().length > 0;
      return fromMatch && (hasLabel || hasId);
    });
  }

  /**
   * Search positions by name or description
   */
  searchPositions(query: string): Record<string, Position> {
    const lowercaseQuery = query.toLowerCase();
    const results: Record<string, Position> = {};

    Object.entries(this.database.positions).forEach(([key, position]) => {
      const matchesName = position.learning.display_name.toLowerCase().includes(lowercaseQuery);
      const matchesAltName = position.learning.alternate_names.some(name => 
        name.toLowerCase().includes(lowercaseQuery)
      );
      const matchesDescription = position.learning.description.toLowerCase().includes(lowercaseQuery);

      if (matchesName || matchesAltName || matchesDescription) {
        results[key] = position;
      }
    });

    return results;
  }

  /**
   * Get belt-specific content for a position
   */
  getPositionBeltContent(positionId: string, beltLevel: BeltLevel) {
    const position = this.getPosition(positionId);
    if (!position) return null;

    return position.belt_levels[beltLevel];
  }

  /**
   * Get all unique categories
   */
  getCategories(): string[] {
    const categories = new Set<string>();
    Object.values(this.database.positions).forEach(position => {
      categories.add(position.system.category);
    });
    return Array.from(categories).sort();
  }

  /**
   * Get positions that can be transitioned to from a given position
   */
  getTransitionsFrom(positionId: string): Position[] {
    const position = this.getPosition(positionId);
    if (!position) return [];

    return position.system.leads_to_position_ids
      .map(id => this.getPosition(id))
      .filter((p): p is Position => p !== null);
  }

  /**
   * Get positions that can transition into the given position
   */
  getTransitionsTo(positionId: string): Position[] {
    const position = this.getPosition(positionId);
    if (!position) return [];

    return position.system.entry_from_position_ids
      .map(id => this.getPosition(id))
      .filter((p): p is Position => p !== null);
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
export default databaseService;
