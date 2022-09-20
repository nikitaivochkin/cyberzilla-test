/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import cx from 'classnames';
import {
  useFormik,
} from 'formik';
import * as yup from 'yup';
import isEqual from 'lodash.isequal';
import {
  Button, TextField, ButtonGroup, CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { User as UserType } from 'types';
import { updateUser } from 'store/slices/users';

interface InitialFormValues extends UserType {}

type ModalFormPropTypes = {
  values: InitialFormValues,
  setActiveId: Function,
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name in required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string()
    .required('Phone number is required'),
});

const UpdateUserForm
  : React.FC<ModalFormPropTypes> = ({ values, setActiveId }: ModalFormPropTypes) => {
    const dispatch = useAppDispatch();
    const requestState = useAppSelector((state) => state.users.updateStatus);

    const isRequested = requestState === 'requested';

    const handleSubmit = async (v: UserType) => {
      if (!isEqual(values, v)) {
        const { meta: { requestStatus } } = await dispatch(updateUser(v));
        if (requestStatus === 'fulfilled') {
          setActiveId(null);
        }
      } else {
        setActiveId(null);
      }
    };

    const formik = useFormik({
      initialValues: values,
      validationSchema,
      onSubmit: handleSubmit,
    });

    return (
      <form
        onSubmit={formik.handleSubmit}
        className={cx({
          requested: isRequested,
        })}
      >
        <fieldset>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </fieldset>

        <fieldset>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </fieldset>

        <fieldset>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </fieldset>

        <fieldset>
          <ButtonGroup
            color="secondary"
            aria-label="outlined button group"
          >
            <Button
              type="submit"
              component="button"
              color="primary"
              startIcon={isRequested ? <CircularProgress size={15} /> : null}
              disabled={isRequested}
            >
              Save
            </Button>
            <Button
              component="button"
              color="primary"
              onClick={() => setActiveId(null)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </fieldset>
      </form>
    );
  };

export default UpdateUserForm;
