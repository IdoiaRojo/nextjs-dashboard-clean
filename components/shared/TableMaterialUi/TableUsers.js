import React, { Component, useState, useEffect, useRef } from "react";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MaterialTable from "material-table";
import { forwardRef } from 'react';

import enLocale from "date-fns/locale/en-US";
import esLocale from "date-fns/locale/es";
import frLocale from "date-fns/locale/fr";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Delete, EditOutlined, Filter1Outlined, FilterListOutlined, PlusOneOutlined, Save, SearchOutlined, SendOutlined } from "@material-ui/icons";


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



import { resetServerContext } from "react-beautiful-dnd"

resetServerContext()

const localeMap = {
  en: enLocale,
  es: esLocale,
  fr: frLocale,
}


const TableUsers = ({ usersActive, usersInactive }) => {

  const [UsersData, setDashboardUsers] = useState(usersActive);
  const [loadingTable, setLoadingTable] = useState(false);
  const [value, setValue] = useState('active');

  const handleChange = (event, newValue) => {
    if (newValue == 'active') {
      setDashboardUsers(usersActive);
    } else {
      setDashboardUsers(usersInactive);
    }
    setValue(newValue);
  };


  return (
    <>
      <div className="table-new-styles">
        <Paper>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"

          >
            <Tab label="Users active" value="active" />
            <Tab label="Users inactive" value="inactive" />
          </Tabs>
        </Paper>

        <MaterialTable
          title={null}
          icons={tableIcons}
          columns={[
            { title: "", field: "tableData.id" },
            { title: 'User', field: 'nickname' },
            { title: 'Plan', field: 'plan_name' },
            { title: 'Fecha de inicio', field: 'active_from', type: 'datetime' },
            { title: 'Activo hasta', field: 'active_until', type: 'datetime' },
            { title: 'State', field: 'state' }
          ]}
          data={UsersData}
          actions={[
            {
              icon: EditOutlined,
              tooltip: 'Save User',
              onClick: (event, rowData) => alert("You saved " + rowData.name)
            },
            rowData => ({
              icon: DeleteOutline,
              tooltip: 'Delete User',
              onClick: (event, rowData) => confirm("You want to delete " + rowData.name),
              disabled: rowData.birthYear < 2000
            })
          ]}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
            filtering: false
          }}
          isLoading={loadingTable}
        />



      </div>
    </>
  );
}

export default TableUsers;
