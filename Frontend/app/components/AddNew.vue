<template>
  <Page>
    <GridLayout columns="*,auto" rows="auto,auto,auto,auto,auto,auto">
      <Label class="header" col="0" row="0" :text="header"/>
      <Label class="close" col="1" @tap="this.$modal.close" text="X" row="0" />

      <Label col="0" colSpan="2" class="description" :text="toggleOption == 0 ? tDetails : aDetails" row="1" textWrap="true" />

      <SegmentedBar class="option" col="0" colSpan="2" row="2" :selectedIndex="0" v-model="toggleOption" @selectedIndexChange="onOptionChanged()">
        <SegmentedBarItem title="Transaction" />
        <SegmentedBarItem title="Account" />
      </SegmentedBar>

      <GridLayout class="data" col="0" colSpan="2" columns="auto,*" rows="auto,auto,auto,auto" row="3">
        <template v-if="toggleOption == 0">
          <Label col="0" row="0" class="text" text="Title"/>
          <TextField col="1" row="0" autocorrect="false" class="input" editable="true" hint="Title" v-model="transactionTitle" />
          <Label col="0" row="1" class="text" text="Price" />
          <TextField col="1" row="1" autocorrect="false" class="input" editable="true" hint="0.00" keyboardType="number" v-model="transactionPrice" />
          <Label col="0" row="2" class="text" text="Type" />
          <SegmentedBar col="1" row="2" class="expense" :selectedIndex="0" v-model="toggleExpense" @selectedIndexChange="onExpenseChanged()">
            <SegmentedBarItem title="Expense" />
            <SegmentedBarItem title="Income" />
          </SegmentedBar>
          <Label col="0" row="3" class="text" text="Account" />
          <ListPicker col="1" row="3" :items="accountNames" selectedIndex="0"
            @selectedIndexChange="onListPickerChanged()" v-model="selectedAccount" />
        </template>

        <template v-else>
          <Label col="0" row="0" class="text" text="Name" />
          <TextField col="1" row="0" autocorrect="false" class="input" editable="true" hint="Name" v-model="accountName" />

          <Label col="0" row="1" class="text" text="Number" />
          <TextField col="1" row="1" autocorrect="false" class="input" editable="true" hint="12345678" keyboardType="number" maxLength="8" v-model="accountNumber" />
        </template>
      </GridLayout>

      <Button class="done" col="0" colSpan="2" row="5" @tap="onDoneTapped()" text="Done" />
    </GridLayout>
  </Page>
</template>

