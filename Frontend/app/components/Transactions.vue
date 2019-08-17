<template>
  <StackLayout orientation="vertical">
    <TransactionHeaders />
    <RadListView for="transaction in $store.state.transactions" width="100%">
      <v-template>
        <WrapLayout @tap="onItemTap()">
          <Label class="index" width="10%" text="#" />
          <Label class="title" width="40%" :text="transaction.title" />
          <Label class="price" width="30%" :text="transaction.price" />
          <Label class="date" width="20%" :text="transaction.date" />
        </WrapLayout>
      </v-template>
    </RadListView>
  </StackLayout>
</template>

<script>
  import TransactionHeaders from './TransactionHeaders.vue'

  export default {
    created() {
      this.fetchTransactions();
      this.createTransactions();
    },
    components: {
      TransactionHeaders
    },
    methods: {
      createTransactions() {
        this.$store.state.transactions = [
          {
            title: 'Transaction #1',
            price: '1000,00 Kr',
            date: '01 Jan'
          },
          {
            title: 'Transaction #2',
            price: '2000,00 Kr',
            date: '02 Feb'
          },
          {
            title: 'Transaction #3',
            price: '3000,00 Kr',
            date: '03 Mar'
          }
        ];
      },
      onItemTap() {
        alert("Tapped!");
      },
      fetchTransactions() {
        console.log('Accounts - Fetching All Transactions');
        fetch('http://10.0.2.2:3000/transactions', { method: 'GET' })
          .then(response => response.json())
          .then(result => { this.$store.state.transactions = result })
          .catch(error => { console.error("Error:", error); })
      },
      deleteTransaction(transaction) {
        if (confirm('Delete ' + transaction.title + '?')) {
          console.log('Deleting: ' + transaction.title);
          fetch('http://10.0.2.2:3000/transactions/' + transaction.uuid, { method: 'DELETE' })
            .then(() => { this.fetchTransactions() })
        }
      },
      postTransaction() {
        console.log('Posted Transaction');
        fetch('http://10.0.2.2:3000/transactions/', { method: 'POST' })
          .then(() => { this.fetchTransactions() })
      },
      goToTransaction(transaction) {
        this.$router.push({ name: 'EditTransaction', params: { id: transaction.uuid, title: transaction.title, price: transaction.price } })
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
  Label.title {
    background-color: #F9F9F9;
    font-size: 10;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  Label.price {
    background-color: #F9F9F9;
    font-size: 10;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  Label.date {
    background-color: #F9F9F9;
    font-size: 10;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 16;
    padding-bottom: 16;
  }
</style>
