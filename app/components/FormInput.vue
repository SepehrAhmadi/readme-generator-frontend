```vue
<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useHandlerStore } from "~/store/handler";
const handlerStore = useHandlerStore();
const { postCheck } = storeToRefs(handlerStore);

import { useGeneratorStore } from "~/store/generator";
const generatorStore = useGeneratorStore();
const { repositoryResult } = storeToRefs(generatorStore);

const placeholder = ref<string>("GitHub public repo URL");
const buttonText = ref<string>("Submit");

const githubUrl = ref<string>("");
const isValidUrl = ref<boolean>(false);

const hasChecked = ref<boolean>(false);

const isChecking = ref<boolean>(false);

const validateGithubUrl = (url: string = githubUrl.value): boolean => {
    isValidUrl.value =
        /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(
            url.trim(),
        );

    return isValidUrl.value;
};

watch(githubUrl, (newValue) => {
    validateGithubUrl(newValue);

    hasChecked.value = false;
    handlerStore.errorMessage = "";
    buttonText.value = "Submit";
});

watch(repositoryResult, (newValue) => {
    if (newValue) {
        buttonText.value = "Generate";
    } else if (hasChecked.value) {
        buttonText.value = "Submit";
    }
});

const handleSubmit = async () => {
    if (repositoryResult.value) {
        generatorStore.startGeneration(repositoryResult.value.id);
        return;
    }

    if (!githubUrl.value || !isValidUrl.value) {
        handlerStore.errorMessage = "Please enter a valid GitHub URL.";
        hasChecked.value = true;
        return;
    }

    isChecking.value = true;
    hasChecked.value = false;
    handlerStore.errorMessage = "";

    try {
        await generatorStore.createOrUpdateRepository(githubUrl.value);
        hasChecked.value = true;
    } catch (error) {
        hasChecked.value = true;
    } finally {
        isChecking.value = false;
    }
};
</script>

<template>
    <div class="xl:w-[40%] flex justify-center items-center gap-4">
        <div class="flex-1">
            <div class="relative flex items-center">
                <Input
                    v-model="githubUrl"
                    :placeholder="placeholder"
                    :class="[
                        'flex-1 pr-10 focus-visible:ring-3 focus-visible:shadow-sm',
                        isValidUrl
                            ? 'border-teal-500/70 focus-visible:border-teal-500 focus-visible:ring-teal-500/50'
                            : '',
                        !isValidUrl && githubUrl
                            ? 'border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/50'
                            : '',
                    ]"
                />

                <Transition
                    enter-active-class="transition duration-300 ease-out"
                    enter-from-class="opacity-0 scale-50"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-50"
                >
                    <span
                        v-if="hasChecked && repositoryResult?.id"
                        class="pointer-events-none absolute right-3 flex items-center justify-center text-[20px] text-teal-500"
                        aria-hidden="true"
                    >
                        <icon-check />
                    </span>
                    <span
                        v-else-if="hasChecked && !repositoryResult"
                        class="pointer-events-none absolute right-3 flex items-center justify-center text-[20px] text-red-500"
                        aria-hidden="true"
                    >
                        <icon-close />
                    </span>
                </Transition>
            </div>

            <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-2"
            >
                <p
                    v-if="handlerStore.errorMessage"
                    class="text-red-600 text-[12px] mt-1"
                >
                    {{ handlerStore.errorMessage }}
                </p>
            </Transition>
        </div>

        <Button
            type="button"
            class="w-30 bg-teal-500 hover:bg-teal-400 cursor-pointer"
            :disabled="!isValidUrl || isChecking"
            @click="handleSubmit"
        >
            <span v-if="isChecking">
                Checking...
            </span>

            <span v-else>
                {{ buttonText }}
            </span>
        </Button>
    </div>

    <div class="flex justify-center items-center gap-4">
    </div>
</template>

