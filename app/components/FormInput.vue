<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const placeholder = "GitHub public repo URL";
const buttonText = "Generate";
</script>

<template>
    <div class="xl:w-[40%] flex justify-center items-center gap-4">
        <Input  :placeholder="placeholder" class="flex-1" />
        <Button type="button" class="w-30 bg-teal-500" >{{ buttonText }}</Button>
    </div>
</template>
