import * as yup from 'yup';

export const bookingManagerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});
