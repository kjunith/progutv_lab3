<template>
    <WrapLayout>
      <Label class="index" :text="$store.state.accounts.length" width="10%" />
      <Label class="number" :text="headers[0]" width="30%" />
      <Label class="name" :text="headers[1]" width="60%" />
    </WrapLayout>
</template>

<script>
  export default {
    data() {
      return {
        headers: ["Number", "Name"]
      }
    }
  }
</script>

<style scoped>
  Label.index {
    background-color: #F0F0F0;
    font-size: 10;
    padding-left: 16;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 8;
  }
  Label.number {
    background-color: #F0F0F0;
    font-size: 10;
    padding-left: 0;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 8;
  }
  Label.name {
    background-color: #F0F0F0;
    font-size: 10;
    padding-left: 0;
    padding-top: 16;
    padding-right: 16;
    padding-bottom: 8;
  }
</style>
