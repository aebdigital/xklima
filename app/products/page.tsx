import { ProductsClient } from "@/components/ProductsClient";

type ProductsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  return <ProductsClient initialCategory={params.category} />;
}
