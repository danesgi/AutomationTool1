import { Fragment } from 'react';
import Head from 'next/head';

import { getEventById, getFeaturedEvents, getEventByName, getLastJenkinsBuild } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.fullDisplayName}</title>
        <meta
          name='description'
          content={event.description}
        />
      </Head>
      <EventSummary title= 'Last Build' />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
        fullDisplayName={event.fullDisplayName}
        url={event.url}
        duration={event.duration}
      />
      <EventContent>
        <p>{event.fullDisplayName}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getLastJenkinsBuild(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export default EventDetailPage;
