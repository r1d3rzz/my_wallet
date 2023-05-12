import { ref } from "vue";

let item = ref();
let error = ref(null);

let getItem = (id) => {
  let api = "https://fakestoreapi.com/products/";

  let load = async () => {
    try {
      let res = await fetch(api + id);
      if (res.status == 404) {
        throw new Error("Url not Found");
      }
      let data = await res.json();
      item.value = data;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { item, error, load };
};

export default getItem;
