<template>
  <Page>
    <ActionBar android:flat="true" :title="header" statusBarStyle="dark">
      <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
    </ActionBar>
    <StackLayout orientation="vertical">

      <GridLayout class="box" columns="auto,*" rows="auto,auto,auto,auto">
        <Label class="title" col="0" row="0" text="Title" />
        <TextField class="title" col="1" row="0" editable="true" hint="Title" v-model="title" />
        <Label class="price" col="0" row="1" text="Price" />
        <TextField class="price" col="1" row="1" editable="true" hint="0.00" keyboardType="number" v-model="price" />
        <Label class="type" col="0" row="2" text="Type" />
        <SegmentedBar class="expenseBar" col="1" row="2" :selectedIndex="0" v-model="toggleExpense" @selectedIndexChange="onExpenseChanged()">
          <SegmentedBarItem title="Expense" />
          <SegmentedBarItem title="Income" />
        </SegmentedBar>
        <Button class="caution" col="0" colSpan="2" row="3" text="Update" @tap="updateTransaction()" />
      </GridLayout>
      <StackLayout class="box" orientation="vertical">
        <Label class="header" text="Remove Transaction" />
        <Button class="warning" text="Remove" @tap="removeTransaction()" />
      </StackLayout>

    </StackLayout>
  </Page>
</template>

<script>
  import App from './App'
  import * as utils from "utils/utils";
  import { isIOS, isAndroid } from "platform";
  import * as frame from "ui/frame";

  export default {
    created() {
      this.title = this.$store.state.selectedTransaction.title;
      this.price = this.$store.state.selectedTransaction.price;
      this.toggleExpense = this.$store.state.selectedTransaction.price < 0 ? 0 : 1;
    },
    data() {
      return {
        header: 'Edit Transaction',
        title: null,
        price: null,
        toggleExpense: null,
        toAccount: null
      }
    },
    methods: {
      updateTransaction() {
        this.dismissSoftKeybaord()

        if (this.title == null || this.title == "") {
          alert('Please enter Title!');
        } else if (this.price == null || this.price == 0) {
          alert('Please enter Price!');
        } else {
          this.$store.state.selectedTransaction.title = this.title;
          this.$store.state.selectedTransaction.price = this.price;

          fetch(`${this.$store.state.localHost}transactions/?uuid=${this.$store.state.selectedTransaction.uuid}&title=${this.title}&price=${parseFloat(this.price)}`, { method: 'PUT' })
            .then(() => {
              this.fetchAll()
              alert('Transaction successfully updated!');
          });
        }
      },
      removeTransaction() {
        confirm({
          title: `Remove ${this.$store.state.selectedTransaction.title}?`,
          message: `Warning: This will permanently remove ${this.$store.state.selectedTransaction.title}!`,
          okButtonText: "Remove",
          cancelButtonText: "Cancel"
        }).then(result => {
          if (result) {
            fetch(`${this.$store.state.localHost}transactions/${this.$store.state.selectedTransaction.uuid}`, {
              method: 'DELETE'
            })
            .then(() => {
              this.fetchAll()
              alert('Transaction successfully removed!');
              this.$navigateBack();
            })
          }
        });
      },
      onExpenseChanged() {
        if (this.toggleExpense == 1 && this.price < 0) {
          this.price *= -1;
        } else if (this.toggleExpense == 0 && this.price > 0) {
          this.price *= -1;
        }
      },
      fetchAll() {
        fetch(`${this.$store.state.localHost}accounts`)
          .then(response => response.json(), { method: 'GET' })
          .then(result => { this.$store.state.accounts = result })
          .catch(error => { console.error("Accounts - Error:", error) })

        fetch(`${this.$store.state.localHost}transactions`)
          .then(response => response.json(), { method: 'GET' })
          .then(result => { this.$store.state.transactions = result })
          .catch(error => { console.error("Transacions - Error:", error) })

        if (this.$store.state.selectedAccount != null) {
          fetch(`${this.$store.state.localHost}transactions/${this.$store.state.selectedAccount.uuid}`)
            .then(response => response.json())
            .then(result => { this.$store.state.accountTransactions = result })
            .catch(error => { console.error("SelectedAccount - Error:", error) });
        }
      },
      dismissSoftKeybaord(){
        if (isIOS) {
          frame.topmost().nativeView.endEditing(true);
        }
        if (isAndroid) {
          utils.ad.dismissSoftInput();
        }
      }
    }
  }
</script>

<style scoped>
  ActionBar {
      background-color: #FFDF3F;
      color: #7F6B06;
  }
  ListPicker {
    background-color: #EEEEEE;
    height: 48;
  }
  .box {
    margin-bottom: 0;
    margin-left: 16;
    margin-right: 16;
    margin-top: 16;
  }
  TextField.title {
    background-color: #FAFAFA;
    border-top-right-radius: 16;
    font-size: 14;
    padding: 16;
  }
  Label.title {
    background-color: #EEEEEE;
    border-top-left-radius: 16;
    font-size: 14;
    padding: 16;
  }
  TextField.price {
    background-color: #FAFAFA;
    font-size: 14;
    padding: 16;
  }
  Label.price {
    background-color: #EEEEEE;
    font-size: 14;
    padding: 16;
  }
  Label.type {
    background-color: #EEEEEE;
    font-size: 14;
    padding: 16;
  }
  .header {
    background-color: #EEEEEE;
    padding-bottom: 4;
    padding-top: 16;
    border-top-left-radius: 16;
    border-top-right-radius: 16;
    font-size: 14;
    padding: 16;
  }
  .caution {
    color: #EEEEEE;
    background-color: blue;
    border-bottom-left-radius: 16;
    border-bottom-right-radius: 16;
  }
  .warning {
    color: #EEEEEE;
    background-color: red;
    border-bottom-left-radius: 16;
    border-bottom-right-radius: 16;
  }
  SegmentedBar {
    background-color: #FAFAFA;
    selected-background-color: #FFDF3F;
  }
</style>
