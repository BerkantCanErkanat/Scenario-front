import React from "react";
import { Scenario } from "./scenario";
import { useGetScenariosQuery } from "../../services/api";
import { CardColumns } from "reactstrap";
export function ScenarioList() {
  
  const { data, error, isLoading } = useGetScenariosQuery();

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <CardColumns>
        {data.map((scenario, index) => (
              <Scenario scenario={scenario} key={index} />
        ))}
        </CardColumns>
      ) : "null"}
    </div>
  );
}
