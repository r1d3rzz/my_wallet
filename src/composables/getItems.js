import { ref } from "vue";

let items = ref([]);
let error = ref("");

let getItems = () => {
  let load = async () => {
    try {
      let res = await fetch(`https://fakestoreapi.com/products`);
      if (res.status == 404) {
        throw new Error("url not found");
      }
      let data = await res.json();
      items.value = data;
    } catch (err) {
      console.log(err.message);
    }
  };

  return { items, error, load };
};

export default getItems;
