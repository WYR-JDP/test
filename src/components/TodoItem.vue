<script lang="ts" setup>
    defineProps<{item:any}>()
    const emit=defineEmits<{remove:[id:number]}>()
</script>

<template>
    <li>
      <input type="checkbox" v-model="item.checked"/>
      <span>{{item.text}}</span>
      <button @click="emit('remove',item.id)">删除</button>
    </li>
</template>
<style scoped>
  

  li {
    display:flex;
    align-items:center;
    gap:10px;
    padding:10px 0;
    border-bottom:1px solid #d2e7ba;
  }

  li input[type="checkbox"] {
    flex-shrink:0;
    /* 防止复选框被压缩 */
  }

  li span {
    flex:1;
  }

  li button {
    flex-shrink:0;
    min-width:60px;

  }
</style>