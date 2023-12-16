import { Client, MusicClient } from "youtubei"
import select, { Separator } from "@inquirer/select"
import { input } from "@inquirer/prompts"
// import { createPrompt } from "bun-promptx"
const searchies = await input({ message: "Search Youtube >" })
// const stage = "devel"
const stage = "release"
const youtube = new Client()
const music = new MusicClient()



const choice = [
    {
        name: "Select Videos",
        value: "",
        description: "Select"
    },
]

let stack = []
const run = async () => {
    
    const videos = await youtube.search(await searchies, {
        type: "video"
    })

    const data = videos['items']
    console.log(videos.items.length)
    let i = 0
    let j = 0
    while(i < data.length) {
        if (stage == "release") {
            let name = data[i]['channel']['name']
            // console.log(`${name} - ${videos['items'][i]['title']}`)
            choice.push({
                name: `${name} - ${videos['items'][i]['title']}`,
                value: `https://youtube.com/watch?v=${videos['items'][i]['id']}`,
                description: 'Dummy',
            })
            console.log("Choose from the videos below:")
            while (j < choice.length) {
                const answer = await select({
                    //message: "Choose from the videos below:",
                    choices: choice,
                })
                // console.log(choice)
                j++
            }
            
            // console.log(`https://youtube.com/watch?v=${videos['items'][i]['id']}`)
            // console.log('----------------------------------------------------------------------------------------')
            i++
        } else {
            console.log(data)
            i++
        }
    }
    const nextVideos = await videos.next()
    console.log(nextVideos.length)
    console.log(videos.items.length)
}

run()
