import { useCallback, type KeyboardEvent } from 'react';

type UseAdvanceOnKeyboardOptions = {
  /** 단일 입력 필드에서 Tab으로도 다음 단계 진행 */
  advanceOnTab?: boolean;
};

/**
 * Enter(및 선택 시 Tab)로 확인 버튼 없이 다음 단계로 진행
 */
export function useAdvanceOnEnter(
  isValid: boolean,
  onAdvance: () => void,
  { advanceOnTab = false }: UseAdvanceOnKeyboardOptions = {},
) {
  return useCallback(
    (event: KeyboardEvent) => {
      const isEnter = event.key === 'Enter';
      const isTab = event.key === 'Tab' && advanceOnTab && !event.shiftKey;

      if ((!isEnter && !isTab) || !isValid) {
        return;
      }

      event.preventDefault();
      onAdvance();
    },
    [isValid, onAdvance, advanceOnTab],
  );
}
