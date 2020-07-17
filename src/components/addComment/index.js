import React from 'react'

const AddComment = () => {
    return(
        <div>
            <form>
                <input type="hidden" name="PostId" value="@this.Model.Id" />
                <input type="hidden" name="ParentId" value="0" />
                <div>
                    <label for="Content"></label>
                    <textarea name="Content" id="Content" class="form-control"></textarea>
                </div>
                <div>
                    <input type="submit" class="btn btn-primary" value="Add comment" />
                </div>
            </form>
        </div>
    )
}

export default AddComment