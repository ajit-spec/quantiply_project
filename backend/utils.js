require('dotenv').config()
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const fetch_image = async (date) => {

    try {
        const response = await fetch(`${process.env.api_url}?api_key=${process.env.api_key}&date=${date}`)
        return await response.json()
    }catch (e) {
        console.log(e.message)
        throw new Error(e.message)
    }

}

const download = async (url, filename) => {
    try {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(path.join(__dirname, 'public/website', filename), buffer, () =>
            console.log('finished downloading!'));
    }catch (e) {
        console.log(e.message)
        throw new Error(e.message)
    }
}

const get_curr_date = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`
}

module.exports = {
    fetch_image,
    download,
    get_curr_date
}