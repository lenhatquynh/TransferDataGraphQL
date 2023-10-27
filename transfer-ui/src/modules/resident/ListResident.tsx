import { useNavigate } from "react-router-dom";
import { NotFound } from "../../components";
import toast from "react-hot-toast";
import { Skeleton } from "primereact/skeleton";
import { Resident } from "../../types";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { customDate } from "../../shared/utils";
import { useContext } from "react";
import { Context } from "../../App";
import { ProgressSpinner } from "primereact/progressspinner";
export function ListResident() {
  const { data, isLoading, isError } = useGetAllResidentsQuery();
  const deleteResidentMutation = useDeleteResidentMutation();
  const navigate = useNavigate();
  const context = useContext(Context);

  if (isError) {
    return <NotFound />;
  }

  const handleDelete = (id: string) => {
    setShowSpinner(true);
    deleteResidentMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Delete resident successfully!");
        setShowSpinner(false);
      },
      onError: () => {
        toast.error("Delete resident failed!");
        setShowSpinner(false);
      },
    });
  };
  const bodySkeleton = () => {
    return <Skeleton></Skeleton>;
  };

  const bodyActions = (rowData: Resident) => {
    return (
      <div className="card flex flex-wrap justify-content-center gap-2">
        <Button
          type="button"
          icon="pi pi-pencil"
          severity="warning"
          label="Edit"
          onClick={() => navigate(`/resident/edit/${rowData.id}`)}
        ></Button>
        <Button
          type="button"
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={() => handleDelete(rowData.id)}
        ></Button>
      </div>
    );
  };
  if (!context) {
    return null;
  }
  const { showSpinner, setShowSpinner } = context;
  return (
    <div className="card">
      <div className="p-field mb-3 ">
        <Button
          label="CREATE RESIDENT"
          type="button"
          severity="success"
          className="w-[20%]"
          onClick={() => navigate("/resident/create")}
        />
      </div>
      {showSpinner && (
        <ProgressSpinner className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}
      <DataTable
        value={data?.data}
        className="p-datatable-striped"
        removableSort
        scrollable
        scrollHeight="68vh"
      >
        <Column
          field="id"
          header="Id"
          style={{ width: "10%" }}
          body={isLoading ? bodySkeleton : null}
          sortable
        ></Column>
        <Column
          field="firstName"
          header="First Name"
          style={{ width: "17%" }}
          body={isLoading ? bodySkeleton : null}
          sortable
        ></Column>
        <Column
          field="lastName"
          header="Last Name"
          style={{ width: "17%" }}
          body={isLoading ? bodySkeleton : null}
          sortable
        ></Column>
        <Column
          field="dob"
          header="Date of Birth"
          style={{ width: "17%" }}
          body={
            isLoading
              ? bodySkeleton
              : (rowData: Resident) => customDate(rowData.dob)
          }
          sortable
        ></Column>
        <Column
          field="facility"
          header="Facility"
          style={{ width: "17%" }}
          body={
            isLoading
              ? bodySkeleton
              : (rowData: Resident) => {
                  return rowData.facility?.name;
                }
          }
          sortable
        ></Column>
        <Column
          field="action"
          header="Action"
          style={{ width: "20%" }}
          body={isLoading ? bodySkeleton : bodyActions}
        ></Column>
      </DataTable>
    </div>
  );
}
