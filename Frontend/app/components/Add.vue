<template>
  <Page>
    <ActionBar android:flat="true" statusBarStyle="dark">
      <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
    </ActionBar>
    <StackLayout orientation="vertical">
      <Label class="header" :text="header" />
      <Label class="description" :text="description" textWrap="true" />
      <WrapLayout>
        <TabView android:tabBackgroundColor="#FAFAFA"
                 android:tabTextColor="#F0F0F0"
                 android:selectedTabTextColor="#6A6A6A"
                 androidSelectedTabHighlightColor="#AAAAAA">
          <TabViewItem :title="tabTitles[0]">
            <GridLayout columns="*" rows="*">
              <Label text="Account" />
            </GridLayout>
          </TabViewItem>
          <TabViewItem :title="tabTitles[1]">
            <GridLayout columns="*" rows="*">
              <Label text="Transaction" />
            </GridLayout>
          </TabViewItem>
        </TabView>
      </WrapLayout>
    </StackLayout>
  </Page>
</template>

<script >
  export default {
    data() {
      return {
        header: "Select",
        description: "Select the tab with the option you would like to add",
        tabTitles: ["Account", "Transaction"]
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
    ActionBar {
      background-color: #FFDF3F;
      color: #7F6B06;
    }
    .header {
      font-size: 18;
      padding-left: 16;
      padding-right: 16;
      padding-top: 16;
    }
    .description {
      font-size: 14;
      padding-left: 16;
      padding-right: 16;
      padding-bottom: 16;
    }
</style>
