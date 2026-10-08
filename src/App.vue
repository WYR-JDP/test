<script lang="ts" setup>
  import type {Item} from '@/components/types'
  import TodoInput from '@/components/TodoInput.vue'
  import TodoFilter from '@/components/TodoFilter.vue'
  import TodoItem from '@/components/TodoItem.vue'
  import {ref,computed} from 'vue'

  let nextId = 1
  const Items=ref<Item[]>([])
  const addItem = (text: string) => {
   Items.value.push({
    id: nextId++,
    text,
    checked: false
  })
}

  const removeItem=(id:number)=>{
    Items.value=Items.value.filter(item=>item.id!==id)
  }

  const filterStatus=ref(0)
  const filteredItems=computed(()=>{
    if(filterStatus.value===1) {
      return Items.value.filter(item=>item.checked)
    }
    else if (filterStatus.value===2) {
      return Items.value.filter(item=>!item.checked)
    }
    return Items.value
  })
</script>

<template>
  <h2>Todolist</h2>
  <TodoInput @add="addItem"/>
  <TodoFilter v-model="filterStatus"/>
  <ul v-if="filteredItems.length">
    <TodoItem
    v-for="item in filteredItems"
    :key="item.id"
    :item="item"
    @remove="removeItem"/>
  </ul>
</template>

