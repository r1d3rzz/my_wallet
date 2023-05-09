import { db } from "@/firebase/config";
import { ref } from "vue";

let cards = ref([]);
let error = ref(null);

let getCards = () => {
  let load = async () => {
    try {
      let res = await db
        .collection("cards")
        .orderBy("created_at", "desc")
        .get();
      cards.value = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    } catch (err) {
      error.value = err.message;
    }
  };

  return { cards, error, load };
};

export default getCards;
