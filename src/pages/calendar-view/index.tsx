import ko from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { mobileSize } from '@styles/mobile';
import styled from 'styled-components';

function CalendarView() {
  return (
    <S.CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        locale={ko}
      />
    </S.CalendarContainer>
  );
}

export default CalendarView;

const S = {
  CalendarContainer: styled.div`
    ${mobileSize}
  `,
};
