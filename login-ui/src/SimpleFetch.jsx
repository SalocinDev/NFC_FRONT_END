export default function SimpleFetch() {
    async function handleFetch() {
      try {
        const res = await fetch('http://localhost:3000/read-nfc'); // change port if needed
        const data = await res.json();
        console.log('Fetched data:', data);
        alert(JSON.stringify(data, null, 2));
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }
  
    return (
      <div>
        <br/>
        <p><strong>Simple NFC Fetch</strong></p>
        <button onClick={handleFetch}>Read NFC</button>
      </div>
    );
  }
  