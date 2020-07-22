import React from 'react'

const AddAnswer = () => {
    return(
        <div class="text-muted small ml-3">                                      
            <div class="px-4 pt-3"> <button type="button" class="btn btn-secondary" onclick="showAddCommentForm(@comment.Id)"><i class="fa fa-plus"></i>&nbsp; Answer</button> </div>                                       
        </div>
    )
}

export default AddAnswer