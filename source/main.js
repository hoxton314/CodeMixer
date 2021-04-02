
export const main = {
    variableCollector: (input) => {
        const fs = require('fs')
        function cwd() {
            let cwd = process.cwd().replace(/\\/g, '/') + '/'
            for (const key in fs.readdirSync(cwd)) {
                if (fs.readdirSync(cwd)[key] === 'resources') {
                    cwd += 'resources/app/'
                    break
                }
            }
            return cwd
        }
        let path = cwd() + './input/'
        let files = fs.readdirSync(path)
        let loadedVars = []
        let regex
        RegExp.quote = function (str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        }
        console.log(input.vartypes)
        for (let i = 0; i < input.vartypes.length; i++) {
            regex = new RegExp('\\b' + input.vartypes[i] + ' \\S+\\b', 'gi')
            console.log(regex)
            loadedVars[i] = fs.readFileSync(path + files[1]).toString().match(regex)
        }
        loadedVars.forEach((element, count) => {
            if (element != null) {
                loadedVars[count] = element.map(s => s.slice(input.vartypes[count].length + 1))
            }

        });

        //loadedFile = fs.readFileSync(path + files[1]).toString().match(/(\bvar \S+\b)/ig)
        //loadedFile = fs.readFileSync(path + files[1]).toString().match(/(\bconst \S+\b)/ig)
        console.log(loadedVars)
        //return input
    }
}
