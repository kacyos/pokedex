<template>
  <div class="evotution">
    <ul>
      <li
        class="flex items-center justify-center gap-2"
        v-for="node in items"
        :key="node.id"
      >
        <div>
          <img
            class="h-14 w-14 md:h-20 md:w-20 mx-auto"
            :src="node.imageUrl"
            :alt="node.name"
          />
          <span class="flex justify-center font-semibold">{{ node.name }}</span>
        </div>

        <div v-if="node.children.length">
          <mdicon name="arrow-right" size="16" />
        </div>

        <EvolutionView
          class="flex children"
          v-if="node.children"
          :items="node.children"
          :is-child="true"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EvolutionView",
  data() {
    return { treeviewNodes: [] };
  },
  props: {
    items: {
      type: Array,
    },
  },
};
</script>
