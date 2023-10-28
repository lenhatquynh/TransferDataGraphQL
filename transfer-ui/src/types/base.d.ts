import { Facility } from "./facility";
import { Resident } from "./resident";
import { ProgressNote } from "./progress-note";

export type FacilityVM = Omit<Facility, "id">;
export type ResidentVM = Omit<Resident, "id">;
export type ProgressNoteVM = Omit<ProgressNote, "id">;

export interface UpdateFacilityInput {
  id: string;
  facilityVM: FacilityVM;
}
export interface UpdateResidentInput {
  id: string;
  residentVM: ResidentVM;
}
export interface UpdateProgressNoteInput {
  id: string;
  progressNoteVM: ProgressNoteVM;
}
