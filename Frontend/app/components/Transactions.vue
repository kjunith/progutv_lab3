<template>
  <StackLayout orientation="vertical">
    <TransactionHeaders />
    <TransactionList />
  </StackLayout>
</template>

<script>
  import TransactionHeaders from './TransactionHeaders'
  import TransactionList from './TransactionList'

  export default {
    components: {
      TransactionHeaders,
      TransactionList
    }
  }
</script>

<style scoped>

</style>
