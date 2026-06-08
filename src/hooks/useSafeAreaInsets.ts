import { SafeAreaInsets } from '@apps-in-toss/web-framework';
import { useEffect, useState } from 'react';

export type SafeAreaInsetValues = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

const DEFAULT_INSETS: SafeAreaInsetValues = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

function readInsets(): SafeAreaInsetValues {
  try {
    return SafeAreaInsets.get();
  } catch {
    return DEFAULT_INSETS;
  }
}

export function useSafeAreaInsets() {
  const [insets, setInsets] = useState<SafeAreaInsetValues>(readInsets);

  useEffect(() => {
    try {
      return SafeAreaInsets.subscribe({ onEvent: setInsets });
    } catch {
      return undefined;
    }
  }, []);

  return insets;
}
