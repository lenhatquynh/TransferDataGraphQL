import { Resident } from "./resident";

export interface ProgressNote {
  id: string;
  content: string;
  type: string;
  createdDate: Date;
  residentId?: number;
  resident?: Resident;
}
