'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useCart } from 'src/contexts/cart-context';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider from 'src/components/hook-form';

import EcommerceCheckoutNewCardForm from '../checkout/ecommerce-checkout-new-card-form';
import EcommerceCheckoutOrderSummary from '../checkout/ecommerce-checkout-order-summary';
import EcommerceCheckoutPaymentMethod from '../checkout/ecommerce-checkout-payment-method';
import EcommerceCheckoutShippingMethod from '../checkout/ecommerce-checkout-shipping-method';
import EcommerceCheckoutShippingDetails from '../checkout/ecommerce-checkout-shipping-details';
import EcommerceCheckoutPersonalDetails from '../checkout/ecommerce-checkout-personal-details';

// ----------------------------------------------------------------------

const SHIPPING_OPTIONS = [
  {
    label: 'Үнэгүй',
    value: 'free',
    description: '5-7 хоног хүргэлт',
    price: 0,
  },
  {
    label: 'Энгийн',
    value: 'standard',
    description: '3-5 хоног хүргэлт',
    price: 10,
  },
  {
    label: 'Шуурхай',
    value: 'express',
    description: '2-3 хоног хүргэлт',
    price: 20,
  },
];

const PAYMENT_OPTIONS = [
  {
    label: 'Пэйпал',
    value: 'paypal',
    description: '**** **** **** 1234',
  },
  {
    label: 'МастерКард',
    value: 'mastercard',
    description: '**** **** **** 3456',
  },
  {
    label: 'Виза',
    value: 'visa',
    description: '**** **** **** 6789',
  },
];

// ----------------------------------------------------------------------

export default function EcommerceCheckoutView() {
  const router = useRouter();
  const { cartItems } = useCart();
  
  // Calculate cart summary values
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 0 ? 5547 : 0; // Standard shipping fee
  const discount = subtotal * 0.15; // 15% discount
  const tax = 7; // 7% tax
  const total = subtotal + shipping - discount + (subtotal * (tax / 100));

  const formOpen = useBoolean();

  const EcommerceCheckoutSchema = Yup.object().shape({
    firstName: Yup.string().required('Нэр оруулах шаардлагатай'),
    lastName: Yup.string().required('Овог оруулах шаардлагатай'),
    emailAddress: Yup.string().required('И-мэйл хаяг оруулах шаардлагатай'),
    phoneNumber: Yup.string().required('Утасны дугаар оруулах шаардлагатай'),
    streetAddress: Yup.string().required('Гудамжны хаяг оруулах шаардлагатай'),
    city: Yup.string().required('Хот оруулах шаардлагатай'),
    zipCode: Yup.string().required('Шуудангийн код оруулах шаардлагатай'),
  });

  const defaultValues = {
    firstName: 'Jayvion',
    lastName: 'Simon',
    emailAddress: 'nannie_abernathy70@yahoo.com',
    phoneNumber: '365-374-4961',
    password: '',
    confirmPassword: '',
    streetAddress: '',
    city: '',
    country: 'Монгол улс',
    zipCode: '',
    shipping: 'free',
    paymentMethods: 'mastercard',
    newCard: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      ccv: '',
    },
  };

  const methods = useForm({
    resolver: yupResolver(EcommerceCheckoutSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      router.push(paths.eCommerce.orderCompleted);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: { xs: 3, md: 5 } }}>
        Төлбөр хийх
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={8}>
            <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
              <div>
                <StepLabel title="Хүргэлтийн мэдээлэл" step="1" />
                <EcommerceCheckoutShippingDetails />
              </div>

              <div>
                <StepLabel title="Хүргэлтийн арга" step="2" />
                <EcommerceCheckoutShippingMethod options={SHIPPING_OPTIONS} />
              </div>

              <div>
                <StepLabel title="Төлбөр тооцоолох арга" step="3" />

                <EcommerceCheckoutPaymentMethod options={PAYMENT_OPTIONS} />

                <Divider sx={{ my: 3 }} />

                <Collapse in={formOpen.value} unmountOnExit>
                  <EcommerceCheckoutNewCardForm />
                </Collapse>
              </div>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <EcommerceCheckoutOrderSummary
              tax={tax}
              total={total}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              products={cartItems}
              loading={isSubmitting}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

// ----------------------------------------------------------------------

type StepLabelProps = {
  step: string;
  title: string;
};

function StepLabel({ step, title }: StepLabelProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h6' }}>
      <Box
        sx={{
          mr: 1.5,
          width: 28,
          height: 28,
          flexShrink: 0,
          display: 'flex',
          typography: 'h6',
          borderRadius: '50%',
          alignItems: 'center',
          bgcolor: 'primary.main',
          justifyContent: 'center',
          color: 'primary.contrastText',
        }}
      >
        {step}
      </Box>
      {title}
    </Stack>
  );
}
