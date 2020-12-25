import React from "react"
import styled from "styled-components"

const Bar = styled.div`
  margin-top: 1rem;
`

const SummaryBar = ({ totalCount }) => {
  return <Bar>{totalCount} articles</Bar>
}

export default SummaryBar
