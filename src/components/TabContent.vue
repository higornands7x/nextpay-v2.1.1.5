<template>
  <div 
    class="transition-opacity duration-200"
    :class="{ 'opacity-0': !isActive, 'opacity-100': isActive }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isActive: boolean
}>()
</script>