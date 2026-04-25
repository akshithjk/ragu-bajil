fetch('http://localhost:8000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'priya' })
}).then(r => r.json()).then(data => {
  fetch('http://localhost:8000/patients/PT-1066/readings', {
    headers: { 'Authorization': 'Bearer ' + data.access_token }
  }).then(r => r.json()).then(d => console.log(JSON.stringify(d).substring(0, 1000)));
});
