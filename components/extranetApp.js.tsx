import * as moment from 'moment';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import i18next from 'i18next';
import { useEffect, useState } from 'react';
import i18CustomParams from '../../new_design/common/i18_custom.js';
import { AcceptContractPage } from '../pages/accept_contract/accept_contract_page';
import { AccountsPage } from '../pages/accounts/accounts_page';
import { EditAccount } from '../pages/accounts/edit_account';
import { NotificationsSettingsPage } from '../pages/accounts/notifications_settings_page';
import { BookPage } from '../pages/bookings/[id]';
import { BookingsPage } from '../pages/bookings/bookings_page';
import { ContractsPage } from '../pages/camp/contracts/contracts_page';
import { CampInfoPage } from '../pages/camp/info/camp_info_page';
import { ServicesPage } from '../pages/camp/services/services_page';
import { SettingsPage } from '../pages/camp/settings/settings_page';
import { CancellationRulePage } from '../pages/cancellation_rules/cancellation_rule_page';
import { CancellationRulesPage } from '../pages/cancellation_rules/cancellation_rules_page';
import { ContactsPage } from '../pages/contacts';
import CustomPage from '../pages/custom_page';
import { AgentReports } from '../pages/finances/agent_reports';
import { ReconciliationReport } from '../pages/finances/reconciliation_report';
import { ReconciliationReportResult } from '../pages/finances/reconciliation_report_result';
import { GalleryPage } from '../pages/gallery/gallery_page';
import { Home } from '../pages/home';
import { MoreClientsPage } from '../pages/more_clients/more_clients_page';
import { PlanningPage } from '../pages/planning/planning_page';
import { ReviewsPage } from '../pages/reviews/reviews_page';
import { TariffsPages } from '../pages/tariffs';
import { TestPagesLayout } from '../pages/test';
import { TestButtonsPage } from '../pages/test/buttons';
import { Notifications } from './common/notifications';
import { Notification, NotificationContext } from './contexts/notification_context';
import { USER_CONTEXT, UserContext } from './contexts/user_context';
import Header from './header';
import Sidebar from './sidebar';

export default function ExtranetApp(props: USER_CONTEXT) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentCamp, setCurrentCamp] = useState(props.current_camp);

  const addNotification = (notification: Notification, clearBeforeAdd = false) => {
    notification.id = Math.random().toString(16).slice(2);
    if (clearBeforeAdd) {
      setNotifications([notification]);
    } else {
      setNotifications((prevNotification) => [...prevNotification, notification]);
    }
    setTimeout(() => deleteNotification(notification.id), 5000);
    return notification.id;
  };

  const deleteNotification = (id: string) => {
    setNotifications((notifications) => notifications.filter((n) => n.id != id));
  };

  moment.locale('ru');
  useEffect(() => {
    i18next.init(i18CustomParams(), function (err, t) {});
  }, []);

  return (
    <div className={'application_container'}>
      <NotificationContext.Provider value={{ addNotification, deleteNotification }}>
        <UserContext.Provider value={{ ...props, current_camp: currentCamp, setCurrentCamp }}>
          <BrowserRouter>
            {!props.current_user.has_pending_contract && (
              <Sidebar isShow={showSidebar} onClose={() => setShowSidebar(false)} />
            )}
            <Header showSidebar={showSidebar} onOpenSidebar={() => setShowSidebar(true)} />
            {props.current_user.has_pending_contract && <AcceptContractPage />}
            {!props.current_user.has_pending_contract && (
              <div className={'application_content__wrapper'}>
                <div className={`application_content ${!showSidebar && 'padding-left-0'}`}>
                  <Routes>
                    <Route path='/' element={<Home />}>
                      <Route path='contact' element={<BookingsPage />} />
                    </Route>
                    <Route path='/admin' element={<Home />} />
                    <Route path='/more_clients' element={<MoreClientsPage />} />
                    <Route path='/planning' element={<PlanningPage />} />
                    <Route path='/tariffs' element={<TariffsPages.TariffsList />} end />
                    <Route path='/tariffs/new' element={<TariffsPages.Tariff />} />
                    <Route path='/tariffs/apartments' element={<TariffsPages.ApartmentsList />} />
                    <Route path='/tariffs/apartments/:id' element={<TariffsPages.Apartment />} />
                    <Route path='/tariffs/prices' element={<TariffsPages.Prices />} />
                    <Route path='/tariffs/rooms' element={<TariffsPages.Rooms />} />
                    <Route path='/tariffs/:id' element={<TariffsPages.Tariff />} />
                    <Route path='/camp/cancellation_rules' element={<CancellationRulesPage />} />
                    <Route path='/camp/cancellation_rules/:id' element={<CancellationRulePage />} />
                    <Route path='/bookings' element={<BookingsPage />} />
                    <Route path='/gallery' element={<GalleryPage />} />
                    <Route path='/bookings/:id' element={<BookPage />} />
                    <Route path='/bookings/new' element={<BookPage />} />
                    <Route path='/finances/agent_report' element={<AgentReports />} />
                    <Route path='/camp/contracts' element={<ContractsPage />} />
                    <Route path='/camp/services' element={<ServicesPage />} />
                    <Route path='/camp/medical_services' element={<ServicesPage isTreatment={true} />} />
                    <Route path='/camp/settings' element={<SettingsPage />} />
                    <Route path='/camp/info' element={<CampInfoPage />} />
                    <Route path='/pages/:id' element={<CustomPage />} />
                    <Route path='/finances/reconciliation_report' element={<ReconciliationReport />} />
                    <Route path='/finances/reconciliation_report_result' element={<ReconciliationReportResult />} />
                    <Route path='/reviews' element={<ReviewsPage />} />
                    <Route path='/contacts' element={<ContactsPage />} />
                    <Route path='/accounts' element={<AccountsPage />} />
                    <Route path='/accounts/:id' element={<EditAccount />} />
                    <Route path='/notifications_settings' element={<NotificationsSettingsPage />} />
                    {/* Test pages with common components */}
                    <Route path={'/test'} element={<TestPagesLayout />}>
                      <Route path={'buttons'} element={<TestButtonsPage />} />
                    </Route>
                  </Routes>
                </div>
                <div className={'application_footer'}>© "Здоровый Отдых" 2024</div>
              </div>
            )}
          </BrowserRouter>
        </UserContext.Provider>
      </NotificationContext.Provider>
      <Notifications notifications={notifications} deleteNotification={deleteNotification} />
    </div>
  );
}
