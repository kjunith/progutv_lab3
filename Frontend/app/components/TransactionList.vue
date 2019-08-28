<template>
  <RadListView :items="this.$store.state.transactions">
    <v-template>
      <WrapLayout @tap="goTo(item)">
        <Label class="title" width="40%" :text="item.title" />
        <Label class="price" width="30%" :text="item.price == null ? 0 : toCurrency(item.price)" />
        <Label class="date" width="30%" :text="toShortDate(item.date)" />
        <StackLayout class="separator" />
      </WrapLayout>
    </v-template>
  </RadListView>
</template>

<script>
  import EditTransaction from './EditTransaction'

  export default {
    methods: {
      goTo(item) {
        console.log('EditTransaction');
        this.$store.state.selectedTransaction = item;
        this.$navigateTo(EditTransaction);
      },
      toCurrency(priceStr) {
        return parseFloat(priceStr).toFixed(2) + ' Kr'
      },
      toShortDate(dateStr) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let date = new Date(Date.parse(dateStr));
        return `${date.getDate()} ${months[date.getMonth()]}`;
      },
      postTransaction() {
        console.log('Posted Transaction');
        fetch(this.$store.state.localHost + 'transactions/', { method: 'POST' })
          .then(() => {
            fetch(this.$store.state.localHost + 'transactions', { method: 'GET' })
              .then(response => response.json())
              .then(result => { this.$store.state.transactions = result })
              .catch(error => { console.error("Transactions - Error:", error); })
        });
      }
    }
  }
</script>

<style scoped>
  Label.title {
    background-color: #F9F9F9;
    font-size: 14;
    margin-top: 1;
    padding-left: 16;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  Label.price {
    background-color: #F9F9F9;
    font-size: 14;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
    text-align: right;
  }
  Label.date {
    background-color: #F9F9F9;
    font-size: 14;
    margin-top: 1;
    padding-left: 0;
    padding-top: 16;
    padding-right: 16;
    padding-bottom: 16;
    text-align: right;
  }
  .separator {
    background-color: #FFFFFF;
    height: 1;
  }
</style>
