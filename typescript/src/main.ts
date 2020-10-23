import '../style/main.scss';
import { events, OnSelectStatus, RenderCalendar } from "./status";

document.addEventListener("DOMContentLoaded", function () {
	initFilter();
	RenderCalendar(events);
	bindEvent();
});

function initFilter() : void {
	// Init sumo select
	// @ts-ignore
	$('.status').SumoSelect({ 
		search: true,
		searchText:'Enter here.',
		placeholder: 'No option'
	});
};

function bindEvent() : void {
	$('#status').on('change', function () {
		// Re filter calendar.
		OnSelectStatus();
	});
}