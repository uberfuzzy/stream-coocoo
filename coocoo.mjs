import fetch from 'node-fetch';

const url = 'http://localhost:8089/say';

async function postRequest() {
  const now = new Date();
  const hour = now.getHours() % 12 || 12;
  // const minutes = now.getMinutes();
  const payload = {
    text: `ding dong, the time is now ${hour} o clock`
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function scheduleNextPost() {
  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setHours(now.getHours() + 1, 0, 0, 0); // Set to the top of the next hour
  const delay = nextHour - now;

  console.log(`Next request scheduled in ${delay / 1000} seconds`);

  setTimeout(() => {
    postRequest().then(scheduleNextPost);
  }, delay);
}

// Start the schedule
scheduleNextPost();
