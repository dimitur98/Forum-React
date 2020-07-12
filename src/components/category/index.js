import React from 'react'

const Category = (props) =>{
    return(
        <div class="col-md-4 media">
            <img src="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg" width="100" class="mr-3" alt="@category.Title" />
            <div class="media-body">
                <h5 class="mt-0">
                    <a href="@category.Url">
                        title
                    </a>
                </h5>
                description
            </div>
        </div>
    )
}
export default Category