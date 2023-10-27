import { useNavigate, useParams } from "react-router-dom";
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
import { QUERY_KEYS } from "../../shared/constant";

export const EditProgressNote = () => {
  const { id } = useParams();
  const { data, isError } = useGetProgressNoteQuery(id as string);
  const residents = useGetAllResidentsQuery();
  const updateProgressNoteMutation = useUpdateProgressNoteMutation();
  const navigate = useNavigate();
  const context = useContext(Context);

  const validationSchema = Yup.object({
    content: Yup.string().trim().required("Content is required"),
    type: Yup.string().trim().required("Type is required"),
    createdDate: Yup.date()
      .required("Created Date is required")
      .max(new Date(), "Created Date cannot be in the future"),
    residentId: Yup.string().required("Resident is required"),
  });

  const formik = useFormik({
    initialValues: {
      content: "",
      type: "",
      createdDate: new Date(),
      residentId: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      setShowSpinner(true);
      updateProgressNoteMutation.mutate(
        {
          id: id as any,
          content: values.content,
          type: values.type,
          createdDate: values.createdDate,
          residentId: values.residentId,
        },
        {
          onSuccess: () => {
            toast.success("Update progress note successfully!");
            setShowSpinner(false);
            navigate("/progress-note");
          },
          onError: () => toast.error("Update progress note failed!"),
        }
      );
    },
  });

  useEffect(() => {
    if (data?.data) {
      formik.setValues({
        content: data.data.content,
        type: data.data.type,
        createdDate: new Date(data.data.createdDate),
        residentId: data.data.resident?.id as any,
      });
    }
  }, [data]);
  if (!context) {
    return null;
  }
  const { showSpinner, setShowSpinner } = context;
  if (isError) {
    return <NotFound />;
  }
  const residentOptions =
    residents.data?.data.map((resident) => ({
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
              <label htmlFor="content">Progress Note</label>
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
