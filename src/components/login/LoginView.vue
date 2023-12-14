<template>
  <div class="w-full h-screen flex justify-content-center align-items-center surface-400">
    <div class="flex flex-column w-8 xl:w-4 h-auto bg-white border-round-sm">
      <div class="m-4 flex flex-column gap-2">
        <label>Kullanıcı Türü Seçiniz</label>
        <PvDropdown v-model="selectUser" optionLabel="type" :options="userType" class="col-12 "></PvDropdown>
        <label class="mt-2">Kullanıcı Mail Adresi</label>
        <PvInputText type="email" v-model="emailAdress" :disabled="userPerson ? true : false" class="col-12" />
        <label class="mt-2">Kullanıcı Parola</label>
        <PvInputText type="password" v-model="password" class="col-12" />
        <div class="flex justify-content-center">
          <PvButton label="Giriş Yap" class="col-9 mt-3" @click="login" />
        </div>
      </div>
    </div>
    <PvToast></PvToast>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { app } from "@/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toastError, toastSuccess } from "@/auxillary/toast";
import { useRouter } from "vue-router";
export default {
  name: "LoginView",
  setup() {
    const selectUser = ref();
    const emailAdress = ref();
    const password = ref();
    const inputDisabledController = ref(false);
    const router = useRouter();
    const userPerson = ref(false);
    const userType = ref([
      { type: "Admin", code: 1 },
      { type: "Personel", code: 2 }
    ]);
    const auth = getAuth(app);
    watch(
      () => selectUser.value,
      (newValue) => {
        if (newValue.code === 2) {
          emailAdress.value = "person@trkvz.com";
          userPerson.value = true;
        } else {
          userPerson.value = false;
          emailAdress.value = "";
        }
      }
    )

    const login = () => {
      signInWithEmailAndPassword(auth, emailAdress.value, password.value).then(() => {
        toastSuccess("Giriş başarılı");
        router.push({ name: "HomeView" });
      }).catch(() => {
        toastError("Giriş yapılamadı")
      });
    }

    return { selectUser, userType, emailAdress, password, login, inputDisabledController, userPerson }
  }

}
</script>

<style scoped></style>