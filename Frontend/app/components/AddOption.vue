<template>
  <GridLayout columns="*,*" rows="auto,auto">
    <template v-if="toggle">
      <Label col="0" row="0" class="text" text="Name:" width="33%" />
      <TextField class="input" col="1" row="0" editable="true" hint="Name" width="66%" />
      <Label col="0" row="1" class="text" text="Price:" width="33%" />
      <TextField class="input" col="1" row="1" editable="true" hint="0.00" width="66%" />
    </template>
    <template v-else>
      <Label col="0" row="0" class="text" text="Name:" width="33%" />
      <TextField class="input" col="1" row="0" editable="true" hint="Name" width="66%" />
      <Label col="0" row="1" class="text" text="Number:" width="33%" />
      <TextField class="input" col="1" row="1" editable="true" hint="12345678" width="66%" />
    </template>
  </GridLayout>
</template>

<script>
  export default {
    props: ['toggle'],
    data() {
      return {
        accInput: ["name", "number"],
        traInput: ["name", "price"]
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .text {
    background-color: #FAFAFA;
    font-size: 14;
    margin-top: 1;
    padding-left: 16;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  .input {
    background-color: #FAFAFA;
    font-size: 14;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 16;
    padding-bottom: 16;
  }
</style>
