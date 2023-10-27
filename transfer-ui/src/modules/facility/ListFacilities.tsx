import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Button } from "primereact/button";
import { NotFound } from "../../components";
import { Facility } from "../../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { Context } from "../../App";
import { ProgressSpinner } from "primereact/progressspinner";

export function ListFacilities() {
  const { data, isLoading, isError } = useGetAllFacilitiesQuery();
  const deleteFacilityMutation = useDeleteFacilityMutation();
  const navigate = useNavigate();
  const context = useContext(Context);

  if (isError) {
    return <NotFound />;
  }

  const handleDelete = (id: string) => {
    setShowSpinner(true);
    deleteFacilityMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Delete facility successfully!");
        setShowSpinner(false);
      },
      onError: () => {
        toast.error("Delete facility failed!");
        setShowSpinner(false);
      },
    });
  };

  const bodySkeleton = () => {
    return <Skeleton></Skeleton>;
  };

  const bodyActions = (rowData: Facility) => {
    return (
      <div className="card flex flex-wrap justify-content-center gap-2">
        <Button
          type="button"
          icon="pi pi-pencil"
          severity="warning"
          label="Edit"
          onClick={() => navigate(`/facility/edit/${rowData.id}`)}
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
          label="CREATE FACILITY"
          type="button"
          severity="success"
          className="w-[20%]"
          onClick={() => navigate("/facility/create")}
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
          style={{ width: "20%" }}
          body={isLoading ? bodySkeleton : null}
          sortable
        ></Column>
        <Column
          field="name"
          header="Name"
          style={{ width: "30%" }}
          body={isLoading ? bodySkeleton : null}
          sortable
        ></Column>
        <Column
          field="address"
          header="Address"
          style={{ width: "30%" }}
          body={isLoading ? bodySkeleton : null}
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
