<template>
  <Page>
    <ActionBar android:flat="true" statusBarStyle="dark" :title="this.$store.state.selectedAccount.name">
      <NavigationButton position="left" android.systemIcon="ic_menu_back" @tap="this.$navigateBack" />
      <ActionItem
        ios.systemIcon="2" ios.position="right"
        android.systemIcon="ic_menu_edit" android.position="actionBar"
        @tap="editTapped()" />
      <ActionItem
        ios.systemIcon="4" ios.position="right"
        android.systemIcon="ic_menu_add" android.position="actionBar"
        @tap="addTapped()" />
    </ActionBar>
    <StackLayout orientation="vertical">
      <WrapLayout>
        <Label class="total" text="Total:" width="33%" />
        <Label class="totalSum" :text="toCurrency(total)" width="66%" />
      </WrapLayout>
      <TransactionHeaders />
      <RadListView :items="this.$store.state.accountTransactions">
        <v-template>
          <WrapLayout @tap="goTo(item)">
            <Label class="title" width="40%" :text="item.title" />
            <Label class="price" width="30%" :text="toCurrency(item.price)" />
            <Label class="date" width="30%" :text="toShortDate(item.date)" />
            <StackLayout class="separator" />
          </WrapLayout>
        </v-template>
      </RadListView>
    </StackLayout>
  </Page>
</template>

<script>
  import TransactionHeaders from './TransactionHeaders'
  import EditTransaction from './EditTransaction'
  import AddNew from './AddNew'
  import EditAccount from './EditAccount'

  export default {
    computed: {
      total: function() {
        this.totalSum = 0;
        for (var i = 0; i < this.$store.state.accountTransactions.length; i++) {
          this.totalSum += this.$store.state.accountTransactions[i].price;
        };
        return this.totalSum;
      }
    },
    created() {
      fetch(`${this.$store.state.localHost}transactions/${this.$store.state.selectedAccount.uuid}`)
        .then(response => response.json())
        .then(result => { this.$store.state.accountTransactions = result })
        .catch(error => {
          console.error("SelectedAccount - Error:", error)
          alert('Error: ', error)
        });
    },
    data() {
      return {
        totalSum: null,
        isNeg: null
      };
    },
    components: {
      TransactionHeaders
    },
    methods: {
      goTo(item) {
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
      editTapped() {
        this.$navigateTo(EditAccount);
      },
      addTapped() {
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
    .total {
      font-size: 24;
      padding: 16;
      text-align: right;
    }
    .totalSum {
      font-size: 24;
      padding: 16;
    }
</style>
