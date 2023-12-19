<template>
  <div class="grid w-screen h-full">
    <!-- Salon Alan -->
    <div class="col-3 xl:col-1 bg-primary h-screen p-0 flex flex-column justify-content-center align-items-center">
      <div class="ml-1 col-10 hover:bg-white hover:text-900 p-0 mb-4 cursor-pointer" v-for="saloon in saloonList"
        :key="saloon.id" @click="selectSaloon(saloon.id)">
        <div class="text-center border-solid border-1 p-3 uppercase text-xs xl:text-lg">
          {{ saloon.name }}
        </div>
      </div>
    </div>
    <!-- Ana Alan -->
    <div class="col-9 xl:col-11 mt-4">
      <div class="flex flex-wrap">
        <div class="col-2 xl:col-1 bg-primary text-center flex justify-content-center  mb-2 mr-2 p-5  cursor-pointer"
          @click="selectTable(a, tableInfo[0].name)" v-for="a in tableSize" :key="a">
          {{ tableInfo[0].name }} {{ a }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { app } from "@/firebase/firebase";
import { getFirestore, query, collection, getDocs, where } from "firebase/firestore"
import { onMounted, ref } from "vue";
import { toastError } from "@/auxillary/toast";
import { useRouter } from "vue-router";
export default {
  name: "HomeView",
  setup() {
    const firestore = getFirestore(app);
    const saloonList = ref([]);
    const tableSize = ref();
    const tableInfo = ref([]);
    const router = useRouter();
    const getMenuList = async () => {
      const q = query(collection(firestore, "saloon"));
      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((payload) => {
          saloonList.value.push(payload.data());
        });
      }).catch(() => {
        toastError("Salon verisi çekilemedi");
      });
    };

    const getTableCount = async (id) => {
      const q = query(collection(firestore, "saloon"), where("id", "==", id));
      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((payload) => {
          tableInfo.value = [];
          tableSize.value = payload.data().table;
          tableInfo.value.push(payload.data());
        });
      }).catch(() => {
        toastError("Masa verisi çekilemedi");
      })
    }

    const selectSaloon = (id) => {
      getTableCount(id);
    };

    const selectTable = (tableNo, tableName) => {
      console.log(tableNo);
      router.push({ name: "TableView", params: { name: tableName, id: tableNo } });
    }

    onMounted(() => {
      getMenuList();
    });

    return { saloonList, selectSaloon, tableSize, tableInfo, selectTable }
  }
}
</script>

<style scoped></style>
