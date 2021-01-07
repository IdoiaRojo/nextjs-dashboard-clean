import React, { useState } from 'react';
import Chart from '@/components/chart'
import { withTranslation } from '../i18n'
import { useRouter } from 'next/router';
// import { useGetDashboardData } from '@/actions/dashboard';
import BaseLayout from '@/components/layouts/BaseLayout';

// import { getDashboardData } from '../utils/dashboard_data';
import ApiService from "../services/api";


const Dashboard = ({dashboardDataInitial, t }) => {
  const [dashboardData, setData] = useState(dashboardDataInitial);
  const router = useRouter();

  const fetchData = async (select_time) => {
    console.log("select_time");
    console.log(select_time);
    const dashboardData = await ApiService.getDashboardDataApi(select_time);
    return setData(dashboardData);
  };

  const handleChange = e => {
    fetchData(e.target.value);
  }

  return (
    <>
      
        <div className="row" id="partner-dashboard">
          <div className="container" id="">
            {/* {user &&
              <h1 className="title">{user.name} dashboard</h1>
            } */}
            {/* {loading &&
              <p>Loading ...</p>
            } */}
            

            <p></p>

            {/* {loading_dashboard &&
              <p>Loading ...</p>
            } */}
            {dashboardData &&
              <div>
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
                <div>
                  <ul className="nav nav-select">
                    <li>
                      <h3 className="sectitle">{t('d_trend')}</h3>
                      <h5 className="secsubtitle">{t('d_description')}</h5>
                    </li>
                  </ul>
                  <Chart data_api={dashboardData.data} />
                </div>
              </div>
            }
          </div>
        </div>
      
    </>
  )
}

//export const getServerSideProps = getDashboardData();
export async function getServerSideProps(context) {
  return {
    props: {
      dashboardDataInitial: await ApiService.getDashboardDataApi('week', context.req),
    },
  };
}

export default withTranslation('dashboard')(Dashboard);
