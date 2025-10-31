import Review from "./Review";

interface DetailsReatingReviewProps {
  productId: string;
}

const DetailsReatingReview = ({ productId }: DetailsReatingReviewProps) => {
  return (
    <div className="space-y-10">
      <Review productId={productId} />
    </div>
  );
};

export default DetailsReatingReview;