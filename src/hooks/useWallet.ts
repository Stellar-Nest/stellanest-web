'use client';

import { useState, useEffect, useCallback } from 'react';

interface WalletState {
  isConnected: boolean;
  publicKey: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    publicKey: null,
    isLoading: false,
    error: null,
  });

  // Check if Freighter is installed
  const isFreighterAvailable = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return !!(window as any).freighter;
  }, []);

  // Check existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (!isFreighterAvailable()) return;

      try {
        const { isConnected, publicKey } = await import('@stellar/freighter-api').then(
          (mod) => mod.isConnected()
        );
        if (isConnected && publicKey) {
          setState({ isConnected: true, publicKey, isLoading: false, error: null });
        }
      } catch {
        // Freighter not connected yet
      }
    };
    checkConnection();
  }, [isFreighterAvailable]);

  const connect = useCallback(async () => {
    if (!isFreighterAvailable()) {
      setState((prev) => ({
        ...prev,
        error: 'Freighter wallet not installed. Visit freighter.app to install.',
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const { requestAccess } = await import('@stellar/freighter-api');
      const { publicKey, error } = await requestAccess();

      if (error) {
        setState({ isConnected: false, publicKey: null, isLoading: false, error });
        return;
      }

      if (publicKey) {
        setState({ isConnected: true, publicKey, isLoading: false, error: null });
      }
    } catch (err) {
      setState({
        isConnected: false,
        publicKey: null,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to connect wallet',
      });
    }
  }, [isFreighterAvailable]);

  const disconnect = useCallback(() => {
    setState({ isConnected: false, publicKey: null, isLoading: false, error: null });
  }, []);

  return {
    ...state,
    connect,
    disconnect,
    isFreighterAvailable: isFreighterAvailable(),
  };
}
