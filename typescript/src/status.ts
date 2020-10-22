import { Calendar, Component, createElement, DayHeaderContentArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

var events = [
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

function OnSelectStatus() : void {
	let selectNode: HTMLElement = document.getElementById('status')!;
	let m_select: HTMLSelectElement = <HTMLSelectElement>selectNode;
	let optionLength: number = m_select.options.length;
	let selectedOptions: string[] = [];

	for (let i = 0; i < optionLength; i++) {
		if (m_select.options[i].selected) {
			selectedOptions.push(m_select.options[i].value);
		}
	}

	var filteredEvents: object[] = FilterEvent(selectedOptions);
	ReRenderCalendar(filteredEvents);
}

function ReRenderCalendar(filteredEvents: object[]) : void {
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
		events: filteredEvents
	});

	calendar.render();
}

function  FilterEvent(selectedOptions: string[]) : object[] {
	var filteredEvents : object[] = [];
	let today: Date = new Date();

	if (selectedOptions.length == 0) {
		return events;
	}

	events.map(m_event => {
		if (selectedOptions.indexOf('new') > -1 
				&& today < new Date(m_event.start)) {
			filteredEvents.push(m_event);
			return;
		}

		if (selectedOptions.indexOf('inprogress') > -1) {
			if (m_event.end) {
				if (today > new Date(m_event.start)
						&& today < new Date(m_event.end)) {
					filteredEvents.push(m_event);
					return;
				}
			}
		}

		if (selectedOptions.indexOf('closed') > -1) {
			filteredEvents.push(m_event);
		}
	});

	return filteredEvents;
}

export default {
    events,
    OnSelectStatus
}