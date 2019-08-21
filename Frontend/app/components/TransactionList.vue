<template>
  <RadListView for="transaction in $store.state.transactions" width="100%">
    <v-template>
      <WrapLayout @tap="goTo(transaction)">
        <Label class="title" width="50%" :text="transaction.title" />
        <Label class="price" width="30%" :text="toCurrency(transaction.price)" />
        <Label class="date" width="20%" :text="toShortDate(transaction.date)" />
      </WrapLayout>
    </v-template>
  </RadListView>
</template>

<script>
  //import TransactionSelected from './TransactionSelected'

  export default {
    created() {
      this.fetchTransactions();
    },
    methods: {
      goTo(transaction) {
        alert(transaction.title + " Tapped!");
      },
      toCurrency(priceStr) {
        return priceStr.toFixed(2) + ' Kr'
      },
      toShortDate(dateStr) {
        let months = ["January", "February", "Mars", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let date = new Date(Date.parse(dateStr));
        return date.getDate() + ' ' + months[date.getMonth()];
      },
      fetchTransactions() {
        console.log('Accounts - Fetching All Transactions');
        fetch('http://192.168.1.51:3000/transactions', { method: 'GET' })
          .then(response => response.json())
          .then(result => { this.$store.state.transactions = result })
          .catch(error => { console.error("Error:", error); })
      },
      deleteTransaction(transaction) {
        if (confirm('Delete ' + transaction.title + '?')) {
          console.log('Deleting: ' + transaction.title);
          fetch('http://192.168.1.51:3000/transactions/' + transaction.uuid, { method: 'DELETE' })
            .then(() => { this.fetchTransactions() })
        }
      },
      postTransaction() {
        console.log('Posted Transaction');
        fetch('http://192.168.1.51:3000/transactions/', { method: 'POST' })
          .then(() => { this.fetchTransactions() })
      },
      goToTransaction(transaction) {
        this.$router.push({ name: 'EditTransaction', params: { id: transaction.uuid, title: transaction.title, price: transaction.price } })
      }
    }
  }
</script>

<style scoped>
  Label.title {
    background-color: #FAFAFA;
    font-size: 12;
    margin-top: 1;
    padding-left: 16;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  Label.price {
    background-color: #FAFAFA;
    font-size: 12;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  Label.date {
    background-color: #FAFAFA;
    font-size: 12;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 16;
    padding-bottom: 16;
  }
</style>
