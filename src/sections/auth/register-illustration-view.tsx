'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterIllustrationView() {
  const passwordShow = useBoolean();
  const passwordConfirmShow = useBoolean();

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Бүтэн нэр оруулна уу'),
    email: Yup.string().required('И-мэйл хаяг оруулна уу').email('И-мэйл хаяг буруу байна'),
    password: Yup.string()
      .required('Нууц үг оруулна уу')
      .min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой'),
    confirmPassword: Yup.string()
      .required('Нууц үгээ давтан оруулна уу')
      .oneOf([Yup.ref('password')], "Нууц үг таарахгүй байна"),
  });

  const defaultValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderHead = (
    <div>
      <Typography variant="h3" paragraph>
        Бүртгүүлэх
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Бүртгэлтэй хэрэглэгч? `}
        <Link
          component={RouterLink}
          href={paths.loginIllustration}
          variant="subtitle2"
          color="primary"
        >
          Нэвтрэх
        </Link>
      </Typography>
    </div>
  );

  const renderSocials = (
    <Stack direction="row" spacing={2}>
      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="logos:google-icon" width={24} />
      </Button>

      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
      </Button>

      <Button color="inherit" fullWidth variant="outlined" size="large">
        <Iconify icon="carbon:logo-github" width={24} sx={{ color: 'text.primary' }} />
      </Button>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        <RHFTextField name="fullName" label="Бүтэн нэр" />

        <RHFTextField name="email" label="И-мэйл хаяг" />

        <RHFTextField
          name="password"
          label="Нууц үг"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Нууц үгээ давтах"
          type={passwordConfirmShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordConfirmShow.onToggle} edge="end">
                  <Iconify
                    icon={passwordConfirmShow.value ? 'carbon:view' : 'carbon:view-off'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Бүртгүүлэх
        </LoadingButton>

        <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          {`Би `}
          <Link color="text.primary" href="#" underline="always">
            Үйлчилгээний нөхцөл
          </Link>
          {` болон `}
          <Link color="text.primary" href="#" underline="always">
            Нууцлалын бодлого.
            Privacy Policy.
          </Link>
        </Typography>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      <Divider>
        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          эсвэл үргэлжлүүлэх
        </Typography>
      </Divider>

      {renderSocials}
    </>
  );
}
