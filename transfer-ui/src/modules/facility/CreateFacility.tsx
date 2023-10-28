import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import toast from "react-hot-toast";
import { useContext } from "react";
import { Context } from "../../App";
import { ProgressSpinner } from "primereact/progressspinner";

import { useMutation } from "@apollo/client";
import { ADD_FACILITY } from "../../graphql-client/mutation";
import { FacilityVM } from "../../types";

export const CreateFacility = () => {
  const context = useContext(Context);

  const [addFacility] = useMutation(ADD_FACILITY);

  const addNewFacility = async (facilityVM: FacilityVM) => {
    try {
      await addFacility({
        variables: { facilityVM },
        onCompleted: () => {
          toast.success("Create facility successfully!");
          setShowSpinner(false);
          window.location.href = "/facility";
        },
        onError: () => {
          toast.error("Create facility failed!");
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    address: Yup.string().trim().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setShowSpinner(true);
      const facilityVM = {
        name: values.name,
        address: values.address,
      } as FacilityVM;
      addNewFacility(facilityVM);
    },
  });
  if (!context) {
    return null;
  }
  const { showSpinner, setShowSpinner } = context;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[70%] relative top-[60px] bg-slate-800 p-7 rounded-xl">
        <p className="font-medium text-xl w-full text-center">FACILITY</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Please enter a name!"
                className={
                  formik.touched.name && formik.errors.name ? "p-invalid" : ""
                }
              />
              {formik.touched.name && formik.errors.name && (
                <small className="p-error">{formik.errors.name}</small>
              )}
            </div>

            <div className="p-field mt-4">
              <label htmlFor="address">Address</label>
              <InputText
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Please enter a address!"
                className={
                  formik.touched.address && formik.errors.address
                    ? "p-invalid"
                    : ""
                }
              />
              {formik.touched.address && formik.errors.address && (
                <small className="p-error">{formik.errors.address}</small>
              )}
            </div>

            <div className="p-field mt-4 flex justify-center">
              <Button label="CREATE" type="submit" className="w-[30%]" />
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
