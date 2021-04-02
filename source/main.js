
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





        var fileNumber = 1
        let path = cwd() + './input/'
        let files = fs.readdirSync(path)
        let loadedVars = []
        let regex

        let data = fs.readFileSync(path + files[fileNumber]).toString()

        console.log(input.vartypes)
        for (let i = 0; i < input.vartypes.length; i++) {
            regex = new RegExp('\\b' + input.vartypes[i] + ' \\S+\\b', 'gi')
            //console.log(regex)
            loadedVars[i] = data.match(regex)
        }
        loadedVars.forEach((element, count) => {
            if (element != null) {
                loadedVars[count] = element.map(s => s.slice(input.vartypes[count].length + 1))
            }
        })

        console.log(loadedVars)


        var counter = 0
        loadedVars.forEach((loadedVarsElement, loadedVarsPosition) => {
            if (loadedVars[loadedVarsPosition] != null) {
                loadedVars[loadedVarsPosition].forEach((element, position) => {
                    counter = counter + 1
                    regex = new RegExp('\\b' + input.vartypes[loadedVarsPosition] + ' ' + element + '|' + element + '\\b', 'g')
                    console.log(regex)
                    data = data.replace(regex, input.varnames[Math.floor(Math.random() * input.varnames.length)] + counter)
                })
            }
        })

        console.log(data)



    }
}
