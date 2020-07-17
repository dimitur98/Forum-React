import React from 'react'

const Votes = () => {
    return(
        <div class="text-muted small ml-3">
            <form id="votesForm" method="post"></form>
                <div>
                    <a href="#" onclick="sendVote(@Model.Id, true)">
                        <i class="fa fa-thumbs-up"></i>
                    </a>
                </div>
                <div id="votesCount">@Model.VotesCount</div>
                <div>
                    <a href="#" onclick="sendVote(@Model.Id, false)">
                        <i class="fa fa-thumbs-down"></i>
                    </a>
                </div>
        </div>
    )
}

export default Votes