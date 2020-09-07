const comment = require('../models/Comment')
const a = require('.')

module.exports = async({id}) => {
    const parentComment = await comment.findById(id)
    console.log(parentComment)
    const subComments = await comment.find({parentComment: parentComment._id})
    if(subComments){
        subComments.forEach(async(sc) => {
            await comment.findOneAndDelete({_id:sc._id})
        });
    }

    return 'done'
}