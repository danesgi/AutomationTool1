import useSWR from 'swr';

export async function getAllEvents() {
  const data = [
      {
        "_class" : "hudson.model.FreeStyleProject",
        "name" : "CriticalPath",
        "url" : `${process.env.JENKINS_URL}/job/CriticalPath/`,
        "color" : "yellow"
      },
      {
        "_class" : "hudson.model.FreeStyleProject",
        "name" : "LoginTest",
        "url" : `${process.env.JENKINS_URL}/job/LoginTest/`,
        "color" : "aborted"
      }
  ]

  const events = [];

  for (const key in data) {
    events.push({
      name: key,
      ...data[key]
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return []
  // return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
export async function getEventByName(name) {
  const jenkinsJobs = await getJenkinsJobs()
  
  // const allEvents = await getAllEvents();
  return jenkinsJobs.jobs.find((job) => job.name === name);
}
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export async function getJenkinsCrumb () {
  const token = process.env.JENKINS_TOKEN
  const apiURL = `${process.env.JENKINS_URL}/crumbIssuer/api/json`
  const response = await fetch(apiURL, {
    method: 'POST',
    headers: {
       'Content-type': 'application/json',
       'Access-Control-Allow-Origin': '*',
       'Authorization': `Basic ${Buffer.from(`jenkins:${token}`).toString('base64')}`, // notice the Bearer before your token
    }
  })
  return response.json()
}

export async function apiGet(url) {
  const jenkinsCrumb = await getJenkinsCrumb()
  const token = process.env.JENKINS_TOKEN
  const apiURL = `${process.env.JENKINS_URL}${url}`
  return  fetch(apiURL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Basic ${Buffer.from(`jenkins:${token}`).toString('base64')}`, // notice the Bearer before your token
      'Jenkins-Crumb': jenkinsCrumb.crumb
    }
  })
}

export async function apiPost(url) {
  const jenkinsCrumb =await getJenkinsCrumb()
  const token = process.env.JENKINS_TOKEN
  const apiURL = `${process.env.JENKINS_URL}${url}`
  return  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Basic ${Buffer.from(`jenkins:${token}`).toString('base64')}`, // notice the Bearer before your token
      'Jenkins-Crumb': jenkinsCrumb.crumb
    }
  })
}
export async function getJenkinsJobs () {
  const url = '/api/json'
  const response = await apiGet(url) 
  return response.json()
}

export async function getLastJenkinsBuild (job) {
  const url = `/job/${job}/lastBuild/api/json`
  const response = await apiGet(url)
  return response.json()
}
export async function buildJenkinsJob (job) {
  const url = `/job/${job}/build`
  const response = await apiPost(url) 
  return {
    url: response.url,
    status: response.status
  }
}