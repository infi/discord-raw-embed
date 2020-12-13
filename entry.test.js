const test = require("ava")

const Embed = require("./entry")

const crypto = require("crypto")

const getRandomString = () => {
    return crypto.randomBytes(16).toString("hex")
}

test("Embed is empty by default", t => {
    const e = new Embed()
    t.deepEqual(e.getEmbed(), {})
})

test("setTitle sets title", t => {
    const e = new Embed()
    const title = getRandomString()
    e.setTitle(title)
    t.deepEqual(e.getEmbed(), { title })

})

test("setDescription sets description", t => {
    const e = new Embed()
    const description = getRandomString()
    e.setDescription(description)
    t.deepEqual(e.getEmbed(), { description })
})

test("setURL sets URL", t => {
    const e = new Embed()
    const url = getRandomString()
    e.setURL(url)
    t.deepEqual(e.getEmbed(), { url })
})

test("setColor sets color", t => {
    const e = new Embed()
    const color = getRandomString()
    e.setColor(color)
    t.deepEqual(e.getEmbed(), { color })
})

test("setTimestamp accepts date", t => {
    const e = new Embed()
    const date = new Date()
    e.setTimestamp(date)
    t.deepEqual(e.getEmbed(), { timestamp: date.toISOString() })
})

test("setTimestamp accepts ISO string", t => {
    const e = new Embed()
    const date = new Date().toISOString()
    e.setTimestamp(date)
    t.deepEqual(e.getEmbed(), { timestamp: date })
})

test("setTimestamp accepts parseable string", t => {
    const e = new Embed()
    const date = "01-02-2020 11:12:13"
    e.setTimestamp(date)
    t.deepEqual(e.getEmbed(), {
        timestamp: new Date("01-02-2020 11:12:13").toISOString()
    })
})

test("setFooter sets footer with text and icon", t => {
    const e = new Embed()
    const text = getRandomString()
    const icon = getRandomString()
    e.setFooter(text, icon)
    t.deepEqual(e.getEmbed(), { footer: { text, icon_url: icon } })
})

test("setFooter sets footer with text only", t => {
    const e = new Embed()
    const text = getRandomString()
    e.setFooter(text)
    t.deepEqual(e.getEmbed(), { footer: { text } })
})

test("setFooter sets footer with icon only", t => {
    const e = new Embed()
    const icon = getRandomString()
    e.setFooter(null, icon)
    t.deepEqual(e.getEmbed(), { footer: { icon_url: icon } })
})

test("setThumbnail sets thumbnail", t => {
    const e = new Embed()
    const thumbnailUrl = getRandomString()
    e.setThumbnail(thumbnailUrl)
    t.deepEqual(e.getEmbed(), { thumbnail: { url: thumbnailUrl } })
})

test("setImage sets image", t => {
    const e = new Embed()
    const imageUrl = getRandomString()
    e.setImage(imageUrl)
    t.deepEqual(e.getEmbed(), { image: { url: imageUrl } })
})

test("setAuthor sets author with name, icon and url", t => {
    const e = new Embed()
    const name = getRandomString()
    const icon = getRandomString()
    const url = getRandomString()
    e.setAuthor(name, icon, url)
    t.deepEqual(e.getEmbed(), { author: { name, url, icon_url: icon } })
})

test("setAuthor sets author with name only", t => {
    const e = new Embed()
    const name = getRandomString()
    e.setAuthor(name)
    t.deepEqual(e.getEmbed(), { author: { name } })
})

test("setAuthor sets author with icon only", t => {
    const e = new Embed()
    const icon = getRandomString()
    e.setAuthor(null, icon)
    t.deepEqual(e.getEmbed(), { author: { icon_url: icon } })
})

test("setAuthor sets author with url only", t => {
    const e = new Embed()
    const url = getRandomString()
    e.setAuthor(null, null, url)
    t.deepEqual(e.getEmbed(), { author: { url } })
})

test("addField adds a field", t => {
    const e = new Embed()
    const name = getRandomString()
    const value = getRandomString()
    e.addField(name, value)
    t.deepEqual(e.getEmbed(), { fields: [{ name, value, inline: false }] })
})

test("addField adds multiple fields", t => {
    const e = new Embed()
    const name1 = getRandomString()
    const value1 = getRandomString()
    const name2 = getRandomString()
    const value2 = getRandomString()
    e.addField(name1, value1, false)
    e.addField(name2, value2, true)
    t.deepEqual(e.getEmbed(), {
        fields: [
            { name: name1, value: value1, inline: false },
            { name: name2, value: value2, inline: true }
        ]
    })
})

test("A complete embed can be contructed", t => {
    const e = new Embed()

    const title = getRandomString()
    const description = getRandomString()
    const url = getRandomString()
    const color = getRandomString()
    const timestamp = new Date()
    const footerText = getRandomString()
    const footerIcon = getRandomString()
    const thumbnail = getRandomString()
    const image = getRandomString()
    const authorName = getRandomString()
    const authorIcon = getRandomString()
    const authorUrl = getRandomString()
    const fieldTitle1 = getRandomString()
    const fieldContent1 = getRandomString()
    const fieldInline1 = !!Math.floor(Math.random() * 2)
    const fieldTitle2 = getRandomString()
    const fieldContent2 = getRandomString()
    const fieldInline2 = !!Math.floor(Math.random() * 2)

    e.setTitle(title)
    e.setDescription(description)
    e.setURL(url)
    e.setColor(color)
    e.setTimestamp(timestamp)
    e.setFooter(footerText, footerIcon)
    e.setThumbnail(thumbnail)
    e.setImage(image)
    e.setAuthor(authorName, authorIcon, authorUrl)

    e.addField(fieldTitle1, fieldContent1, fieldInline1)
    e.addField(fieldTitle2, fieldContent2, fieldInline2)

    t.deepEqual(e.getEmbed(), {
        title,
        description,
        url,
        color,
        timestamp: timestamp.toISOString(),
        footer: {
            icon_url: footerIcon,
            text: footerText
        },
        thumbnail: {
            url: thumbnail
        },
        image: {
            url: image
        },
        author: {
            name: authorName,
            icon_url: authorIcon,
            url: authorUrl
        },
        fields: [
            {
                name: fieldTitle1,
                value: fieldContent1,
                inline: fieldInline1
            },
            {
                name: fieldTitle2,
                value: fieldContent2,
                inline: fieldInline2
            }
        ]
    })
})