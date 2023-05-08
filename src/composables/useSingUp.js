import { auth } from "@/firebase/config";
import { ref } from "vue";

let useSignUp = () => {
  let user_error = ref(null);
  let register = async (name, email, password) => {
    try {
      let res = await auth.createUserWithEmailAndPassword(email, password);
      await res.user.updateProfile({
        displayName: name,
      });
      return res;
    } catch (err) {
      user_error.value = err.message;
    }
  };

  return { user_error, register };
};

export default useSignUp;
