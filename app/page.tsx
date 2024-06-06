"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";

// TS 型別定義
interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

export default function Home() {
  const [events, setEvents] = useState([
    { title: "event 1", id: "1" },
    { title: "event 2", id: "2" },
    { title: "event 3", id: "3" },
    { title: "event 4", id: "4" },
    { title: "event 5", id: "5" },
  ]);

  // 當型別較複雜時用< > 來標示，此處表示 Array Object (initializes a state variable allEvents as an empty array of Event objects)
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  // 較簡單的變數類型可不需要宣告型別 (When the type can be inferred or isn't complex, you don't need to use angle brackets)
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDetete, setIdToDelete] = useState<Number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    allDay: false,
    id: 0,
  });

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("id");
          let start = eventEl.getAttribute("start");
          return { title, id, start };
        },
      });
    }
  }, []);

  const handleDateClick = () => {};

  const addEvent = (data) => {};

  const handleDeleteModal = (data) => [];

  return (
    <>
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="col-span-8">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
              left: "prev next today",
              center: "title",
              right: "resourceTimelineWook dayGridMonth timeGridWeek",
            }}
            events={allEvents}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            // dateClick={handleDateClick}
            // drop={(data) => addEvent(data)}
            // eventClick={(data) => handleDeleteModal(data)}
          />
        </div>
        <div
          id="draggable-el"
          className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50"
        >
          <h1 className="font-bold text-lg text-center">Drag Event</h1>
          {events.map((event) => (
            <div
              key={event.id}
              title={event.title}
              className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
            >
              {event.id}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
