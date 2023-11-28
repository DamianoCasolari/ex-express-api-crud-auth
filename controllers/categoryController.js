const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { validationResult, matchedData } = require("express-validator")
const customError = require("../utilities/customErrors")

async function store(req, res, next) {

    const validation = validationResult(req)

    if (!validation.isEmpty()) {
        const errorMessages = validation.array().map(error => error.msg);
        next( new customError( errorMessages.join(', '), 400))
    }

    // with MATCHDATA I only take the category key validated before, the other properties sent in the body will be ignored
    let reqBodyValidated = matchedData(req)
    try {
        const data = await prisma.category.create({
            data: {
                name: reqBodyValidated.name,
                description: reqBodyValidated.description
            }

        })

        return res.json(data)
    } catch (error) {
        console.error("Errore durante l'elaborazione della richiesta:", error);
        next(new Error("Errore interno del server"))
    }

}

module.exports = { store }