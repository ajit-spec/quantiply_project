require('dotenv').config()
const Apod = require('../model/apod')
const utils = require('../utils')

//get_data
const get_data = async (req, res) => {

    let date = req.query.date;

    if (!date) {
        date = utils.get_curr_date()
    }

    const data = await utils.fetch_image(date)

    const filename = data.url.split('/')[data.url.split('/').length - 1]
    if (data.media_type === "image") {
        await utils.download(data.url, filename)
    }

    const result = new Apod(
        {
            date: data.date,
            url: data.media_type === "image" ? `${process.env.APP_BASE_URL}/website/${filename}` : data.url,
            explanation: data.explanation,
            title: data.title,
            media_type: data.media_type,
        }
    )

    const apod_data = await result.save()

    return res.json(
        {
            status: 1,
            data: apod_data
        }
    )

}


//check_data
const check_data = async (req, res, next) => {

    let date = req.query.date;
    console.log(date)
    if (!date) {
        date = utils.get_curr_date()
    }

    const result = await Apod.findOne(
        {
            date
        }
    )
    console.log(`result ${result}`)

    if (!result) {
        return next()
    }

    return res.json(
        {
            status: 1,
            data: result
        }
    )

}


module.exports = {
    get_data,
    check_data
}