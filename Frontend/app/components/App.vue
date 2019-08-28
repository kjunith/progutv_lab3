<template>
  <Page loaded="onPageLoaded">
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
  import Accounts from './Accounts'
  import Transactions from './Transactions'
  import AddNew from './AddNew'

  export default {
    beforeCreate() {
      console.log('Fetching All Accounts');
      fetch(this.$store.state.localHost + 'accounts')
        .then(response => response.json(), { method: 'GET' })
        .then(result => { this.$store.state.accounts = result })
        .catch(error => { console.error("Accounts - Error:", error) });

      console.log('Fetching All Transactions');
      fetch(this.$store.state.localHost + 'transactions', { method: 'GET' })
        .then(response => response.json())
        .then(result => { this.$store.state.transactions = result })
        .catch(error => { console.error("Transactions - Error:", error); });
    },
    data() {
      return {
        tabTitles: ["Accounts", "Transactions"]
      }
    },
    components: {
      Accounts,
      Transactions,
      AddNew
    },
    methods: {
      addTapped() {
        console.log('addTapped');
        this.$showModal(AddNew);
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
