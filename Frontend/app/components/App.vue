<template>
  <Page>
    <ActionBar android:flat="true" statusBarStyle="dark" title="OverVue: Money"/>
    <GridLayout rows="*,96">
      <Content row="0"/>
      <ActionButton row="1" />
    </GridLayout>
  </Page>
</template>

<script >
  import Content from './Content.vue'
  import ActionButton from './ActionButton.vue'

  export default {
    data() {
      return {
        tabTitles: ["Accounts", "Transactions"]
      }
    },
    components: {
      Content,
      ActionButton
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #FFDF3F;
        color: #7F6B06;
    }
</style>
