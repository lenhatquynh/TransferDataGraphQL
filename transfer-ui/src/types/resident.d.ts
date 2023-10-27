import { Facility } from "./facility";
export interface Resident {
  id: string;
  firstName: string;
  lastName: string;
  dob: Date;
  facilityId?: number;
  facility?: Facility;
}
