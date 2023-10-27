import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./components";
import {
  ListFacilities,
  CreateFacility,
  EditFacility,
} from "./modules/facility";
import { ListResident, CreateResident, EditResident } from "./modules/resident";
import {
  ListProgressNote,
  CreateProgressNote,
  EditProgressNote,
} from "./modules/progress-note";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ListFacilities />} />
        <Route path="facility" element={<ListFacilities />} />
        <Route path="facility/edit/:id" element={<EditFacility />} />
        <Route path="facility/create" element={<CreateFacility />} />
        <Route path="resident" element={<ListResident />} />
        <Route path="resident/edit/:id" element={<EditResident />} />
        <Route path="resident/create" element={<CreateResident />} />
        <Route path="progress-note" element={<ListProgressNote />} />
        <Route path="progress-note/edit/:id" element={<EditProgressNote />} />
        <Route path="progress-note/create" element={<CreateProgressNote />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
