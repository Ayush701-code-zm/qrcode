import { printful } from "@/lib/printfulClient";

export default async function Products() {
  let products = [];

  try {
    const response = await printful.get("/store/products");
    products = response.data.result;
  } catch (error) {
    console.error("Error fetching Printful products:", error);
  }

  return (
    <main>
      <h1>Printful Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
