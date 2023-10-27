import { Facility } from "./facility";
import { Resident } from "./resident";
import { ProgressNote } from "./progress-note";

export type FacilityVM = Omit<Facility, "id">;
export type ResidentVM = Omit<Resident, "id">;
export type ProgressNoteVM = Omit<ProgressNote, "id">;
