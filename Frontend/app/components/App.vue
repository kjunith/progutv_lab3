<template>
  <Page>
    <ActionBar android:flat="true" statusBarStyle="dark" title="OverVue: Money" >
      <ActionItem
        ios.systemIcon="4" ios.position="right"
        android.systemIcon="ic_menu_add" android.position="actionBar"
        @tap="addTapped()" />
    </ActionBar>
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
  </Page>
</template>

<script >
  import Accounts from './Accounts.vue'
  import Transactions from './Transactions.vue'
  import Add from './Add.vue'

  export default {
    data() {
      return {
        tabTitles: ["Accounts", "Transactions"]
      }
    },
    components: {
      Accounts,
      Transactions,
      Add
    },
    methods: {
      addTapped() {
        console.log('addTapped');
        this.$navigateTo(Add);
      }
    }
  }
</script>

<style scoped>
    ActionBar {
      background-color: #FFDF3F;
      color: #7F6B06;
    }
</style>
