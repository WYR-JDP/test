<script lang="ts" setup>
  defineProps<{modelValue:number}>()
  const emit=defineEmits<{'update:modelValue':[value:number]}>()

  const filters=[
    {label:'全部',value:0},
    {label:'已完成',value:1},
    {label:'未完成',value:2},
  ]
</script>

<template>
 <div>
    <!-- <button
    @click="emit('update:modelValue',0)"
    :class="{active:modelValue===0}"
    >全部</button>
    <button
    @click="emit('update:modelValue',1)"
    :class="{active:modelValue===1}"
    >已完成</button>
    <button
    @click="emit('update:modelValue',2)"
    :class="{active:modelValue===2}"
    >未完成</button> -->

    <button v-for="filter in filters" :key="filter.value"
    @click="emit('update:modelValue',filter.value)"
    :class="{active:modelValue===filter.value}"
    >
        {{ filter.label }}
    </button>
  </div>
</template>
<style scope>
    .active {
        background-color:#0c21e0;
        color:white
    }
</style>