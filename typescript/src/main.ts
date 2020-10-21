import { Calendar, Component, createElement, DayHeaderContentArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import '../style/main.scss';

import 'bootstrap';
import 'sumoselect';
import 'jquery';

document.addEventListener('DOMContentLoaded', function () {
	let calendarEl: HTMLElement = document.getElementById('calendar')!;

	class CustomDayHeader extends Component<{ text: string }> {
		render() {
			return createElement('div', {}, this.props.text)
		}
	}

	let calendar = new Calendar(calendarEl, {
		plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},
		initialDate: Date.now(),
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		dayMaxEvents: true, // allow "more" link when too many events
		dayHeaderContent(arg: DayHeaderContentArg) {
			return createElement(CustomDayHeader, { text: arg.text })
		},
		events: [
			{
				title: 'Long Event',
				start: '2020-10-20',
				end: '2020-10-22'
			},
			{
				groupId: '999',
				title: 'Repeating Event',
				start: '2020-10-23T16:00:00'
			},
			{
				title: 'Meeting',
				start: '2020-10-24T10:30:00',
				end: '2020-10-24T12:30:00'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: '2020-10-25'
			}
		]
	});

	calendar.render();
});