<template>
  <RadListView :items="this.$store.state.accounts">
    <v-template>
      <WrapLayout @tap="goTo(item)">
        <Label class="name" width="60%" :text="item.name" />
        <Label class="number" width="40%" :text="item.number" />
      </WrapLayout>
    </v-template>
  </RadListView>
</template>

<script>
  import SelectedAccount from './SelectedAccount'

  export default {
    methods: {
      goTo(item) {
        this.$store.state.selectedAccount = item;
        this.$navigateTo(SelectedAccount);
      }
    }
  }
</script>

<style scoped>
Label.name {
  background-color: #F9F9F9;
  font-size: 14;
  margin-top: 1;
  padding-left: 16;
  padding-top: 16;
  padding-right: 0;
  padding-bottom: 16;
}
Label.number {
  background-color: #F9F9F9;
  font-size: 14;
  margin-top: 1;
  padding-left: 0;
  padding-top: 16;
  padding-right: 16;
  padding-bottom: 16;
}
</style>
