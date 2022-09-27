import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props) {
  const { events } = props.items;

  return (
    <ul className={classes.list} >
      {events.map((event) => (
        <EventItem
          key={event.name}
          name={event.name}
          url={event.url}
          color={event.color}
          // date={event.date}
          // image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
