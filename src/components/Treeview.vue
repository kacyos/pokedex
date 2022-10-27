<template>
  <div>
    <ul>
      <li v-for="node in treeviewNodes" :key="node.key">
        <span>{{ node.title }}</span>

        <TreeView
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
  name: "TreeView",
  props: {
    items: {
      type: Array,
      required: true,
    },
    isChild: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { treeviewNodes: [] };
  },
  created() {
    this.treeviewNodes = this.mapTreeviewNodes(this.items);
    console.log(this.treeviewNodes);
  },
  methods: {
    mapTreeviewNodes(items) {
      return items.map((item) => ({
        ...item,
        isExpanded: false,
        isSelected: false,
        children: item.children ? this.mapTreeviewNodes(item.children) : null,
      }));
    },
  },
};
</script>

<style></style>
