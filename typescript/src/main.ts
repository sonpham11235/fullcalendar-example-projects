import { Calendar, Component, createElement, DayHeaderContentArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import '../style/main.scss';

import events from "./status";
import OnSelectStatus from "./status";

$(document).ready(function () {
	initFilter();
	initCalendar();
	bindEvent();
});

function initFilter() {
	// Init sumo select
	// @ts-ignore
	$('.status').SumoSelect({ 
		search: true,
		searchText:'Enter here.',
		placeholder: 'No option'
	});
	
};

function initCalendar(){
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
		initialDate: new Date(),
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		dayMaxEvents: true, // allow "more" link when too many events
		dayHeaderContent(arg: DayHeaderContentArg) {
			return createElement(CustomDayHeader, { text: arg.text })
		},
		events
	});

	calendar.render();
}

function bindEvent(){
	$('#status').on('change', function () {
		// Re filter calendar.
		
	});
}