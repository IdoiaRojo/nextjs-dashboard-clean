import React, { Component, useState } from "react";
import { withTranslation } from '../i18n'
import BaseLayout from '@/components/layouts/BaseLayout';
import UsersTable from '@/components/UsersTable';
import Chart from '@/components/chart'
import ChartContentView from '@/components/charts/ChartContentView'
import ChartChat from '@/components/charts/ChartChat'
import ChartVideo from '@/components/charts/ChartVideo'
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

const Users = ({ dashboardDataInitial, usersInitial, t }) => {
  const { user, loading } = useAuth();
  const [usersData, setData] = useState(usersInitial);
  const [dashboardData, setDashboardData] = useState(dashboardDataInitial);
  const dash_col = 3;

  const fetchData = async (select_time) => {
    const dashboardData = await ApiService.getDashboardDataApi(select_time);
    return setDashboardData(dashboardData);
  };

  const handleChange = e => {
    fetchData(e.target.value);
  }

  return (
    <>
      <BaseLayout
        user={user}
        loading={loading}
        navClass="transparent"
        className="cover">
        <div className="row" id="partner-dashboard">
          <div className="container" id="">
            <div>
              <ul className="nav nav-select">
                <li className="sectitle">{t('d_overview')}</li>
                <select onChange={handleChange} className="nav-link dropdown-toggle">
                  <option value="week" selectedvalue="true">{t('d_lastweek')}</option>
                  <option value="month" >{t('d_lastmonth')}</option>
                  <option value="quarter">{t('d_lastquarter')}</option>
                </select>
              </ul>
              <ul className="data">
                <li className="active box">
                  <div className="icon"><img src="/images/ic_users@2x.png" /></div>
                  <p className="number" id="n_users">{dashboardData.data.dashboard_data[0]['total_users']}</p>
                  <p className="description">{t('d_users')}</p>
                </li>
                <li className="box">
                  <div className="icon"><img src="/images/ic_path@2x.png" /></div>
                  <p className="number" id="n_journey">{dashboardData.data.dashboard_data[0]['journey']}</p>
                  <p className="description">{t('d_journey')}</p>
                </li>
                <li className="box">
                  <div className="icon"><img src="/images/ic_chat@2x.png" /></div>
                  <p className="number" id="n_qa">{dashboardData.data.dashboard_data[0]['qa']}</p>
                  <p className="description">{t('d_qa')}</p>
                </li>
                <li className="box">
                  <div className="icon"><img src="/images/ic_therapy@2x.png" /></div>
                  <p className="number" id="n_therapy">{dashboardData.data.dashboard_data[0]['therapy']}</p>
                  <p className="description">{t('d_therapy')}</p>
                </li>
              </ul>
            </div>
            <Grid.Row cards={true}>
              {dashboardData &&
                <>
                  <Grid.Col width={dash_col} s3={4} lg={dash_col}>
                    <StatsCard layout={1} movement={6} total={dashboardData.data.dashboard_data[0]['total_users']} label={t('d_users')} />
                  </Grid.Col>

                  <Grid.Col width={dash_col} s3={4} lg={dash_col}>
                    <StatsCard
                      layout={1}
                      movement={-3}
                      total={dashboardData.data.dashboard_data[0]['journey']}
                      label={t('d_journey')}
                    />
                  </Grid.Col>

                  <Grid.Col width={dash_col} s3={4} lg={dash_col}>
                    <StatsCard layout={1} movement={9} total={dashboardData.data.dashboard_data[0]['qa']} label={t('d_qa')} />
                  </Grid.Col>

                  <Grid.Col width={dash_col} s3={4} lg={dash_col}>
                    <StatsCard
                      layout={1}
                      movement={3}
                      total={dashboardData.data.dashboard_data[0]['therapy']}
                      label={t('d_therapy')}
                    />
                  </Grid.Col>
                </>
              }
              {dashboardData &&
                <Grid.Col className="section" lg={12}>
                  <h3 className="sectitle">Content view</h3>
                  <ChartContentView data_api={dashboardData.data.content_view} />
                </Grid.Col>
              }
              {dashboardData &&
                <Grid.Col className="section" lg={12}>
                  <h3 className="sectitle">Chat sessions</h3>
                  <ChartChat data_api={dashboardData.data.chat} />
                </Grid.Col>
              }
              {dashboardData &&
                <Grid.Col className="section" lg={12}>
                  <h3 className="sectitle">Video session validated</h3>
                  <ChartVideo data_api={dashboardData.data.video} />
                </Grid.Col>
              }
              {usersData &&
                <Grid.Col className="section" lg={12}>
                  <h3 className="sectitle">User list</h3>
                  <h5 className="secsubtitle">{t('d_description')}</h5>
                  <UsersTable users={usersData.users}></UsersTable>
                </Grid.Col>
              }

              {dashboardData &&
                <Grid.Col className="section" lg={6} sm={6}>
                  <h3 className="sectitle">Users by device</h3>
                  <h5 className="secsubtitle">{t('d_description')}</h5>
                  <PolarRating data_api={usersData.devise} />
                </Grid.Col>
              }
              <Grid.Col className="section" lg={6} sm={6}>
                <Card>
                  <Card.Header>
                    <Card.Title>Chart title</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <C3Chart
                      style={{ height: "12rem" }}
                      data={{
                        columns: [
                          // each columns data
                          ["data1", 63],
                          ["data2", 44],
                          ["data3", 12],
                          ["data4", 14],
                        ],
                        type: "pie", // default type of chart
                        colors: {
                          data1: colors["blue-darker"],
                          data2: colors["blue"],
                          data3: colors["blue-light"],
                          data4: colors["blue-lighter"],
                        },
                        names: {
                          // name of each serie
                          data1: "A",
                          data2: "B",
                          data3: "C",
                          data4: "D",
                        },
                      }}
                      legend={{
                        show: false, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>


              <Grid.Col lg={4} sm={4}>
                <Card>
                  <Card.Header>
                    <Card.Title>Chart title</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <C3Chart
                      style={{ height: "12rem" }}
                      data={{
                        columns: [
                          // each columns data
                          ["data1", 63],
                          ["data2", 37],
                        ],
                        type: "donut", // default type of chart
                        colors: {
                          data1: colors["green"],
                          data2: colors["green-light"],
                        },
                        names: {
                          // name of each serie
                          data1: "Maximum",
                          data2: "Minimum",
                        },
                      }}
                      legend={{
                        show: false, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>

              <Grid.Col md={6}>
                <Alert type="primary">
                  <Alert.Link
                    href={
                      process.env.NODE_ENV === "production"
                        ? "https://tabler.github.io/tabler-react/documentation"
                        : "/documentation"
                    }
                  >
                    Read our documentation
                </Alert.Link>{" "}
                with code samples.
              </Alert>
                <Grid.Row>
                  <Grid.Col sm={6}>
                    <ProgressCard
                      header="New feedback"
                      content="62"
                      progressColor="red"
                      progressWidth={28}
                    />
                  </Grid.Col>
                  <Grid.Col sm={6}>
                    <ProgressCard
                      header="Today profit"
                      content="$652"
                      progressColor="green"
                      progressWidth={84}
                    />
                  </Grid.Col>
                  <Grid.Col sm={6}>
                    <ProgressCard
                      header="Users online"
                      content="76"
                      progressColor="yellow"
                      progressWidth={34}
                    />
                  </Grid.Col>
                </Grid.Row>
              </Grid.Col>
              <Grid.Col sm={6} lg={3}>
                <StampCard
                  color="blue"
                  icon="dollar-sign"
                  header={
                    <a href="#">
                      132 <small>Sales</small>
                    </a>
                  }
                  footer={"12 waiting payments"}
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={3}>
                <StampCard
                  color="green"
                  icon="shopping-cart"
                  header={
                    <a href="#">
                      78 <small>Orders</small>
                    </a>
                  }
                  footer={"32 shipped"}
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={3}>
                <StampCard
                  color="red"
                  icon="users"
                  header={
                    <a href="#">
                      1,352 <small>Members</small>
                    </a>
                  }
                  footer={"163 registered today"}
                />
              </Grid.Col>
              <Grid.Col sm={6} lg={3}>
                <StampCard
                  color="yellow"
                  icon="message-square"
                  header={
                    <a href="#">
                      132 <small>Comments</small>
                    </a>
                  }
                  footer={"16 waiting"}
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row cards deck>
              <Grid.Col width={12}>
                <Card>
                  <Table
                    responsive
                    highlightRowOnHover
                    hasOutline
                    verticalAlign="center"
                    cards
                    className="text-nowrap"
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.ColHeader alignContent="center" className="w-1">
                          <i className="icon-people" />
                        </Table.ColHeader>
                        <Table.ColHeader>User</Table.ColHeader>
                        <Table.ColHeader>Usage</Table.ColHeader>
                        <Table.ColHeader alignContent="center">
                          Payment
                    </Table.ColHeader>
                        <Table.ColHeader>Activity</Table.ColHeader>
                        <Table.ColHeader alignContent="center">
                          Satisfaction
                    </Table.ColHeader>
                        <Table.ColHeader alignContent="center">
                          <i className="icon-settings" />
                        </Table.ColHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Col alignContent="center">
                          <Avatar
                            imageURL="demo/faces/female/26.jpg"
                            className="d-block"
                            status="green"
                          />
                        </Table.Col>
                        <Table.Col>
                          <div>Elizabeth Martin</div>
                          <Text size="sm" muted>
                            Registered: Mar 19, 2018
                      </Text>
                        </Table.Col>
                        <Table.Col>
                          <div className="clearfix">
                            <div className="float-left">
                              <strong>42%</strong>
                            </div>
                            <div className="float-right">
                              <Text.Small muted>
                                Jun 11, 2015 - Jul 10, 2015
                          </Text.Small>
                            </div>
                          </div>
                          <Progress size="xs">
                            <Progress.Bar color="yellow" width={42} />
                          </Progress>
                        </Table.Col>
                        <Table.Col alignContent="center">
                          <Icon payment name="visa" />
                        </Table.Col>
                        <Table.Col>
                          <Text size="sm" muted>
                            Last login
                      </Text>
                          <div>4 minutes ago</div>
                        </Table.Col>
                        <Table.Col alignContent="center">42%</Table.Col>
                        <Table.Col alignContent="center">
                          <Dropdown
                            trigger={
                              <Dropdown.Trigger
                                icon="more-vertical"
                                toggle={false}
                              />
                            }
                            position="right"
                            items={
                              <React.Fragment>
                                <Dropdown.Item icon="tag">Action </Dropdown.Item>
                                <Dropdown.Item icon="edit-2">
                                  Another action{" "}
                                </Dropdown.Item>
                                <Dropdown.Item icon="message-square">
                                  Something else here
                            </Dropdown.Item>
                                <Dropdown.ItemDivider />
                                <Dropdown.Item icon="link">
                                  {" "}
                              Separated link
                            </Dropdown.Item>
                              </React.Fragment>
                            }
                          />
                        </Table.Col>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Card>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col sm={6} lg={4}>
                <Card title="Browser Stats">
                  <Table className="card-table">
                    <Table.Row>
                      <Table.Col>
                        <Icon prefix="fa" name="chrome" className="text-muted" />
                      </Table.Col>
                      <Table.Col>Google Chrome</Table.Col>
                      <Table.Col className="text-right">
                        <Text RootComponent="span" muted>
                          23%
                    </Text>
                      </Table.Col>
                    </Table.Row>
                  </Table>
                </Card>
              </Grid.Col>
              <Grid.Col sm={6} lg={4}>
                <Card title="Projects">
                  <Table cards>
                    <Table.Row>
                      <Table.Col>Admin Template</Table.Col>
                      <Table.Col alignContent="right">
                        <Badge color="default">65%</Badge>
                      </Table.Col>
                    </Table.Row>
                  </Table>
                </Card>
              </Grid.Col>
              <Grid.Col md={6} lg={4}>
                <Card title="Members">
                  <Card.Body>
                    <ul className="list-unstyled list-separated">
                      <li className="list-separated-item">
                        <Grid.Row className="align-items-center">
                          <Grid.Col auto>
                            <Avatar
                              size="md"
                              className="d-block"
                              imageURL="demo/faces/female/12.jpg"
                            />
                          </Grid.Col>
                          <Grid.Col>
                            <div>
                              <a className="text-inherit" href="#">
                                Amanda Hunt
                          </a>
                            </div>
                            <Text.Small muted className="d-block item-except h-1x">
                              amanda_hunt@example.com
                        </Text.Small>
                          </Grid.Col>
                          <Grid.Col auto>
                            <Dropdown
                              trigger={
                                <Dropdown.Trigger
                                  icon="more-vertical"
                                  toggle={false}
                                />
                              }
                              position="right"
                              items={
                                <React.Fragment>
                                  <Dropdown.Item icon="tag">Action </Dropdown.Item>
                                  <Dropdown.Item icon="edit-2">
                                    {" "}
                                Another action{" "}
                                  </Dropdown.Item>
                                  <Dropdown.Item icon="message-square">
                                    {" "}
                                Something else here
                              </Dropdown.Item>
                                  <Dropdown.ItemDivider />
                                  <Dropdown.Item icon="link">
                                    {" "}
                                Separated link
                              </Dropdown.Item>
                                </React.Fragment>
                              }
                            />
                          </Grid.Col>
                        </Grid.Row>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Grid.Col>
              <Grid.Col md={6} lg={12}>
                <Grid.Row>
                  <Grid.Col sm={6} lg={3}>
                    <StatsCard
                      layout={2}
                      movement={5}
                      total="423"
                      label="Users online"
                      chart={
                        <C3Chart
                          style={{ height: "100%" }}
                          padding={{
                            bottom: -10,
                            left: -1,
                            right: -1,
                          }}
                          data={{
                            names: {
                              data1: "Users online",
                            },
                            columns: [["data1", 30, 40, 10, 40, 12, 22, 40]],
                            type: "area",
                          }}
                          legend={{
                            show: false,
                          }}
                          transition={{
                            duration: 0,
                          }}
                          point={{
                            show: false,
                          }}
                          tooltip={{
                            format: {
                              title: function (x) {
                                return "";
                              },
                            },
                          }}
                          axis={{
                            y: {
                              padding: {
                                bottom: 0,
                              },
                              show: false,
                              tick: {
                                outer: false,
                              },
                            },
                            x: {
                              padding: {
                                left: 0,
                                right: 0,
                              },
                              show: false,
                            },
                          }}
                          color={{
                            pattern: ["#467fcf"],
                          }}
                        />
                      }
                    />
                  </Grid.Col>
                  <Grid.Col sm={6} lg={3}>
                    <StatsCard
                      layout={2}
                      movement={-3}
                      total="423"
                      label="Users online"
                      chart={
                        <C3Chart
                          style={{ height: "100%" }}
                          padding={{
                            bottom: -10,
                            left: -1,
                            right: -1,
                          }}
                          data={{
                            names: {
                              data1: "Users online",
                            },
                            columns: [["data1", 30, 40, 10, 40, 12, 22, 40]],
                            type: "area",
                          }}
                          legend={{
                            show: false,
                          }}
                          transition={{
                            duration: 0,
                          }}
                          point={{
                            show: false,
                          }}
                          tooltip={{
                            format: {
                              title: function (x) {
                                return "";
                              },
                            },
                          }}
                          axis={{
                            y: {
                              padding: {
                                bottom: 0,
                              },
                              show: false,
                              tick: {
                                outer: false,
                              },
                            },
                            x: {
                              padding: {
                                left: 0,
                                right: 0,
                              },
                              show: false,
                            },
                          }}
                          color={{
                            pattern: ["#e74c3c"],
                          }}
                        />
                      }
                    />
                  </Grid.Col>
                  <Grid.Col sm={6} lg={3}>
                    <StatsCard
                      layout={2}
                      movement={-3}
                      total="423"
                      label="Users online"
                      chart={
                        <C3Chart
                          style={{ height: "100%" }}
                          padding={{
                            bottom: -10,
                            left: -1,
                            right: -1,
                          }}
                          data={{
                            names: {
                              data1: "Users online",
                            },
                            columns: [["data1", 30, 40, 10, 40, 12, 22, 40]],
                            type: "area",
                          }}
                          legend={{
                            show: false,
                          }}
                          transition={{
                            duration: 0,
                          }}
                          point={{
                            show: false,
                          }}
                          tooltip={{
                            format: {
                              title: function (x) {
                                return "";
                              },
                            },
                          }}
                          axis={{
                            y: {
                              padding: {
                                bottom: 0,
                              },
                              show: false,
                              tick: {
                                outer: false,
                              },
                            },
                            x: {
                              padding: {
                                left: 0,
                                right: 0,
                              },
                              show: false,
                            },
                          }}
                          color={{
                            pattern: ["#5eba00"],
                          }}
                        />
                      }
                    />
                  </Grid.Col>
                  <Grid.Col sm={6} lg={3}>
                    <StatsCard
                      layout={2}
                      movement={9}
                      total="423"
                      label="Users online"
                      chart={
                        <C3Chart
                          style={{ height: "100%" }}
                          padding={{
                            bottom: -10,
                            left: -1,
                            right: -1,
                          }}
                          data={{
                            names: {
                              data1: "Users online",
                            },
                            columns: [["data1", 30, 40, 10, 40, 12, 22, 40]],
                            type: "area",
                          }}
                          legend={{
                            show: false,
                          }}
                          transition={{
                            duration: 0,
                          }}
                          point={{
                            show: false,
                          }}
                          tooltip={{
                            format: {
                              title: function (x) {
                                return "";
                              },
                            },
                          }}
                          axis={{
                            y: {
                              padding: {
                                bottom: 0,
                              },
                              show: false,
                              tick: {
                                outer: false,
                              },
                            },
                            x: {
                              padding: {
                                left: 0,
                                right: 0,
                              },
                              show: false,
                            },
                          }}
                          color={{
                            pattern: ["#f1c40f"],
                          }}
                        />
                      }
                    />
                  </Grid.Col>
                </Grid.Row>
              </Grid.Col>
              <Grid.Col width={12}>
                <Card title="Invoices">
                  <Table
                    responsive
                    className="card-table table-vcenter text-nowrap"
                    headerItems={[
                      { content: "No.", className: "w-1" },
                      { content: "Invoice Subject" },
                      { content: "Client" },
                      { content: "VAT No." },
                      { content: "Created" },
                      { content: "Status" },
                      { content: "Price" },
                      { content: null },
                      { content: null },
                    ]}
                    bodyItems={[
                      {
                        key: "1",
                        item: [
                          {
                            content: (
                              <Text RootComponent="span" muted>
                                001401
                              </Text>
                            ),
                          },
                          {
                            content: (
                              <a href="invoice.html" className="text-inherit">
                                Design Works
                              </a>
                            ),
                          },
                          { content: "Carlson Limited" },
                          { content: "87956621" },
                          { content: "15 Dec 2017" },
                          {
                            content: (
                              <React.Fragment>
                                <span className="status-icon bg-success" /> Paid
                              </React.Fragment>
                            ),
                          },
                          { content: "$887" },
                          {
                            alignContent: "right",
                            content: (
                              <React.Fragment>
                                <Button size="sm" color="secondary">
                                  Manage
                            </Button>
                                <div className="dropdown">
                                  <Button
                                    color="secondary"
                                    size="sm"
                                    isDropdownToggle
                                  >
                                    Actions
                              </Button>
                                </div>
                              </React.Fragment>
                            ),
                          },
                          { content: <Icon link name="edit" /> },
                        ],
                      },
                    ]}
                  />
                </Card>
              </Grid.Col>
            </Grid.Row>

          </div>
        </div>
      </BaseLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      usersInitial: await ApiService.getUsersDataApi(context.req),
      dashboardDataInitial: await ApiService.getDashboardDataApi('ween', context.req),
    },
  };
}

export default withTranslation('dashboard')(Users);
