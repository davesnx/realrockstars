import React, { Component } from 'react'
import styled from 'styled-components'
import Repo from './Repo'

const List = styled.div`

`

class RepoList extends Component {
  render () {
    const { data } = this.props
    return (
      <div>
        {
          data.map((repo, i) => {
            return <Repo { ...repo } key={i} />
          })
        }
      </div>
    )
  }
}

export default RepoList
