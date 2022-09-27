import Image from 'next/image';

import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';
import Button from '../ui/button';
import ArrowRightIcon from '../icons/arrow-right-icon';
import Link from 'next/link';

function EventLogistics(props) {
  const { date, fullDisplayName, url, duration, estimatedDuration } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  // const addressText = address.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      {/* <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={400} height={400} />
      </div> */}
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          Duration: <time>{ duration && (duration / 3600).toFixed(2) } secs</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          EstimatedDuration: <time>{estimatedDuration && (estimatedDuration / 3600).toFixed(2) } secs</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{fullDisplayName}</address>
        </LogisticsItem>
          <div className={classes.actions}>
            <Button link={url}>
              <span>Build</span>
            </Button>
          </div>
          <div className={classes.actions}>
            <Button link={url}>
              <span>Stop</span>
            </Button>
          </div>
          <div className={classes.actions}>
            <Button link={url}>
              <span>Go To Build</span>
            </Button>
          </div>
      </ul>
    </section>
  );
}

export default EventLogistics;
