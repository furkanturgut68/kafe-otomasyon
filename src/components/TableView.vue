<template>
  <div class="grid col-12 ">
    <div class="col-12 bg-primary w-screen h-4rem flex justify-content-between xl:gap-4 xl:justify-content-start ">
      <PvButton label="Kaydet Çık" severity="success" icon="pi pi-check" class="col-5 xl:col-1" @click="saveAndExit"/>
      <PvButton label="Kaydetmeden Çık" severity="danger" icon="pi pi-times" class="col-5 xl:col-1" />
    </div>
    <!-- Menu ve icerik ekleme -->
    <div class="col-12 lg:col-8">
      <div class="w-full flex flex-wrap">
        <div @click="selectCategory(category.id)"
          class="col-4 xl:col-1 bg-primary text-center flex flex-column align-items-center justify-content-center mb-2 mr-2 p-5 w-2 h-8rem cursor-pointer hover:bg-black-alpha-30"
          v-for="category in categoryList" :key="category.id">
          <img src="../assets/logo.png" width="50">
          {{ category.name }}
        </div>
      </div>
      <div class="col-12 p-0">
        <MenuDetail :category-list="categoryList" :categoryId="selectCategoryId" @selectProduct="productList" :deleteProduct="selectProduct">
        </MenuDetail>
      </div>
    </div>
    <!-- Tutar görme -->
    <div class="col-12 lg:col-4 mt-2">
      <PaymentDetail :selectProduct="selectProduct" :tableInfo="tableInfo" @delete-product="deleteProduct" ></PaymentDetail>
    </div>
  </div>
</template>

<script>
import { getFirestore, query, collection, getDocs, addDoc } from "firebase/firestore";
import { app } from "@/firebase/firebase";
import { onMounted, ref } from "vue";
import { toastError } from "@/auxillary/toast";
import MenuDetail from "@/components/MenuDetail.vue";
import PaymentDetail from "@/components/PaymentDetail.vue";
import router from "@/router/router";
import dayjs from 'dayjs';

export default {
  name: "TableDetail",
  components: { PaymentDetail, MenuDetail },
  setup() {
    const firestore = getFirestore(app);
    const categoryList = ref([]);
    const selectCategoryId = ref(0);
    let selectProduct = ref([]);
    let tableInfo = ref([]);
    let tableNameAndNo = ref(router.currentRoute.value.params.name + " " + router.currentRoute.value.params.id);
    const now = dayjs();
    const hourFormat = now.format("HH:mm:ss");
    tableInfo.value.push(
      { tableName: tableNameAndNo.value, orderHour: hourFormat }
    );

    const getCategoryList = async () => {
      const q = query(collection(firestore, "menu"));
      await getDocs(q).then((snapshot) => {
        snapshot.forEach((payload) => {
          categoryList.value.push(payload.data());
        });
      }).catch(() => {
        toastError("Menü verisi çekilemedi");
      });
    };

    onMounted(() => {
      getCategoryList();
    });

    const productList = (e) => {
      selectProduct.value = e;
    }

    const deleteProduct = (e) => {
      console.log("DeleteProduct")
      selectProduct.value = e;
    }

    const selectCategory = (categoryId) => {
      selectCategoryId.value = categoryId;
    }

    const saveAndExit = async () => {
      let productInfo = {
        product: selectProduct.value
      }
      await addDoc(collection(firestore, "orders"), productInfo);
    }

    return { categoryList, selectCategory, selectCategoryId, selectProduct, productList, tableInfo, deleteProduct, saveAndExit };
  }
}

</script>

<style scoped></style>