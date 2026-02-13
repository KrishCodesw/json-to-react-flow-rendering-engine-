import { useState, useCallback } from 'react';
import type { Node, Edge } from '@xyflow/react';

type State = { nodes: Node[]; edges: Edge[] };

export function useUndoRedo(initialState: State) {
  const [history, setHistory] = useState<State[]>([initialState]);
  const [index, setIndex] = useState(0);

  const takeSnapshot = useCallback((nodes: Node[], edges: Edge[]) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, index + 1);
      // Create deep copies to prevent reference issues
      return [...newHistory, { 
        nodes: JSON.parse(JSON.stringify(nodes)), 
        edges: JSON.parse(JSON.stringify(edges)) 
      }];
    });
    setIndex((prev) => prev + 1);
  }, [index]);

  const undo = useCallback(() => {
    return index > 0 ? history[index - 1] : null;
  }, [index, history]);

  const redo = useCallback(() => {
    return index < history.length - 1 ? history[index + 1] : null;
  }, [index, history]);

  const jump = useCallback((direction: 'undo' | 'redo') => {
    setIndex((prev) => (direction === 'undo' ? prev - 1 : prev + 1));
  }, []);

  return {
    takeSnapshot,
    undo,
    redo,
    jump,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
  };
}