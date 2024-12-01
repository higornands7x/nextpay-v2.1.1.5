<template>
  <div class="bg-[#1A1A1A] p-4 rounded-lg">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <i :class="['pi', icon, 'text-gray-400 mr-2']"></i>
        <span class="text-sm text-gray-400">{{ label }}</span>
      </div>
      <span class="text-sm text-white">{{ value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  icon: string
}>()
</script>