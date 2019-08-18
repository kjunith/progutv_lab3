<template>
  <Page>
    <ActionBar android:flat="true" statusBarStyle="dark" :title="this.accountSelected.name">
      <NavigationButton text="Accounts" @tap="this.$navigateBack" />
    </ActionBar>
    <StackLayout orientation="vertical">
      <TransactionHeaders />
      <RadListView for="transaction in $store.state.accountTransactions" width="100%">
        <v-template>
          <WrapLayout @tap="onItemTap(account)">
            <Label class="index" width="10%" text="#" />
            <Label class="title" width="40%" :text="transaction.title" />
            <Label class="price" width="30%" :text="toCurrency(transaction.price)" />
            <Label class="date" width="20%" :text="toShortDate(transaction.date)" />
          </WrapLayout>
        </v-template>
      </RadListView>
    </StackLayout>
  </Page>
</template>

<script>
  import TransactionHeaders from './TransactionHeaders'

  export default {
    props: ['accountSelected'],
    created() {
      this.fetchTransactionsForAccount();
    },
    components: {
      TransactionHeaders
    },
    methods: {
      fetchTransactionsForAccount() {
        console.log('AccountSelected - Selected Transactions: ' + this.accountSelected.number);

        fetch('http://192.168.1.51:3000/transactions/' + this.accountSelected.uuid)
          .then(response => response.json())
          .then(result => { this.$store.state.accountTransactions = result })
          .catch(error => {
            console.error("AccountSelected - Error:", error)
            alert('Error: ', error)
          })
      },
      toCurrency(priceStr) {
        return priceStr.toFixed(2) + ' Kr'
      },
      toShortDate(dateStr) {
        let months = ["January", "February", "Mars", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let date = new Date(Date.parse(dateStr));
        return date.getDate() + ' ' + months[date.getMonth()];
      },
      calculateTotalSum() {
        let totalSum = 0;

        for (let transaction in this.$store.state.accountTransactions) {
          if (transaction.account == number) {
            totalSum++
          }
        }

        return totalSum;
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #FFDF3F;
        color: #7F6B06;
    }
    Label.index {
      background-color: #FAFAFA;
      font-size: 10;
      margin-top: 1;
      padding-left: 16;
      padding-top: 16;
      padding-right: 0;
      padding-bottom: 16;
    }
    Label.title {
      background-color: #FAFAFA;
      font-size: 10;
      margin-top: 1;
      padding-left: 0;
      padding-top: 16;
      padding-right: 0;
      padding-bottom: 16;
    }
    Label.price {
      background-color: #FAFAFA;
      font-size: 10;
      margin-top: 1;
      padding-left: 0;
      padding-top: 16;
      padding-right: 0;
      padding-bottom: 16;
    }
    Label.date {
      background-color: #FAFAFA;
      font-size: 10;
      margin-top: 1;
      padding-left: 0;
      padding-top: 16;
      padding-right: 16;
      padding-bottom: 16;
    }
</style>
