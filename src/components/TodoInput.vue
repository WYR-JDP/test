<script lang="ts" setup>
    import {ref} from 'vue'
    const InputText=ref('')
    const emit =defineEmits<{
        add:[text:string]
    }>()
    const handleSubmit=()=>{
      const text=InputText.value.trim()
      if(text==='') return
      emit('add',text)
      InputText.value=''
    }
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="InputText" placeholder="请输入..."/>
        <button type="submit">确定</button>
    </form>
</template>

