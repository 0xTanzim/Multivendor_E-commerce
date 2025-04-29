import CouponForm from '@/components/backOffice/form/CouponForm';
import FormHeader from '@/components/backOffice/form/FormHeader';

const NewCouponsPage = async () => {
  return (
    <div>
      <FormHeader title="New  Coupon" />
      <CouponForm />
    </div>
  );
};

export default NewCouponsPage;
