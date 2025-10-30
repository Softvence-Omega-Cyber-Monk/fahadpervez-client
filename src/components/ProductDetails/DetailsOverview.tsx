import { useGetProductByIdQuery } from "@/Redux/Features/products/products.api";
import { useParams } from "react-router-dom";
import { Spinner } from "../ui/spinner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductByIdQuery({ id });
  if (isLoading) {
    return (
      <div className="min-h-screen grid place-content-center">
        <Spinner />
      </div>
    );
  }
  const product = data?.data;
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="">
      <div
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: product.productDescription }}
      />
    </div>
  );
};

export default ProductDetails;
