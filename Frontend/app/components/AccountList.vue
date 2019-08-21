<template>
  <RadListView for="account in $store.state.accounts">
    <v-template>
      <WrapLayout @tap="goTo(account)">
        <Label class="name" width="50%" :text="account.name" />
        <Label class="number" width="50%" :text="account.number" />
      </WrapLayout>
    </v-template>
  </RadListView>
</template>

<script>
  import AccountSelected from './AccountSelected'

  export default {
    created() {
      this.fetchAccounts();
    },
    data() {
      return {
        headers: ["Number", "Name"]
      }
    },
    methods: {
      goTo(account) {
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
Label.name {
  background-color: #FAFAFA;
  font-size: 12;
  margin-top: 1;
  padding-left: 16;
  padding-top: 16;
  padding-right: 0;
  padding-bottom: 16;
}
Label.number {
  background-color: #FAFAFA;
  font-size: 12;
  margin-top: 1;
  padding-left: 0;
  padding-top: 16;
  padding-right: 16;
  padding-bottom: 16;
}
</style>
