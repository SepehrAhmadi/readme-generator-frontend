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

watch(repositoryResult, (newValue) => {
    if (newValue) {
        buttonText.value = "Generate";
    } else {
        buttonText.value = "Submit";
    }
});

const handleSubmit = () => {
    if (repositoryResult.value) {
        generatorStore.startGeneration(repositoryResult.value.id);
    } else {
        if (githubUrl.value) {
            generatorStore.createOrUpdateRepository(githubUrl.value);
        } else {
            handlerStore.errorMessage = "Please enter a valid GitHub URL.";
        }
    }
};
</script>

<template>
    <div class="xl:w-[40%] flex justify-center items-center gap-4">
        <div class="flex-1">
            <Input
                v-model="githubUrl"
                :placeholder="placeholder"
                class="flex-1"
            />
            <p class="text-red-600 text-[12px]">
                {{ handlerStore.errorMessage }}
            </p>
        </div>
        <Button
            type="button"
            class="w-30 bg-teal-500 hover:bg-teal-400 cursor-pointer"
            @click="handleSubmit()"
            >{{ buttonText }}</Button
        >
    </div>
</template>
