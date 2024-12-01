<template>
  <div class="bg-[#1A1A1A] rounded-lg mb-6">
    <div class="flex space-x-1 p-2">
      <router-link
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="[
          $route.path === item.path
            ? 'bg-[#E5FB3C] text-black'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'
        ]"
      >
        <i v-if="item.icon" :class="['pi', item.icon, 'mr-2']"></i>
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NavItem {
  name: string;
  path: string;
  icon?: string;
}

defineProps<{
  items: NavItem[];
}>();
</script>