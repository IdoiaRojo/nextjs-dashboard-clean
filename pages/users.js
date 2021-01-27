import React, { Component, useState } from "react";
import { withTranslation } from '../i18n'
import BaseLayout from '@/components/layouts/BaseLayout';
import UsersTable from '@/components/UsersTable';
import PaginationTableComponent from '@/components/shared/Table';
import TableUsers from '@/components/shared/TableMaterialUi/TableUsers';
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

const Users = ({ usersInitial, t }) => {
  const { user, loading } = useAuth();
  const [usersData, setData] = useState(usersInitial);
  const dash_col = 3;

  console.log(usersData);

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
              {usersData &&
                <Grid.Col className="section" lg={12}>
                  <h3 className="sectitle">User list</h3>
                  <h5 className="secsubtitle">{t('d_description')}</h5>
                  <TableUsers
                    usersActive={usersData.usersActive} usersInactive={usersData.usersInactive} />
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
  // if (usersInitial == null || dashboardDataInitial == null) {
  //   context.res.setHeader("location", "/login");
  //   context.res.statusCode = 302;
  //   context.res.end();
  // }

  return {
    props: {
      usersInitial: usersInitial
    },
  };
}

export default withTranslation('common')(Users);
