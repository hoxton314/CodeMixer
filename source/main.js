
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


        let files = null
        const glob = require('glob');

        files = glob.sync(cwd() + 'input' + '/**/*')
        //let files = fs.readdirSync(path)
        let dirToCreate = files
        files = files.filter(function (el) { return el.slice(-3) == '.js'; })
        console.log(files)
        dirToCreate = dirToCreate.filter(function (el) { return el != files.find(element => element == el) })
        console.log(dirToCreate)

        let mkdirp = require('mkdirp')
        dirToCreate.forEach(element => {
            mkdirp.sync(element.replace('input', 'output'))
        });


        let loadedVars = []
        let regex
        for (let fileCounter = 1; fileCounter < files.length; fileCounter++) {
            var fileNumber = fileCounter
            console.log(files[fileNumber])
            let data = fs.readFileSync(files[fileNumber]).toString()

            console.log(input.vartypes)
            for (let i = 0; i < input.vartypes.length; i++) {
                regex = new RegExp('\\b' + input.vartypes[i] + ' \\S+\\b', 'gi')
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
            //let mkdirp = require('mkdirp')
            //mkdirp.sync(files[fileNumber].replace(files[fileNumber].split('/')[files[fileNumber].split('/').length - 1], ''))


            let file = fs.createWriteStream(files[fileNumber].replace('input', 'output'))
            file.on('error', (err) => { if (err) throw err })
            file.write(data)
            file.end()
        }
    }
}
