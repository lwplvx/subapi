


module.exports = {
    user: {
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    app: {
        name: { type: String, required: true },
        appurl: { type: String, required: true },
        accessauthority: { type: Boolean, required: false },
        appicon: { type: String, required: false },
        describe: { type: String, required: false },
        rootpath: { type: String, required: false },
        applicationmember: { type: Object, required: false }
    },
    category: {
        appid: { type: String, required: false },
        name: { type: String, required: true },
        describe: { type: String, required: false },
    },
    api: {
        categoryid: { type: String, required: false },
        name: { type: String, required: true },
        path: { type: String, required: true },
        method: { type: String, required: true },
        requestParams: { type: Object, required: false },
        returnParams: { type: Object, required: false },

        describe: { type: String, required: false },
        requestSample: { type: String, required: false },
        returnSample: { type: String, required: false },
    }

};