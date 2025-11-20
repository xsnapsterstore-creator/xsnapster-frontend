import { fetchCategories, fetchHomepage } from "@/components/API/api";
import Category_Story from "@/components/Category_Story/Category_story";
import Hero from "@/components/Hero/Hero";

export default function Home({ products, category }) {
  return (
    <div>
      <Category_Story category={category} />
      <div>
        <Hero products={products} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetchHomepage();
  const prodData = await res.json();
  const cat = await fetchCategories();
  const category = await cat.json();
  return {
    props: {
      products: prodData || [],
      category: category || [],
    },
  };
}