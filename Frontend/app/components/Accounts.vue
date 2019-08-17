<template>
  <StackLayout orientation="vertical">
    <AccountHeaders />
    <RadListView for="account in $store.state.accounts" width="100%">
      <v-template>
        <WrapLayout @tap="onItemTap()">
          <Label class="index" width="10%" text="#" />
          <Label class="number" width="30%" :text="account.number" />
          <Label class="name" width="60%" :text="account.name" />
        </WrapLayout>
      </v-template>
    </RadListView>
  </StackLayout>
</template>

<script>
  import AccountHeaders from './AccountHeaders.vue'

  export default {
    created() {
      this.fetchAccounts();
      this.createAccounts();
    },
    components: {
      AccountHeaders
    },
    methods: {
      createAccounts() {
        this.$store.state.accounts = [
          {
            number: '31230028129',
            name: 'Personkonto'
          },
          {
            number: '23002812931',
            name: 'Sparkonto'
          },
          {
            number: '81293123002',
            name: 'Kreditkort'
          }
        ];
      },
      onItemTap() {
        alert("Tapped!");
      },
      fetchAccounts() {
        console.log('Accounts - Fetching All Accounts');
        fetch('http://10.0.2.2:3000/accounts')
          .then(response => response.json())
          .then(result => { this.$store.state.accounts = result })
          .catch(error => { console.error("Accounts - Error:", error) })
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
          fetch('http://10.0.2.2:3000/accounts/' + account.uuid, { method: 'DELETE' })
            .then(() => { this.fetchAccounts() })
        }
      }
    }
  }
</script>

<style scoped>
  Label.index {
    background-color: #F9F9F9;
    font-size: 10;
    margin-top: 1;
    padding-left: 16;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  Label.number {
    background-color: #F9F9F9;
    font-size: 10;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  Label.name {
    background-color: #F9F9F9;
    font-size: 10;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 16;
    padding-bottom: 16;
  }
</style>
