module.exports = function buildMakeNotification(){
    return function makeNotification({
        username,
        event,          // notification type
        title,
        subtitle,
        body,
        image_url
    }){

        if(!username){
            throw new Error('Must provide username');
        }

        if(!event){
            throw new Error('Must provide notification type')
        }

        if(!title){
            throw new Error('Must provide notification title');
        }

        if(!body){
            throw new Error('Must provide notification body');
        }

        return Object.freeze({
            getUsername: () => username,
            getEvent: () => event,
            getTitle: () => title,
            getSubtitle: () => subtitle,
            getBody: () => body,
            getImage: () => image_url
        });
    }
}