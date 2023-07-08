import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createVanCar } from 'apiSdk/van-cars';
import { Error } from 'components/error';
import { vanCarValidationSchema } from 'validationSchema/van-cars';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CompanyInterface } from 'interfaces/company';
import { BookingInterface } from 'interfaces/booking';
import { getCompanies } from 'apiSdk/companies';
import { getBookings } from 'apiSdk/bookings';
import { VanCarInterface } from 'interfaces/van-car';

function VanCarCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VanCarInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVanCar(values);
      resetForm();
      router.push('/van-cars');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VanCarInterface>({
    initialValues: {
      status: '',
      company_id: (router.query.company_id as string) ?? null,
      booking_id: (router.query.booking_id as string) ?? null,
    },
    validationSchema: vanCarValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Van Car
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<BookingInterface>
            formik={formik}
            name={'booking_id'}
            label={'Select Booking'}
            placeholder={'Select Booking'}
            fetcher={getBookings}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.status}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'van_car',
    operation: AccessOperationEnum.CREATE,
  }),
)(VanCarCreatePage);
