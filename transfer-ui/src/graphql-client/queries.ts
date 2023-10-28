import { gql } from "@apollo/client";

//Facility
export const GET_FACILITIES = gql`
  query getFacilitiesQuery {
    facilities {
      id
      name
      address
    }
  }
`;
export const GET_FACILITY_BY_ID = gql`
  query GetFacilityById($id: UUID!) {
    facility(id: $id) {
      id
      name
      address
    }
  }
`;

//Resident
export const GET_RESIDENTS = gql`
  query getResidentsQuery {
    residents {
      id
      firstName
      lastName
      dob
      facilityId
      facility {
        id
        name
        address
      }
    }
  }
`;
export const GET_RESIDENT_BY_ID = gql`
  query GetResidentById($id: UUID!) {
    resident(id: $id) {
      id
      firstName
      lastName
      dob
      facilityId
      facility {
        id
        name
        address
      }
    }
  }
`;
//ProgressNote
export const GET_PROGRESSNOTES = gql`
  query getProgressNotesQuery {
    progressNotes {
      id
      content
      type
      createdDate
      residentId
      resident {
        id
        firstName
        lastName
        dob
        facilityId
        facility {
          id
          name
          address
        }
      }
    }
  }
`;
export const GET_PROGRESS_NOTE_BY_ID = gql`
  query GetProgressNoteById($id: UUID!) {
    progressNote(id: $id) {
      id
      content
      type
      createdDate
      residentId
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
