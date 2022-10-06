import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navi } from "../navi/navi";
import { Container } from "reactstrap";
import { ScenarioList } from "../scenario/scenarioList";
import { ScenarioDetail } from "../scenario/scenarioDetail";
import {NotFound} from '../common/notFound'
import { NewScenario } from "../newScenario/newScenario";
import { EditScenario } from "../editScenario/scenario";

const App = () => {
  return (
    <div>
      <Container>
        <Navi />
        <Routes>
          <Route path="/" element={<ScenarioList />} />
          <Route path="/addNewScenario" element={<NewScenario />} />
          <Route path="/editScenario/:sId" element={<EditScenario />} />
          <Route path="/scenarios/:sId" element={<ScenarioDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};
export default App;
