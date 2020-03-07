export default class Likes{
    constructor(){
        this.likes = []
    }
    addLike(id, title, author,img){
        const like = {id,title,author, img}
        this.likes.push(like)
        // Persist Data in Local Storage
        this.persistData()
        return like
    }
    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id)
        // Persist Data in Local Storage
        this.likes.splice(index,1)
        this.persistData()
    }
    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1
    }
    getNumLikes(){
        return this.likes.length
    }
    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }
    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'))
        // Store our likes from before in data structure
        if (storage) this.likes = storage
    }
}