<script>
  import AddOption from './AddOption'
  import * as utils from "utils/utils";
  import { isIOS, isAndroid } from "platform";
  import * as frame from "ui/frame";

  export default {
    computed: {
      accountNames: function() {
        console.log('Account Names');
        var nameList = [];
        for (var i = 0; i < this.$store.state.accounts.length; i++) {
          nameList.push(this.$store.state.accounts[i].name);
        };
        return nameList;
      }
    },
    created() {
      this.toggleOption = 0;
      this.toggleExpense = 0;
      this.transactionAccountUuid = this.$store.state.accounts[this.selectedAccount].uuid;
      this.transactionAccount = this.$store.state.accounts[this.selectedAccount].number;
    },
    data() {
      return {
        header: "Add New",
        selectedOption: null,
        selectedAccount: 0,
        tDetails: "Transactions, transactions everywhere!",
        aDetails: "There's always room for a new account!",
        toggleOption: null,
        toggleExpense: null,
        transactionTitle: null,
        transactionPrice: null,
        transactionAccountUuid: null,
        transactionAccount: null,
        accountName: null,
        accountNumber: null
      }
    },
    components: {
      AddOption
    },
    methods: {
      onOptionChanged() {
        switch (this.toggleOption) {
          case 0:
            this.transactionTitle = null;
            this.transactionPrice = null;
            this.transactionAccountUuid = null;
            this.transactionAccount = null;
            break;
          case 1:
            this.accountUuid = null;
            this.accountName = null;
            this.accountNumber = null;
            break;
          default:
            break;
        }
      },
      onListPickerChanged() {
        this.transactionAccountUuid = this.$store.state.accounts[this.selectedAccount].uuid;
        this.transactionAccount = this.$store.state.accounts[this.selectedAccount].number;
      },
      onExpenseChanged() {
        switch (this.toggleExpense) {
          case 0:
            if (this.transactionPrice > 0) {
              this.transactionPrice *= -1;
            }
          case 1:
            if (this.transactionPrice < 0) {
              this.transactionPrice *= -1;
            }
            break;
          default:
            break;
        }
      },
      onDoneTapped() {
        this.dismissSoftKeybaord()

        switch (this.toggleOption) {
          case 0:
            this.addToTransactions();
            break;
          case 1:
            this.addToAccounts();
            break;
          default:
            break;
        }
      },
      addToTransactions() {
        this.transactionAccountUuid = this.$store.state.accounts[this.selectedAccount].uuid;
        this.transactionAccount = this.$store.state.accounts[this.selectedAccount].number;

        switch (this.toggleExpense) {
          case 0:
            if (parseFloat(this.transactionPrice) > 0) {
              this.transactionPrice = parseFloat(this.transactionPrice) * -1;
            }
            break;
          case 1:
            if (parseFloat(this.transactionPrice) < 0) {
              this.transactionPrice = parseFloat(this.transactionPrice) * -1;
            }
            break;
          default:
            break;
        }

        if (this.transactionTitle == null || this.transactionTitle == "") {
          alert('Please enter Title!')
        } else if (this.transactionPrice == null || this.transactionPrice == 0) {
          alert('Please enter Price!')
        } else if (this.transactionAccountUuid == null || this.transactionAccount == null) {
          alert('Please select Account!')
        } else {
          fetch(`${this.$store.state.localHost}transactions/add/?accountUuid=${this.transactionAccountUuid}&account=${this.transactionAccount}&title=${this.transactionTitle}&price=${this.transactionPrice}`, {
              method: 'POST'
            })
            .then(result => {
              this.fetchAll()
              alert('Transaction Added!');
              this.$modal.close();
            })
            .catch(error => {
              this.error = error
              console.error("Add Transaction - Error:", error)
              alert(`Error: ${error}`)
            });
        }
      },
      addToAccounts() {
        fetch(`${this.$store.state.localHost}accounts/add/?number=${this.accountNumber}&name=${this.accountName}`, {
            method: 'POST'
          })
          .then(result => {
            this.fetchAll()
            alert('Account Added!');
            this.$modal.close();
          })
          .catch(error => {
            this.error = error
            console.error("Add Account - Error:", error)
            alert(`Error: ${error}`)
          });
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
  .header {
    font-size: 18;
    padding-left: 16;
    padding-right: 16;
    padding-top: 16;
  }
  .close {
    background-color: red;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 18;
    padding-left: 16;
    padding-right: 16;
    padding-top: 8;
    padding-bottom: 8;
  }
  .description {
    text-align: center;
    font-size: 14;
    padding: 16;
  }
  .text {
    background-color: #F9F9F9;
    font-size: 14;
    padding-left: 16;
    padding-top: 16;
    padding-right: 0;
    padding-bottom: 16;
  }
  .input {
    background-color: #F9F9F9;
    font-size: 14;
    padding-left: 16;
    padding-top: 16;
    padding-right: 16;
    padding-bottom: 16;
  }
  ListPicker {
    background-color: #F9F9F9;
    height: 96;
    margin-left: 16;
    margin-right: 16;
  }
  SegmentedBar.option {
    border-width: 0;
    background-color: #F3F3F3;
    selected-background-color: #FFDF3F;
  }
  SegmentedBar.expense {
    background-color: #F9F9F9;
    border-width: 0;
    margin-left: 16;
    margin-right: 16;
    selected-background-color: #FFDF3F;
  }
  .done {
    background-color: blue;
    color: #FFFFFF;
    width: 128;
  }
  .data {
    background-color: #F9F9F9;
  }
</style>
