import { ref } from "vue";

let error = ref(null);
let cards = ref([]);

let getCards = () => {
  let load = async () => {
    try {
      let res = await fetch("http://localhost:3000/cards");
      if (res.status == 404) {
        throw new Error("url not found");
      }
      let data = await res.json();
      cards.value = data;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { cards, error, load };
};

export default getCards;
