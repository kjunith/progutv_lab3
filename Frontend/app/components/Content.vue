<template>
  <WrapLayout>
    <TabView android:tabBackgroundColor="#FFEB8C"
             android:tabTextColor="#FFDF3F"
             android:selectedTabTextColor="#FFFFFF"
             androidSelectedTabHighlightColor="#FFFFFF">
      <TabViewItem :title="tabTitles[0]">
        <GridLayout columns="*" rows="*">
          <Accounts />
        </GridLayout>
      </TabViewItem>
      <TabViewItem :title="tabTitles[1]">
        <GridLayout columns="*" rows="*">
          <Transactions />
        </GridLayout>
      </TabViewItem>
    </TabView>
  </WrapLayout>
</template>

<script>
  import Accounts from "./Accounts.vue"
  import Transactions from "./Transactions.vue"

  export default {
    data() {
      return {
        tabTitles: ["Accounts", "Transactions"]
      }
    },
    components: {
      Accounts,
      Transactions
    }
  }
</script>

<style scoped>
  DockLayout {
    background-color: #00000000;
  }
  Button {
    background-color: #FFEB8C;
    font-size: 10;
    height: 64;
    margin: 0;
    min-height: 0;
    min-width: 0;
    padding: 0;
    width: 64;
  }
</style>
