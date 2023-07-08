import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  status: yup.string().required(),
  booking_manager_id: yup.string().nullable(),
  company_id: yup.string().nullable(),
});
