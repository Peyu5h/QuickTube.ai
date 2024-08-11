import React from "react"

import SummaryActions from "../actions/summaryActions"
import SummaryContent from "../content/summaryContent"

const Summary = () => {
  return (
    <div>
      <div className="scrollbar ">
        <SummaryContent />
      </div>
    </div>
  )
}

export default Summary
