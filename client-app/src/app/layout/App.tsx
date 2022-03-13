import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'; //universelly unique identifier-using the GUID for the activity id

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSeletectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false); //initial state as false

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])


  function handleSelectActivity(id: string){
    setSeletectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSeletectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) 
      : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSeletectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x =>x,id !== id)])
  }

  return (
    <>
      <NavBar openForm = {handleFormOpen}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard 
        activities={activities}
        selectedActivity = {selectedActivity}
        selectActivity = {handleSelectActivity}
        cancelSelectActivity = {handleCancelSelectActivity}
        editMode = {editMode}
        openForm = {handleFormOpen}
        closeForm = {handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
      />
      </Container>
    </>
  );
}

export default App;