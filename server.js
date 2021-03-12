const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('html'));


reservations = [
    {
        name: 'frank',
        email: 'frank@email.com',
        phone: '00000000000'
    }
];


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

app.get('/api/getreservations', (req, res) => res.json(reservations));
app.post('/api/putreservation', (req, res) => {
    const newReservation = req.body;

    console.log(newReservation);

    reservations.push(newReservation);

    let feedback = JSON.parse(JSON.stringify(newReservation));

    if(reservations.length > 5){
        feedback.status = "waitlist";
    } else {
        feedback.status = "confirmed";
    }

    res.json(feedback);
});




app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
