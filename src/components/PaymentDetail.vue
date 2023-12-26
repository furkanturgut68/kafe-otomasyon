<template>
  <div class="grid" @contextmenu="contextMenu">
    <span class="text-xl font-bold text-center col-12">Masa Bilgisi</span>
    <span class="col-12 font-semibold">Masa Adı: {{ tableInfo[0].tableName }} </span>
    <span class="col-12 font-semibold">Masa Açılış Saati: {{ tableInfo[0].orderHour }} </span>
    <div style="border-top:1px solid black; width: 100%;"></div>
    <span class="text-xl font-bold text-center col-12">Ürünler</span>

    <div class="col-12">
      <PvDataTable :value="selectProduct" class="col-12" scrollable scrollHeight="580px" dataKey="Uid" v-model:selection="selectedRowProduct">
        <PvColumn selectionMode="multiple"></PvColumn>
        <PvColumn field="Name" header="Ürün"></PvColumn>
        <PvColumn field="Count" header="Adet"></PvColumn>
        <PvColumn field="Price" header="Fiyat"></PvColumn>
        <PvColumn field="OrderTime" header="Tarih"></PvColumn>
      </PvDataTable>
    </div>

    <div class="col-12 flex align-items-center ">
      <span class="col-6 font-bold">TUTAR =  {{totalPayment}} TL</span>
      <PvButton label="Hesabı Al" severity="success" class="col-6" />
    </div>

    <PvContextMenu :model="menuList" ref="menu" />

  </div>
</template>

<script>
import {computed, ref} from "vue";

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
  emits:["deleteProduct"],
  setup(props, {emit}) {
    const menu = ref();
    const selectedRowProduct = ref([]);
    const menuList = ref([
      {label:"Sil", icon: "pi pi-trash", command:() => { deleteProduct() }}
    ]);
    const contextMenu = (event) => {
      if (selectedRowProduct.value.length > 0)
          menu.value.show(event);
    }

    const totalPayment = computed(() => {
      let total = 0;
      for (let i= 0; i < props.selectProduct.length; i++) {
        total += props.selectProduct[i].Price * props.selectProduct[i].Count;
      }
      return total;
    });

    const deleteProduct = () => {
      const filteredProducts = props.selectProduct.filter((item) => {
        return item.Uid !== selectedRowProduct.value[0].Uid
      });

      emit("deleteProduct", filteredProducts);
      selectedRowProduct.value = [];
    }
    return {menuList,menu,contextMenu, selectedRowProduct,totalPayment}
  }
}

</script>

<style scoped></style>