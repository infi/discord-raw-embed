module.exports = class {
    constructor() {
        this.embed = {}
    }

    setTitle(title) {
        this.embed.title = title
    }

    setDescription(description) {
        this.embed.description = description
    }

    setURL(url) {
        this.embed.url = url
    }

    setColor(color) {
        this.embed.color = color
    }

    setTimestamp(date) {
        if (date instanceof Date) {
            this.embed.timestamp = date.toISOString()
        } else {
            this.embed.timestamp = new Date(date).toISOString()
        }
    }

    setFooter(text, icon) {
        this.embed.footer = {}
        if (icon) {
            this.embed.footer.icon_url = icon
        }
        if (text) {
            this.embed.footer.text = text
        }
    }

    setThumbnail(url) {
        this.embed.thumbnail = {}
        this.embed.thumbnail.url = url
    }

    setImage(url) {
        this.embed.image = {}
        this.embed.image.url = url
    }

    setAuthor(name, icon, url) {
        this.embed.author = {}
        if (name) this.embed.author.name = name
        if (icon) this.embed.author.icon_url = icon
        if (url) this.embed.author.url = url
    }

    addField(title, content, inline) {
        if (!Array.isArray(this.embed.fields)) {
            this.embed.fields = []
        }

        this.embed.fields.push({
            name: title,
            value: content,
            inline: !!inline // to Boolean
        })
    }

    getEmbed() {
        return this.embed
    }
}