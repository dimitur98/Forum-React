const getPostById = async(postId) => {
    const promise = await fetch(`http://localhost:9999/api/post//getPostById/${postId}`)
    const post = await promise.json()

    return post
}
export default getPostById
