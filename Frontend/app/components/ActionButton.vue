<template>
    <DockLayout>
      <Button class="action" width="64" dock="right" :text="add" @onTap="onTap()" />
    </DockLayout>
</template>

<script>
  export default {
    data() {
      return {
        add: "Options"
      }
    },
    methods: {
      onTap() {
        alert("Menu");
      }
    }
  }
</script>

<style scoped>
  DockLayout {
    background-color: #00000000;
  }
  Button.action {
    background-color: #FFEB8C;
    border-radius: 32;
    color: #7F6B06;
    font-size: 10;
    font-weight: bold;
    height: 64;
    min-height: 0;
    min-width: 0;
    padding: 0;
    width: 64;
  }
</style>
