import { db } from "@/firebase/config";
import { ref } from "vue";

let useAddCollections = (name) => {
  let error = ref(null);

  let addCard = async (data) => {
    try {
      let res = await db.collection(name).add(data);
      return res;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { error, addCard };
};

export default useAddCollections;
