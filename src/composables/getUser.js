import { auth } from "@/firebase/config";
import { ref } from "vue";

let getUser = () => {
  let user = ref(auth.currentUser);

  auth.onAuthStateChanged((_user) => {
    user.value = _user;
  });

  return { user };
};

export default getUser;
