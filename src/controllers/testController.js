export const longFunction = async (req, res) => {
    for (let index = 0; index < 6_000_000_000; index++) {
    }

    res.json({done: true})
}

export const shortFunction = async (req, res) => {
    res.json({done: true})
}