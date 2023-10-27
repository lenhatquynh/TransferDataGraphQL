export const DEFAULT_URL_API = "https://localhost:7141/graphql/";

export const URL_API = {
  FACILITY: {
    GET_ALL: "/facility/get-all",
    GET_BY_ID: "/facility/get-by-id",
    ADD: "/facility/add",
    UPDATE: "/facility/update",
    DELETE: "/facility/delete",
  },
  RESIDENT: {
    GET_ALL: "/resident/get-all",
    GET_BY_ID: "/resident/get-by-id",
    ADD: "/resident/add",
    UPDATE: "/resident/update",
    DELETE: "/resident/delete",
  },
  PROGRESS_NOTE: {
    GET_ALL: "/progress-note/get-all",
    GET_BY_ID: "/progress-note/get-by-id",
    ADD: "/progress-note/add",
    UPDATE: "/progress-note/update",
    DELETE: "/progress-note/delete",
  },
};

export const QUERY_KEYS = {
  FACILITY: {
    GET_ALL: "GET_ALL_FACILITY",
    GET_BY_ID: "GET_FACILITY_BY_ID",
    ADD: "ADD_FACILITY",
    UPDATE: "UPDATE_FACILITY",
    DELETE: "DELETE_FACILITY",
  },
  RESIDENT: {
    GET_ALL: "GET_ALL_RESIDENT",
    GET_BY_ID: "GET_RESIDENT_BY_ID",
    ADD: "ADD_RESIDENT",
    UPDATE: "UPDATE_RESIDENT",
    DELETE: "DELETE_RESIDENT",
  },
  PROGRESS_NOTE: {
    GET_ALL: "GET_ALL_PROGRESS_NOTE",
    GET_BY_ID: "GET_PROGRESS_NOTE_BY_ID",
    ADD: "ADD_PROGRESS_NOTE",
    UPDATE: "UPDATE_PROGRESS_NOTE",
    DELETE: "DELETE_PROGRESS_NOTE",
  },
};
