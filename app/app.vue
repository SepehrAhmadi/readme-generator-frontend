<template>
    <div class="container mx-auto py-16">
        <div class="flex flex-col justify-center items-center gap-10">
            <AppTitle />
            <FormInput />
            <div class="xl:w-[70%]">
                <MarkdownViewer
                    v-if="generatorStore.jobResult?.readme"
                    :content="generatorStore.jobResult.readme.content"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useGeneratorStore } from "~/store/generator";
const generatorStore = useGeneratorStore();
</script>
