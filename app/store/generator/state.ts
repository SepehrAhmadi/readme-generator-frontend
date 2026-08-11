import { ref } from "vue";

export function useGeneratorState() {
  const repositoryResult = ref<any | null>(null);
  const jobResult = ref<any | null>(null);

  return { repositoryResult, jobResult };
}
