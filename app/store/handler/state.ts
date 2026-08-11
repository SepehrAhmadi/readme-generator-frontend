import { ref } from "vue";

export function useHandlerState() {
  const loading = ref<boolean>(false);
  const loadingBtn = ref<boolean>(false);
  const postCheck = ref<boolean>(false);

  const checkAlert = ref<0 | 1 | 2>(0);
  const successMessage = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);

  return {
    loading,
    loadingBtn,
    postCheck,
    checkAlert,
    successMessage,
    errorMessage,
  };
}
