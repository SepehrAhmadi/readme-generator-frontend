<script setup lang="ts">
import shiki from "@comark/nuxt/plugins/shiki";
import githubDark from "@shikijs/themes/github-dark";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const props = defineProps<{
    content: string;
}>();

// dark-only, matches the app's forced dark mode — no light theme needed
const plugins = [shiki({ themes: { dark: githubDark } })];

const isPreview = ref(true);
const copied = ref(false);
let copyTimeout: ReturnType<typeof setTimeout> | null = null;

const modeLabel = computed(() => (isPreview.value ? "Preview" : "Source"));

const copyContent = async () => {
    try {
        await navigator.clipboard.writeText(props.content);
        copied.value = true;
        if (copyTimeout) clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => {
            copied.value = false;
            copyTimeout = null;
        }, 1500);
    } catch {
        // Clipboard may be unavailable (permissions / non-secure context)
    }
};

const downloadContent = () => {
    const blob = new Blob([props.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "README.md";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
};

onBeforeUnmount(() => {
    if (copyTimeout) clearTimeout(copyTimeout);
});
</script>

<template>
    <div
        class="bg-card text-card-foreground w-full rounded-lg border shadow-sm"
    >
        <div class="flex items-center justify-between gap-4 border-b px-4 py-3">
            <div class="flex items-center gap-2">
                <Switch
                    v-model="isPreview"
                    aria-label="Toggle between Preview and Source"
                />
                <span class="text-muted-foreground text-sm select-none">
                    {{ modeLabel }}
                </span>
            </div>

            <div class="flex items-center gap-1">
                <Button
                    type="button"
                    variant="ghost"
                    class="cursor-pointer"
                    :aria-label="copied ? 'Copied' : 'Copy markdown'"
                    @click="copyContent"
                >
                    <icon-check v-if="copied" class="text-xl" />
                    <icon-copy v-else class="text-xl" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Download README.md"
                    @click="downloadContent"
                >
                    <icon-download class="text-xl" />
                </Button>
            </div>
        </div>

        <div class="relative min-h-[12rem] p-4">
            <Transition
                mode="out-in"
                enter-active-class="transition-opacity duration-150 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-150 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="isPreview"
                    key="preview"
                    class="prose prose-invert max-w-none"
                >
                    <Markdown
                        :plugins="plugins"
                        :options="{ autoUnwrap: true, autoClose: true }"
                        >{{ content }}</Markdown
                    >
                </div>

                <pre
                    v-else
                    key="source"
                    class="overflow-y-auto rounded-md p-4 font-mono text-sm leading-relaxed break-words"
                ><code>{{ content }}</code></pre>
            </Transition>
        </div>
    </div>
</template>
