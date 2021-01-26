import React, { Component, useState, useEffect, useRef } from "react";

import MaterialTable from "material-table";
import MTableToolbar from "material-table";
import { forwardRef } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import enLocale from "date-fns/locale/en-US";
import esLocale from "date-fns/locale/es";
import frLocale from "date-fns/locale/fr";

import ApiService from "@/services/api";

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

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
import { DragDropContext } from 'react-beautiful-dnd';
import { Delete, EditOutlined, Filter1Outlined, FilterListOutlined, Save, SearchOutlined, SendOutlined } from "@material-ui/icons";


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

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { dateTimeFormatter, FilterForm } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';


import { resetServerContext } from "react-beautiful-dnd"

resetServerContext()

const localeMap = {
  en: enLocale,
  es: esLocale,
  fr: frLocale,
}


const DataTable = ({ dashboardEvents }) => {
  const [fromDate, handleFromDateChange] = useState(new Date('2020/10/10'));
  const [toDate, handleToDateChange] = useState(new Date());
  const [dashboardEventsData, setDashboardEvents] = useState(dashboardEvents);
  const [loadingTable, setLoadingTable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  console.log("showFilters");
  console.log(showFilters);
  const isFirstRender = useRef(true);
  const toggleTrueFalse = () => setShowFilters(!showFilters);

  const [locale, setLocale] = useState("es");

  const handleFilter = () => {
    setLoadingTable(true);
    fetchData().then(() => {
      setLoadingTable(false);
    });

  }
  useEffect(() => {
    if (!isFirstRender.current) {
      handleFilter();
    }
    console.log('------ FECHAS SELECCIONAD -------');
    console.log(fromDate);
  }, [fromDate, toDate])

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  const fetchData = async () => {
    console.log(fromDate);
    console.log(toDate);
    var dashboardEventsNew = await ApiService.getDashboardEventsApi(fromDate, toDate);
    console.log(dashboardEventsNew);
    return setDashboardEvents(dashboardEventsNew.events);
  };

  return (
    <>
      <div className="table-new-styles">
        <div id="dates-filter">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
            <DatePicker
              value={fromDate}
              maxDate={new Date()}
              onChange={handleFromDateChange}
              format={"dd/MM/yyyy"} />
            <DatePicker
              value={toDate}
              maxDate={new Date()}
              onChange={handleToDateChange}
              format={"dd/MM/yyyy"} />
            <FilterListOutlined onClick={toggleTrueFalse} />
          </MuiPickersUtilsProvider>

        </div>

        <MaterialTable
          title={null}
          icons={tableIcons}
          columns={[
            { title: "", field: "tableData.id" },
            { title: 'Nickname', field: 'user_nickname' },
            { title: 'Email', field: 'user_email' },
            { title: 'Evento', field: 'type_of_event' },
            { title: 'locale', field: 'locale' },
            { title: 'Fecha de creación', field: 'created_at', type: 'datetime' }
            // { title: 'source', field: 'source' },
            // { title: 'Id', field: 'id', type: 'numeric' },
            // {
            //   title: 'Birth Place',
            //   field: 'birthCity',
            //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            // },
          ]}
          data={dashboardEventsData}
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
            filtering: showFilters ? true : false

          }}
          isLoading={loadingTable}
        // components={{
        //   Toolbar: props => (
        //     <div>
        //       <MTableToolbar {...props} />
        //       <div style={{ padding: '0px 10px' }}>
        //         <Button>Hola</Button>
        //         <Chip label="Chip 1" color="secondary" style={{ marginRight: 5 }} />
        //         <Chip label="Chip 2" color="secondary" style={{ marginRight: 5 }} />
        //         <Chip label="Chip 3" color="secondary" style={{ marginRight: 5 }} />
        //         <Chip label="Chip 4" color="secondary" style={{ marginRight: 5 }} />
        //         <Chip label="Chip 5" color="secondary" style={{ marginRight: 5 }} />
        //       </div>
        //     </div>
        //   ),
        // }}
        />



      </div>
    </>
  );
}

export default DataTable;
