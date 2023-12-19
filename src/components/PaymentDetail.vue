<template>
  <div class="grid" @contextmenu="contextMenu">
    <span class="text-xl font-bold text-center col-12">Masa Bilgisi</span>
    <span class="col-12 font-semibold">Masa Adı: {{ tableInfo[0].tableName }} </span>
    <span class="col-12 font-semibold">Masa Açılış Saati: {{ tableInfo[0].orderHour }} </span>
    <div style="border-top:1px solid black; width: 100%;"></div>
    <span class="text-xl font-bold text-center col-12">Ürünler</span>

    <div class="col-12">
      <PvDataTable :value="selectProduct" class="col-12" scrollable scrollHeight="580px" dataKey="uid" v-model:selection="selectedRowProduct">
        <PvColumn selectionMode="multiple"></PvColumn>
        <PvColumn field="name" header="Ürün"></PvColumn>
        <PvColumn field="count" header="Adet"></PvColumn>
        <PvColumn field="orderTime" header="Tarih"></PvColumn>
      </PvDataTable>
    </div>

    <div class="col-12 flex align-items-center ">
      <span class="col-6 font-bold">TUTAR</span>
      <PvButton label="Hesabı Al" severity="success" class="col-6" />
    </div>

    <PvContextMenu :model="menuList" ref="menu" />

  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "PaymentDetail",
  props: {
    selectProduct: {
      required: false,
    },
    tableInfo: {
      reuqired: true,
      type: Array
    }
  },
  setup(props) {
    const menu = ref();
    const selectedRowProduct = ref([]);
    const updateList = ref();
    const menuList = ref([
      {label:"Sil", icon: "pi pi-trash", command:() => { deleteProduct() }}
    ]);
    const contextMenu = (event) => {
      if (selectedRowProduct.value.length > 0)
          menu.value.show(event);
    }

    const deleteProduct = () => {
      console.log(selectedRowProduct.value)
     updateList.value = props.selectProduct.filter((item) => {
          return selectedRowProduct.value.some(item2 => item2 !== item)
      });
      console.log("Sonuc ",updateList.value);
    }
    return {menuList,menu,contextMenu, selectedRowProduct}
  }
}

</script>

<style scoped></style>