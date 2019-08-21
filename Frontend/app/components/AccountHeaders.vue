<template>
    <WrapLayout>
      <Label class="name" :text="headers[1]" width="50%" />
      <Label class="number" :text="headers[0]" width="50%" />
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
  Label.name {
    background-color: #F0F0F0;
    font-size: 12;
    padding-left: 16;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 8;
  }
  Label.number {
    background-color: #F0F0F0;
    font-size: 12;
    padding-left: 0;
    padding-top: 16;
    padding-right: 16;
    padding-bottom: 8;
  }
</style>
