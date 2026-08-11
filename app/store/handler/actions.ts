import type { useHandlerState } from "./state";

type StateType = ReturnType<typeof useHandlerState>;

export function useHandlerActions(state: StateType) {
  const setSuccess = (message: string) => {
    state.checkAlert.value = 1;
    state.successMessage.value = message;
    state.errorMessage.value = null;
  };

  const setError = (message: string) => {
    state.checkAlert.value = 2;
    state.errorMessage.value = message;
    state.successMessage.value = null;
  };

  const clearMessages = () => {
    state.checkAlert.value = 0;
    state.successMessage.value = null;
    state.errorMessage.value = null;
  };

  return {
    setSuccess,
    setError,
    clearMessages,
  };
}
