import Image from 'next/image';

import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import { buildJenkinsJob } from '../../helpers/api-util';
import classes from './event-item.module.css';

function EventItem(props) {
  const { name, url, color } = props;
  let image = ''
  if (color === 'yellow') {
    image = 'images/failed.png'
  } else if(color === 'aborted') {
    image = 'images/stopped.png'
  } else if (color === 'blue') {
    image = 'images/passed.png'
  }else if (color === 'blue_anime') {
    image = 'images/inprogress.png'
  }
  
  let bgColor = color

  if (bgColor === 'aborted') { bgColor = 'grey'}
  function buildJob(event) {
    event.preventDefault();
    console.log('Clicked....: ', name) 
    buildJenkinsJob(name).then(function(res) {
      console.log('RESRES: ', res)
    }).catch(function (e) {
        console.log('ERRRR:::: ', e)
    })

  }


  // const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
  //   day: 'numeric',
  //   month: 'long',
  //   year: 'numeric',
  // });
  // const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${name}`;

  return (
    <li className={classes.item} style={{backgroundColor: `${bgColor}`}}>
      <Image src={'/' + image} alt={name} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{name}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{url}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{color}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button onClick={buildJob}>
            <span>Build</span>
          </Button>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Last Run</span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
