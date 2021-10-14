module.exports = {
    name: 'ready',
    once: false,
    execute(keyv, client){
        console.log(`Logged in as ${client.user.tag}`)
    }
}