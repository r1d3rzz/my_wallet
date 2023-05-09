import { db } from "@/firebase/config";
import { ref } from "vue";

let card = ref(null);
let error = ref(null);

let getCard = (id) => {
  let load = async () => {
    try {
      let res = await db.collection("cards").doc(id).get();
      card.value = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    } catch (err) {
      error.value = err.message;
    }
  };

  return { card, error, load };
};

export default getCard;
