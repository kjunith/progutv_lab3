<template>
    <WrapLayout>
      <Label class="title" :text="headers[0]" width="50%" />
      <Label class="price" :text="headers[1]" width="30%" />
      <Label class="date" :text="headers[2]" width="20%" />
    </WrapLayout>
</template>

<script>
  export default {
    data() {
      return {
        headers: ["Title", "Price", "Date"]
      }
    }
  }
</script>

<style scoped>
  Label.title {
    background-color: #F3F3F3;
    font-size: 14;
    padding-left: 16;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 8;
  }
  Label.price {
    background-color: #F3F3F3;
    font-size: 14;
    padding-left: 0;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 8;
    text-align: center;
  }
  Label.date {
    background-color: #F3F3F3;
    font-size: 14;
    padding-left: 0;
    padding-top: 16;
    padding-right: 16;
    padding-bottom: 8;
    text-align: center;
  }
</style>
