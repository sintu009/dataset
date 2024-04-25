const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit-form', (req, res) => {
    const formData = req.body;
    saveFormData(formData);
    res.send('Form submitted successfully.');
});

function saveFormData(formData) {
    const filePath = path.join(__dirname, 'contact.json');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        let jsonData = JSON.parse(data);
        formData.id = jsonData.length + 1; // Generate ID for the new entry
        jsonData.push(formData);

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data saved successfully.');
        });
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
