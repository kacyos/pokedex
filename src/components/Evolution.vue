<template>
  <div class="evotution">
    <ul>
      <li class="evolution" v-for="node in mapTreeviewNodes" :key="node.id">
        <div>
          <img :src="node.imageUrl" alt="" />
          <span>{{ node.name }}</span>
        </div>

        <EvolutionView
          class="children"
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
    hasChildren: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    //this.treeviewNodes = this.mapTreeviewNodes(this.items);
  },
  computed: {
    mapTreeviewNodes() {
      console.log(this.hasChildren);
      return this.items;
      /* return this.items.map((item) => ({
        ...item,
        isExpanded: false,
        isSelected: false,
        children: item.children ? this.mapTreeviewNodes(item.children) : {},
      }));*/
    },
  },
};
</script>

<style scoped lang="scss">
.evolution {
  display: flex;
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  img {
    height: 50px;
  }
}
.children {
  margin-left: 40px;
  img {
    height: 70px;
    width: 70px;
  }
}
</style>
