import CouponForm from '@/components/backOffice/form/CouponForm';
import FormHeader from '@/components/backOffice/form/FormHeader';
import { getData } from '@/lib/getData';
import { isCoupon } from '@repo/types';
type IParams = {
  params: Promise<{ id: string }>;
};
const UpdateCouponPage = async ({ params }: IParams) => {
  const { id } = await params;

  const couponData = await getData(`/coupons/${id}`);

  let coupon = null;

  if (!isCoupon(couponData)) {
    return (
      <div>
        <p>Coupon not found. Please check the ID or try again later.</p>
      </div>
    );
  } else {
    coupon = couponData;
  }

  return (
    <div>
      <FormHeader title="Update Coupon" />
      {coupon && <CouponForm updateData={coupon} />}
    </div>
  );
};

export default UpdateCouponPage;
