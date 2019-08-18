<template>
  <StackLayout orientation="vertical">
    <AccountHeaders />
    <RadListView for="account in $store.state.accounts" width="100%">
      <v-template>
        <WrapLayout @tap="onItemTap(account)">
          <Label class="index" width="10%" text="#" />
          <Label class="number" width="40%" :text="account.number" />
          <Label class="name" width="50%" :text="account.name" />
        </WrapLayout>
      </v-template>
    </RadListView>
  </StackLayout>
</template>

<script>
  import AccountHeaders from './AccountHeaders'
  import AccountSelected from './AccountSelected'

  export default {
    computed() {

    },
    created() {
      this.fetchAccounts();
      this.fetchTransactions();
    },
    components: {
      AccountHeaders
    },
    methods: {
      onItemTap(account) {
        this.$navigateTo(AccountSelected, {
          props: {
            accountSelected: account
          }
        });
      },
      fetchAccounts() {
        console.log('Accounts - Fetching All Accounts');
        fetch('http://192.168.1.51:3000/accounts')
          .then(response => response.json())
          .then(result => { this.$store.state.accounts = result })
          .catch(error => { console.error("Accounts - Error:", error) })
      },
      fetchTransactions() {
        console.log('Accounts - Fetching All Transactions');
        fetch('http://192.168.1.51:3000/transactions', { method: 'GET' })
          .then(response => response.json())
          .then(result => { this.$store.state.transactions = result })
          .catch(error => { console.error("Error:", error); })
      },
      addAccount() {
        console.log('Accounts - Posting Account');
        this.$router.push({ name: "AddAccount" })
      },
      goToAccount(account) {
        console.log('Accounts - SelectedAccount: ' + account.uuid);
        this.$router.push({ name: "SelectedAccount", params: { id: account.uuid } })
      },
      deleteAccount(account) {
        if (confirm('Do you want to completly remove ' + account.name + '?')) {
          console.log('Accounts - Deleting Account: ' + account.name);
          fetch('http://192.168.1.51:3000/accounts/' + account.uuid, { method: 'DELETE' })
            .then(() => { this.fetchAccounts() })
        }
      }
    }
  }
</script>

<style scoped>
  Label.index {
    background-color: #FAFAFA;
    font-size: 10;
    margin-top: 1;
    padding-left: 16;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  Label.number {
    background-color: #FAFAFA;
    font-size: 10;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  Label.name {
    background-color: #FAFAFA;
    font-size: 10;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  Label.total {
    background-color: #FAFAFA;
    font-size: 10;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 16;
    padding-bottom: 16;
  }
</style>
