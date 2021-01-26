import React, { Component, useState } from "react";
import { withTranslation } from '../i18n'
import BaseLayout from '@/components/layouts/BaseLayout';
import UsersTable from '@/components/UsersTable';
import PaginationTableComponent from '@/components/shared/Table';
import DataTable from '@/components/shared/TableMaterialUi/TableMaterialUi';
import PolarRating from '@/components/charts/PolarRating'

import { useAuth } from '@/hooks/useAuth';

import ApiService from "@/services/api";

import "tabler-react/dist/Tabler.css";
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  colors,
  Dropdown,
  Button,
  StampCard,
  StatsCard,
  ProgressCard,
  Badge,
} from "tabler-react";

import C3Chart from "react-c3js";

const Users = ({ dashboardDataInitial, usersInitial, dashboardEventsInitial, t }) => {
  const { user, loading } = useAuth();
  const [loadingCharts, setLoadingCharts] = useState(false);
  const [usersData, setData] = useState(usersInitial);
  const [dashboardData, setDashboardData] = useState(dashboardDataInitial);
  const [dashboardEvents, setDashboardEvents] = useState(dashboardEventsInitial);
  const dash_col = 3;

  const fetchData = async (select_time) => {
    const dashboardData = await ApiService.getDashboardDataApi(select_time);
    return setDashboardData(dashboardData);
  };

  const handleChange = e => {
    setLoadingCharts(true);
    fetchData(e.target.value).then(() => {
      setLoadingCharts(false);
    });

  }

  console.log(usersData);
  console.log(dashboardEvents);

  return (
    <>
      <BaseLayout
        user={user}
        loading={loading}
        navClass="transparent"
        className="cover">
        <div className="row dashboard" id="users-dashboard">
          <div className="container" id="">
            <Grid.Row>
              {dashboardEvents &&
                <Grid.Col className="section" lg={12}>
                  <h3 className="sectitle">User list</h3>
                  <h5 className="secsubtitle">{t('d_description')}</h5>
                  <DataTable
                    dashboardEvents={dashboardEvents.events} />
                </Grid.Col>
              }
              {/* {usersData &&
                <Grid.Col className="section" lg={12}>
                  <h3 className="sectitle">User list</h3>
                  <h5 className="secsubtitle">{t('d_description')}</h5>
                  <PaginationTableComponent users={usersData.usersActive} />
                </Grid.Col>
              }
              {usersData &&
                <Grid.Col className="section" lg={12}>
                  <h3 className="sectitle">User list</h3>
                  <h5 className="secsubtitle">{t('d_description')}</h5>
                  <UsersTable users={usersData.usersActive}></UsersTable>
                </Grid.Col>
              }

              {dashboardData &&
                <Grid.Col className="section" lg={6} sm={6}>
                  <h3 className="sectitle">Users by device</h3>
                  <h5 className="secsubtitle">{t('d_description')}</h5>
                  <PolarRating data_api={usersData.devise} />
                </Grid.Col>
              } */}
            </Grid.Row>
          </div>
        </div>
      </BaseLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const usersInitial = await ApiService.getUsersDataApi(context.req);
  const dashboardDataInitial = await ApiService.getDashboardDataApi('week', context.req);
  const dashboardEventsInitial = await ApiService.getDashboardEventsApi('week', context.req);
  // if (usersInitial == null || dashboardDataInitial == null) {
  //   context.res.setHeader("location", "/login");
  //   context.res.statusCode = 302;
  //   context.res.end();
  // }

  return {
    props: {
      usersInitial: usersInitial,
      dashboardDataInitial: dashboardDataInitial,
      dashboardEventsInitial: dashboardEventsInitial,
    },
  };
}

export default withTranslation('common')(Users);
