<template>
  <StackLayout orientation="vertical">
    <AccountHeaders />
    <AccountList />
  </StackLayout>
</template>

<script>
  import AccountHeaders from './AccountHeaders'
  import AccountList from './AccountList'

  export default {
    components: {
      AccountHeaders,
      AccountList
    }
  }
</script>

<style scoped>

</style>
