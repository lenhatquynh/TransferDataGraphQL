import React from "react";
import { Menubar } from "primereact/menubar";

export const Header: React.FC = () => {
  const navList = [
    {
      label: "Facility",
      icon: "pi pi-fw pi-building",
      command: () => {
        window.location.href = "/facility";
      },
    },
    {
      label: "Resident",
      icon: "pi pi-fw pi-user",
      command: () => {
        window.location.href = "/resident";
      },
    },
    {
      label: "Progress Note",
      icon: "pi pi-fw pi-calendar",
      command: () => {
        window.location.href = "/progress-note";
      },
    },
  ];
  return (
    <div>
      <header>
        <nav>
          <ul>
            <Menubar model={navList} />
          </ul>
        </nav>
      </header>
    </div>
  );
};
