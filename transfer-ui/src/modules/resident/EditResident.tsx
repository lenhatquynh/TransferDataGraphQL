import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { NotFound } from "../../components";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Context } from "../../App";
import { ProgressSpinner } from "primereact/progressspinner";

import { useMutation, useQuery } from "@apollo/client";
import {
  GET_RESIDENT_BY_ID,
  GET_FACILITIES,
} from "../../graphql-client/queries";
import { UPDATE_RESIDENT } from "../../graphql-client/mutation";
import { Facility, UpdateResidentInput } from "../../types";

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  facilityId: Yup.string().required("Facility is required"),
});

export const EditResident = () => {
  const { id } = useParams();
  const context = useContext(Context);
  const { data, error, loading } = useQuery(GET_RESIDENT_BY_ID, {
    variables: { id: id },
  });
  const _FacilitiesQuery = useQuery(GET_FACILITIES);

  const [updateResident] = useMutation(UPDATE_RESIDENT);

  const updateResidentById = async (input: UpdateResidentInput) => {
    try {
      await updateResident({
        variables: { input },
        onCompleted: () => {
          toast.success("Update resident successfully!");
          setShowSpinner(false);
          window.location.href = "/resident";
        },
        onError: () => {
          toast.error("Update resident failed!");
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: new Date(),
      facilityId: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      setShowSpinner(true);
      const updateResidentInput = {
        id: id,
        residentVM: {
          firstName: values.firstName,
          lastName: values.lastName,
          dob: values.dob,
          facilityId: values.facilityId,
        },
      } as UpdateResidentInput;
      updateResidentById(updateResidentInput);
    },
  });

  useEffect(() => {
    if (data?.resident) {
      formik.setValues({
        firstName: data.resident.firstName,
        lastName: data.resident.lastName,
        dob: new Date(data.resident.dob),
        facilityId: data.resident.facility?.id as any,
      });
    }
  }, [data]);

  if (loading || _FacilitiesQuery.loading) {
    return (
      <ProgressSpinner className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    );
  }
  if (error || _FacilitiesQuery.loading) {
    return <NotFound />;
  }
  const facilities = _FacilitiesQuery.data?.facilities as Facility[];

  if (!context) {
    return null;
  }
  const { showSpinner, setShowSpinner } = context;

  const facilityOptions =
    facilities.map((facility) => ({
      label: facility.name,
      value: facility.id,
    })) || [];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[70%] relative top-[60px] bg-slate-800 p-7 rounded-xl">
        <p className="font-medium text-xl w-full text-center">RESIDENT</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="firstName">First Name</label>
              <InputText
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Please enter a  first name!"
                className={
                  formik.touched.firstName && formik.errors.firstName
                    ? "p-invalid"
                    : ""
                }
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <small className="p-error">{formik.errors.firstName}</small>
              )}
            </div>

            <div className="p-field mt-4">
              <label htmlFor="lastName">Last Name</label>
              <InputText
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Please enter a last name!"
                className={
                  formik.touched.lastName && formik.errors.lastName
                    ? "p-invalid"
                    : ""
                }
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <small className="p-error">{formik.errors.lastName}</small>
              )}
            </div>

            <div className="p-field mt-4">
              <label htmlFor="dob">Date of Birth</label>
              <Calendar
                id="dob"
                name="dob"
                value={formik.values.dob}
                onChange={(e) => formik.setFieldValue("dob", e.value)}
                showIcon
                dateFormat="dd/mm/yy"
                className={
                  formik.touched.dob && formik.errors.dob ? "p-invalid" : ""
                }
              />
              {formik.touched.dob && formik.errors.dob && (
                <small className="p-error">{formik.errors.dob as string}</small>
              )}
            </div>

            <div className="p-field mt-4">
              <label htmlFor="facilityId">Facility</label>
              <Dropdown
                id="facilityId"
                name="facilityId"
                value={formik.values.facilityId}
                options={facilityOptions}
                onChange={(e) => formik.setFieldValue("facilityId", e.value)}
                placeholder="Select a facility"
                filter
                className={
                  formik.touched.facilityId && formik.errors.facilityId
                    ? "p-invalid"
                    : ""
                }
              />
              {formik.touched.facilityId && formik.errors.facilityId && (
                <small className="p-error">{formik.errors.facilityId}</small>
              )}
            </div>

            <div className="p-field mt-4 flex justify-center">
              <Button label="UPDATE" type="submit" className="w-[30%]" />
            </div>
          </div>
        </form>
        {showSpinner && (
          <ProgressSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </div>
  );
};
