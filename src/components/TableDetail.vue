<template>
  <div class="grid w-screen h-full">
    <div class="bg-primary w-screen h-4rem flex align-items-center gap-3">
      <PvButton label="Kaydet" severity="success" icon="pi pi-check" class="h-full" />
      <PvButton label="Kaydetmeden Çık" severity="danger" icon="pi pi-times" class="h-full" />
    </div>
    <!-- Menu ve icerik ekleme -->
    <div class="col-12 xl:col-8">
      <div class="w-full flex flex-wrap">
        <div @click="selectCategory(category.id)"
          class="col-4 xl:col-1 bg-primary text-center flex flex-column align-items-center justify-content-center  mb-2 mr-2 p-5 w-2 h-8rem cursor-pointer"
          v-for="category in categoryList" :key="category.id">
          <img src="../assets/logo.png" width="50">
          {{ category.name }}
        </div>
      </div>
      <div class="w-full">
        <MenuDetail :category-list="categoryList" :categoryId="selectCategoryId"></MenuDetail>
      </div>
    </div>
    <!-- Tutar görme -->
    <div class="col-5 xl:col-4">
      <!--New Component -->
      <PaymentDetail></PaymentDetail>
    </div>
  </div>
</template>

<script>
import { getFirestore, query, collection, getDocs } from "firebase/firestore";
import { app } from "@/firebase/firebase";
import { onMounted, ref } from "vue";
import { toastError } from "@/auxillary/toast";
import MenuDetail from "@/components/MenuDetail.vue";
import PaymentDetail from "@/components/PaymentDetail.vue";
export default {
  name: "TableDetail",
  components: { PaymentDetail, MenuDetail },
  setup() {
    const firestore = getFirestore(app);
    const categoryList = ref([]);
    const selectCategoryId = ref(0);

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

    const selectCategory = (categoryId) => {
      selectCategoryId.value = categoryId;
    }

    return { categoryList, selectCategory, selectCategoryId };
  }
}

</script>


<style scoped></style>