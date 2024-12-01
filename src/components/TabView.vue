<template>
  <div class="bg-[#1A1A1A] rounded-lg overflow-hidden">
    <!-- Cabeçalho das Abas -->
    <div class="border-b border-gray-700">
      <div class="flex space-x-1 p-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="setActiveTab(tab.id)"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="[
            activeTab === tab.id
              ? 'bg-[#E5FB3C] text-black'
              : 'text-gray-400 hover:text-white hover:bg-[#2A2A2A]'
          ]"
        >
          <i v-if="tab.icon" :class="['pi', tab.icon, 'mr-2']"></i>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Conteúdo da Aba -->
    <div class="p-6">
      <slot :name="activeTab"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  id: string
  label: string
  icon?: string
}

const props = defineProps<{
  tabs: Tab[]
  initialTab?: string
}>()

const emit = defineEmits<{
  'update:tab': [value: string]
}>()

const activeTab = ref(props.initialTab || props.tabs[0].id)

function setActiveTab(tabId: string) {
  activeTab.value = tabId
  emit('update:tab', tabId)
}
</script>