import express from 'express';
import { Temperature, TemperatureScale } from 'temp-test-package'

var app = express();

app.listen(3000, () => {
    console.log('server running on port 3000');
})

app.get("/temps/api/", (req, res) => {
    const querystring = (req.query.q);
    console.log(querystring)
    const result = tempConverter(querystring);
    console.log(result)
    res.json(result);
});

const tempConverter = (querystring) => {
    const arr = querystring.split(' ');
    const [num, scl, , scaleToConvert] = arr;
    const deg = Number(num);
    const scale = getScaleFromQuery(scl);
    let t = new Temperature(deg, scale);
    console.log(t)
    let result;
    if (scaleToConvert === 'f') {
        result = t.ToF()
    }
    if (scaleToConvert === 'c') {
        result = t.ToC()
    }
    if (scaleToConvert === 'k') {
        result = t.ToK()
    }
    return result;
}


const getScaleFromQuery = (scale) => {
    if (scale == 'f') {
        return TemperatureScale.Farenheit;
    }
    if (scale == 'c') {
        return TemperatureScale.Celcius;
    }
    if (scale == 'k') {
        return TemperatureScale.Kelvin;
    }
}