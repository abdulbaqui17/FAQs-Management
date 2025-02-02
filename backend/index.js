const { Translate } = require("@google-cloud/translate").v2;
const express = require("express");
const cors=require("cors")
const FAQ = require("./db");
const redis = require("redis");

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const app = express();
app.use(express.json());

app.use(cors())

const translate = new Translate({ key: "" });
const client = redis.createClient({ url: redisUrl });

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect()
    .then(() => {
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch(err => {
        console.error('Failed to connect to Redis:', err);
        process.exit(1);
    });

async function translateText(text, targetLang) {
    let [translations] = await translate.translate(text, targetLang);
    return translations;
}

app.post("/api/faqs", async (req, res) => {
    try {
        const { question, answer } = req.body;
        const languages = ["hi", "bn"];
        let translations = {};

        for (const lang of languages) {
            translations[`question_${lang}`] = await translateText(question, lang);
        }

        const faq = await FAQ.create({ question, answer, translations });

        const supportedLangs = ['en', 'hi', 'bn'];
        for (const lang of supportedLangs) {
            const cacheKey = `faqs:${lang}`;
            try {
                await client.del(cacheKey);
            } catch (redisError) {
                res.json({
                    msg: redisError
                })
            }
        }

        res.json({ msg: "FAQ created successfully", faq });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/faqs", async (req, res) => {
    try {
        const lang = req.query.lang || "en";
        const cacheKey = `faqs:${lang}`;

        let cachedData;
        try {
            cachedData = await client.get(cacheKey);
        } catch (redisError) {
            res.json({
                msg: redisError
            })
        }

        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        const faqs = await FAQ.find();

        const translatedFaqs = faqs.map(faq => ({
            question: faq.getTranslatedQuestion(lang),
            answer: faq.answer
        }));

        try {
            await client.setEx(cacheKey, 3600, JSON.stringify(translatedFaqs));
        } catch (redisError) {
            res.json({
                msg: redisError
            })
        }

        res.json(translatedFaqs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

  
module.exports = app;  