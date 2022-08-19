const HTTP = require("HTTP");
const fetch = require("node-fetch");

const wakeUpDyno = (url, interval) => {
    setTimeout(() => { 

        try { 
            HTTP.get(url, () => {
                console.log(`HTTP request for prevent sleep ${url}...`)
            });
        }
        catch (err) {
            console.log(`Crashed => ${url}`);
        }
        finally {
            wakeUpDyno(url, interval);
        }

    }, interval);
};

module.exports = wakeUpDyno;