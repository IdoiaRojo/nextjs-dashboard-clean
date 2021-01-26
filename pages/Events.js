import React, { Component, useState } from "react";
import { withTranslation } from '../i18n'
import BaseLayout from '@/components/layouts/BaseLayout';

import DataTable from '@/components/shared/TableMaterialUi/TableMaterialUi';

import { useAuth } from '@/hooks/useAuth';

import ApiService from "@/services/api";
import "tabler-react/dist/Tabler.css";
import {
  Grid,
} from "tabler-react";


const Events = ({ dashboardEventsInitial, t }) => {
  const { user, loading } = useAuth();

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
                  <h3 className="sectitle">Event list</h3>
                  <h5 className="secsubtitle">Lista de eventos generados</h5>
                  <DataTable
                    dashboardEvents={dashboardEvents.events} />
                </Grid.Col>
              }

            </Grid.Row>
          </div>
        </div>
      </BaseLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const fromDate = new Date('2020/10/10');
  const toDate = new Date();
  const dashboardEventsInitial = await ApiService.getDashboardEventsApi(fromDate, toDate, context.req);

  return {
    props: {
      dashboardEventsInitial: dashboardEventsInitial,
    },
  };
}

export default withTranslation('common')(Events);
