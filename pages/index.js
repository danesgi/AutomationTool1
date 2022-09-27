import Head from 'next/head';

import { getAllEvents, getItemsNow, getJenkinsJobs, buildJenkinsJob } from '../helpers/api-util';
// import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventList items={props} />
    </div>
  );
}

export async function getStaticProps() {
  // const build = await buildJenkinsJob('Test')
  // console.log('BUilding.... ', build)
  const jenkinsJobs =  await getJenkinsJobs()
  const jobs = jenkinsJobs.jobs
  return {
    props: {
      events: jobs,
    },
    revalidate: 1800,
  };
}

export default HomePage;
