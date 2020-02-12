import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import NewProject from './NewProject'
import Project from './Project'

import './ListProjects.css'

class ListProject extends Component {
  render () {
    const { projects = [], addNewProject, removeProject, updateProject } = this.props
    return (
      <Grid container spacing={2} className="projects-container">
        {projects.map(project =>
          <Project
            project={ project }
            key={`project${project.id}`}
            removeProject={removeProject}
            updateProject={updateProject}/>
        )}
        <Grid container item xs={12} sm={6} md={4} >
          <NewProject addNewProject={addNewProject} />
        </Grid>
      </Grid>
    )
  }
}

ListProject.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNewProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired
}

export default ListProject
