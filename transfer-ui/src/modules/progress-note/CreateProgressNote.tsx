import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Context } from "../../App";
import { ProgressSpinner } from "primereact/progressspinner";
import { useMutation, useQuery } from "@apollo/client";
import { GET_RESIDENTS } from "../../graphql-client/queries";
import { ADD_PROGRESS_NOTE } from "../../graphql-client/mutation";
import { ProgressNoteVM, Resident } from "../../types";
import { NotFound } from "../../components";

const validationSchema = Yup.object({
  content: Yup.string().trim().required("Content is required"),
  type: Yup.string().trim().required("Type is required"),
  createdDate: Yup.date()
    .required("Created Date is required")
    .max(new Date(), "Created Date cannot be in the future"),
  residentId: Yup.string().required("Resident is required"),
});

export const CreateProgressNote = () => {
  const context = useContext(Context);
  const { loading, error, data } = useQuery(GET_RESIDENTS);
  const [addProgressNote] = useMutation(ADD_PROGRESS_NOTE);

  const formik = useFormik({
    initialValues: {
      content: "",
      type: "",
      createdDate: new Date(),
      residentId: undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      setShowSpinner(true);
      const progressNoteVM = {
        content: values.content,
        type: values.type,
        createdDate: values.createdDate,
        residentId: values.residentId,
      } as ProgressNoteVM;
      addNewProgressNote(progressNoteVM);
    },
  });
  const addNewProgressNote = async (progressNoteVM: ProgressNoteVM) => {
    try {
      await addProgressNote({
        variables: { progressNoteVM },
        onCompleted: () => {
          toast.success("Create progress note successfully!");
          setShowSpinner(false);
          window.location.href = "/progress-note";
        },
        onError: () => {
          toast.error("Create progress note failed!");
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (loading) {
    return (
      <ProgressSpinner className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    );
  }
  if (error) {
    return <NotFound />;
  }
  const residents = data?.residents as Resident[];

  if (!context) {
    return null;
  }
  const { showSpinner, setShowSpinner } = context;

  const residentOptions =
    residents.map((resident) => ({
      label: resident.firstName + " " + resident.lastName,
      value: resident.id,
    })) || [];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[70%] relative top-[60px] bg-slate-800 p-7 rounded-xl">
        <p className="font-medium text-xl w-full text-center">PROGRESS NOTE</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="content">Content</label>
              <InputText
                id="content"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Please enter a content!"
                className={
                  formik.touched.content && formik.errors.content
                    ? "p-invalid"
                    : ""
                }
              />
              {formik.touched.content && formik.errors.content && (
                <small className="p-error">{formik.errors.content}</small>
              )}
            </div>

            <div className="p-field mt-4">
              <label htmlFor="type">Type</label>
              <InputText
                id="type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Please enter a type!"
                className={
                  formik.touched.type && formik.errors.type ? "p-invalid" : ""
                }
              />
              {formik.touched.type && formik.errors.type && (
                <small className="p-error">{formik.errors.type}</small>
              )}
            </div>

            <div className="p-field mt-4">
              <label htmlFor="createdDate">Created Date</label>
              <Calendar
                id="createdDate"
                name="createdDate"
                value={formik.values.createdDate}
                onChange={(e) => formik.setFieldValue("createdDate", e.value)}
                showIcon
                dateFormat="dd/mm/yy"
                className={
                  formik.touched.createdDate && formik.errors.createdDate
                    ? "p-invalid"
                    : ""
                }
              />
              {formik.touched.createdDate && formik.errors.createdDate && (
                <small className="p-error">
                  {formik.errors.createdDate as string}
                </small>
              )}
            </div>

            <div className="p-field mt-4">
              <label htmlFor="residentId">Resident</label>
              <Dropdown
                id="residentId"
                name="residentId"
                value={formik.values.residentId}
                options={residentOptions}
                onChange={(e) => formik.setFieldValue("residentId", e.value)}
                placeholder="Select a resident"
                filter
                className={
                  formik.touched.residentId && formik.errors.residentId
                    ? "p-invalid"
                    : ""
                }
              />
              {formik.touched.residentId && formik.errors.residentId && (
                <small className="p-error">{formik.errors.residentId}</small>
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
