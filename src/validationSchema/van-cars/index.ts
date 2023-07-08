import * as yup from 'yup';

export const vanCarValidationSchema = yup.object().shape({
  status: yup.string().required(),
  company_id: yup.string().nullable(),
  booking_id: yup.string().nullable(),
});
