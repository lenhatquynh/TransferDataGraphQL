import { gql } from "@apollo/client";

//Facility
export const ADD_FACILITY = gql`
  mutation AddFacility($facilityVM: FacilityVMInput!) {
    addFacility(input: { facilityVM: $facilityVM }) {
      facility {
        id
        name
        address
      }
    }
  }
`;
export const UPDATE_FACILITY = gql`
  mutation UpdateFacility($input: UpdateFacilityInput!) {
    updateFacility(input: $input) {
      facility {
        id
        name
        address
      }
    }
  }
`;
export const DELETE_FACILITY = gql`
  mutation DeleteFacility($id: UUID!) {
    deleteFacility(input: { id: $id }) {
      facility {
        id
      }
    }
  }
`;
//Resident
export const ADD_RESIDENT = gql`
  mutation AddResident($residentVM: ResidentVMInput!) {
    addResident(input: { residentVM: $residentVM }) {
      resident {
        id
        firstName
        lastName
        dob
        facilityId
      }
    }
  }
`;
export const UPDATE_RESIDENT = gql`
  mutation UpdateResident($input: UpdateResidentInput!) {
    updateResident(input: $input) {
      resident {
        id
        firstName
        lastName
        dob
        facilityId
      }
    }
  }
`;
export const DELETE_RESIDENT = gql`
  mutation DeleteResident($id: UUID!) {
    deleteResident(input: { id: $id }) {
      resident {
        id
      }
    }
  }
`;
//Progress Note
export const ADD_PROGRESS_NOTE = gql`
  mutation AddProgressNote($progressNoteVM: ProgressNoteVMInput!) {
    addProgressNote(input: { progressNoteVM: $progressNoteVM }) {
      progressNote {
        id
        content
        type
        createdDate
        residentId
      }
    }
  }
`;
export const UPDATE_PROGRESS_NOTE = gql`
  mutation UpdateProgressNote($input: UpdateProgressNoteInput!) {
    updateProgressNote(input: $input) {
      progressNote {
        id
        content
        type
        createdDate
        residentId
      }
    }
  }
`;
export const DELETE_PROGRESS_NOTE = gql`
  mutation DeleteProgressNote($id: UUID!) {
    deleteProgressNote(input: { id: $id }) {
      progressNote {
        id
      }
    }
  }
`;
