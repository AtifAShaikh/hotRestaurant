const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());


reservations = [
    {
        name: 'frank',
        email: 'frank@email.com',
        phone: '00000000000'
    }
];


app.get('/', (req, res) => res.send('Welcome!'));
app.get('/reservations', (req, res) => res.send('Look at the reservations!'));
app.get('/reserve', (req, res) => res.send('Make reservation!'));

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
