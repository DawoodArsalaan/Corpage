import React from "react";

import CustomCrudModule from "@/modules/CustomCrudModule";
import CustomerForm from "@/forms/CustomerForm";

function SelectCustomer() {
  const entity = "client";
  const searchConfig = {
    displayLabels: ["company", "surname", "name"],
    searchFields: "company,surname,name",
    outputValue: "_id",
  };

  const panelTitle = "Select Employee Panel";
  const dataTableTitle = "Employee Lists";
  const entityDisplayLabels = ["company"];

  const readColumns = [
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Manager Surname",
      dataIndex: "surname",
    },
    {
      title: "Manager Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
  ];
  const dataTableColumns = [
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Manager Surname",
      dataIndex: "surname",
    },
    {
      title: "Manager Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  const ADD_NEW_ENTITY = "Add new Employee";
  const DATATABLE_TITLE = "Employee List";
  const ENTITY_NAME = "Employee";
  const CREATE_ENTITY = "Create Employee";
  const UPDATE_ENTITY = "Update Employee";
  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CustomCrudModule
      createForm={<CustomerForm />}
      updateForm={<CustomerForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default SelectCustomer;
