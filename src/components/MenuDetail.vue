<template>
  <!-- Ekle/Sil bar -->
  <div class="w-full bg-yellow-500">
    <div class="flex justify-content-end">
      <PvInputText v-model="selectProduct" placeholder="Seçilen Ürün" disabled
        class="col-4 xl:col-2 m-2 text-center text-900" />
      <PvInputText v-model="productCount" placeholder="Adet Gir" type="number" class="col-4 xl:col-1 m-2" />
      <PvButton rounded icon="pi pi-pencil" severity="help" class="m-2" v-tooltip.bottom="'Klavye Aç'"
        @click="openKeyboard" />
      <PvButton rounded icon="pi pi-plus" severity="success" class="m-2" v-tooltip.bottom="'Ekle'"
        @click="productCount++" />
      <PvButton rounded icon="pi pi-minus" severity="danger" class="m-2" v-tooltip.bottom="'Sil'"
        @click="[productCount > 0 ? productCount-- : 0]" />
    </div>
  </div>
  <div class="flex flex-wrap">
    <keyboard v-model="productCount" @custom="custom" @input="changed" :layouts="[
      '1234567890.{delete:backspace}'
    ]" :maxlength="16"></keyboard>
    <div @click="addProduct(menu.name, menu.id)" v-tooltip.bottom="'Ekle'"
      class="col-2 xl:col-1 bg-red-300 text-center flex justify-content-center  mb-2 mr-2 mt-2 p-7  cursor-pointer"
      v-for="menu in selectCategoryMenuList" :key="menu.id">
      {{ menu.name }}
    </div>
  </div>
</template>

<script>
import { getFirestore, query, collection, getDocs } from "firebase/firestore";
import { app } from "@/firebase/firebase";
import { onMounted, ref, watch } from "vue";
import keyboard from 'vue-keyboard';

export default {
  name: "MenuDetail",
  components: { keyboard },
  props: {
    categoryList: {
      required: true,
      type: Object
    },
    categoryId: {
      required: true,
      type: Number
    }
  },
  setup(props) {
    const firestore = getFirestore(app);
    const menuList = ref([]);
    const selectCategoryMenuList = ref();
    let selectProduct = ref(null);
    let productCount = ref(0);
    let productIdRef = ref();
    const getMenuList = async () => {
      const q = query(collection(firestore, "product"));
      await getDocs(q).then((snapshot) => {
        snapshot.forEach((payload) => {
          menuList.value.push(payload.data());
        });
      });
    }

    const selectCategoryMenu = () => {
      selectCategoryMenuList.value = menuList.value.filter((item) => {
        return item.categoryId === props.categoryId;
      });
    };

    watch(() => props.categoryId, () => {
      selectCategoryMenu();
    });

    watch(() => productIdRef.value, (newValue, oldValue) => {
      if (newValue !== oldValue)
        productCount.value = 1;
    });

    onMounted(() => {
      getMenuList();
    });

    const addProduct = (productName, productId) => {
      productIdRef.value = productId;
      selectProduct.value = productName;
      if (selectProduct.value)
        productCount.value++
    };

    const openKeyboard = () => {
      var inputElement = document.activeElement;
      inputElement.focus();
    }

    return { selectCategoryMenuList, addProduct, selectProduct, productCount, openKeyboard }
  }
}
</script>

<style scoped></style>