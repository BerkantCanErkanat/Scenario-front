import React from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import {Card,CardBody,CardTitle,CardSubtitle,CardText,Button} from 'reactstrap'
import { useDeleteScenarioMutation } from "../../services/api";
export function Scenario({ scenario }) {
  const navigate = useNavigate();
  const [deleteScenario] = useDeleteScenarioMutation();
  return (
    <>
       <Card>
      <CardBody>
        <CardTitle tag="h5">
          {scenario.title}
        </CardTitle>
        <CardSubtitle
          className="mb-2"
          tag="h6"
        >
          {scenario.subtitle}
        </CardSubtitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          {scenario.venue}
        </CardSubtitle>
        <CardText
          className="mb-2 text-muted"
          tag="h6"
        >
          {moment(scenario.createdAt).fromNow()}
        </CardText>
        <Button color="warning" onClick={()=>{
           navigate(`/scenarios/${scenario._id}`, { replace: true })
        }}>
          Read More
        </Button>
        {' '}
        <Button color="danger" onClick={() => {
          if(window.confirm("Are you sure that you want to delete this?")){
            deleteScenario(scenario._id)
          }
        }}>
          Delete
        </Button>
        {' '}
        <Button color="info" onClick={() => {
          navigate(`/editScenario/${scenario._id}`, { replace: true })
        }}>
          Edit
        </Button>
      </CardBody>
    </Card>
    </>
  );
}
