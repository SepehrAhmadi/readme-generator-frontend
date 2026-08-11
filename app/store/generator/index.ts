import { defineStore } from "pinia";
import { useGeneratorState } from "./state";
import { useGeneratorActions } from "./actions";

export const useGeneratorStore = defineStore("generatorStore", () => {
  const state = useGeneratorState();
  const actions = useGeneratorActions(state);

  return {
    ...state,
    ...actions,
  };
});
