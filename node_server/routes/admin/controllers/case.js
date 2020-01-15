module.exports = {
    async addCase(req, res, next) {
        try {
            req.returnData.data = {id: new Date().getTime()}
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    async addCaseParty(req, res, next) {
        try {
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    async delCase(req, res, next) {
        try {
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    async upDateCase(req, res, next) {
        try {
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    async getCase(req, res, next) {
        try {
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    }
}
