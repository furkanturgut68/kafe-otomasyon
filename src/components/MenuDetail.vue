<template>
  <!-- Ekle/Sil bar -->
  <div class="bg-yellow-500 col-12">
    <div class="flex justify-content-end">
      <PvInputText v-model="selectProduct" placeholder="Seçilen Ürün" disabled
        class="col-4 xl:col-2 my-2 text-center text-900" />
      <PvInputText v-model="productCount" :disabled="!selectProduct" placeholder="Adet Gir" type="number"
        class="col-2 xl:col-1 my-2 ml-1" />
      <PvButton rounded icon="pi pi-pencil" severity="help" class="m-2" v-tooltip.bottom="'Klavye Aç'"
        @click="openKeyboard" />
      <PvButton rounded icon="pi pi-check" severity="success" class="m-2" v-tooltip.bottom="'Onayla'"
        @click="addProduct(selectProduct,productIdRef, productPrice)" />
      <PvButton rounded icon="pi pi-plus" severity="success" class="m-2" v-tooltip.bottom="'Ekle'"
        @click="productCount++" />
      <PvButton rounded icon="pi pi-minus" severity="danger" class="m-2" v-tooltip.bottom="'Sil'"
        @click="[productCount > 0 ? productCount-- : 0]" />
    </div>
  </div>
  <div class="flex flex-wrap">
    <PvOverlayPanel ref="op">
      <keyboard v-model="productCount" @input="changed" :layouts="[
        '1234567890{delete:backspace}'
      ]" :maxlength="16"></keyboard>
    </PvOverlayPanel>
    <div @click="addProduct(menu.name, menu.id, menu.price)" v-tooltip.bottom="'Ekle'"
      class="col-2 h-7rem xl:col-1 bg-red-300 text-center flex justify-content-center mb-2 mr-2 mt-2 cursor-pointer hover:bg-black-alpha-30"
      v-for="menu in selectCategoryMenuList" :key="menu.id">
      <span class="flex align-items-center">{{ menu.name }}</span>
    </div>
  </div>
</template>

<script>
import { getFirestore, query, collection, getDocs } from "firebase/firestore";
import { app } from "@/firebase/firebase";
import { onMounted, ref, watch} from "vue";
import keyboard from 'vue-keyboard';
import dayjs from 'dayjs';
import { uid } from 'uid';

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
    },
    deleteProduct: {
      required: false
    }
  },
  emits:["selectProduct"],
  setup(props, { emit }) {
    const firestore = getFirestore(app);
    const menuList = ref([]);
    const selectCategoryMenuList = ref();
    let selectProduct = ref(null);
    let productCount = ref(1);
    let productIdRef = ref();
    let productPrice = ref();
    const op = ref();
    let productInfoList = ref([]);

    const getMenuList = async () => {
      const q = query(collection(firestore, "product"));
      await getDocs(q).then((snapshot) => {
        snapshot.forEach((payload) => {
          menuList.value.push(payload.data());
        });
      });
    }
    const changed = (value) => {
      productCount.value = value;
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

    const addProduct = (productName, productId, productPrices) => {
      productIdRef.value = productId;
      selectProduct.value = productName;
      productPrice.value = productPrices;

      const now = dayjs();
      const hourFormat = now.format("DD-MM-YYYY HH:mm:ss");
      let productInfo =
      {
        Id: productId,
        Name: productName,
        Count: productCount.value,
        OrderTime: hourFormat,
        Price: productPrices,
        Uid: uid()
      };
      productInfoList.value.push(productInfo);
      productInfoList.value = props.deleteProduct
      productCount.value = 1;
      emit("selectProduct", productInfoList.value);
    };

    const openKeyboard = (event) => {
      op.value.toggle(event);
    }

    return { selectCategoryMenuList, addProduct, selectProduct, productCount, openKeyboard, op, changed, productIdRef, productPrice }
  }
}
</script>

<style scoped></style>